import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGES = ["main", "fiori", "compat", "ai"];

// Clean component description
function cleanDescription(description) {
    if (!description) return '';

    // Split into lines
    const lines = description.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // Find first meaningful line (skip headings like "### Overview")
    let firstMeaningfulLine = '';
    for (const line of lines) {
        // Skip markdown headings
        if (line.match(/^#+\s/)) {
            continue;
        }
        // Skip lines that are just "Overview" or similar
        if (line.toLowerCase() === 'overview' || line.toLowerCase() === 'usage') {
            continue;
        }
        firstMeaningfulLine = line;
        break;
    }

    if (!firstMeaningfulLine) return '';

    // Remove HTML tags and backticks
    let cleaned = firstMeaningfulLine.replace(/<[^>]*>/g, '').replace(/`/g, '');

    // Limit length
    if (cleaned.length > 150) {
        return cleaned.substring(0, 150).trim() + '...';
    }

    return cleaned;
}

// Get components from custom-elements manifest
function getComponentsFromManifests() {
    const componentsByPackage = {};
    let foundAnyManifest = false;

    PACKAGES.forEach(packageName => {
        const manifestPath = path.resolve(__dirname, `../../../${packageName}/dist/custom-elements-internal.json`);

        if (!fs.existsSync(manifestPath)) {
            console.warn(`⚠ Manifest not found for ${packageName} package: ${manifestPath}`);
            return;
        }

        foundAnyManifest = true;
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        const components = [];

        manifest.modules?.forEach(module => {
            module.declarations?.forEach(declaration => {
                if (declaration.kind === "class" &&
                    declaration.customElement &&
                    declaration.tagName &&
                    declaration._ui5privacy === "public") {
                    components.push({
                        name: declaration.name,
                        tagName: declaration.tagName,
                        description: cleanDescription(declaration.description)
                    });
                }
            });
        });

        if (components.length > 0) {
            componentsByPackage[packageName] = components.sort((a, b) => a.name.localeCompare(b.name));
        }
    });

    if (!foundAnyManifest) {
        console.warn('⚠ No component manifests found. Run "yarn build" from the root directory first.');
    }

    return componentsByPackage;
}

// Get all markdown files recursively
function getMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md') && file !== 'README.md') {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Extract title from markdown file
function extractTitle(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Try to find title in frontmatter
    const frontmatterMatch = content.match(/^---\n[\s\S]*?title:\s*(.+?)\n[\s\S]*?---/);
    if (frontmatterMatch) {
        return frontmatterMatch[1].replace(/['"]/g, '');
    }

    // Try to find first h1 heading
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
        return h1Match[1];
    }

    // Fallback to filename
    return path.basename(filePath, '.md').replace(/[-_]/g, ' ');
}

// Convert file path to URL path
function toUrlPath(filePath, baseDir) {
    const relativePath = path.relative(baseDir, filePath)
        .replace(/\\/g, '/')
        .replace(/\.md$/, '')
        .replace(/\/README$/, '');

    // Remove numeric prefixes (e.g., "01-first-steps" -> "first-steps")
    const cleanPath = relativePath.replace(/\/?\d+-/g, '/').replace(/^\//, '');

    return cleanPath;
}

// Extract category name from folder name (e.g., "1-getting-started" -> "Getting Started")
function extractCategoryName(folderName) {
    // Remove number prefix and convert to title case
    const withoutNumber = folderName.replace(/^\d+-/, '');
    return withoutNumber
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Group files by category based on folder structure
function categorizeFiles(files, baseDir) {
    const categories = new Map();

    files.forEach(filePath => {
        const relativePath = path.relative(baseDir, filePath);
        const title = extractTitle(filePath);
        const urlPath = toUrlPath(filePath, baseDir);

        // Get the first directory in the path
        const pathParts = relativePath.split(path.sep);
        const firstDir = pathParts[0];

        // Skip framework integration files
        if (relativePath.includes('3-frameworks')) {
            return;
        }

        // Skip internal docs
        if (relativePath.includes('internal')) {
            return;
        }

        // Determine category
        let categoryName = 'General';

        if (firstDir.match(/^\d+-/)) {
            // Folder or file with number prefix (e.g., "1-getting-started" or "08-Releases.md")
            if (firstDir.endsWith('.md')) {
                // Root level file with number prefix - put in General
                categoryName = 'General';
            } else {
                // Directory with number prefix
                categoryName = extractCategoryName(firstDir);
            }
        } else if (firstDir.includes('.md')) {
            // Root level file without number prefix
            categoryName = 'General';
        } else if (pathParts.length > 1 && pathParts[0] !== 'images') {
            // File in a subdirectory (non-numbered)
            categoryName = 'Other';
        }

        if (!categories.has(categoryName)) {
            categories.set(categoryName, []);
        }

        categories.get(categoryName).push({ title, path: urlPath });
    });

    // Convert Map to object and sort categories
    // Keep numbered folders in order, put General last
    const sortedCategories = {};
    const categoryKeys = Array.from(categories.keys()).sort((a, b) => {
        // Extract number prefix if exists
        const getOrder = (name) => {
            if (name === 'General') return 999;
            if (name === 'Other') return 1000;
            // Try to match the original folder order (1-getting-started, 2-advanced, etc.)
            const orderMap = {
                'Getting Started': 1,
                'Advanced': 2,
                'Development': 4,
                'Contributing': 5,
                'Migration Guides': 6
            };
            return orderMap[name] || 500;
        };
        return getOrder(a) - getOrder(b);
    });

    categoryKeys.forEach(key => {
        sortedCategories[key] = categories.get(key);
    });

    return sortedCategories;
}

// Generate llms.txt content
function generateLlmsTxt() {
    const docsDir = path.join(__dirname, '../../docs/docs');
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
    const componentsByPackage = getComponentsFromManifests();

    if (!fs.existsSync(docsDir)) {
        console.error('Documentation directory not found. Please run "yarn generate-documentation" first.');
        process.exit(1);
    }

    const files = getMarkdownFiles(docsDir);
    const categories = categorizeFiles(files, docsDir);

    let content = `# UI5 Web Components

> Enterprise-grade, framework-agnostic web components library implementing SAP Fiori design

Version: ${packageJson.version}
Website: https://ui5.github.io/webcomponents/
GitHub: https://github.com/SAP/ui5-webcomponents

## Overview

UI5 Web Components is a comprehensive library of reusable UI elements designed for building modern web applications. Based on web standards, these components work with any framework (React, Angular, Vue) or vanilla JavaScript.

### Key Features

- **Framework-agnostic**: Works with React, Angular, Vue, or plain JavaScript
- **Enterprise-ready**: Production-tested components following SAP Fiori design guidelines
- **Accessible**: WCAG 2.1 compliant with full keyboard navigation and screen reader support
- **Themable**: Multiple built-in themes with customization options
- **TypeScript support**: Full type definitions included
- **i18n**: Multi-language support with 40+ locales

### Quick Start

\`\`\`bash
npm install @ui5/webcomponents
\`\`\`

\`\`\`javascript
import "@ui5/webcomponents/dist/Button.js";
\`\`\`

\`\`\`html
<ui5-button>Click Me</ui5-button>
\`\`\`

## Components

`;

    // Add component links by package
    Object.entries(componentsByPackage).forEach(([packageName, components]) => {
        const packageDisplayName = packageName === 'main' ? 'Main Components' :
                                   packageName === 'fiori' ? 'Fiori Components' :
                                   packageName === 'compat' ? 'Compat Components' :
                                   packageName === 'ai' ? 'AI Components' : packageName;

        content += `### ${packageDisplayName}\n\n`;

        components.forEach(component => {
            let url;
            if (packageName === 'main') {
                // Main package uses the simpler URL
                url = `https://ui5.github.io/webcomponents/components/${component.name}/`;
            } else {
                // Other packages use the nightly URL with package name
                url = `https://ui5.github.io/webcomponents/nightly/components/${packageName}/${component.name}/`;
            }

            // Show description if it's meaningful (not empty)
            const description = component.description ? ` - ${component.description}` : '';
            content += `- [${component.name}](${url})${description}\n`;
        });
        content += '\n';
    });

    content += `## Documentation

`;

    // Add categorized documentation links
    Object.entries(categories).forEach(([category, links]) => {
        content += `### ${category}\n\n`;
        links.forEach(link => {
            content += `- [${link.title}](https://ui5.github.io/webcomponents/docs/${link.path}/)\n`;
        });
        content += '\n';
    });

    // Add additional important links
    content += `## Additional Resources

- [Component Catalog](https://ui5.github.io/webcomponents/components/)
- [Icon Explorer](https://ui5.github.io/webcomponents/icons/)
- [Playground](https://ui5.github.io/webcomponents/play/)
- [API Reference](https://ui5.github.io/webcomponents/components/main/)
- [Changelog](https://github.com/SAP/ui5-webcomponents/releases)
- [FAQ](https://ui5.github.io/webcomponents/docs/FAQ/)

## Common Patterns

### Importing Components

\`\`\`javascript
// Main components
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";

// Fiori components
import "@ui5/webcomponents-fiori/dist/ShellBar.js";

// Icons (always use dist path)
import "@ui5/webcomponents-icons/dist/add.js";
\`\`\`

## Important Notes for AI Assistants

- Always import from \`/dist/\` path, not from package root
- Component tags use lowercase with hyphens (e.g., \`ui5-button\`, not \`UI5Button\`)
- Icons must be imported separately: \`import "@ui5/webcomponents-icons/dist/icon-name.js"\`
- Use attribute selectors in CSS: \`[ui5-button]\`, not \`ui5-button\`
- Events are native DOM events, use standard \`.addEventListener()\`
- For TypeScript, import types from package root: \`import Button from "@ui5/webcomponents/dist/Button.js"\`

---

Generated: ${new Date().toISOString()}
`;

    return content;
}

// Write llms.txt to static directory
function writeLlmsTxt() {
    const content = generateLlmsTxt();
    const outputPath = path.join(__dirname, '../../static/llms.txt');

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log('✓ Generated llms.txt');
}

writeLlmsTxt();
