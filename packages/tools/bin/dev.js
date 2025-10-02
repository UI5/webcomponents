#!/usr/bin/env node

const child_process = require("child_process");

let command = process.argv[2];
const argument = process.argv[3];

if (command === "watch") {
	if (["src", "test", "bundles", "styles", "templates", "samples"].includes(argument)) {
		command = `watch.${argument}`;
	}
} else if (command === "test") {
	command = `test ${process.argv.slice(3).join(" ")}`;
}

child_process.execSync(`npx nps "${command}"`, {stdio: 'inherit'});
