import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const SAPIllustrationsConfig = {
    title: "SAP Illustrations",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-fiori",
    npmPackage: "@ui5/webcomponents-fiori",
    dir: "illustrations",
    componentName: "SAPIllustrations",
    subfolder: "", // No subfolder for SAP illustrations
};

const SAPTNTIllustrationsConfig = {
    title: "SAP TNT Illustrations",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-fiori",
    npmPackage: "@ui5/webcomponents-fiori",
    dir: "illustrations-tnt",
    componentName: "SAPTNTIllustrations",
    subfolder: "tnt/", // TNT illustrations are in tnt/ subfolder
};

const capitalize = (str) => {
    const firstLetter = str.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
};

const writeFile = (targetDir, content) => {
    const targetPath = path.resolve(`./${targetDir}`);
    const targetFile = path.resolve(`${targetPath}/index.js`);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
    fs.writeFileSync(targetFile, content, { encoding: 'utf8', flag: 'w' });
};

const commonImports = `
import React, { useState } from 'react';
import clsx from "clsx";
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
`;

const additionalImports = ``;

/**
 * Parse the IllustrationMessageType enum and extract non-deprecated illustrations
 */
const parseIllustrationsFromEnum = () => {
    const enumPath = path.join(
        findRoot("@ui5/webcomponents-fiori"),
        "src/types/IllustrationMessageType.ts"
    );

    const enumContent = fs.readFileSync(enumPath, 'utf8');

    const illustrations = [];

    // Extract enum entries with their JSDoc comments
    const enumEntryRegex = /\/\*\*([\s\S]*?)\*\/\s*(\w+)\s*=\s*"(\w+)"/g;
    let match;

    while ((match = enumEntryRegex.exec(enumContent)) !== null) {
        const [, jsdoc, enumKey, enumValue] = match;
        const isDeprecated = jsdoc.includes('@deprecated');

        if (!isDeprecated) {
            illustrations.push({
                name: enumValue.startsWith('Tnt') ? enumValue.replace(/^Tnt/, '') : enumValue,
                displayName: enumValue, // Full enum name for display
                isTnt: enumValue.startsWith('Tnt')
            });
        }
    }

    return illustrations;
};

const _generateIllustrationsPage = (illustrations, config) => {
    let imports = ``;
    let illustrationCards = ``;
    let illustrationDataArray = ``;

    illustrations.forEach(illustration => {
        const illustrationName = illustration.name;
        const illustrationNameImportName = `${illustrationName}`;

        imports += `
import ${illustrationNameImportName} from "${config.npmPackage}/dist/illustrations/${config.subfolder}${illustrationName}.js";
import { spotSvg as ${illustrationName}SpotSvg } from "${config.npmPackage}/dist/illustrations/${config.subfolder}${illustrationName}.js";
`;

        illustrationCards += `
        {isVisible("${illustrationName}") && (
        <div
            className={clsx("illustration__wrapper", {
                "illustration__wrapper--selected": selectedIllustration?.name === "${illustrationName}"
            })}
            data-illustration-name="${illustrationName}"
            onClick={() => onIllustrationSelect(illustrations.find(item => item.name === "${illustrationName}"))}>

            <div
                className="illustration__preview"
                dangerouslySetInnerHTML={{ __html: ${illustrationName}SpotSvg }}
            />

            <span className="illustration__wrapper__title">{illustrations.find(item => item.name === "${illustrationName}")?.displayName || "${illustrationName}"}</span>
        </div>
        )}`;

        illustrationDataArray += `
    { name: "${illustrationName}", displayName: "${illustration.displayName}", isTnt: ${illustration.isTnt} },`;
    });

    const classDef = `export default function ${config.componentName}({ onIllustrationSelect, selectedIllustration, searchQuery = "" }) {
    const illustrations = [${illustrationDataArray}
    ];

    // Filter based on search query
    const filteredIllustrations = searchQuery
        ? illustrations.filter(item => item.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
        : illustrations;

    // Check if each illustration should be visible
    const isVisible = (illustrationName) => {
        return filteredIllustrations.some(item => item.name === illustrationName);
    };

        return (
                <div style={{
                        padding: "1rem",
                    }}>
                    <div className="illustration__grid">
                        ${illustrationCards}
                    </div>
                    {filteredIllustrations.length === 0 && (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            <h3>No matching illustrations found</h3>
                        </div>
                    )}
                </div>
        );
    }

export const illustrationsData = [${illustrationDataArray}
];`;

    return { imports, classDef };
};

const generateIllustrationsPage = (illustrations, config) => {
    const { imports, classDef } = _generateIllustrationsPage(illustrations, config);

    const content = `
${commonImports}
${additionalImports}
${imports}
${classDef}`;

    writeFile(config.dir, content);
};

function findRoot(pkgName) {
    return path.dirname(fileURLToPath(import.meta.resolve(`${pkgName}/package.json`)));
}

// Main execution
const allIllustrations = parseIllustrationsFromEnum();

// Split into SAP and TNT collections
const sapIllustrations = allIllustrations.filter(ill => !ill.isTnt);
const tntIllustrations = allIllustrations.filter(ill => ill.isTnt);

console.log(`Found ${sapIllustrations.length} SAP illustrations (non-deprecated)`);
console.log(`Found ${tntIllustrations.length} TNT illustrations (non-deprecated)`);

generateIllustrationsPage(sapIllustrations, SAPIllustrationsConfig);
generateIllustrationsPage(tntIllustrations, SAPTNTIllustrationsConfig);

console.log("Illustrations pages generated successfully!");
