# Design: Migrate `ui5-dialog` to native `<dialog>` + `showModal()`

**Date:** 2026-09-18
**Status:** Proposed
**Scope:** `ui5-dialog` only (Popover / ResponsivePopover unchanged)

## Problem

Three accessibility issues trace to the same root cause:

- [#7938](https://github.com/SAP/ui5-webcomponents/issues/7938) — dialog obscured by block layer / interaction issues.
- [#6902](https://github.com/SAP/ui5-webcomponents/issues/6902) — JAWS "list buttons" navigation escapes the modal dialog.
- [#13906](https://github.com/SAP/ui5-webcomponents/issues/13906) — JAWS can still reach the underlying page's region structure when a dialog is open (SAP SuccessFactors, High Prio).

Today `Popup` (base of `Dialog`, `Popover`, `ResponsivePopover`) uses the **Popover API** (`popover="manual"` + `showPopover()`) on the **host** element and *fakes* modality: a `PopupBlockLayerTemplate` block layer, `aria-modal="true"`, manual focus-trap spans (`first-fe`/`last-fe`), page-scroll blocking, and an opened-popups registry for stacking.

`aria-modal` plus a visual block layer do **not** make background content genuinely `inert`, so screen readers (notably JAWS) can navigate outside the dialog. Only native `<dialog>` + `showModal()` gives browser-enforced top-layer placement, real `inert` on the rest of the document, and true screen-reader isolation.

## Goals

- `ui5-dialog` opens as a native `<dialog>` via `showModal()`, giving browser-enforced modality and screen-reader isolation.
- Preserve all existing Dialog behavior: draggable, resizable, fullscreen/`stretch`, centering, initial focus, focus restore, value-state roles, cancelable `before-open`/`before-close`, stacking, and OpenUI5 interop.
- No changes to `Popover` / `ResponsivePopover` behavior.

## Non-Goals

- Converting `Popover`/`ResponsivePopover` or the whole `Popup` base to native `<dialog>`.
- Redesigning the OpenUI5 interop model beyond the minimal change needed for detection.
- Visual/design changes beyond relocating existing styles onto the new root element.

## Key Architectural Facts (from investigation)

1. The host `<ui5-dialog>` is a custom element and **cannot** be a `<dialog>`. The native dialog must be the **shadow-root** element: today's `<section root-element class="ui5-popup-root">` becomes `<dialog root-element class="ui5-popup-root">`, and we call `this._root.showModal()`. This works inside shadow DOM and still promotes to the top layer + applies `inert` to the rest of the document.

2. **Consequence:** the top-layer element moves from the host to the shadow `<dialog>`. All positioning/centering/drag/resize writes, size CSS, and `::backdrop` migrate from `:host` / `this.style` onto the `<dialog>` (`this._root`).

3. **Shared top layer:** the Popover API (`showPopover`) and `showModal()` share the *same* browser top layer, ordered by insertion. The existing interop promotes OpenUI5 popups into that same top layer (`openNativePopoverForOpenUI5` in `patchPopup.ts`), so a WebC dialog via `showModal()` stacks correctly against promoted OpenUI5 popups — provided insertion order is preserved.

4. **Detection gap (concrete break):** `isNativePopoverOpen()` matches `:popover-open`, which does **not** match a modal `<dialog>` (`:modal`/`[open]`). Left unfixed, an OpenUI5 popup opened while a WebC `showModal` dialog is open would not be promoted into the top layer and would render behind it.

5. `isTopModalPopup` and the `OpenedPopupsRegistry` are still needed (fullscreen shortcut, ESC coordination, OpenUI5 interop). Native `<dialog>` does not replace them.

## Approach

**Approach A — Shadow `<dialog>`, parameterize the shared template.** Chosen.

Alternatives considered:
- **Approach B — standalone DialogTemplate:** duplicates header/content/footer scaffolding and risks drift with `PopupTemplate`.
- **Approach C — keep host `popover`, add manual `inert`:** not native `<dialog>`/`showModal()`; does not deliver browser-enforced screen-reader isolation. Rejected (contradicts requirement).

### Component-level changes

#### 1. Template — `PopupTemplate.tsx`, `DialogTemplate.tsx`
Parameterize `PopupTemplate` with:
- `rootTag`: `"section"` (default) or `"dialog"`.
- flags to omit the `first-fe`/`last-fe` focus-trap spans and the `PopupBlockLayerTemplate` when the root is native.

`DialogTemplate` passes `rootTag: "dialog"` and opts out of the focus-trap spans + block layer. `Popover`/`ResponsivePopover` render unchanged (`<section>`, spans, block layer intact). The inner header/content/footer structure is shared as today.

#### 2. Open / close — `Dialog.ts` (overriding `Popup.ts`)
- Override `_show()` to call `this._root.showModal()` instead of `showPopover()` on the host; do **not** set `popover` on the host for Dialog.
- Override `hide()` to call `this._root.close()`.
- Keep `openPopup`/`closePopup` orchestration, `before-open`/`before-close` events, registry add/remove, invisible-message region, and page-scroll handling (native inert covers interaction, but scroll-blocking of the host page is retained for parity unless testing shows the native behavior already suffices).
- Initial focus: `showModal()` auto-focuses; we still run `applyInitialFocus()` afterwards to honor `initialFocus`/`autofocus`/first-focusable, matching current behavior.
- `_getRealDomRef`/`_root` continue to return the `.ui5-popup-root` element, now a `<dialog>`.

#### 3. ESC handling
- Attach a listener for the `<dialog>`'s native `cancel` event; call `preventDefault()` and route closing through `closePopup(true)` so `before-close` remains cancelable.
- Suppress the `OpenedPopupsRegistry` global ESC path for the native-dialog case so ESC does not double-close. Keep `patchDialog`'s `onsapescape` suppression (`hasWebComponentPopupAbove`) working for OpenUI5 dialogs beneath a WebC dialog.

#### 4. Positioning & CSS — `Dialog.css`, `PopupsCommon.css`
- Relocate size/position rules that target `:host` (min/max sizes, `stretch`, `position`) onto the `<dialog>` root where required by the top-layer move.
- Rely on native centering (`<dialog>` UA `margin:auto; inset:0`) for the default case; write explicit `top`/`left`/`width`/`height` only when dragged/resized/fullscreen.
- Move `::backdrop` styling from `:host::backdrop` to the dialog's `::backdrop`.
- In `Dialog.ts`, change drag/resize/`_center` reads and writes (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `this.style.*`) to target `this._root` (the `<dialog>`).

#### 5. Interop — `patchPopup.ts`
- Extend `isNativePopoverOpen()` to also detect open modal dialogs (`:modal` or `dialog[open]`), recursing shadow roots as it already does for `:popover-open`.
- No other interop changes planned; validated empirically (below).

### Data / control flow (open)

1. `open = true` → `openPopup()` fires `before-open` (cancelable).
2. `_show()` → `this._root.showModal()` → dialog enters top layer, rest of document becomes `inert`.
3. Registry add → `isTopModalPopup` updated; page-scroll handling as today.
4. `applyInitialFocus()` applies configured/first focus.
5. `open` event fired after render settles.

### Close flow
`open = false` or native `cancel`/ESC → `closePopup()` fires `before-close` (cancelable) → `hide()` → `this._root.close()` → registry remove → focus restore (`resetFocus`) → `close` event.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Native inertness conflicts with OpenUI5 block layer / focus when nesting OpenUI5 popups above a WebC dialog | Spec says top-layer elements added after a modal dialog stay interactive; validate against `OpenUI5andWebCPopups.*` specs; adjust detection/promotion if needed |
| OpenUI5 popup rendered behind WebC dialog (detection gap) | Extend `isNativePopoverOpen()` to include modal dialogs |
| ESC double-close or bypassing cancelable `before-close` | Route native `cancel` through `closePopup`; suppress registry ESC for native dialog |
| Drag/resize/center regressions from host→dialog positioning move | Migrate reads/writes to `_root`; cover with existing `Dialog.cy.tsx` cases |
| `::backdrop` / animation/opening-class visual differences | Relocate backdrop + opening styles onto the dialog; visual check |

## Testing / Verification

- **Unit/integration:** `packages/main/cypress/specs/Dialog.cy.tsx` (drag, resize, fullscreen, focus, stacking, events) and all `packages/main/cypress/specs/OpenUI5andWebCPopups.*` specs.
- **Accessibility:** manual verification of #6902 and #13906 with a screen reader; confirm background is `inert` (not reachable) while the dialog is open.
- **Regression:** `Popover`/`ResponsivePopover` specs to confirm no change.
- Run per package guidance: `cd packages/main && yarn test:cypress:single cypress/specs/<Component>.cy.tsx`.

## Open Questions

- Whether host page-scroll blocking is still needed once native `inert` is in place (decide empirically during implementation; default to keeping it for parity).
- Whether the opening transition (`ui5-popup-opening` opacity) should move onto the dialog or the backdrop (visual check).
