---
applyTo: "packages/*/cypress/specs/**/*.cy.tsx,packages/*/cypress/support/commands/**/*.ts"
---

# Cypress Testing Instructions for UI5 Web Components

When writing, modifying, or reviewing Cypress component tests (`*.cy.tsx`) or
custom Cypress commands in this repository, follow the project's Cypress testing
skill:

- **Primary guidance:** [`skills/cypress/SKILL.md`](../../skills/cypress/SKILL.md)
- **Custom commands:** [`skills/cypress/references/COMMANDS.md`](../../skills/cypress/references/COMMANDS.md)
- **Reviewing existing specs:** [`skills/cypress/references/REVIEWING.md`](../../skills/cypress/references/REVIEWING.md)

## Key rules (see the skill for full details)

- Use **real events** (`cy.realClick()`, `cy.realPress()`, `cy.realType()`) instead of synthetic `.click()` / `.type()`.
- Select components by **attribute notation** — `cy.get("[ui5-button]")`, never the tag name.
- Type element boundaries with generics — `cy.get<Button>("[ui5-button]")`.
- Await async base-API calls via `cy.wrap({ fn }).then(async ({ fn }) => { await fn(args); })` and reset global config (language, theme) in `afterEach`.
- Assert on **public props** and **rendered shadow DOM**, not private internals — every test needs a meaningful assertion beyond `"exist"`.
- Extract repeated interaction sequences into `ui5<Component><Action>` custom commands.
