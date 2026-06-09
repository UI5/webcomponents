#!/usr/bin/env node
/**
 * Dev-close PR notice — single-file workflow worker.
 *
 * Walks every open non-draft PR targeting `main`, diffs its public Custom
 * Elements Manifest against the latest published manifest on jsDelivr, and
 * posts (once, idempotently) a "do not merge during dev close" comment if
 * any public-API changes are detected.
 *
 * Triggered from .github/workflows/pr-dev-close-notice.yaml; the workflow
 * has already run `yarn install && yarn generate` on the runner before
 * invoking this script. The runner's working tree IS the head being
 * compared — we only fetch the base from the npm registry.
 *
 * Why jsDelivr instead of building the base in CI:
 *   The published custom-elements.json IS the public-API manifest as last
 *   shipped. Diffing PR head vs latest npm catches everything that would
 *   ship if the PR merged + cut a release today, which is exactly the
 *   "should not merge during dev close" question. Saves ~2 min per PR.
 *
 * Inputs (env, all required):
 *   GH_TOKEN        — token for `gh` CLI (read PRs, post comments)
 *   GITHUB_REPO     — "owner/repo"
 *   RELEASE         — release identifier shown in the comment (e.g. "next")
 *   RELEASE_DATE    — release date shown in the comment (YYYY-MM-DD UTC)
 *
 * Always exits 0 (this is advisory CI; failures should not block).
 */

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const MARKER = "<!-- dev-close-notice -->";

// REPORT_ONLY modes (local validation, no comments posted to GitHub):
//   "list"  / "1" — fast: only the candidate table, no builds
//   "diff"        — full pipeline: build each candidate, render the would-be
//                   comment body to stdout. Slow (~3min per PR).
// LIMIT=N restricts how many candidates the "diff" mode processes (handy
// when you just want to spot-check a few).
const REPORT_ONLY = process.env.REPORT_ONLY;
const REPORT_MODE = REPORT_ONLY === "diff" ? "diff" : (REPORT_ONLY ? "list" : null);
const LIMIT = Number(process.env.LIMIT) || 0;

const REPO = required("GITHUB_REPO");
// Release / release-date are only used to render the comment body. Skip the
// strictness in REPORT_ONLY mode so callers don't need to pass them.
const RELEASE = REPORT_MODE ? (process.env.RELEASE ?? "next") : required("RELEASE");
const RELEASE_DATE = REPORT_MODE ? (process.env.RELEASE_DATE ?? "(unset)") : required("RELEASE_DATE");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function required(name) {
	const v = process.env[name];
	if (!v) {
		console.error(`Missing required env: ${name}`);
		process.exit(0); // soft-fail
	}
	return v;
}

function gh(args, opts = {}) {
	return execFileSync("gh", args, { encoding: "utf8", ...opts });
}

function git(args, opts = {}) {
	return execFileSync("git", args, { encoding: "utf8", ...opts });
}

function sh(cmd, opts = {}) {
	return execFileSync("sh", ["-c", cmd], { encoding: "utf8", stdio: "pipe", ...opts });
}

// ---------------------------------------------------------------------------
// Manifest plumbing
// ---------------------------------------------------------------------------

/**
 * The packages whose public CEM we diff. Aligned with what the publish
 * pipeline actually ships a `dist/custom-elements.json` for — extending
 * this is one-line if a new package starts shipping a manifest.
 */
const PACKAGES = [
	{ name: "@ui5/webcomponents", dir: "packages/main" },
	{ name: "@ui5/webcomponents-fiori", dir: "packages/fiori" },
	{ name: "@ui5/webcomponents-ai", dir: "packages/ai" },
	{ name: "@ui5/webcomponents-compat", dir: "packages/compat" },
];

/** Fetch the published custom-elements.json for `pkg@latest`. Returns null
 *  if the package has no published manifest. */
async function fetchPublishedCEM(pkgName) {
	const url = `https://cdn.jsdelivr.net/npm/${pkgName}@latest/dist/custom-elements.json`;
	try {
		const res = await fetch(url);
		if (!res.ok) {
			console.error(`  · ${pkgName}: jsdelivr returned ${res.status}`);
			return null;
		}
		return await res.json();
	} catch (e) {
		console.error(`  · ${pkgName}: fetch failed: ${e.message}`);
		return null;
	}
}

/** Read the locally-built (head) custom-elements.json for a package. */
function readHeadCEM(pkgDir) {
	const path = join(pkgDir, "dist", "custom-elements.json");
	if (!existsSync(path)) return null;
	try {
		return JSON.parse(readFileSync(path, "utf8"));
	} catch (e) {
		console.error(`  · ${pkgDir}: read failed: ${e.message}`);
		return null;
	}
}

// ---------------------------------------------------------------------------
// Diff
//
// The published custom-elements.json is already public-only (the build
// runs processPublicAPI before publishing), so we don't filter privacy
// here — every entry that's in the manifest counts.
// ---------------------------------------------------------------------------

const KIND_LABEL = {
	element: "element",
	properties: "property",
	methods: "method",
	events: "event",
	slots: "slot",
	cssProperties: "CSS property",
	cssParts: "CSS part",
	cssStates: "CSS state",
	attributes: "attribute",
	enum: "enum",
	enumMembers: "enum member",
	interface: "interface",
};

function declKind(decl) {
	if (decl.customElement) return "element";
	if (decl.kind === "enum") return "enum";
	if (decl.kind === "interface") return "interface";
	return null;
}

function memberSubKind(m) {
	if (m?.kind === "field") return "properties";
	if (m?.kind === "method") return "methods";
	return null;
}

/** Flatten a manifest to a Map<key, {kind, name, node}>. */
function flatten(manifest) {
	const out = new Map();
	for (const mod of manifest?.modules ?? []) {
		const path = mod.path ?? "(unknown)";
		for (const decl of mod.declarations ?? []) {
			const dk = declKind(decl);
			if (!dk) continue;
			const declKey = `${path}::${decl.name}`;
			out.set(declKey, { kind: dk, name: decl.name, node: decl });

			if (dk === "enum") {
				for (const m of decl.members ?? []) {
					const n = m?.name ?? m?.value;
					if (!n) continue;
					out.set(`${declKey}::enumMembers:${n}`, { kind: "enumMembers", name: n, node: m });
				}
				continue;
			}

			const groups = [
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
					const sub = groupName === "__members__" ? memberSubKind(m) : groupName;
					if (!sub || !m?.name) continue;
					out.set(`${declKey}::${sub}:${m.name}`, { kind: sub, name: m.name, node: m });
				}
			}
		}
	}
	return out;
}

/** Surface-relevant field diff. */
function fieldDiff(kind, a, b) {
	const changed = [];
	const aType = a?.type?.text ?? a?._ui5type?.text;
	const bType = b?.type?.text ?? b?._ui5type?.text;
	if (aType !== bType) changed.push("type");
	if ((a?.default ?? null) !== (b?.default ?? null)) changed.push("default");
	if ((a?.readonly ?? false) !== (b?.readonly ?? false)) changed.push("readonly");
	const aDep = a?.deprecated, bDep = b?.deprecated;
	if (Boolean(aDep) !== Boolean(bDep) || (aDep && bDep && aDep !== bDep)) {
		changed.push("deprecated");
	}
	if (kind === "events") {
		if ((a?._ui5Bubbles ?? null) !== (b?._ui5Bubbles ?? null)) changed.push("bubbles");
		if ((a?._ui5Cancelable ?? null) !== (b?._ui5Cancelable ?? null)) changed.push("cancelable");
		const aP = a?._ui5parameters ?? [], bP = b?._ui5parameters ?? [];
		const names = new Set([...aP.map(p => p.name), ...bP.map(p => p.name)].filter(Boolean));
		for (const n of names) {
			const ap = aP.find(p => p.name === n);
			const bp = bP.find(p => p.name === n);
			if (!ap || !bp || (ap.type?.text ?? null) !== (bp.type?.text ?? null)) {
				changed.push(`param:${n}`);
			}
		}
	}
	return changed;
}

/** Diff one package, return { added, removed, changed } or null if no diff. */
function diffPackage(baseManifest, headManifest) {
	const base = flatten(baseManifest ?? { modules: [] });
	const head = flatten(headManifest ?? { modules: [] });
	const added = [], removed = [], changed = [];
	for (const [k, v] of head) {
		const b = base.get(k);
		if (!b) {
			added.push({ kind: v.kind, name: v.name });
		} else {
			const fields = fieldDiff(v.kind, b.node, v.node);
			if (fields.length) changed.push({ kind: v.kind, name: v.name, fields });
		}
	}
	for (const [k, v] of base) {
		if (!head.has(k)) removed.push({ kind: v.kind, name: v.name });
	}
	if (!added.length && !removed.length && !changed.length) return null;
	return { added, removed, changed };
}

/** Render the per-package diff to a Markdown bullet list. */
function renderDiff(byPackage) {
	const lines = [];
	const packages = Object.keys(byPackage).sort();
	for (const pkg of packages) {
		const { added, removed, changed } = byPackage[pkg];
		lines.push(`**\`${pkg}\`**`);
		for (const e of added) lines.push(`- ➕ added ${KIND_LABEL[e.kind] ?? e.kind}: \`${e.name}\``);
		for (const e of removed) lines.push(`- ➖ removed ${KIND_LABEL[e.kind] ?? e.kind}: \`${e.name}\``);
		for (const e of changed) lines.push(`- 🔄 changed ${KIND_LABEL[e.kind] ?? e.kind} \`${e.name}\` (${e.fields.join(", ")})`);
		lines.push("");
	}
	return lines.join("\n").trimEnd();
}

// ---------------------------------------------------------------------------
// Per-PR processing
// ---------------------------------------------------------------------------

function listOpenPRs() {
	const json = gh([
		"pr", "list",
		"--repo", REPO,
		"--state", "open",
		"--base", "main",
		"--draft=false",
		"--limit", "200",
		"--json", "number,headRefOid,headRefName,title,isDraft",
	]);
	return JSON.parse(json);
}

/** Resolve the PR set: a single PR (env PR_NUMBER, set on pull_request
 *  events) or every open non-draft PR (schedule / workflow_dispatch). */
function pickPRs() {
	if (process.env.PR_NUMBER) {
		const json = gh([
			"pr", "view", process.env.PR_NUMBER,
			"--repo", REPO,
			"--json", "number,headRefOid,headRefName,title,isDraft",
		]);
		const pr = JSON.parse(json);
		if (pr.isDraft) {
			console.log(`PR #${pr.number} is a draft — skipping.`);
			return [];
		}
		return [pr];
	}
	return listOpenPRs();
}

function hasMarkerComment(prNumber) {
	const json = gh([
		"api", `repos/${REPO}/issues/${prNumber}/comments`,
		"--paginate",
		"--jq", "[.[] | .body] | join(\"\\n---\\n\")",
	]);
	return json.includes(MARKER);
}

function postComment(prNumber, body) {
	gh(["pr", "comment", String(prNumber), "--repo", REPO, "--body", body]);
}

function commentBody(diffMarkdown) {
	return [
		MARKER,
		`### 👋 Heads-up: dev close is in effect`,
		``,
		`Thanks for the contribution! This repository is currently in **dev close** ahead of release \`${RELEASE}\` (scheduled **${RELEASE_DATE}**, UTC). See the [release schedule](https://github.com/UI5/webcomponents/issues/10568) for the full timeline.`,
		``,
		`This PR appears to introduce **public-API changes** (detected by diffing the Custom Elements Manifest against the latest published version on npm):`,
		``,
		diffMarkdown,
		``,
		`Could you please **hold off on merging into \`main\`** until the release ships? Public-API changes are best landed in the next dev cycle so they don't slip into the release at the last minute. Once the release is out, this PR is good to go.`,
		``,
		`If this change **must** ship in the current release, please request a review from one or two members of @UI5/ui5-team-webc so the team can sign off explicitly.`,
		``,
		`_Posted automatically by the [Dev Close Notice](../blob/main/.github/workflows/pr-dev-close-notice.yaml) workflow._`,
	].join("\n");
}

/** Build CEMs by checking out the PR head and running `yarn generate`.
 *  Caller is responsible for restoring the working tree afterwards. */
function buildHeadFor(headSha) {
	console.log(`  · checking out ${headSha.slice(0, 8)}`);
	git(["fetch", "origin", headSha, "--depth", "1"]);
	git(["checkout", headSha]);
	console.log(`  · yarn install --immutable`);
	sh("yarn install --immutable", { stdio: "inherit" });
	console.log(`  · yarn generate`);
	sh("yarn generate", { stdio: "inherit" });
}

/** Allowlist of Conventional Commit types whose PRs may introduce public-API
 *  changes. `feat` and `refactor` only — `fix` PRs in this repo overwhelmingly
 *  change implementation, not surface, so we skip them by default to keep the
 *  noise low. Anything else (ci/docs/test/chore/style/perf/build/revert) is
 *  also skipped. Matches optional scope `(...)` and the breaking-change `!`
 *  marker. Case-insensitive. */
const TITLE_RE = /^(feat|refactor)(\([^)]*\))?!?:/i;

/** Substrings that explicitly mean "this PR isn't merge-bound during dev
 *  close" — proof-of-concepts, drafts, work-in-progress markers. */
const TITLE_EXCLUDE_RE = /\b(PoC|WIP|DO NOT MERGE)\b|\[PoC\]|\[WIP\]/i;

function isInScope(pr) {
	const title = pr.title ?? "";
	if (TITLE_EXCLUDE_RE.test(title)) return false;
	return TITLE_RE.test(title);
}

async function processPR(pr, basesByPackage) {
	console.log(`\nPR #${pr.number} — ${pr.title}`);

	if (!isInScope(pr)) {
		console.log(`  · title isn't feat/refactor (or matches an exclude marker), skipping`);
		return;
	}

	if (hasMarkerComment(pr.number)) {
		console.log(`  · marker already present, skipping`);
		return;
	}

	try {
		buildHeadFor(pr.headRefOid);
	} catch (e) {
		console.error(`  · build failed: ${e.message} — skipping`);
		return;
	}

	const byPackage = {};
	for (const pkg of PACKAGES) {
		const head = readHeadCEM(pkg.dir);
		const base = basesByPackage.get(pkg.name);
		if (!head && !base) continue;
		const d = diffPackage(base, head);
		if (d) byPackage[pkg.name] = d;
	}

	if (!Object.keys(byPackage).length) {
		console.log(`  · no public-API changes`);
		return;
	}

	const md = renderDiff(byPackage);
	const body = commentBody(md);
	if (REPORT_MODE === "diff") {
		console.log(`  · would post (REPORT_ONLY=diff):`);
		console.log("\n" + body.split("\n").map(l => "    " + l).join("\n") + "\n");
	} else {
		postComment(pr.number, body);
		console.log(`  · posted dev-close notice`);
	}
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	console.log(`Dev close notice — release "${RELEASE}" (${RELEASE_DATE} UTC)${REPORT_MODE ? ` [REPORT_ONLY=${REPORT_MODE}]` : ""}`);

	// Report-only LIST mode: skip jsdelivr, skip builds, skip comments.
	// Just lists which PRs would be candidates for a CEM diff. The actual
	// comment count is an upper bound — real runs only comment when the
	// diff is non-empty, which this mode doesn't compute.
	if (REPORT_MODE === "list") {
		const prs = pickPRs();
		console.log(`\nReport-only (list) mode — no builds, no comments.\n`);
		const candidates = prs
			.filter(pr => isInScope(pr))
			.map(pr => ({ pr, hasMarker: hasMarkerComment(pr.number) }));

		console.log(`PR     | Marker | Title`);
		console.log(`-------+--------+-----------------------------`);
		for (const { pr, hasMarker } of candidates) {
			console.log(`#${String(pr.number).padEnd(5)} | ${hasMarker ? "yes   " : "no    "} | ${pr.title}`);
		}
		const wouldComment = candidates.filter(c => !c.hasMarker).length;
		console.log(`\nScanned: ${prs.length} open non-draft PR(s).`);
		console.log(`Allow-listed (feat/refactor, no PoC/WIP marker): ${candidates.length}.`);
		console.log(`Of those, ${wouldComment} would receive a comment IF a CEM diff found public-API changes.`);
		console.log(`\nDone.`);
		return;
	}

	console.log(`\nFetching base manifests from jsdelivr…`);
	const basesByPackage = new Map();
	for (const pkg of PACKAGES) {
		const m = await fetchPublishedCEM(pkg.name);
		if (m) {
			basesByPackage.set(pkg.name, m);
			console.log(`  · ${pkg.name}: ok`);
		}
	}

	const prs = pickPRs();
	const scope = process.env.PR_NUMBER ? `PR #${process.env.PR_NUMBER}` : "open non-draft PRs targeting main";
	console.log(`\nProcessing ${prs.length} ${scope}.`);

	// In REPORT_ONLY=diff with LIMIT, pre-filter to allow-listed candidates
	// and trim before doing any builds. (Production runs filter inside
	// processPR — the LIMIT trim there would be a no-op anyway.)
	let queue = prs;
	if (REPORT_MODE === "diff" && LIMIT > 0) {
		queue = prs.filter(isInScope).slice(0, LIMIT);
		console.log(`LIMIT=${LIMIT} → diffing ${queue.length} candidate(s) only.`);
	}

	// Remember where to come back so we leave the tree clean. If the working
	// tree is dirty (typical for local REPORT_ONLY runs while iterating on
	// this script), stash before we start checking out PRs and pop on exit.
	const startingRef = git(["rev-parse", "HEAD"]).trim();
	let stashed = false;
	try {
		const dirty = git(["status", "--porcelain"]).trim().length > 0;
		if (dirty) {
			git(["stash", "push", "--include-untracked", "-m", "pr-dev-close auto-stash"]);
			stashed = true;
			console.log(`(stashed dirty working tree; will pop on exit)`);
		}
	} catch { /* status failure shouldn't block the run */ }

	for (const pr of queue) {
		try {
			await processPR(pr, basesByPackage);
		} catch (e) {
			console.error(`PR #${pr.number}: unexpected error: ${e.message}`);
		}
	}

	try {
		git(["checkout", startingRef]);
	} catch { /* no-op */ }
	if (stashed) {
		try {
			git(["stash", "pop"]);
			console.log(`(popped stashed changes)`);
		} catch (e) {
			console.error(`Could not pop stash automatically: ${e.message}`);
			console.error(`Run \`git stash pop\` manually.`);
		}
	}

	console.log(`\nDone.`);
}

main().catch(e => {
	console.error(`Fatal: ${e.message}`);
	process.exit(0); // soft-fail
});
