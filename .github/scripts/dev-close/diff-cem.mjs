#!/usr/bin/env node
/**
 * Diff two `custom-elements-internal.json` manifests for **public** API changes.
 *
 * We diff the *internal* manifest (which contains every entry, with privacy
 * flags) rather than the public `custom-elements.json` because the public file
 * is post-processed by `processPublicAPI` in the build — anything stripped
 * there silently disappears, and we'd have no chance to flag it. Working from
 * the internal manifest and filtering by `_ui5privacy: "public"` (or
 * `privacy: "public"`) ourselves keeps the workflow honest about what counts
 * as a public-API change.
 *
 * Coverage (informed by nnaydenow/version-compare's process-manifest.js, which
 * solves a similar problem for release-prep — we kept the categories that
 * matter, dropped the HTML rendering and signature-noise on additions):
 *   - custom-element declarations (added / removed)
 *   - properties (kind=field) and methods (kind=method) — separated
 *   - events, including event parameters, _ui5Bubbles, _ui5Cancelable
 *   - slots
 *   - cssProperties, cssParts, cssStates, attributes
 *   - enums, including individual enum-member additions/removals
 *   - interfaces (added / removed / deprecation transitions)
 *   - deprecation transitions on any tracked entity (newly deprecated,
 *     un-deprecated, deprecation-message-changed)
 *
 * Usage:
 *   node diff-cem.mjs <baseDir> <headDir>
 *
 * Each <dir> is expected to contain `<package>.json` files (the
 * custom-elements-internal manifests, one per ui5 package). Filenames before
 * the extension are used as the package label in the output.
 *
 * Output: JSON on stdout describing additions, removals, and changes per
 * package. Returns exit code 0 always (this script's job is to produce data,
 * not to gate CI).
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const [, , baseDir, headDir] = process.argv;
if (!baseDir || !headDir) {
	console.error("Usage: diff-cem.mjs <baseDir> <headDir>");
	process.exit(2);
}

/** Read every *.json under `dir` keyed by filename-without-extension. */
function readManifests(dir) {
	if (!existsSync(dir)) return {};
	const out = {};
	for (const file of readdirSync(dir)) {
		if (extname(file) !== ".json") continue;
		const key = basename(file, ".json");
		try {
			out[key] = JSON.parse(readFileSync(join(dir, file), "utf8"));
		} catch (e) {
			// Treat unreadable manifest as missing on this side — caller decides
			// what to do. We only log on stderr so the workflow can still fall
			// back to the title regex if every manifest fails to parse.
			console.error(`Failed to read ${join(dir, file)}: ${e.message}`);
		}
	}
	return out;
}

/** "public" iff explicit privacy says so. Default-undefined is treated as
 *  public for top-level declarations marked as customElement (UI5 convention),
 *  and as non-public for members. */
function isPublic(node, { topLevel = false } = {}) {
	const p = node?._ui5privacy ?? node?.privacy;
	if (p === "public") return true;
	if (p) return false; // explicit non-public
	// No privacy declared. Custom-element declarations are public by default;
	// members without privacy are private by default.
	return topLevel && node?.customElement === true;
}

/** True iff this top-level declaration is in scope for our diff. We track
 *  custom elements (the bulk of the public API), enums and interfaces — those
 *  three are the public-typed surface of UI5 packages. */
function isTrackedDeclaration(decl) {
	if (!decl) return false;
	if (decl.customElement) return isPublic(decl, { topLevel: true });
	if (decl.kind === "enum" || decl.kind === "interface") {
		// Enums/interfaces don't have customElement=true; they're tracked iff
		// they declare _ui5privacy === "public" or have no privacy at all
		// (default-public for top-level type-system declarations).
		const p = decl._ui5privacy ?? decl.privacy;
		return !p || p === "public";
	}
	return false;
}

/** Distinguish properties (kind=field) vs methods (kind=method) inside the
 *  generic `members` array. Anything else (e.g. accessors that survive into
 *  the manifest) falls back to "members". */
function memberSubKind(m) {
	if (m?.kind === "field") return "properties";
	if (m?.kind === "method") return "methods";
	return "members";
}

/** Collapse a manifest into a flat lookup of public entries. Each value is
 *  `{ kind, node, parent? }` where kind is the category used in diffs. */
function flattenPublic(manifest) {
	const flat = new Map();
	const modules = manifest?.modules ?? [];
	for (const mod of modules) {
		const path = mod.path ?? "(unknown)";
		for (const decl of mod.declarations ?? []) {
			if (!isTrackedDeclaration(decl)) continue;
			const declKind = decl.customElement
				? "element"
				: decl.kind === "enum"
					? "enum"
					: "interface";
			const declKey = `${path}::${decl.name}`;
			flat.set(declKey, { kind: declKind, node: decl });

			// Enum members: track each enum value as an entry of its own. Members
			// of enums have no privacy field — they inherit the enum's.
			if (declKind === "enum") {
				for (const m of decl.members ?? []) {
					const memberName = m?.name ?? m?.value ?? m?.id;
					if (!memberName) continue;
					flat.set(`${declKey}::enumMembers:${memberName}`, {
						kind: "enumMembers",
						node: m,
					});
				}
				continue; // enums don't have the property/event/slot groups below
			}

			// Custom elements: walk every member group.
			const groups = [
				// `members` is a heterogeneous array — split by kind.
				["__members__", decl.members],
				["events", decl.events],
				["slots", decl.slots],
				["cssProperties", decl.cssProperties],
				["cssParts", decl.cssParts],
				["cssStates", decl.cssStates],
				["attributes", decl.attributes],
			];
			for (const [groupName, arr] of groups) {
				if (!Array.isArray(arr)) continue;
				for (const m of arr) {
					// CSS properties / parts / states / attributes don't carry privacy
					// fields — they're always public when present on a public element.
					const alwaysPublic = groupName === "cssProperties"
						|| groupName === "cssParts"
						|| groupName === "cssStates"
						|| groupName === "attributes";
					if (!alwaysPublic && !isPublic(m)) continue;
					const subKind = groupName === "__members__" ? memberSubKind(m) : groupName;
					const memberKey = `${declKey}::${subKind}:${m.name}`;
					flat.set(memberKey, { kind: subKind, node: m });
				}
			}
		}
	}
	return flat;
}

/** Compare two nodes for surface-relevant fields. Returns a list of changed
 *  field names. We treat "deprecated" specially — any transition matters,
 *  including a message edit, so callers can render it explicitly. */
function nodeFieldDiff(kind, a, b) {
	const changed = [];

	// Type text — present on properties, methods (return type), slots, events,
	// cssProperties (sometimes), attributes.
	const aType = a?.type?.text ?? a?._ui5type?.text;
	const bType = b?.type?.text ?? b?._ui5type?.text;
	if (aType !== bType) changed.push("type");

	// Defaults are relevant for properties and attributes; harmless on others.
	if ((a?.default ?? null) !== (b?.default ?? null)) changed.push("default");

	// Readonly transitions matter for properties.
	if ((a?.readonly ?? false) !== (b?.readonly ?? false)) changed.push("readonly");

	// Deprecation transitions are a public-API signal in their own right.
	const aDep = a?.deprecated;
	const bDep = b?.deprecated;
	if (Boolean(aDep) !== Boolean(bDep) || (aDep && bDep && aDep !== bDep)) {
		changed.push("deprecated");
	}

	// Event-only fields.
	if (kind === "events") {
		if ((a?._ui5Bubbles ?? null) !== (b?._ui5Bubbles ?? null)) changed.push("bubbles");
		if ((a?._ui5Cancelable ?? null) !== (b?._ui5Cancelable ?? null)) changed.push("cancelable");

		// Parameter set diff: any add/remove/type-change counts as a change.
		const aParams = a?._ui5parameters ?? [];
		const bParams = b?._ui5parameters ?? [];
		const allNames = new Set([
			...aParams.map(p => p.name).filter(Boolean),
			...bParams.map(p => p.name).filter(Boolean),
		]);
		for (const name of allNames) {
			const ap = aParams.find(p => p.name === name);
			const bp = bParams.find(p => p.name === name);
			if (!ap || !bp) {
				changed.push(`param:${name}`);
				continue;
			}
			if ((ap.type?.text ?? null) !== (bp.type?.text ?? null)) {
				changed.push(`param:${name}`);
			}
		}
	}

	return changed;
}

function diffPackage(baseManifest, headManifest) {
	const baseFlat = flattenPublic(baseManifest);
	const headFlat = flattenPublic(headManifest);

	const added = [];
	const removed = [];
	const changed = [];

	for (const [key, value] of headFlat) {
		const baseEntry = baseFlat.get(key);
		if (!baseEntry) {
			added.push({ key, kind: value.kind, name: value.node.name });
		} else {
			const fields = nodeFieldDiff(value.kind, baseEntry.node, value.node);
			if (fields.length) changed.push({ key, kind: value.kind, name: value.node.name, fields });
		}
	}
	for (const [key, value] of baseFlat) {
		if (!headFlat.has(key)) {
			removed.push({ key, kind: value.kind, name: value.node.name });
		}
	}
	return { added, removed, changed };
}

const baseManifests = readManifests(baseDir);
const headManifests = readManifests(headDir);

const allPackages = new Set([...Object.keys(baseManifests), ...Object.keys(headManifests)]);
const result = { byPackage: {}, totals: { added: 0, removed: 0, changed: 0 } };

for (const pkg of allPackages) {
	const d = diffPackage(baseManifests[pkg], headManifests[pkg]);
	if (d.added.length || d.removed.length || d.changed.length) {
		result.byPackage[pkg] = d;
		result.totals.added += d.added.length;
		result.totals.removed += d.removed.length;
		result.totals.changed += d.changed.length;
	}
}

result.hasChanges = result.totals.added + result.totals.removed + result.totals.changed > 0;

console.log(JSON.stringify(result, null, 2));
