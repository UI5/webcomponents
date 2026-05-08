import fs from "fs";
import glob from "glob";
import path from "path";

const projectPath = process.argv[2];

// gather all tags from all files
const tagsToFiles = new Map();
const filesToTags = new Map();

let files = [
	...glob.sync(path.join("packages/main/src/**/*.js")),
	...glob.sync(path.join("packages/fiori/src/**/*.js")),
];
files.forEach(file => {
	let matches = file.match(/([a-zA-Z0-9_]+)\.js$/);
	const name = matches[1];

	const content = `${fs.readFileSync(file)}`;
	matches = content.match(/tag: "(.*?)",/);
	if (matches) {
		const tag = matches[1];
		tagsToFiles.set(tag, name);
		filesToTags.set(name, tag);
	}
});

// Process the package
files = glob.sync(path.join(projectPath, "src/**/*.js"));
tagsToFiles.forEach((file, tag) => {
	const sourcePath = path.join(projectPath, "src/", `${file}.js`);
	if (!fs.existsSync(sourcePath)) {
		return;
	}
	const sourceContent = `${fs.readFileSync(sourcePath)}`.split("\n").join(" ");

	const hbsPath = path.join(projectPath, "src/", `${file}.hbs`);
	const hbsContent = fs.existsSync(hbsPath) ? `${fs.readFileSync(hbsPath)}` : "";

	const hbsPopoverPath = path.join(projectPath, "src/", `${file}Popover.hbs`);
	const hbsPopoverContent = fs.existsSync(hbsPopoverPath) ? `${fs.readFileSync(hbsPopoverPath)}` : "";

	// deps
	let deps = [];
	let matches = sourceContent.match(/static get dependencies\(\) \{\s+return \[(.*?)\]/);
	if (matches) {
		deps = matches[1].split(",").map(x => x.trim()).filter(x => !!x);
	}

	// tags
	matches = [
		...hbsContent.matchAll(/<ui5-[a-z0-9-]+/g),
		...hbsPopoverContent.matchAll(/<ui5-[a-z0-9-]+/g),
	];
	if (matches) {
		matches.forEach(match => {
			const tagUsed = match[0].substr(1);
			const dep = tagsToFiles.get(tagUsed);
			if (!deps.includes(dep)) {
				console.log(`${file} used ${tagUsed}`);
			}
		});
	}
});
