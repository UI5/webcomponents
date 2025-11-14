import { getDeclaration, getManifest, getPackageJSON } from "./utils.mjs";
import { pathToFileURL, fileURLToPath } from "url";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * Types of properties that can be inherited from parent classes
 */
const INHERITABLE_TYPES = ['slots', 'cssParts', 'cssProperties', 'attributes', 'members', 'events', 'cssStates'];

/**
 * Base class name that should not pass down its properties
 */
const BASE_CLASS_NAME = "UI5Element";

/**
 * Cache to avoid resolving the same declaration multiple times
 */
const declarationCache = new Map();

/**
 * Parses command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object} Parsed arguments object
 */
function parseArguments(args) {
	const options = {
		internal: false
	};

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--internal") {
			options.internal = true;
		}
	}

	return options;
}

/**
 * Gets the appropriate manifest file name based on internal flag
 * @param {boolean} internal - Whether to use internal manifest
 * @returns {string} Manifest file name
 */
function getManifestFileName(internal) {
	return internal ? "custom-elements-internal.json" : "custom-elements.json";
}

/**
 * Creates inheritance metadata for a property
 * @param {Object} superclass - The superclass information
 * @returns {Object} Inheritance metadata
 */
function createInheritanceMetadata(superclass) {
	return {
		package: superclass.package,
		module: superclass.module,
		name: superclass.name
	};
}

/**
 * Merges properties from superclass into current class
 * @param {Object} klass - Current class declaration
 * @param {Object} superklass - Superclass declaration
 * @param {Object} superclassInfo - Superclass metadata
 */
function mergeInheritedProperties(klass, superklass, superclassInfo) {
	if (superklass.name === BASE_CLASS_NAME) {
		return;
	}

	INHERITABLE_TYPES.forEach(type => {
		const superProperties = superklass[type];
		if (!superProperties?.length) {
			return;
		}

		const klassProperties = klass[type] || [];
		const updatedProperties = [...klassProperties];

		superProperties.forEach(superItem => {
			const superclassItem = { ...superItem };
			const existingItemIndex = klassProperties.findIndex(item => item.name === superclassItem.name);

			if (existingItemIndex !== -1) {
				// Override existing property while preserving superclass data
				updatedProperties[existingItemIndex] = {
					...superclassItem,
					...klassProperties[existingItemIndex],
				};
			} else {
				// Add inherited property with metadata
				superclassItem.inheritedFrom = createInheritanceMetadata(superclassInfo);
				updatedProperties.push(superclassItem);
			}
		});

		klass[type] = updatedProperties;
	});
}

/**
 * Resolves a class declaration by merging inherited properties from its superclass
 * @param {Object} declaration - The class declaration to resolve
 * @param {Object} options - Additional options (for future extensibility)
 * @returns {Promise<Object|null>} Resolved declaration or null
 */
async function resolveDeclaration(declaration, options = {}) {
	if (!declaration) {
		return null;
	}

	// Only process class declarations with superclasses
	if (declaration.kind !== "class" || !declaration.superclass) {
		return declaration;
	}

	// Create cache key for this declaration
	const cacheKey = `${declaration.superclass.package}:${declaration.superclass.module}:${declaration.superclass.name}`;

	let superklass;
	if (declarationCache.has(cacheKey)) {
		superklass = declarationCache.get(cacheKey);
	} else {
		try {
			const superDeclaration = await getDeclaration(
				declaration.superclass.package,
				declaration.superclass.module,
				declaration.superclass.name
			);

			superklass = await resolveDeclaration(superDeclaration);
			declarationCache.set(cacheKey, superklass);
		} catch (error) {
			console.warn(`Failed to resolve superclass ${declaration.superclass.name} from ${declaration.superclass.module} in package ${declaration.superclass.package}: ${error.message}`);
			return declaration;
		}
	}

	if (!superklass) {
		console.warn(`Could not resolve superclass ${declaration.superclass.name} from ${declaration.superclass.module} in package ${declaration.superclass.package}`);
		return declaration;
	}

	// Merge inherited properties
	mergeInheritedProperties(declaration, superklass, declaration.superclass);

	return declaration;
}

/**
 * Processes all declarations in a module
 * @param {Object} mod - The module to process
 * @param {Object} info - Module processing context
 * @returns {Promise<Object>} Processed module
 */
async function processModule(mod, info = {}) {
	const moduleInfo = {
		...info,
		modulePath: mod.path,
	};

	if (!mod.declarations?.length) {
		return mod;
	}

	// Process declarations sequentially to maintain order and handle dependencies
	for (const declaration of mod.declarations) {
		try {
			await resolveDeclaration(declaration, moduleInfo);
		} catch (error) {
			console.error(`Error processing declaration ${declaration.name} in module ${mod.path}: ${error.message}`);
		}
	}

	return mod;
}

/**
 * Main function that processes all modules in a package
 * @param {Array} args - Command line arguments
 */
async function main(args = []) {
	try {
		// Parse command line arguments
		const options = parseArguments(args.slice(2)); // Skip node and script path
		
		// Clear cache at the start of each run
		declarationCache.clear();

		const packageJSON = await getPackageJSON();
		const packageName = packageJSON.name;

		// Determine which manifest file to use based on internal flag
		const manifestFileName = getManifestFileName(options.internal);
		const customElementFile = packageJSON.customElements || "custom-elements.json";
		
		// If using internal flag, we need to check for the internal manifest file
		let actualManifestFile = customElementFile;
		if (options.internal) {
			actualManifestFile = customElementFile.replace("custom-elements.json", manifestFileName);
		}

		const manifest = await getManifest(packageName, actualManifestFile);

		if (!manifest.modules?.length) {
			console.warn(`No modules found in manifest ${actualManifestFile} for ${packageName}`);
			return;
		}

		// Process all modules
		const processingInfo = { packageName, ...options };
		const processingPromises = manifest.modules.map(mod => processModule(mod, processingInfo));
		await Promise.all(processingPromises);

		// Write updated manifest to the same file we read from
		const packageRoot = path.dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));
		const outputPath = path.join(packageRoot, actualManifestFile);

		await writeFile(outputPath, JSON.stringify(manifest, null, 2));
		
		const internalNote = options.internal ? " (internal manifest)" : "";
		console.log(`Successfully updated ${outputPath}${internalNote}`);
	} catch (error) {
		console.error(`Error in main process: ${error.message}`);
		process.exit(1);
	}
}

// Handle direct execution
const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	main(process.argv).catch(error => {
		console.error(`Unhandled error: ${error.message}`);
		process.exit(1);
	});
}

export default {
	_ui5mainFn: main,
	resolveDeclaration,
	processModule,
	parseArguments
};