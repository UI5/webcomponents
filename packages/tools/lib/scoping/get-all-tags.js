import fs from "fs";
import path from "path";
import glob from "glob";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const getTag = file => {
	const fileContent = String(fs.readFileSync(file)).replace(/\n/g, "");
	let matches = fileContent.match(/\btag\b:\s*\"(.*?)\"/);
	if (matches) {
		return matches[1];
	}
	matches = fileContent.match(/@customElement\("(.*?)"\)/);
	if (matches) {
		return matches[1];
	}
	return undefined;
};

const getPackageTags = (packageDir) => {
	const srcDir = path.join(packageDir, "src/");
	return glob.sync(path.join(srcDir, "/**/*.ts")).flatMap(file => {
		const tag = getTag(file);
		return [tag];
	}).filter(item => !!item);
};

const isComponentsPackage = (packageFileContent) => {
	return packageFileContent.ui5 && packageFileContent.ui5.webComponentsPackage;
};

const getDepComponentPackages = packageDir => {
	const packageFile = path.join(packageDir, "package.json");
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	if (!isComponentsPackage(packageFileContent)) {
		return [];
	}

	return Object.keys(packageFileContent.dependencies || {}).map(dep => path.dirname(require.resolve(path.join(dep, "package.json"))));
};

const getAllTags = (packageDir) => {
	return getPackageTags(packageDir).concat(getDepComponentPackages(packageDir).flatMap(getPackageTags));
};

export default getAllTags;
