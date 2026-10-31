---
name: writing-cypress-tests
description: |
  Write and review Cypress component tests for UI5 web components. Triggers: write/add Cypress tests ("write tests for X", "add spec for X"), review test files, create custom commands, debug flaky tests, or implicit "test this component" in UI5 context.
user-invocable: true
packages: ["@ui5/webcomponents"]
---

# Writing Cypress Tests for UI5 Web Components

Write and review Cypress component tests that match the project's conventions. This main file is always loaded; load the references below that match your task.

| When you are… | Also load |
|---|---|
| Writing, restructuring, or asserting on a spec file | [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Adding or modifying custom commands | [`COMMANDS.md`](./references/COMMANDS.md) |
| Reviewing an existing spec | [`REVIEWING.md`](./references/REVIEWING.md) + [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Debugging a flaky or intermittent test | [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) |
| Unsure of the expected structure or conventions | [`EXAMPLES.md`](./references/EXAMPLES.md) |

## Troubleshooting

Tests that pass locally and fail in CI waste PR cycles — if a test is intermittently failing, load [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) for debugging guidance on common causes (async focus, animation timing, CPU throttling reproduction).

---

## Running tests

Run from the package folder, scoped to the component — the full suite is slow:

```bash
cd packages/main
yarn test:cypress:single cypress/specs/<Component>.cy.tsx
```

Add `.only` to isolate a failing `it()` while iterating; remove it and run the full spec before committing.

---

## Formatting

One statement per line, tab-indented chains.

---

## TypeScript Generics

Pass the component type to every `cy.get<T>()` selecting a UI5 component — this lets TypeScript verify chained custom commands (e.g. `.ui5DatePickerGetCalendar()`). See WRITING-SPECS.md § TypeScript generics.

---

## Workflow

1. **Read the component source** (`packages/{package}/src/{ComponentName}.ts`) if you don't know its props, events, or shadow DOM structure
2. **Check for existing commands** in `packages/{package}/cypress/support/commands/` — don't duplicate
3. **Write the spec file** following [`WRITING-SPECS.md`](./references/WRITING-SPECS.md), with `cy.get<T>()` generics throughout
4. **Extract repeated sequences into commands** per [`COMMANDS.md`](./references/COMMANDS.md)
5. **Create the commands file** following the template in [`COMMANDS.md`](./references/COMMANDS.md); update `commands.ts` with the import (alphabetical)
6. **When reviewing** an existing test file, use the checklist in [`REVIEWING.md`](./references/REVIEWING.md) and verify against [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) conventions

## Reporting

Report created/modified files with relative paths from the package root: `packages/main/cypress/specs/Component.cy.tsx`, `packages/main/cypress/support/commands/Component.commands.ts`.