import fs from "fs"
import path from "path"
import { parseComponentDeclaration } from "./component-file.mjs"
import { removeFileExtension } from "./utils.mjs";
import { findDeclaration, realPackagesName } from "./manifest.mjs";

const packages = ["main", "fiori", "compat", "ai"];

/**
 * Calculate the correct slug for a component based on its file path
 * @param {string} filePath - Full path to the .mdx file
 * @param {string} packageName - Package name (main, fiori, compat, ai)
 * @param {string} componentName - Component name (filename without extension)
 * @returns {string} - The calculated slug
 */
const calculateSlug = (filePath, packageName, componentName) => {
    // Normalize path separators for cross-platform compatibility
    const normalizedPath = filePath.replace(/\\/g, '/');

    // Extract the path relative to _components_pages/<package>/
    const packagePattern = new RegExp(`_components_pages/${packageName}/(.*)$`);
    const match = normalizedPath.match(packagePattern);

    if (!match) {
        console.warn(`Warning: Could not extract relative path for ${filePath}`);
        return null;
    }

    const relativeFromPackage = match[1];
    const fileDir = path.dirname(relativeFromPackage);

    // Determine depth:
    // - "Component.mdx" (at package root) -> depth 0
    // - "Component/Component.mdx" (in subdirectory) -> depth 1
    const isInSubdirectory = fileDir !== '.';

    if (packageName === "main") {
        // Main package: URLs are /components/ComponentName
        if (isInSubdirectory) {
            // From main/Component/Component.mdx -> ../../Component
            return `../../${componentName}`;
        } else {
            // From main/Component.mdx -> ../Component
            return `../${componentName}`;
        }
    } else {
        // Other packages (fiori, ai, compat): URLs are /components/<package>/ComponentName
        if (isInSubdirectory) {
            // From fiori/Component/Component.mdx -> ../Component
            return `../${componentName}`;
        } else {
            // From fiori/Component.mdx -> ./Component
            return `./${componentName}`;
        }
    }
};

/**
 * Inject or update slug in frontmatter
 * @param {string} fileContent - Original file content
 * @param {string} slug - Calculated slug
 * @returns {string} - Updated file content with correct slug
 */
const injectSlug = (fileContent, slug) => {
    if (!slug) {
        return fileContent;
    }

    // Check if frontmatter exists
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);

    if (!frontmatterMatch) {
        // No frontmatter - add it with slug
        return `---\nslug: ${slug}\n---\n\n${fileContent}`;
    }

    const frontmatter = frontmatterMatch[1];
    const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m);

    if (slugMatch) {
        // Slug exists - replace it
        const oldSlug = slugMatch[1].trim();
        if (oldSlug !== slug) {
            console.log(`  Updating slug: ${oldSlug} -> ${slug}`);
        }
        const updatedFrontmatter = frontmatter.replace(/^slug:\s*(.+)$/m, `slug: ${slug}`);
        return fileContent.replace(frontmatterMatch[0], `---\n${updatedFrontmatter}\n---`);
    } else {
        // Frontmatter exists but no slug - add slug
        const updatedFrontmatter = `slug: ${slug}\n${frontmatter}`;
        return fileContent.replace(frontmatterMatch[0], `---\n${updatedFrontmatter}\n---`);
    }
};

const generateComponents = (source = "./docs/_components_pages", level = 1) => {
    const sourcePath = path.resolve(source);
    const targetPath = source.replace("_components_pages", "components");

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }

    const folderFiles = fs.readdirSync(sourcePath);

    for (let file of folderFiles) {
        const isDirectory = fs.lstatSync(path.join(sourcePath, file)).isDirectory();
        const fileName = removeFileExtension(file);

        if (isDirectory) {
            if (!packages.includes(file)) {
                fs.mkdirSync(path.join(targetPath, file), { recursive: true });
                fs.writeFileSync(path.join(targetPath, file, "_category_.json"), `{
    "label": "${fileName}",
    "link": null
}`)
            }

            generateComponents(path.join(sourcePath, file), level + 1);
        } else {
            let packageName;

            if (sourcePath.includes("main")) {
                packageName = "main"
            } else if (sourcePath.includes("fiori")) {
                packageName = "fiori";
            } else if (sourcePath.includes("compat")) {
                packageName = "compat";
            } else if (sourcePath.includes("ai")) {
                packageName = "ai";
            }

            if (packageName) {
                const filePath = path.join(sourcePath, file);
                let fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
                const declaration = findDeclaration({ package: realPackagesName(packageName), name: fileName })

                // Calculate and inject correct slug
                const calculatedSlug = calculateSlug(filePath, packageName, fileName);
                fileContent = injectSlug(fileContent, calculatedSlug);

                fs.writeFileSync(path.join(targetPath, `${fileName}.mdx`), parseComponentDeclaration(declaration, fileContent))
            }
        }
    }
}

export {
    generateComponents
}