import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Cache for package.json files to avoid repeated file reads
 */
const packageJSONMap = new Map();

/**
 * Cache for manifest files to avoid repeated file reads
 */
const manifestJSONMap = new Map();

/**
 * Resolves and caches package.json for a given package
 * @param {string} [packageName] - The package name to resolve, or current package if not provided
 * @returns {Promise<Object>} The parsed package.json content
 * @throws {Error} If package.json cannot be read or parsed
 */
async function getPackageJSON(packageName) {
    try {
        let packageJSON;
        let currentPackageName;

        if (packageName) {
            if (packageJSONMap.has(packageName)) {
                return packageJSONMap.get(packageName);
            }

            const packageRoot = path.dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));
            const packageJSONPath = path.join(packageRoot, "package.json");
            const content = await fs.readFile(packageJSONPath, "utf-8");
            packageJSON = JSON.parse(content);
            currentPackageName = packageJSON.name;
        } else {
            const packageJSONPath = path.join(process.cwd(), "package.json");
            const content = await fs.readFile(packageJSONPath, "utf-8");
            packageJSON = JSON.parse(content);
            currentPackageName = packageJSON.name;
        }

        if (!packageJSONMap.has(currentPackageName)) {
            packageJSONMap.set(currentPackageName, packageJSON);
        }

        return packageJSONMap.get(currentPackageName);
    } catch (error) {
        throw new Error(`Failed to read package.json for ${packageName || 'current package'}: ${error.message}`);
    }
}

/**
 * Resolves and caches custom elements manifest for a given package
 * @param {string} [packageName] - The package name to resolve, or current package if not provided
 * @param {string} [manifestFile] - Optional custom manifest file name to use instead of package.json customElements field
 * @returns {Promise<Object>} The parsed custom elements manifest content
 * @throws {Error} If manifest cannot be read or parsed
 */
async function getManifest(packageName, manifestFile) {
    try {
        const packageJSON = await getPackageJSON(packageName);
        const customElementFile = manifestFile || packageJSON.customElements;

        if (!customElementFile) {
            throw new Error(`No customElements field found in package.json for ${packageJSON.name}`);
        }

        const currentPackageName = packageJSON.name;
        const cacheKey = `${currentPackageName}:${customElementFile}`;

        if (manifestJSONMap.has(cacheKey)) {
            return manifestJSONMap.get(cacheKey);
        }

        let manifestPath;
        if (packageName) {
            const packageRoot = path.dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));
            manifestPath = path.join(packageRoot, customElementFile);
        } else {
            manifestPath = path.join(process.cwd(), customElementFile);
        }

        const content = await fs.readFile(manifestPath, "utf-8");
        const customElementJSON = JSON.parse(content);

        if (!manifestJSONMap.has(cacheKey)) {
            manifestJSONMap.set(cacheKey, customElementJSON);
        }

        return manifestJSONMap.get(cacheKey);
    } catch (error) {
        throw new Error(`Failed to read manifest for ${packageName || 'current package'}: ${error.message}`);
    }
}

/**
 * Finds a declaration by name within a specific module and package
 * @param {string} packageName - The package containing the declaration
 * @param {string} modulePath - The module path containing the declaration  
 * @param {string} importName - The name of the export to find
 * @returns {Promise<Object|null>} The declaration object or null if not found
 * @throws {Error} If manifest cannot be retrieved
 */
async function getDeclaration(packageName, modulePath, importName) {
    try {
        const manifest = await getManifest(packageName);

        if (!manifest.modules?.length) {
            return null;
        }

        // Find the target module
        const targetModule = manifest.modules.find(mod => mod.path === modulePath);
        if (!targetModule) {
            return null;
        }

        // Find the export
        const targetExport = targetModule.exports?.find(exp => exp.name === importName);
        if (!targetExport?.declaration) {
            return null;
        }

        // Find the declaration
        const declaration = targetModule.declarations?.find(decl =>
            decl.name === targetExport.declaration.name
        );

        if (!declaration) {
            console.warn(`Declaration ${targetExport.declaration.name} not found in module ${modulePath} of package ${packageName}`);
        }

        return declaration || null;
    } catch (error) {
        throw new Error(`Failed to get declaration ${importName} from ${modulePath} in ${packageName}: ${error.message}`);
    }
}

/**
 * Clears all caches - useful for testing or when packages change
 */
function clearCaches() {
    packageJSONMap.clear();
    manifestJSONMap.clear();
}

export {
    getManifest,
    getPackageJSON,
    getDeclaration,
    clearCaches
};