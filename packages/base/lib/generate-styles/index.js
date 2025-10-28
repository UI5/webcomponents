import fs from 'fs/promises';
import path from "path";
import CleanCSS from "clean-css";
import { pathToFileURL } from "url";

const generate = async () => {
	await fs.mkdir("src/generated/css/", { recursive: true });

	const files = (await fs.readdir("src/css/")).filter(file => file.endsWith(".css"));
	const filesPromises = files.map(async file => {
		let content = await fs.readFile(path.join("src/css/", file));
		const res = new CleanCSS().minify(`${content}`);
		content = `export default \`${res.styles}\`;`;
		return fs.writeFile(path.join("src/generated/css/", `${file}.ts`), content);
	});

	return Promise.all(filesPromises)
		.then(() => {
			console.log("Styles files generated.");
		});
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(windowsPath).href;

if (import.meta.url === fileUrl) {
	generate()
}

export default {
	_ui5mainFn: generate
}