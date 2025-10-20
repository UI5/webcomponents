import fs from 'fs/promises';
import path from "path";
import CleanCSS from "clean-css";
import { processComponentPackageFile } from '@ui5/webcomponents-tools/lib/css-processors/css-processor-themes.mjs';


const generate = async () => {
	const packageJSON = JSON.parse(await fs.readFile("./package.json"))
	await fs.mkdir("src/generated/css/", { recursive: true });

	const files = (await fs.readdir("src/css/")).filter(file => file.endsWith(".css"));
	const filesPromises = files.map(async file => {
		const filePath = path.join("src/css/", file);
		let content = await fs.readFile(filePath);
		const res = new CleanCSS().minify(`${content}`);

		// Scope used variables
		content = await processComponentPackageFile({ text: res.styles, path: filePath }, packageJSON);

		content = `export default \`${content}\`;`;

		return fs.writeFile(path.join("src/generated/css/", `${file}.ts`), content);
	});

	return Promise.all(filesPromises)
		.then(() => {
			console.log("Styles files generated.");
		});
};

if (import.meta.url === `file://${process.argv[1]}`) {
	generate()
}

export default {
	_ui5mainFn: generate
}