import { pathToFileURL } from "url";
import path from "path";
import { createRequire } from 'module';
import { readFile, writeFile } from "fs/promises";

const require = createRequire(import.meta.url);

const UI5_BASE_CLASS = "UI5Element";

const main = async (argv) => {
    let customElementsPath = null;
    const CACHED_CEMS = new Map();
    const DECLARATION_PACKAGE = new WeakMap();
    const DECLARATION_MODULE = new WeakMap();

    function removeInheritedFrom(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => removeInheritedFrom(item));
        }

        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'inheritedFrom') {
                continue;
            }
            result[key] = removeInheritedFrom(value);
        }
        return result;
    }

    async function readPackageJson(filePath) {
        try {
            return JSON.parse(await readFile(filePath, "utf-8"));
        } catch (error) {
            throw new Error(`Failed to read package.json at ${filePath}: ${error.message}`);
        }
    }

    async function loadPackageJson(depName) {
        try {
            // First try the standard require method (works when exports includes package.json)
            const pkg = require(`${depName}/package.json`);
            const pkgPath = require.resolve(`${depName}/package.json`);
            return { path: path.dirname(pkgPath), pkg };
        } catch (e) {
            // If that fails, resolve the package path and read package.json directly
            try {
                const packagePath = require.resolve(depName);
                let currentDir = path.dirname(packagePath);

                // Navigate up to find package.json (the resolved path might be deep in dist/ or similar)
                while (currentDir !== path.parse(currentDir).root) {
                    try {
                        const pkgPath = path.join(currentDir, 'package.json');
                        const content = await readFile(pkgPath, 'utf-8');
                        const pkg = JSON.parse(content);

                        // Verify this is the correct package.json by checking the name
                        if (pkg.name === depName) {
                            return { path: currentDir, pkg };
                        }
                    } catch {
                        // Continue searching up the directory tree
                    }
                    currentDir = path.dirname(currentDir);
                }
            } catch (resolveError) {
                // console.warn(`Could not resolve ${depName}:`, resolveError.message);
            }
            return null;
        }
    }

    async function collectThirdPartyCem() {
        const packageJSONPath = path.resolve(process.cwd(), "package.json");
        const packageJSON = await readPackageJson(packageJSONPath);

        const dependencyKeys = Object.keys(packageJSON).filter(key => key.toLowerCase().includes("dependencies"));
        const dependencies = dependencyKeys.flatMap(key => Object.keys(packageJSON[key]));

        const thirdPartCEM = (await Promise.all(dependencies.map(async dep => {
            const result = await loadPackageJson(dep);
            if (!result?.pkg?.customElements) return null;

            return {
                path: result.path,
                name: dep,
                cem: result.pkg.customElements
            };
        }))).filter(Boolean);

        await Promise.all(thirdPartCEM.map(async dep => {
            const cemPath = path.resolve(dep.path, dep.cem);
            try {
                const cemContent = JSON.parse(await readFile(cemPath, "utf-8"));
                CACHED_CEMS.set(dep.name, cemContent);
            } catch (error) {
                console.warn(`Failed to read CEM for ${dep.name} from ${cemPath}: ${error.message}`);
            }
        }));
    }

    async function readCurrentCEM() {
        const packageJSONPath = path.resolve(process.cwd(), "package.json");
        const packageJSON = await readPackageJson(packageJSONPath);

        if (!packageJSON?.customElements) {
            return null;
        }

        customElementsPath = packageJSON.customElements;
        const cemPath = path.resolve(process.cwd(), customElementsPath);

        try {
            const cemContent = JSON.parse(await readFile(cemPath, "utf-8"));
            CACHED_CEMS.set(packageJSON.name, cemContent);
            return cemContent;
        } catch (error) {
            throw new Error(`Failed to read CEM from ${cemPath}: ${error.message}`);
        }
    }

    async function resolveReference(ref) {
        const pkg = CACHED_CEMS.get(ref.package);

        if (!pkg) {
            return null;
        }

        const mod = (pkg.modules || []).find(m => m.path === ref.module);

        if (!mod) {
            return null;
        }

        const declaration = (mod.declarations || []).find(d => d.name === ref.name);

        if (!declaration) {
            return null;
        }

        DECLARATION_PACKAGE.set(declaration, ref.package);
        DECLARATION_MODULE.set(declaration, ref.module);

        return resolveDeclaration(declaration);
    }

    async function resolveDeclaration(declaration) {
        if (!declaration.superclass || declaration.superclass.name === UI5_BASE_CLASS) {
            return [declaration];
        }

        const superclassDeclarations = await resolveReference(declaration.superclass);
        return [declaration, superclassDeclarations].flat().filter(Boolean);
    }

    const merge = async () => {
        const currentCEM = await readCurrentCEM();
        if (!currentCEM) {
            throw new Error("No custom elements manifest found in current project");
        }

        await collectThirdPartyCem();

        const modules = currentCEM.modules || [];

        for (const mod of modules) {
            const declarations = (mod.declarations || []).filter(d => d.kind === "class");

            for (const declaration of declarations) {
                const declarationHierarchy = await resolveDeclaration(declaration);
                const allKeys = declarationHierarchy.flatMap(dec => Object.keys(dec));
                const uniqueKeys = [...new Set(allKeys)];
                const arrayKeys = uniqueKeys
                    .filter(key => !key.startsWith("_ui5"))
                    .filter(key => declarationHierarchy.some(dec => Array.isArray(dec[key])));

                for (const key of arrayKeys) {
                    const allItems = declarationHierarchy.flatMap(dec => dec[key] || []);

                    // Remove duplicates based on name property
                    const seen = new Set();
                    declaration[key] = allItems.filter(item => {
                        if (!item.name) return true;
                        if (seen.has(item.name)) return false;
                        seen.add(item.name);
                        return true;
                    });
                }
            }
        }

        const cleanedCEM = removeInheritedFrom(currentCEM);
        const outputPath = path.resolve(process.cwd(), customElementsPath);

        try {
            await writeFile(outputPath, JSON.stringify(cleanedCEM, null, 2), "utf-8");
            console.log(`Successfully merged CEM to ${outputPath}`);
        } catch (error) {
            throw new Error(`Failed to write merged CEM to ${outputPath}: ${error.message}`);
        }
    };

    await merge();
}

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
    main(process.argv)
}

export default {
    _ui5mainFn: main
}