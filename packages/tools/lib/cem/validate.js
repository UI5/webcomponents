const fs = require('fs');
const Ajv = require('ajv');
const path = require('path');
// Load your JSON schema
const extenalSchema = require('./schema.json');
const internalSchema = require('./schema-internal.json');


const validateFn = async () => {
	// Load your JSON data from the input file
	const inputFilePath = path.join(process.cwd(), "dist/custom-elements.json"); // Update with your file path
	const customManifest = fs.readFileSync(inputFilePath, 'utf8');
	const inputDataInternal = JSON.parse(customManifest);
	const devMode = process.env.UI5_CEM_MODE === "dev";

	inputDataInternal.modules.forEach(moduleDoc => {
		moduleDoc.exports = moduleDoc.exports.
			filter(e => moduleDoc.declarations.find(d => d.name === e.declaration.name && ["class", "function", "variable", "enum"].includes(d.kind)) || e.name === "default");
	})

	inputDataInternal.modules = inputDataInternal.modules.filter(moduleDoc => moduleDoc.declarations.length > 0).filter(moduleDoc => moduleDoc.exports.length > 0);

	const clearProps = (data) => {
		if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++) {
				if (typeof data[i] === "object") {
					if (["enum", "interface"].includes(data[i].kind)) {
						data.splice(i, 1);
						i--;
					} else {
						clearProps(data[i]);
					}
				}
			}
		} else if (typeof data === "object") {
			Object.keys(data).forEach(prop => {
				if (prop.startsWith("_ui5")) {
					delete data[prop];
				} else if (typeof data[prop] === "object") {
					clearProps(data[prop]);
				}
			});
		}

		return data;
	}

	const ajv = new Ajv({ allowUnionTypes: true, allError: true })
	let validate = ajv.compile(internalSchema)

	// Validate the JSON data against the schema
	if (devMode) {
		if (validate(inputDataInternal)) {
			console.log('Internal custom  element manifest is validated successfully');
		} else {
			console.log(validate.errors)
			throw new Error(`Validation of internal custom elements manifest failed: ${validate.errors}`);
		}
	}

	const inputDataExternal = clearProps(JSON.parse(JSON.stringify(inputDataInternal)));
	validate = ajv.compile(extenalSchema)

	// Validate the JSON data against the schema
	if (validate(inputDataExternal)) {
		console.log('Custom element manifest is validated successfully');
		fs.writeFileSync(inputFilePath, JSON.stringify(inputDataExternal, null, 2), 'utf8');
		fs.writeFileSync(inputFilePath.replace("custom-elements", "custom-elements-internal"), JSON.stringify(inputDataInternal, null, 2), 'utf8');
	} else if (devMode) {
		throw new Error(`Validation of public custom elements manifest failed: ${validate.errors}`);
	}
}

if (require.main === module) {
	validateFn()
}

exports._ui5mainFn = validateFn;