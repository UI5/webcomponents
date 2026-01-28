// @ts-expect-error
import { readFileSync, readdirSync, statSync } from "fs";
// @ts-expect-error
import * as path from "path";
// @ts-expect-error
import { fileURLToPath } from 'node:url';

// @ts-expect-error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgTask = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
	on('task', {
		'findAndValidateSvgFiles': () => {
			return findAndValidateSvgFiles();
		}
	});
	return config;
}

const findAndValidateSvgFiles = () => {
	const illustrationsDir = path.join(__dirname, '../../../fiori/src/illustrations');
	const illustrationsV5Dir = path.join(__dirname, '../../../fiori/src/illustrations-v5');

	const svgFilesSet1 = findSvgFiles(illustrationsDir);
	const svgFilesSet2 = findSvgFiles(illustrationsV5Dir);

	const results = [...svgFilesSet1, ...svgFilesSet2].map(filePath => {
		const content = readFileSync(filePath, 'utf8')
		const hasStyleAttribute = /\sstyle\s*=/gi.test(content)
		const hasStyleTag = /<style[\s>]/gi.test(content)

		return {
			file: filePath,
			isValid: !hasStyleAttribute && !hasStyleTag,
		}
	})

	return results;
}

function findSvgFiles(dir: string): string[] {
	let results: string[] = []
	const files = readdirSync(dir)

	for (const file of files) {
		const fullPath = path.join(dir, file)
		const stat = statSync(fullPath)

		if (stat.isDirectory()) {
			results = results.concat(findSvgFiles(fullPath))
		} else if (file.endsWith('.svg')) {
			results.push(fullPath)
		}
	}

	return results;
}

export default svgTask;