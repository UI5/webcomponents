# Runner Prompt

You are starting a fresh session against the **UI5 Web Components** monorepo (`/Users/i524143/SAPDevelop/ui5-webcomponents`). Read this whole prompt before doing anything.

# ISSUES

Issues live as markdown files under `.scratch/<feature-slug>/issues/`. Each issue has a `Status:` line near the top using the vocabulary in `docs/agents/triage-labels.md`. The parent PRD for each feature is at `.scratch/<feature-slug>/PRD.md`.

To find work: list `.scratch/*/issues/*.md` and read any whose `Status: ready-for-agent`. For each candidate, read the parent PRD at `.scratch/<feature-slug>/PRD.md`, the project glossary at `CONTEXT.md`, and any ADRs under `docs/adr/` that touch the area.

# TASK SELECTION

Pick exactly one task. Prioritize in this order:

1. **Critical bugfixes** (anything described as breaking the build, the dev server, or a shipping component).
2. **Tracer bullets for new features.** A tracer bullet is a thin vertical slice that cuts through every layer end-to-end, gives early feedback, and is independently demoable. Pick the lowest-numbered unblocked `ready-for-agent` issue whose "Blocked by" list is fully satisfied (blockers have `Status: done` or are not present).
3. **Polish and quick wins** (small UX, accessibility, or stability improvements that are isolated).
4. **Refactors** that are not on the critical path.

If nothing is `ready-for-agent` and unblocked, output `<promise>COMPLETE</promise>` and stop.

# EXPLORATION

Before writing code, load the relevant context into your working memory:

- The chosen issue file in full, including acceptance criteria and "Blocked by".
- The parent PRD at `.scratch/<feature-slug>/PRD.md`.
- `CONTEXT.md` — use this vocabulary in code, comments, and tests. Do not invent new terms.
- Any ADR under `docs/adr/` that mentions the area you are touching. ADRs are binding.
- `AGENTS.md` (and `CLAUDE.md` which re-exports it) for project conventions: Yarn v4 + Lerna monorepo; Node ^20.19.0 or >=22.12.0; TypeScript; `customElement` decorator with `jsxRenderer`; `@property()` / `@slot()` / `@event()` decorators; CSS via `.css` files generated into `src/generated/themes/`; i18n via `.properties` files; never run all tests locally — only the component's spec.
- `packages/base/AGENTS.md` for the per-package quick-reference rules (enum imports as `type`-only, DOM queries via `[ui5-tag]` attribute selectors, no `instanceof` for components, no manual ref mutation — use templates).
- The exact source files the issue scopes you to. Do not edit files outside that scope.
- The closest existing tests as prior art (Cypress component tests under `packages/<pkg>/cypress/specs/`). Do not introduce new test infrastructure.

# EXECUTION

Complete the single chosen task and only that task, using **test-driven development**.

Rules per cycle:

- Write **one** Cypress test that describes one behavior in domain vocabulary from `CONTEXT.md`.
- Run that single test and confirm it is RED:
  - `cd packages/<pkg> && yarn test:cypress:single cypress/specs/<Component>.cy.tsx`
  - Use `it.only(...)` to scope to the one new test during the RED→GREEN cycle. Remove `.only` before moving on.
- Write the **minimum** TypeScript/CSS/template change to make it GREEN.
- Refactor only while GREEN.
- Repeat.

Use the right flavor of TDD for the chosen issue:

- **New behavior or new public API** (for example: adding a property to `ToolbarItemBase`, changing layout distribution in `Toolbar`): classic RED → GREEN → REFACTOR. Tests describe **external behavior** by mounting the component, manipulating its slotted children/properties, and asserting on the rendered shadow DOM, custom states (`:state(overflowed)`), accessibility tree, or visible class names. Do not call private methods. Do not assert on internal arrays or fields.
- **Structural migration / refactor**: seed RED from existing tests. Move or rewrite one existing test against the new module name or new public shape. That test starts RED. Make it GREEN by introducing the new module and delegating from the old one. Then migrate the next test. Do not migrate tests in bulk.

Constraints during execution:

- One test at a time. Do not write all tests first.
- Only enough production code to pass the current test. Do not add speculative features.
- Tests verify external behavior, not private methods. A test that breaks on a rename without any behavior change is wrong.
- Honor the rules in `packages/base/AGENTS.md`:
  - Import enums as `type` and use template-literal types (`prop: \`${Enum}\``); never use enum-value access like `Enum.Value` at runtime — write the string literal.
  - Query the DOM with attribute selectors (`[ui5-tag]`), not element selectors (`ui5-tag`).
  - Use the project's `isInstanceOf<Component>()` helpers, not `instanceof`.
  - Mutate DOM through templates, not by writing to refs.
- Do not change unrelated components, build configs, or generated files under `src/generated/`.
- If you change a `.css` or `.properties` file, the dev server's `yarn generate` watch will regenerate; if you are not running the dev server, run `yarn generate` from the repo root once.
- `yarn lint` must pass from the repo root.
- The chosen component's Cypress spec must be green end-to-end at the end of the task (run without `.only`).
- Never run the full test suite. Only the component's own spec.

When done, verify every acceptance-criteria checkbox in the issue is satisfied.

# REPORT

Do not commit, push, or modify git state. Leave the working tree dirty for the human to review.

Output a short final report:

1. Issue path that was worked on.
2. Acceptance criteria status (checked / unchecked) with one-line evidence for each.
3. Files added.
4. Files modified.
5. Tests added or migrated, in the order they were written, with the behavior each one describes.
6. Result of `yarn lint` (from repo root) and `yarn test:cypress:single cypress/specs/<Component>.cy.tsx` (from the component's package) — full file run, no `.only`.
7. Anything that should become a follow-up issue (do not create the issue file).

# FINAL RULES

- ONLY WORK ON A SINGLE TASK.
- Do not start a follow-up task in the same run, even if it looks easy.
- Do not modify `CONTEXT.md`, files under `docs/adr/`, or files under `docs/agents/` unless the chosen issue explicitly says so.
- Do not create new files outside what the chosen issue implies.
- Do not modify the chosen issue file's `Status:` line, and do not close it.
- Do not commit, amend, push, or change any git state.
