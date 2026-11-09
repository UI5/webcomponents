import path from "node:path";
import { pathToFileURL } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

const packageNotes = {
    "@ui5/webcomponents": "Primary components for forms, data display, navigation, and layouts.",
    "@ui5/webcomponents-fiori": "SAP Fiori components such as ShellBar, DynamicPage, and SideNavigation. Use @ui5/webcomponents for primary controls.",
    "@ui5/webcomponents-ai": "Components for AI-related interactions. This package is experimental and supports Horizon themes only; check the installed API before use.",
    "@ui5/webcomponents-compat": "Deprecated since 2.12.0. For new applications, use Table from @ui5/webcomponents. Do not mix the main and compatibility Table implementations: they use overlapping tag names.",
};

const examples = {
    "@ui5/webcomponents": ["Button", "ui5-button", "Save"],
    "@ui5/webcomponents-fiori": ["ShellBar", "ui5-shellbar", ""],
    "@ui5/webcomponents-ai": ["Button", "ui5-ai-button", "Generate"],
    "@ui5/webcomponents-compat": ["Table", "ui5-table", ""],
};

function summarize(description = "") {
    const paragraph = description.replace(/^#+[^\n]*$/gm, "").trim().split(/\n\s*\n/)[0];
    const text = paragraph.replace(/<[^>]*>/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim();
    const summary = text.length > 240 ? `${text.slice(0, 240).replace(/\s+\S*$/, "")}…` : text;
    return summary.replace(/\|/g, "\\|");
}

const main = async () => {
    const packageJSON = JSON.parse(await readFile("package.json", "utf8"));
    // Only the component packages opting into this task receive consumer guidance.
    const note = packageNotes[packageJSON.name];
    if (!note) {
        throw new Error(`No consumer guidance configured for ${packageJSON.name}`);
    }
    const manifest = JSON.parse(await readFile(packageJSON.customElements, "utf8"));
    const components = manifest.modules.flatMap(module => (module.declarations || [])
        .filter(declaration => declaration.customElement && declaration.tagName)
        .map(declaration => ({ ...declaration, module: module.path })))
        .sort((a, b) => a.tagName.localeCompare(b.tagName));
    if (!components.length) {
        throw new Error(`No components found in ${packageJSON.customElements}`);
    }
    const [exampleModule, exampleTag, exampleText] = examples[packageJSON.name];
    const rows = components.map(component =>
        `| ${component.name} | \`${component.tagName}\` | \`${packageJSON.name}/${component.module}\` | ${summarize(component.description)}${component.deprecated ? " Deprecated; check the manifest for migration guidance." : ""} |`);
    const content = `# ${packageJSON.name}

> Consumer guidance for applications using this npm package.

Version: ${packageJSON.version}

${note}

## Read the installed API

- [Public API manifest](./${packageJSON.customElements}): component tags, module paths, properties, attributes, events, slots, methods, CSS parts, and deprecations.
- [Package metadata](./package.json): installed version, dependencies, and exports.
- [Package README](./README.md): assets and package-specific setup.
- TypeScript declarations next to each component in dist provide additional type information.
- [Online documentation and examples](https://ui5.github.io/webcomponents/): check that examples apply to the installed version. Prefer the local manifest and declarations when versions differ.

Read the relevant component declaration before writing code. Do not invent properties, event names, slots, or methods. This index lists components in this package; inspect the corresponding installed package for other components.

## Usage conventions

- Import a component's JavaScript module to register its custom element, using the /dist/ paths below. Import child components used in your markup explicitly rather than assuming they are registered transitively.
- These are native web components. JSX wrappers from @ui5/webcomponents-react have a separate API and package; do not substitute wrapper props for native APIs.
- HTML attributes and JavaScript properties can have different names (for example, accessible-name and accessibleName). Use the manifest's attribute mapping. Boolean attributes are true when present; remove them for false rather than writing disabled="false". Assign arrays and objects through JavaScript properties or your framework's property binding.
- Use addEventListener with the documented DOM event name; read documented custom event payloads from event.detail. In frameworks, check their custom-element event binding syntax.
- Place children in the documented default or named slots. Use slot="name" for a named slot and the documented child component types.
- Import icons separately, for example import "@ui5/webcomponents-icons/dist/save.js" before using icon="save". Check the icon exists in the installed icon package.
- For themes and translations, follow the README's Assets.js setup and the application's bundler configuration.
- Use stable attribute selectors such as [ui5-button] in CSS and DOM queries to support tag-name scoping. Under scoping, create markup with the application's configured scoped tag names.
- Style with supported theme variables and documented CSS parts. Avoid depending on private shadow DOM structure.
- In TypeScript, use import type for component types when a separate side-effect import registers the element.

## Minimal registration example

\`\`\`js
import "${packageJSON.name}/dist/${exampleModule}.js";
\`\`\`

\`\`\`html
<${exampleTag}>${exampleText}</${exampleTag}>
\`\`\`

## Component index

Generated from the public manifest. Descriptions are abbreviated; consult the manifest for complete usage constraints and API details.

| Component | Tag | Import module | Purpose |
| --- | --- | --- | --- |
${rows.join("\n")}

## Discovering this file

Package documentation is not automatically loaded by every coding assistant. In your application's agent instructions, point to this installed package's llms.txt and ask the assistant to read it before using these components. Tools can resolve ${packageJSON.name}/llms.txt and read it as text.

Generated by @ui5/webcomponents-tools from the installed package metadata and public manifest. This file is a build artifact shipped in npm and ignored by Git. Maintainers: run yarn generateAPI from the repository root to refresh after API changes; edit packages/tools/lib/cem/llms.mjs for usage guidance.
`;
    await writeFile("llms.txt", content, "utf8");
    console.log(`Generated consumer guidance for ${packageJSON.name}`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    main().catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
}

export default { _ui5mainFn: main };
