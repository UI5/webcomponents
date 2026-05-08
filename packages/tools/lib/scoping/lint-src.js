import fs from "fs";
import path from "path";
import glob from "glob";
import getAllTags from "./get-all-tags.js";

const tags = getAllTags(process.cwd());

const errors = [];

const removeComments = str => str.replaceAll(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");

glob.sync(path.join(process.cwd(), "src/**/*.css")).forEach(file => {
	let content = removeComments(String(fs.readFileSync(file)));
	tags.forEach(tag => {
		if (content.match(new RegExp(`(^|[^\.\-_A-Za-z0-9"\[])(${tag})([^\-_A-Za-z0-9]|$)`, "g"))) {
			errors.push(`${tag} found in ${file}`);
		}
	});
});

glob.sync(path.join(process.cwd(), "src/**/*.ts")).forEach(file => {
	let content = removeComments(String(fs.readFileSync(file)));
	tags.forEach(tag => {
		if (content.match(new RegExp(`querySelector[A-Za-z]*..${tag}`, "g"))) {
			errors.push(`querySelector for ${tag} found in ${file}`);
		}
	});
});

if (errors.length) {
	throw new Error(`Scoping-related errors found (f.e. used ui5-input instead of [ui5-input]): \n ${errors.join("\n")}`);
}
