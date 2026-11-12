# UI5 Web Components — AI Knowledge Base

The conventions, best practices, and established patterns of this repository, for any AI coding
tool. Use it for every code task — fixing bugs, building features, refactoring, reviewing, and
testing. Find your task in the routing table and open only the files it names; do not read every
file. If the task touches no component code, you do not need it.

## Routing table

| Your task | Open |
|-----------|------|
| Changing component code, and you are not sure what applies | [`references/core-rules.md`](./references/core-rules.md) |
| Debugging a bug, a failing spec, or a build error | [`references/commands-and-debugging.md`](./references/commands-and-debugging.md) (Debugging) |
| Reviewing a diff, or checking your own work before declaring done | [`references/core-rules.md`](./references/core-rules.md) (Reviewing a diff), then [`references/commands-and-debugging.md`](./references/commands-and-debugging.md) (Checking your work) |
| Adding or changing a property, slot, event, or public method | [`references/api-design.md`](./references/api-design.md) for shape and JSDoc, plus [`references/core-rules.md`](./references/core-rules.md) for invariants |
| Understanding how a component is assembled, or which file does what | [`references/component-anatomy.md`](./references/component-anatomy.md) |
| Creating a brand-new component | [`references/new-component.md`](./references/new-component.md) for the steps, [`references/component-anatomy.md`](./references/component-anatomy.md) for file layout and member order, [`references/api-design.md`](./references/api-design.md) for the public surface and its JSDoc |
| CSS, theming, design tokens, RTL, `::part`, `:host` | [`references/theming-and-css.md`](./references/theming-and-css.md) |
| Keyboard navigation, ARIA, focus, screen reader output | [`references/accessibility.md`](./references/accessibility.md) |
| Any text a user can see | [`references/i18n.md`](./references/i18n.md) |
| Unnecessary re-renders, slow interaction, invalidation | [`references/performance.md`](./references/performance.md) |
| A test that passes locally and fails in CI | [`references/performance.md`](./references/performance.md) |
| Build fails with a documentation error | [`references/api-design.md`](./references/api-design.md) (JSDoc that passes CEM) |
| Which command to run | [`references/commands-and-debugging.md`](./references/commands-and-debugging.md) (Commands) |

## When sources disagree

1. `references/` governs how you write new code. The rules are absolute even where existing code
   disagrees; where legacy code is known to violate a rule, the reference names it so you can
   recognise the violation rather than copy it.
2. Neighbouring source code governs structure and idiom — file layout, naming, how a template is put
   together. Copy its shape, not its rule violations. `Button.ts` is the reference component.
