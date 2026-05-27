#!/usr/bin/env node
import fs from "fs/promises";
import path, { dirname } from "path";
import prompts from "prompts";
import parser from "npm-config-user-agent-parser";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { fileURLToPath } from "url";
import * as prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VERSION = JSON.parse(
	await fs.readFile(path.join(__dirname, "package.json")),
).version;

const argv = yargs(hideBin(process.argv))
	.usage("Usage: npm create @ui5/webcomponents-package [options]")
	.option("name", {
		type: "string",
		description: "Package name (npm-compatible)",
		default: "my-package",
	})
	.option("tag", {
		type: "string",
		description: "Component tag name (e.g., my-button)",
	})
	.option("testSetup", {
		type: "string",
		choices: ["cypress", "manual"],
		description: "Test setup configuration",
		default: "manual",
	})
	.option("skip", {
		type: "boolean",
		description: "Skip interactive prompts and use defaults/provided values",
		default: false,
	})
	.option("skipSubfolder", {
		type: "boolean",
		description: "Create files in current directory instead of a subfolder",
		default: false,
	})
	.example(
		"npm create @ui5/webcomponents-package",
		"Interactive mode with prompts",
	)
	.example(
		"npm create @ui5/webcomponents-package -- --name my-components --skip",
		"Non-interactive with custom name",
	)
	.example(
		"npm create @ui5/webcomponents-package -- --name @scope/my-lib --testSetup cypress --skip",
		"Non-interactive with scoped name and Cypress",
	)
	.help()
	.alias("h", "help")
	.version(VERSION)
	.alias("v", "version")
	.wrap(100).argv;

// Constants
const SUPPORTED_TEST_SETUPS = ["cypress", "manual"];
const SRC_DIR = path.join(__dirname, "template");
const DEST_DIR = process.cwd();

const FILES_TO_RENAME = {
	[path.normalize("eslintignore")]: path.normalize(".eslintignore"),
	[path.normalize("eslintrc.cjs")]: path.normalize(".eslintrc.cjs"),
	[path.normalize("gitignore")]: path.normalize(".gitignore"),
	[path.normalize("npmignore")]: path.normalize(".npmignore"),
	[path.normalize("npsrc.json")]: path.normalize(".npsrc.json"),
	[path.normalize("npmrc")]: path.normalize(".npmrc"),
	[path.normalize("env")]: path.normalize(".env"),
	[path.normalize("tsconfig.template.json")]: path.normalize("tsconfig.json"),
	[path.normalize("cypress/tsconfig.template.json")]: path.normalize("cypress/tsconfig.json")
};
const FILES_TO_COPY = ["test/pages/img/logo.png"];

// Validation Patterns
const PackageNamePattern =
	/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const TagPattern = /^[a-z0-9]+?-[a-zA-Z0-9\-_]+?[a-z0-9]$/;

// Utility Functions
const isPackageNameValid = name =>
	typeof name === "string" && PackageNamePattern.test(name);
const isTagValid = tag => typeof tag === "string" && TagPattern.test(tag);
const isTestSetupValid = setup =>
	typeof setup === "string" && SUPPORTED_TEST_SETUPS.includes(setup);

async function collectFiles(dir, fileList = []) {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await collectFiles(fullPath, fileList);
		} else if (entry.isFile()) {
			fileList.push(fullPath);
		}
	}

	return fileList;
}

/**
 * Hyphanates the given PascalCase string, f.e.:
 * Foo -> "my-foo" (adds preffix)
 * FooBar -> "foo-bar"
 */
const hyphenateComponentName = componentName => {
	const result = componentName
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.toLowerCase();
	return result.includes("-") ? result : `my-${result}`;
};

const replacePlaceholders = (content, replacements) =>
	content.replace(/{{(.*?)}}/g, (_, key) => replacements[key.trim()] || "");

const generateFilesContent = async (
	packageName,
	componentName,
	skipSubfolder,
	testSetup,
) => {
	// All variables that will be replaced in the content of the template folder/
	const vars = {
		INIT_PACKAGE_VAR_NAME: packageName,
		INIT_PACKAGE_VERSION: VERSION,
		INIT_PACKAGE_VAR_TAG: argv.tag || hyphenateComponentName(componentName),
		INIT_PACKAGE_VAR_CLASS_NAME: componentName,
		INIT_PACKAGE_CYPRESS_ROOT_TSCONFIG:
			testSetup === "cypress"
				? `"tsBuildInfoFile": "dist/.tsbuildinfo",\n"rootDir": "src",\n"composite": true,`
				: "",
		INIT_PACKAGE_CYPRESS_DEV_DEPS:
			testSetup === "cypress"
				? `"@ui5/cypress-ct-ui5-webc": "^0.0.4",\n"cypress": "^13.11.0",`
				: "",
		INIT_PACKAGE_CYPRESS_TEST_COMMANDS:
			testSetup === "cypress"
				? `"test": "cypress run --component --browser chrome",\n"test:open": "cypress open --component --browser chrome",`
				: "",
		INIT_PACKAGE_CYPRESS_ESLINT_IGNORES:
			testSetup === "cypress" ? `cypress/*\ncypress.config.*` : "",
	};

	const packageBaseName = packageName.includes("@")
		? packageName.slice(packageName.lastIndexOf("/") + 1)
		: packageName;
	const destDir = skipSubfolder
		? path.join(DEST_DIR)
		: path.join(DEST_DIR, packageBaseName);

	await processFiles(destDir, vars, testSetup);

	console.log("\nPackage successfully created!\nNext steps:\n");
	console.log(`$ cd ${packageBaseName}`);

	try {
		const userAgent = parser(process.env.npm_config_user_agent);
		userAgent.yarn
			? console.log(`$ yarn\n$ yarn start`)
			: console.log(`$ npm i\n$ npm start`);
	} catch {
		console.log(`$ npm i\n$ npm start`);
	}

	console.log("\n");
};

async function processFiles(destDir, replacements, testSetup) {
	const files = await collectFiles(SRC_DIR);
	const FILE_PATHS_TO_SKIP = [
		testSetup !== "cypress" ? path.normalize("cypress") : undefined,
	].filter(Boolean);

	for (const file of files) {
		const relativePath = path.relative(SRC_DIR, file);
		let destPath = path.join(destDir, relativePath);

		if (FILE_PATHS_TO_SKIP.some(filePath => file.includes(filePath))) {
			// console.log(`Skipped: ${file} -> ${destPath}`);
			continue;
		}

		// // Component related file based on the user input
		// destPath = destPath.replace(
		// 	"MyFirstComponent",
		// 	replacements.INIT_PACKAGE_VAR_CLASS_NAME,
		// );

		// Files that need to be renamed
		if (FILES_TO_RENAME[relativePath]) {
			destPath = destPath.replace(
				relativePath,
				FILES_TO_RENAME[relativePath],
			);
		}

		await fs.mkdir(path.dirname(destPath), { recursive: true });

		if (FILES_TO_COPY.includes(relativePath)) {
			// Image like files that doesn't need proccessing
			await fs.copyFile(file, destPath);
		} else {
			const content = await fs.readFile(file, { encoding: "utf8" });
			const replaced = replacePlaceholders(content, replacements);
			let formatted;
			try {
				formatted = await prettier.format(replaced, {
					useTabs: true,
					tabWidth: 4,
					quoteProps: "consistent",
					arrowParens: "avoid",
					filepath: file,
				});
				// console.log(`Formatted: ${file} -> ${destPath}`);
			} catch {
				// console.log(`Not formatted: ${file} -> ${destPath}`);
				formatted = replaced;
			}

			await fs.writeFile(destPath, formatted);
		}

		// console.log(`Processed: ${file} -> ${destPath}`);
	}
}

const createWebcomponentsPackage = async () => {
	let response;
	if (argv.name && !isPackageNameValid(argv.name)) {
		throw new Error(
			"The package name should be a string, starting with letter and containing the following symbols [a-z, A-Z, 0-9].",
		);
	}

	if (argv.testSetup && !isTestSetupValid(argv.testSetup)) {
		throw new Error(
			`The test setup should be a string and one of the following options: ${SUPPORTED_TEST_SETUPS.join(", ")}`,
		);
	}

	let packageName = argv.name || "my-package";
	let componentName = "MyFirstComponent";
	let testSetup = argv.testSetup || "manual";
	const skipSubfolder = !!argv.skipSubfolder;

	if (argv.skip) {
		return generateFilesContent(
			packageName,
			componentName,
			skipSubfolder,
			testSetup,
		);
	}

	if (!argv.name) {
		response = await prompts({
			type: "text",
			name: "name",
			message: "Package name:",
			validate: value =>
				isPackageNameValid(value)
					? true
					: "Package name should be a string, starting with a letter and containing the following symbols [a-z, A-Z ,0-9, _, -].",
		});
		packageName = response.name;
	}

	if (!argv.testSetup) {
		response = await prompts({
			type: "select",
			name: "testSetup",
			message: "How would you like to set up testing?",
			choices: [
				{ title: "Cypress", value: "cypress" },
				{ title: "I'll set it up manually", value: "manual" },
			],
			initial: 0,
		});

		testSetup = response.testSetup;
	}

	return generateFilesContent(
		packageName,
		componentName,
		skipSubfolder,
		testSetup,
	);
};

createWebcomponentsPackage();
