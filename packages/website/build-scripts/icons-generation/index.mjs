import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

let counter = 0;

const SAPIconsConfig = {
    title: "SAP Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons",
    npmPackage: "@ui5/webcomponents-icons",
    version: "v5",
    dir: "icons",
    componentName: "SAPIcons",
};

const SAPTNTIconsConfig = {
    title: "SAP TNT Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt",
    npmPackage: "@ui5/webcomponents-icons-tnt",
    version: "v3",
    dir: "icons-tnt",
    componentName: "SAPTNTIcons",
};

const SAPBSIconsConfig = {
    title: "SAP Business Suite Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite",
    npmPackage: "@ui5/webcomponents-icons-business-suite",
    version: "v2",
    dir: "icons-business-suite",
    componentName: "SAPBSIcons"
};

const replaceFirstNumber = (str) => {
    const firstLetter = str.charAt(0);
    if (!isNaN(firstLetter)) {
        return `X${++counter}${str.slice(1)}`;
    }
    return str;
}

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
    fs.writeFileSync(targetFile, content,{ encoding:'utf8', flag:'w' });
};

const commonImports = `
import React from 'react';
import clsx from "clsx";
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
`

const additionalImports = `
import CopySvg from "@ui5/webcomponents-icons/dist/v5/copy.svg";
import AcceptSvg from "@ui5/webcomponents-icons/dist/v5/accept.svg";
import PictureSvg from "@ui5/webcomponents-icons/dist/v5/picture.svg";
`;


const _generateIconsPage = (sourceDir, config) => {
    let imports = ``;
    let icons = ``;

    fs.readdirSync(sourceDir).forEach(function (file) {
        if (file.endsWith(".svg")) {
            const fileName = file.slice(0, -4);
            const fileNameImportName = replaceFirstNumber(fileName.replaceAll("-", ""));

            const iconNameImport = `${fileNameImportName}SvgName`;
            const svgImport = `${capitalize(fileNameImportName)}Svg`;

            imports += `
            import ${iconNameImport} from "${config.npmPackage}/dist/${fileName}.js";
            import ${svgImport} from "${config.npmPackage}/dist/${config.version}/${fileName}.svg";
            `;

        icons += `
        <div
            tabIndex="-1"
            className="icon__wrapper"
            data-icon-name={${iconNameImport}.replace("tnt/", "").replace("business-suite/", "")}
            onClick={function(e) {
                const target = e.target;

                if (target.classList.contains("icon__button--picture") || target.classList.contains("icon__button--copy")) {
                    const acceptSVG = document.querySelector("#${svgImport}_accept");
                    acceptSVG?.classList.add("icon__svg--accept--visible");

                    setTimeout(() => {
                        acceptSVG.classList.remove("icon__svg--accept--visible");
                    }, 2000);
                }
            }}>

            <AcceptSvg id="${svgImport}_accept" className="icon__svg--accept"/>
            <div id="${svgImport}_svg"  className="icon__wrapper__svg"><${svgImport} fill="var(--ifm-font-color-base)"/></div>
            <span className="icon__wrapper__title">{${iconNameImport}.replace("tnt/", "").replace("business-suite/", "")}</span>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button title="Copy Icon Name" className="button button--secondary icon__button--copy"
                    onClick={function(e) {
                        navigator.clipboard.writeText(${iconNameImport});
                }}>
                    <CopySvg className="icon__svg--copy" />
                </button>

                <button title="Copy SVG" className="button button--secondary icon__button--picture"
                    onClick={function(e) {
                        navigator.clipboard.writeText(document.querySelector("#${svgImport}_svg")?.innerHTML);
                }}>
                    <PictureSvg className="icon__svg--picture" />
                </button>
            </div>
        </div>`;
        }
    });

    const classDef = `export default function ${config.componentName}() {
        return (
                <div>
                    <div className="icon__grid">
                        ${icons}
                    </div>
                    <div className="icon__not__found hidden">
                        <h2>No matching icons found</h2>
                    </div>
                </div>
        );
    }`

    return { imports, classDef};
};

const generateIconsPage = (sourceDir, config) => {
    const { imports, classDef} = _generateIconsPage(sourceDir, config);

    let content
    if (config.componentName === "SAPIcons" ) {
        content =`
${commonImports}
${imports}
${classDef}`;
    } else {
        content =`
${commonImports}
${additionalImports}
${imports}
${classDef}`;
    }

    writeFile(config.dir, content);
};

function findRoot(pkgName) {
    return path.dirname(fileURLToPath(import.meta.resolve(`${pkgName}/package.json`)));
}

generateIconsPage(path.join(findRoot("@ui5/webcomponents-icons"), "dist/v5"), SAPIconsConfig);
generateIconsPage(path.join(findRoot("@ui5/webcomponents-icons-tnt"), "dist/v3"), SAPTNTIconsConfig);
generateIconsPage(path.join(findRoot("@ui5/webcomponents-icons-business-suite"), "dist/v2"), SAPBSIconsConfig);
