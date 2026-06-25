# 03 — Toolbar overflow group: website sample

Status: ready-for-agent

## Parent

PRD: `.scratch/toolbar-overflow-group/PRD.md`
ADR: `docs/adr/0001-toolbar-overflow-group.md`

## What to build

A documentation-website sample that demonstrates grouped overflow on `ui5-toolbar`, so a developer browsing the docs can copy a working example and adapt it.

The sample follows the existing convention under `packages/website/docs/_samples/main/Toolbar/`: a folder containing `sample.html`, `main.js`, and a Markdown wrapper that loads them into the playground `<Editor>` component.

End-to-end behavior the user sees on the documentation website:

- Opening the sample shows a `ui5-toolbar` whose width is constrained so that overflow is observably triggered as the viewport narrows.
- The toolbar contains at least one ungrouped item plus a group of two or three items sharing the same `overflow-group` value. A label-and-control pairing (e.g. a `ui5-toolbar-button` acting as a label next to a `ui5-toolbar-select`) is a good fit because it makes the "stay together" promise visually obvious.
- The sample includes a brief inline comment or surrounding prose explaining: items with the same `overflow-group` overflow together, and the property is a free-form string label.
- The interactive playground renders the sample and lets the user widen/narrow the preview to watch the group enter and leave the overflow popover atomically.
- The sample appears in the Toolbar documentation page navigation alongside existing Toolbar samples.

This is a documentation-only deliverable. No source code in `packages/main` is touched.

## Acceptance criteria

- [ ] A new folder under `packages/website/docs/_samples/main/Toolbar/` contains `sample.html`, `main.js`, and a `<SampleName>.md` Markdown wrapper, following the convention documented in `AGENTS.md`.
- [ ] The sample HTML uses `<!-- playground-fold -->` markers so only the relevant component usage is visible in the playground to end users.
- [ ] The sample renders a toolbar with at least one ungrouped item and one named overflow group containing at least two items.
- [ ] The sample is wired into the Toolbar docs page navigation so it is discoverable from the Toolbar component page.
- [ ] Running `yarn start` in `packages/website` and opening the Toolbar page shows the sample loading in the interactive editor with no console errors.

## Blocked by

- Issue 01 — Toolbar overflow group: core grouped overflow behavior.
