import fs from "fs"
import path from "path"
import { parseComponentDeclaration } from "./component-file.mjs"
import { findDeclaration, realPackagesName } from "./manifest.mjs"

const packages = ["main", "fiori", "compat", "ai"];

const samplesCache = new Map();

const getSamples = (packageName) => {
    if (!samplesCache.has(packageName)) {
        const jsonPath = path.resolve(`./docs/components/${packageName}/samples.json`);
        try {
            samplesCache.set(packageName, JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8" })));
        } catch {
            samplesCache.set(packageName, {});
        }
    }
    return samplesCache.get(packageName);
};

const buildSamplesImports = (packageName, componentName, samples, samplesPrefix) => {
    return samples
        .map(s => {
            const importName = s.name.replace(/[^a-zA-Z0-9]/g, "_");
            return `import ${importName} from "${samplesPrefix}_samples/${packageName}/${componentName}/${s.name}/${s.name}.md";`;
        })
        .join("\n");
};

const buildSamplesContent = (samples) => {
    const basicSample = samples.find(s => s.isBasic);
    const moreSamples = samples.filter(s => !s.isBasic);

    let content = "";

    if (basicSample) {
        const importName = basicSample.name.replace(/[^a-zA-Z0-9]/g, "_");
        content += `\n## Basic Sample\n<${importName} />\n`;
    }

    content += "\n<%COMPONENT_METADATA%>";

    if (moreSamples.length) {
        content += "\n\n## More Samples\n";
        moreSamples.forEach(s => {
            const importName = s.name.replace(/[^a-zA-Z0-9]/g, "_");
            const title = s.title || s.name;
            content += `\n### ${title}\n`;
            if (s.description) {
                content += `${s.description}\n\n`;
            }
            content += `<${importName} />\n`;
        });
    }

    return content;
};

const buildParentMdx = (packageName, componentName, samplesPrefix) => {
    const allSamples = getSamples(packageName);
    const componentSamples = allSamples[componentName]?.samples;

    let fileContent = ``;

    if (componentSamples?.length) {
        fileContent += buildSamplesImports(packageName, componentName, componentSamples, samplesPrefix);
        fileContent += "\n\n<%COMPONENT_OVERVIEW%>\n";
        fileContent += buildSamplesContent(componentSamples);
    } else {
        fileContent += "<%COMPONENT_OVERVIEW%>\n\n<%COMPONENT_METADATA%>";
    }

    return fileContent;
};

const buildSubcomponentMdx = () => {
    return `<%COMPONENT_OVERVIEW%>\n\n<%COMPONENT_METADATA%>`;
};

const generateComponents = () => {
    packages.forEach(packageName => {
        const packageFullName = realPackagesName(packageName);
        const outputDir = `./docs/components/${packageName}`;

        const allSubcomponents = new Set();
        const parentDeclarations = [];
        const allDeclarations = [];

        const manifest = JSON.parse(
            fs.readFileSync(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" })
        );

        manifest.modules.forEach(module => {
            module.declarations.forEach(declaration => {
                if (declaration._ui5privacy === "public" && declaration.customElement && declaration.tagName) {
                    allDeclarations.push(declaration.name);
                    if (declaration._ui5subcomponents?.length) {
                        declaration._ui5subcomponents.forEach(name => allSubcomponents.add(name));
                        parentDeclarations.push(declaration.name);
                    }
                }
            });
        });

        allDeclarations.forEach(componentName => {
            const declaration = findDeclaration({ package: packageFullName, name: componentName });
            if (!declaration) return;

            const isParent = parentDeclarations.includes(componentName);
            const isSubcomponent = allSubcomponents.has(componentName);

            if (isParent) {
                const folderPath = path.join(outputDir, componentName);
                fs.mkdirSync(folderPath, { recursive: true });

                fs.writeFileSync(path.join(folderPath, "_category_.json"), JSON.stringify({ label: componentName, link: null }, null, 4));

                const parentMdx = buildParentMdx(packageName, componentName, "../../../");
                const parentContent = parseComponentDeclaration(declaration, parentMdx);
                fs.writeFileSync(path.join(folderPath, `${componentName}.mdx`), parentContent);

                declaration._ui5subcomponents.forEach(subName => {
                    const subDeclaration = findDeclaration({ package: packageFullName, name: subName });
                    if (!subDeclaration) return;

                    const subMdx = buildSubcomponentMdx();
                    const subContent = parseComponentDeclaration(subDeclaration, subMdx);
                    fs.writeFileSync(path.join(folderPath, `${subName}.mdx`), subContent);
                });

            } else if (!isSubcomponent) {
                const flatMdx = buildParentMdx(packageName, componentName, "../../");
                const flatContent = parseComponentDeclaration(declaration, flatMdx);
                fs.writeFileSync(path.join(outputDir, `${componentName}.mdx`), flatContent);
            }
        });
    });
};

export {
    generateComponents
}
