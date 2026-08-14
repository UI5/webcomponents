# Testing

Cypress component tests in TSX, mounting real components. Under `packages/<pkg>/cypress/specs/`:
`<Component>.cy.tsx`, `<Component>.mobile.cy.tsx` (phone, via `cy.ui5SimulateDevice("phone")`), `base/`
(framework-level), `visuals/` (screenshots, only with `CYPRESS_VISUAL=true`). Commands: `INDEX.md`. Add
`.only` to one case while iterating; remove it and run the full spec file before you finish.

## Mounting

```tsx
cy.mount(<Button icon={download} design="Negative">Action Bar Button</Button>);

cy.get<Button>("[ui5-button]")
	.shadow()
	.find(".ui5-button-text>bdi>slot")
	.should("have.length", 1, "Button text is not rendered");
```

`cy.mount` waits for rendering and for `document.fonts.ready`; never follow it with a wait. Import
every icon you use — the test bundle contains all of them, so a missing import passes here and breaks
in a real application.

## Selecting

Use `[ui5-*]` everywhere — tag selectors break under scoping, and `/test-lint` flags them. A residue
of tag-name `cy.get("ui5-…")` calls survives in the specs; do not add to it.
The rule holds inside `.shadow().find(...)` as well:

```tsx
cy.get("[ui5-button]")            // attribute selector, never the tag name
	.shadow()                     // cross into the shadow root
	.find(".ui5-button-text");    // internal element

// wrong, should be "[ui5-tag]"
cy.get("@badge").shadow().find("ui5-tag").as("tag");
```

## Interacting

| Use | Not |
|-----|-----|
| `.realClick()` | `.click()` |
| `.realPress("Enter")` | `.type("{enter}")` |
| `.realType("hello")` | `.type("hello")` |
| `.realHover()` | `.trigger("mouseover")` |

**`realPress` and `realType` take no subject.** They dispatch CDP key events to whatever currently has
focus, so a piped subject is ignored. In practice specs focus the target first, then type — most often
against the native input inside the shadow root: `cy.get("@input").shadow().find("input").realType("abc")`.
Never chain them after a *focus-changing* command in the same chain: the preceding command's focus
change has not settled.

```tsx
// wrong — realType chained after another command
cy.get("@startTooltipInput").realClick().realType("23");

// right — two statements
cy.get("@startTooltipInput").realClick();
cy.realType("23");
```

A few such chains survive in the specs. Do not add more.

**There is no `realClear()`.** For a native input inside the shadow root, Cypress's built-in
`.clear()` works. Otherwise clear by selecting all and typing over it, by pressing Escape, or by
clicking the component's own clear icon.

**Never use `cy.wait(<number>)`.** Assert the condition instead; `should` retries. Numeric waits
remain throughout the existing specs — do not add more.

```tsx
// wrong — the assertion already retries
cy.wait(3000);
cy.get("#field").shadow().find<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverClosed();
```

To wait for a render, use `cy.waitRenderFinished()`. It is new, so there is no precedent in the
existing specs to copy — use it anyway rather than a numeric wait.

## Asserting

`have.attr` for reflected properties and ARIA; `have.prop` for state that is not reflected to an
attribute.

```tsx
.should("have.attr", "title", "my tooltip");
cy.get("#myInput2").should("have.prop", "focused", true);
```

## Asserting on events

No global event helper — attach a stub:

```tsx
cy.get("@tag").then(tag => {
	tag.get(0).addEventListener("click", cy.stub().as("clicked"));
});

cy.get("@tag").realClick();

cy.get("@clicked").should("have.been.calledOnce");

// payload
cy.get("@clickHandler").should("be.calledWithMatch", { detail: { ctrlKey: true } });
```

StepInput has a dedicated helper — `ui5StepInputAttachHandler(eventName, stubName)`. No other
component has one.

## Asserting on focus

`UI5Element.focus()` is asynchronous, so an alias captured before the interaction can be stale.

```tsx
// wrong, races in CI
cy.get("@defaultColorButton").should("have.focus");

// right
cy.focused().should("have.attr", "aria-label").and("include", "cyan");
```

`cy.focused()` returns the inner shadow focus ref, not the host, so host-level `value` or
`[ui5-color-palette-item]` are not on it — assert `aria-label`.

## Text and i18n

Compare against the bundle, never an English literal:

```tsx
.should("have.attr", "aria-label", Form.i18nBundle.getText(FORM_GROUP_ACCESSIBLE_NAME, "1"));
```

Non-default locales and `Assets.js`: `i18n.md`.

## Custom commands

Framework-level commands live in the shared cypress-internal package; package-level ones in each
package's `support/commands.ts`:

| Command | Behaviour |
|---------|-----------|
| `cy.mount(jsx)` | Mount, wait for render, wait for `document.fonts.ready` |
| `cy.waitRenderFinished()` | Drain the render queue |
| `cy.focus` | Overwritten — waits for render, then routes through the UI5 element's own `focus()` |
| `realClick`, `realHover`, `realTouch`, `realSwipe`, `realMouseDown`, `realMouseUp`, `realMouseMove` | Overwritten — wait for render, then assert the element is visible and has a DOM ref |
| `realPress`, `realType` | Overwritten — wait for render only |
| `cy.screenshot` | Overwritten — honours the `SCREENSHOT_DELAY` env var |
| `cy.ui5SimulateDevice("phone")` | Force phone behaviour; `"phone"` is the only device |
| `cy.ui5AssertValidityState(partial)` | Assert any subset of form validity state |
| `cy.ui5UserMenuOpen(options?)`, `cy.ui5UserMenuOpened()` | fiori UserMenu helpers |

`cy.ui5DOMRef()` is declared in `support/commands.ts` but never implemented —
it type-checks and fails at runtime. Do not call it.

Many `ui5*` commands exist, named `ui5<Component><Action>`. Read the existing
`support/commands/` files before writing a helper; these families already have one:
Calendar, ColorPalette, ColorPalettePopover, ColorPicker, DatePicker, DateRangePicker, DateTimePicker,
TimePicker, TimeSelectionClocks, DynamicDateRange, Dialog, Popover, ResponsivePopover, Menu, MenuItem,
SegmentedButton, StepInput, Switch, TabContainer, ToggleButton, plus AI Button and UserMenu (fiori).
Most popup families have `Open`/`Opened` state helpers; the `Closed` variant is not universal —
`Menu` and `ResponsivePopover` have it, but `Dialog` and `Popover` expose only `Opened`. Read the
`support/commands/` file for the family before assuming a `Closed` helper exists. Use these instead
of asserting the `open` attribute yourself.

## Visual tests

Import the component; from `specs/visuals/` the source path is one level deeper than a normal spec.
`/visual-test` skill lists the components that need a specific parent container.

```tsx
import Avatar from "../../../src/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";

cy.mount(<Avatar size="XS" initials="XS" />);
cy.screenshot();
```

## What to cover

Default rendering; every new property including its default; each event's payload and call count; the
keyboard path, not just the click path; ARIA attributes; disabled and read-only states not reacting.

## Flaky tests

1. **Async focus.** A stale alias instead of `cy.focused()`.
2. **Animation.** `setAnimationMode(None)` does not disable CSS `@keyframes`; a component that waits
   for `animationend` must also branch on `getAnimationMode()`.
3. **Deferred focus after render.** A handler focusing in `onAfterRendering` can land after your
   assertion — await `cy.waitRenderFinished()`. In component code prefer `getFocusDomRef().focus()`
   over the async `UI5Element.focus()`: synchronous, and the caller stays in the stack trace (same
   memory).
4. **`forcedTabIndex` re-render.** `ItemNavigation.setCurrentItem()` changes `forcedTabIndex`, which
   schedules an async re-render that races the synchronous focus call (ColorPalette 2026-04-02 memory).
5. **Container keydown handler.** A handler on a container receives events from every descendant;
   resolve the intended item through `event.composedPath()`, never `e.target`.
6. **Preact event proxy.** Move the handler to a wrapper `div` — `component-anatomy.md`.
7. **A real race in the component.** Reproduce with CDP CPU throttling. If it reproduces at 5-6x it is
   a product bug — switch to the bugfix workflow.

```ts
cy.wrap(null).then(() => Cypress.automation("remote:debugger:protocol", {
	command: "Emulation.setCPUThrottlingRate",
	params: { rate: 6 },
}));
```
