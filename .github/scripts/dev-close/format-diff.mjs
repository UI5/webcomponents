#!/usr/bin/env node
/**
 * Format a CEM diff result (from diff-cem.mjs) into a Markdown bullet list
 * suitable for embedding in a GitHub PR comment.
 *
 * Reads JSON from stdin, prints Markdown to stdout. Empty diff → empty output.
 */

import { readFileSync } from "node:fs";

const input = readFileSync(0, "utf8");
let diff;
try {
	diff = JSON.parse(input);
} catch (e) {
	console.error(`Invalid JSON on stdin: ${e.message}`);
	process.exit(2);
}

if (!diff?.hasChanges) {
	process.exit(0);
}

const lines = [];
const KIND_LABEL = {
	declaration: "element",
	members: "member",
	events: "event",
	slots: "slot",
	cssProperties: "CSS property",
	cssParts: "CSS part",
	attributes: "attribute",
};

const packages = Object.keys(diff.byPackage).sort();
for (const pkg of packages) {
	const { added, removed, changed } = diff.byPackage[pkg];
	lines.push(`**\`${pkg}\`**`);
	for (const entry of added) {
		lines.push(`- ➕ added ${KIND_LABEL[entry.kind] ?? entry.kind}: \`${entry.name}\``);
	}
	for (const entry of removed) {
		lines.push(`- ➖ removed ${KIND_LABEL[entry.kind] ?? entry.kind}: \`${entry.name}\``);
	}
	for (const entry of changed) {
		lines.push(`- 🔄 changed ${KIND_LABEL[entry.kind] ?? entry.kind} \`${entry.name}\` (${entry.fields.join(", ")})`);
	}
	lines.push("");
}

console.log(lines.join("\n").trimEnd());
