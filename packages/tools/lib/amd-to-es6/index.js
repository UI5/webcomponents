const fs = require("fs").promises;
const path = require("path");
const basePath = process.argv[2];
const babelCore = require("@babel/core");
const babelParser = require("@babel/parser");
const babelGenerator = require("@babel/generator").default;
const replaceAsync = require('replace-in-file');

const convertSAPUIDefineToDefine = async (filePath) => {
	return replaceAsync({
		files: filePath,
		processor: (input) => {
			return input.replace("sap.ui.define", "define").replace(", /* bExport= */ false", "").replace(", /* bExport= */ true", "");
		}
	})
}

const convertAmdToEs6 = async (code) => {
	return (await babelCore.transformAsync(code, {
		plugins: [['babel-plugin-amd-to-esm', {}]]
	})).code;
}

const convertAbsImportsToRelative = (filePath, code) => {
	let changed = false;
	// console.log("File processing started: ", srcPath);

	if (code.includes("import(")) {
		// esprima can't parse this, but it's from the project files
		return;
	}

	const tree = babelParser.parse(code, { sourceType: "module" });
	const importer = filePath.replace(basePath, "");
	const importerDir = path.dirname(importer);
	// console.log("Importer -> ", importer);

	tree?.program?.body?.forEach(node => {
		if (node.type === "ImportDeclaration") {
			let importee = node.source.value;
			// console.log(importee);
			if (importee.startsWith(".")) {
				// add .js extension if missing
				if (!importee.endsWith(".js")) {
					node.source.value += ".js"
					changed = true;
				}
				return;
			}
			let importeeDir = path.dirname(importee);
			let importeeFile = path.basename(importee);
			let relativePath = path.relative(importerDir, importeeDir);
			if (relativePath.length === 0) {
				relativePath = "."
			}
			if (!relativePath.startsWith(".")) {
				relativePath = "./" + relativePath;
			}

			relativePath = relativePath.replace(/\\/g, "/"); // the browser expects unix paths
			let relativeImport = `${relativePath}/${importeeFile}.js`;
			// console.log(importee + " --> " + relativeImport);
			node.source.value = relativeImport;
			changed = true;
		}
	});

	return changed ? babelGenerator(tree).code : code;
}

const replaceGlobalCoreUsage = (filePath, code) => {
	if (!filePath.includes("Configuration"))  {
		const replaced = code.replace(/sap\.ui\.getCore\(\)/g, `Core`);
		return code !== replaced ? `import Core from 'sap/ui/core/Core';${replaced}` : code;
	}

	return code;
};

const transformAmdToES6Module = async (filePath) => {
	await convertSAPUIDefineToDefine(filePath);

	let code = (await fs.readFile(filePath)).toString();

	code = await convertAmdToEs6(code);

	code = replaceGlobalCoreUsage(filePath, code);

	code = convertAbsImportsToRelative(filePath, code);

	return fs.writeFile(filePath, code);
}

const transformAmdToES6Modules = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(basePath.replace(/\\/g, "/") + "**/*.js");
	return Promise.all(fileNames.map(transformAmdToES6Module).filter(x => !!x));
};

transformAmdToES6Modules().then(() => {
	console.log("Success: all amd modules are transformed to es6!");
});