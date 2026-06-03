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

/** Collapse a manifest into a flat lookup of public entries:
 *    "<modulePath>::<declarationName>"                     → declaration node
 *    "<modulePath>::<declarationName>::<member|event|slot|cssProperty|cssPart>:<name>"
 *                                                           → member node
 */
function flattenPublic(manifest) {
	const flat = new Map();
	const modules = manifest?.modules ?? [];
	for (const mod of modules) {
		const path = mod.path ?? "(unknown)";
		for (const decl of mod.declarations ?? []) {
			if (!isPublic(decl, { topLevel: true })) continue;
			const declKey = `${path}::${decl.name}`;
			flat.set(declKey, { kind: "declaration", node: decl });

			const groups = [
				["members", decl.members],
				["events", decl.events],
				["slots", decl.slots],
				["cssProperties", decl.cssProperties],
				["cssParts", decl.cssParts],
				["attributes", decl.attributes],
			];
			for (const [groupName, arr] of groups) {
				if (!Array.isArray(arr)) continue;
				for (const m of arr) {
					// CSS properties / parts / attributes don't carry privacy fields
					// in the manifest schema — they're always public when present
					// on a public declaration. Members/events/slots use _ui5privacy.
					const alwaysPublic = groupName === "cssProperties" || groupName === "cssParts" || groupName === "attributes";
					if (!alwaysPublic && !isPublic(m)) continue;
					const memberKey = `${declKey}::${groupName}:${m.name}`;
					flat.set(memberKey, { kind: groupName, node: m });
				}
			}
		}
	}
	return flat;
}

/** Compare two member nodes shallowly: returns a list of changed field names
 *  (only fields that affect API surface — type text, default value, deprecated). */
function memberFieldDiff(a, b) {
	const changed = [];
	const aType = a?.type?.text ?? a?._ui5type?.text;
	const bType = b?.type?.text ?? b?._ui5type?.text;
	if (aType !== bType) changed.push("type");
	if ((a?.default ?? null) !== (b?.default ?? null)) changed.push("default");
	if (Boolean(a?.deprecated) !== Boolean(b?.deprecated)) changed.push("deprecated");
	if ((a?.readonly ?? false) !== (b?.readonly ?? false)) changed.push("readonly");
	return changed;
}

function diffPackage(baseManifest, headManifest) {
	const baseFlat = flattenPublic(baseManifest);
	const headFlat = flattenPublic(headManifest);

	const added = [];
	const removed = [];
	const changed = [];

	for (const [key, value] of headFlat) {
		if (!baseFlat.has(key)) {
			added.push({ key, kind: value.kind, name: value.node.name });
		} else {
			const fields = memberFieldDiff(baseFlat.get(key).node, value.node);
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
