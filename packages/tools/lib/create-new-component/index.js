const fs = require("fs");
const prompts = require("prompts");
const Component = require("./Component.js");
const ComponentTemplate= require("./ComponentTemplate.js");
const dotenv = require('dotenv');
dotenv.config();

/**
 * Hyphanates the given PascalCase string and adds prefix, f.e.:
 * Foo -> "my-foo"
 * FooBar -> "my-foo-bar"
 */
const hyphaneteComponentName = (componentName) => {
	const result = componentName.replace(/([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

	return `${process.env.UI5_TAG_NAME_PREFIX ?? "my"}-${result}`;
};

/**
 * Capitalizes first letter of string.
 */
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Validates component name, enforcing PascalCase pattern - Button, MyButton.
 */
const PascalCasePattern = /^[A-Z][A-Za-z0-9]+$/;
const isNameValid = name => typeof name === "string" && PascalCasePattern.test(name);

const getPackageName = () => {
	if (!fs.existsSync("./package.json")) {
		throw("The current directory doesn't contain package.json file.");
	}

	const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

	if (!packageJSON.name) {
		throw("The package.json file in the current directory doesn't have a name property");
	}

	return packageJSON.name;
};

const getLibraryName = packageName => {
	if (!packageName.includes("/")) {
		return packageName;
	}

	if (packageName === "@ui5/webcomponents") {
		return `main`;
	}

	packageName = packageName.split("/").pop();

	if (!packageName.startsWith("webcomponents-")) {
		return packageName;
	}

	return packageName.substr("webcomponents-".length);
};

const generateFiles = (componentName, tagName, library, packageName) => {
	componentName = capitalizeFirstLetter(componentName);
	const filePaths = {
		"main": `./src/${componentName}.ts`,
		"css": `./src/themes/${componentName}.css`,
		"template": `./src/${componentName}${process.env.UI5_TEMPLATE_FILENAME_SUFFIX ?? "Template"}.tsx`,
	};

	fs.writeFileSync(filePaths.main, Component(componentName, tagName, library, packageName), { flag: "wx+" });
	fs.writeFileSync(filePaths.css, "", { flag: "wx+" });
	fs.writeFileSync(filePaths.template, ComponentTemplate(componentName), { flag: "wx+" });

	console.log(`Successfully generated ${filePaths.main}`);
	console.log(`Successfully generated ${filePaths.css}`);
	console.log(`Successfully generated ${filePaths.template}`);

	// Change the color of the output
	console.warn('\x1b[33m%s\x1b[0m', `
Now, import the component in "src/bundle.esm.ts" via: import "./${componentName}.js";
And, add it to your HTML: <${tagName}></${tagName}>.`);
}

// Main function
const createWebComponent = async () => {
	const packageName = getPackageName();
	const library = getLibraryName(packageName);

	const consoleArguments = process.argv.slice(2);
	let componentName = consoleArguments[0];

	if (componentName && !isNameValid(componentName)) {
		throw new Error(`${componentName} is invalid component name. Use only letters (at least two) and start with capital one:  Button, MyButton, etc.`);
	}

	if (!componentName) {
		const response = await prompts({
			type: "text",
			name: "componentName",
			message: "Please enter a component name:",
			validate: (value) => isNameValid(value) ? true : "Component name should follow PascalCase naming convention (f.e. Button, MyButton, etc.).",
		});
		componentName = response.componentName;

		if (!componentName) {
			process.exit();
		}
	}

	const tagName = hyphaneteComponentName(componentName);

	generateFiles(componentName, tagName, library, packageName);
};

createWebComponent();