# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **For component developers:** If you're building components using `@ui5/webcomponents-base` as a dependency, see [`packages/base/CLAUDE.md`](./packages/base/CLAUDE.md) for reusable development patterns and best practices that apply to any component library built on this framework.

## Project Overview

UI5 Web Components is an enterprise-grade, framework-agnostic web components library implementing SAP Fiori design. It's a Yarn-based monorepo using Lerna and Yarn Workspaces.

**Requirements:** Node.js ^20.19.0 or >=22.12.0, Yarn v4 (via Corepack: `corepack enable`)

## Common Commands

Root folder commands:
```bash
# Building
yarn generate           # Processes .css and .properties files and generates `.ts` files
yarn ts                 # TypeScript compilation, always run in the root folder as the monorepo uses typescript workspaces

# Linting
yarn lint               # Lint all packages
```

Package level commands  (e.g., packages/main/):
```bash
cd pacakges/main
# Testing in a specific package
yarn test:cypress              # Run all Cypress tests
yarn test:cypress:single cypress/specs/Button.cy.tsx  # Run single test file
```

## Understanding the build and test process for development

### Build steps
There are 2 build steps relevant for development. They are alywas executed in the root folder, never in the package folders.
1. `yarn generate` in the root folder - generates `.ts` files (usually in `src/generated`) accessed by components. These files contain content from `.css` and `.properties` files for the runtime. Needs to run once (in a clean state), or when there are `.css` or `.properties` files changes. If the dev server is running, the files will be auto updated, but a `yarn generate` will fix any errors concerning `generated` imports.
2. `yarn ts` in the root folder - populates the dist folder with `.js` and `.d.ts` files that are published. Can be used to check for TypeScript errors. The submitted `.ts` files contain imports to the generated `.ts` files, so step 1 

Always make sure TypeScript is passing without errors before running a test.

### Test steps
Unless instructed specifically, never run all tests locally. Run single component tests relevant to the change being implemented. Tests commands are alywas executed in the package folder, never in the root folder.

```bash
cd packages/main # or fiori, etc.
yarn test:cypress:single cypress/specs/<Component>.cy.tsx  # Run single test file
```

The test will consume the `.ts` files directly and will detect TypeScript errors, there is no need to run the `yarn ts` command before running a test.

### Running single test case from a test file
When fixing a failing test, check the fix by running just the failing test case instead of all tests in the file.

Example of failing test case:
```tsx
	it("should set correct tooltip to right text button", () => {
```

Use `.only` to verify the fix faster
```tsx
	it.only("should set correct tooltip to right text button", () => {
```

Do this for each failing test case, remove `.only` when all cases are fixed and run the full test file or suite for final verification

### Dev server
When agents are running the above commands, there could be a dev server running, which will be running the `yarn generate` command in watch mode. This will not interfere with running commands from the agent.

## Monorepo Structure

Key packages in `/packages/`:
- **base**: Core framework, UI5Element base class, decorators, rendering
- **main**: Primary components (Button, Input, Table, etc.) - `@ui5/webcomponents`
- **fiori**: SAP Fiori-specific components (ShellBar, SideNavigation) - `@ui5/webcomponents-fiori`
- **ai**: AI-related components
- **theming**: Theming assets and base themes
- **localization**: i18n and CLDR assets
- **icons**, **icons-tnt**, **icons-business-suite**: Icon collections
- **tools**: Build tools, dev server, CLI

## Commit Message Format

Follow [Conventional Commits](https://conventionalcommits.org):

```
<type>(<scope>): <description>

[body]

[footer]
```

**Types:** `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
**Scope:** Component name (e.g., `ui5-button`, `ui5-table`)
**Description:** Imperative present tense, max 100 chars, no period

Example:
```
fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
```
