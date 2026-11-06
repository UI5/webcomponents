---
name: writing-cypress-tests
description: |
  Write and review Cypress component tests for UI5 web components. Triggers: write/add Cypress tests ("write tests for X", "add spec for X"), review test files, create custom commands, debug flaky tests, or implicit "test this component", "verify attribute", "assert attribute", "check accessibility", "ARIA attributes", "shadow DOM", "test popover", "test dialog" in UI5 context.
user-invocable: true
packages: ["@ui5/webcomponents"]
---

# Writing Cypress Tests for UI5 Web Components

Write and review Cypress component tests that match the project's conventions. This main file is always loaded; load the references below that match your task.

| When you are… | Also load |
|---|---|
| Writing a new spec file from scratch | [`QUICK-REFERENCE.md`](./references/QUICK-REFERENCE.md) + [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Need a complete working example to start from | [`EXAMPLES.md`](./references/EXAMPLES.md) |
| Looking for a quick answer on a specific pattern | [`QUICK-REFERENCE.md`](./references/QUICK-REFERENCE.md) — rules only |
| Writing or restructuring a spec and need context or full examples | [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Adding or modifying custom commands | [`COMMANDS.md`](./references/COMMANDS.md) |
| Reviewing an existing spec | [`REVIEWING.md`](./references/REVIEWING.md) + [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Debugging a flaky or intermittent test | [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) — async focus, animation timing, CPU throttling |

## File locations

| What you need | Path |
|---|---|
| Component source | `packages/{package}/src/{ComponentName}.ts` |
| Cypress spec | `packages/{package}/cypress/specs/{ComponentName}.cy.tsx` |
| Custom commands | `packages/{package}/cypress/support/commands/{ComponentName}.commands.ts` |
| i18n keys | `packages/{package}/src/generated/i18n/i18n-defaults.js` (generated from `src/i18n/messagebundle.properties`) |

---

## Workflow

**Writing a spec:**
1. **Check [`QUICK-REFERENCE.md`](./references/QUICK-REFERENCE.md)** for selectors, async calls, popup open, keyboard input, ARIA, and cleanup patterns before reading other references
2. **Read the component source** (`packages/{package}/src/{ComponentName}.ts`) if you don't know its props, events, or shadow DOM structure
3. **Check for existing commands** in `packages/{package}/cypress/support/commands/` — don't duplicate
4. **Write the spec file** following [`WRITING-SPECS.md`](./references/WRITING-SPECS.md), with `cy.get<T>()` generics throughout

**If you also need custom commands** (repeated interaction sequences across tests):

1. **Extract repeated sequences into commands** per [`COMMANDS.md`](./references/COMMANDS.md)
2. **Create the commands file** following the template in [`COMMANDS.md`](./references/COMMANDS.md); update `commands.ts` with the import (alphabetical)

**When reviewing** an existing test file, use the checklist in [`REVIEWING.md`](./references/REVIEWING.md) and verify against [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) conventions.

## Reporting

Report created/modified files with relative paths from the package root: `packages/main/cypress/specs/Component.cy.tsx`, `packages/main/cypress/support/commands/Component.commands.ts`.