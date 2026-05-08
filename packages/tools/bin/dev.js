#!/usr/bin/env node

import child_process from "child_process";
import list from "postcss/lib/list";

const { comma } = list;

// Check for verbose flag
const hasVerbose = process.argv.includes("--verbose") || process.argv.includes("-v");
const args = process.argv.slice(2).filter(arg => arg !== "--verbose" && arg !== "-v");

let command = args[0];
const argument = args[1];

if (command === "watch") {
	if (["src", "test", "bundles", "styles", "templates", "samples"].includes(argument)) {
		command = `watch.${argument}`;
	}
} else if (command === "test") {
	command = ["test", ...args.slice(1)].join(" ");
}

const verboseFlag = hasVerbose ? " --verbose" : "";
child_process.execSync(`ui5nps${verboseFlag} "${command}"`, {stdio: 'inherit'});
