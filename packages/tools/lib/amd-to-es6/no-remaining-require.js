import fs from "fs/promises";
import path from "path";
import { globby } from "globby";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const basePath = process.argv[2];
const babelCore = require("@babel/core");
const babelParser = require("@babel/parser");
const babelGenerator = require("@babel/generator").default;
const walk = require("estree-walk");

const checkHasRequire = (filePath, code) => {
	code = code.replace(/sap\.ui\.require/g, "unhandledRequire");

	const tree = babelParser.parse(code, { sourceType: "module" });
	walk(tree, {
		CallExpression: function (node) {
            if (node.type === "CallExpression" && node?.callee?.name === "unhandledRequire") {
                throw new Error(`sap.ui.require found in ${filePath}`);
            }
    	}
    });
}

const checkFile = async (filePath) => {
	let code = (await fs.readFile(filePath)).toString();
	checkHasRequire(filePath, code);
}

const checkAll = async () => {
	const fileNames = await globby(basePath.replace(/\\/g, "/") + "**/*.js");
	return Promise.all(fileNames.map(checkFile).filter(x => !!x));
};

checkAll();
