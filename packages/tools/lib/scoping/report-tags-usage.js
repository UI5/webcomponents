const fs = require("fs");
const { globSync } = require("glob");
const path = require("path");
const process = require("process");

// gather all tags from all files
const tags = new Set();
const files = globSync(path.join(process.argv[2], "src/**/*.js"));
files.forEach(file => {
	const content = `${fs.readFileSync(file)}`;
	const matches = content.match(/tag: "(.*?)",/);
	if (matches) {
		tags.add(matches[1]);
	}
});

// report all usages of any tag within any file, which is not the tag definition and is not hasAttribute
files.forEach(file => {
	const content = `${fs.readFileSync(file)}`;
	const lines = content.split("\n");
	lines.forEach(line => {
		tags.forEach(tag => {
			if (line.includes(`"${tag}"`) && !line.includes(`tag: "${tag}",`) && !line.includes(`hasAttribute("${tag}")`)) {
				console.log(`${file}: ${line.trim()}`);
			}
		});
	});
});
