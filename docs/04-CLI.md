---
sidebar_label: CLI
title: CLI
---

# CLI

UI5 Web Components provides command-line tools for scaffolding projects and generating components.

## Create a New Project

Scaffold a fully configured UI5 Web Components package with a single command:

```bash
npm create @ui5/webcomponents-package
```

This launches an interactive wizard that sets up a ready-to-run TypeScript project with a sample component, theming, i18n, and a dev server.

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--name` | Package name (npm-compatible, supports scopes) | `my-package` |
| `--tag` | Component tag name (e.g., `my-button`) | Derived from class name |
| `--testSetup` | Test setup: `cypress` or `manual` | `manual` |
| `--skip` | Skip interactive prompts and use defaults | `false` |
| `--skipSubfolder` | Create files in current directory instead of a subfolder | `false` |

### Examples

**Non-interactive with a custom name**

```bash
npm create @ui5/webcomponents-package -- \
  --name "my-components" \
  --skip
```

**Scoped package with Cypress testing**

```bash
npm create @ui5/webcomponents-package -- \
  --name "@scope/my-lib" \
  --testSetup "cypress" \
  --skip
```

### What Gets Generated

The scaffolded project includes:

- A sample **web component** (`MyFirstComponent`) with a template, styles, and i18n
- **Dev server** with hot reload (`npm start`)
- **Build pipeline** for production (`npm run build`)
- **TypeScript** configuration
- **Cypress** test setup (if selected)
- **ESLint** configuration
- **Theming** infrastructure (SAP Horizon)

After the project is created:

```bash
cd my-package
npm install
npm start
```

## Generate a Component

Inside a scaffolded project, generate a new web component:

```bash
npm run create-ui5-element
```

This prompts for a PascalCase component name (e.g., `MyButton`) and generates three files:

| File | Purpose |
|------|---------|
| `src/<Name>.ts` | Component class with `@customElement` decorator |
| `src/<Name>Template.tsx` | JSX template |
| `src/themes/<Name>.css` | Component styles |

The tag name is derived automatically — `MyButton` becomes `my-my-button` (using the prefix from `.env`).

You can also pass the name directly:

```bash
npm run create-ui5-element "MyButton"
```

After generating, import the component in `src/bundle.esm.ts`:

```typescript
import "./MyButton.js";
```

## Project Commands

Every scaffolded project comes with these commands:

| Command | Description |
|---------|-------------|
| `npm start` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run create-ui5-element` | Generate a new web component |
| `npm run lint` | Lint the project |
| `npm run clean` | Clean generated and build artifacts |
| `npm test` | Run tests (if Cypress was selected) |

[View on npm](https://www.npmjs.com/package/@ui5/create-webcomponents-package) · [GitHub](https://github.com/SAP/ui5-webcomponents/tree/main/packages/create-package)
