import fs from "fs/promises";
import path from "path";
import beautify from "json-beautify";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vars = new Set();

const processFile = async file => {
	const content = await fs.readFile(file);
	const matches = `${content}`.match(/var\(--sap[\-_A-Za-z0-9]+\)/g);
	matches && matches.forEach(match => {
		const cssVar = match.match(/--sap[\-_A-Za-z0-9]+/)[0];
		vars.add(cssVar);
	});
};

const generate = async () => {
	const { globby } = await import("globby");

	const mainFiles = await globby(path.join(__dirname, "../../../main/src/themes/**/*.css").replace(/\\/g, "/"));
	const fioriFiles = await globby(path.join(__dirname, "../../../fiori/src/themes/**/*.css").replace(/\\/g, "/"));
	const compatFiles = await globby(path.join(__dirname, "../../../compat/src/themes/**/*.css").replace(/\\/g, "/"));
	const aiFiles = await globby(path.join(__dirname, "../../../ai/src/themes/**/*.css").replace(/\\/g, "/"));

	await Promise.all([...mainFiles.map(processFile), ...fioriFiles.map(processFile), ...compatFiles.map(processFile), ...aiFiles.map(processFile)]);

	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	const result = Array.from(vars).sort(collator.compare); // natural sort

	return fs.writeFile(path.join(__dirname, "../../css-vars-usage.json"), beautify(result, null, 2, 100));
}

generate().then(() => {
	console.log("CSS Vars usage report generated.");
});
