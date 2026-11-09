# Custom Commands Guide

> **Reference file** — jump to the relevant section with `##` heading search; do not read linearly.

## Existing Command Families — Do Not Recreate

Before writing any new command, check whether a family already exists for that component:

**Discover existing commands:**
```sh
grep -r "Cypress.Commands.add" packages/{package}/cypress/support/commands/
```

Command files live in:
- `packages/main/cypress/support/commands/`
- `packages/fiori/cypress/support/commands/`
- `packages/ai/cypress/support/commands/`

Most popup families have `Open`/`Opened` state helpers (see § Popup Open/Closed Utilities below for implementation patterns). The `Closed` variant is **not universal** — read the commands file for the relevant family before assuming a `Closed` helper exists. Use these commands instead of asserting the `open` attribute yourself.

---

## Identifying Repetitive Patterns → Custom Commands

When writing or reviewing tests, look for:
- Open/close sequences for overlay components (dialogs, popovers, menus, pickers) — these are the most common and most important commands to extract
- Interaction sequences repeated across tests (toggle, select, type + assert) — copy-pasted `it()` steps are a clear signal
- The same sequence of getting an element, mutating an attribute, and asserting on the result appearing in 2+ tests
- Multi-step `.shadow().find()` chains accessing the same sub-element in 2+ places — a single-step inline `find()` does not need a command

When you find such a pattern, extract it into a custom command.

### Commands belong to the subject's component type

A command lives in the commands file that matches **the type of its `prevSubject`**, not the top-level component being tested. If a command's subject is a `Calendar` element, it belongs in `Calendar.commands.ts` regardless of which test file uses it.

```typescript
// Wrong — DayPicker is a sub-element of Calendar, not DatePicker
// DatePicker.commands.ts:
Cypress.Commands.add("ui5DatePickerGetDayPicker", { prevSubject: true }, (subject: JQuery<DatePicker>) => { ... });

// Right — the subject is Calendar, so it lives in Calendar.commands.ts
// Calendar.commands.ts:
Cypress.Commands.add("ui5CalendarGetDayPicker", { prevSubject: true }, (subject: JQuery<Calendar>) => { ... });
```

Usage in a spec chains the two commands naturally:
```typescript
cy.get<DatePicker>("@datePicker")
	.ui5DatePickerGetCalendar()   // returns Chainable<JQuery<Calendar>>
	.ui5CalendarGetDayPicker()    // subject is Calendar — correct
	.should("be.visible");
```

### Inline vs command

A `find()` inside a spec is fine for a one-off access. Extract it into a getter command only when the same multi-step chain appears in more than one place:

```typescript
// Acceptable — single, one-off access
cy.get<DatePicker>("@datePicker")
	.shadow()
	.find("[ui5-calendar]");

// Extract when the same chain appears in 2+ places
cy.get<DatePicker>("@datePicker")
	.ui5DatePickerGetCalendar()
	.ui5CalendarGetDayPicker();
```

Always use attribute selectors inside `find()`, never bare tag names.

---

## Creating Custom Commands

### File location
```
packages/{package}/cypress/support/commands/{ComponentName}.commands.ts
```

### File structure

Every commands file must:
1. Import component types as `import type` at the top
2. Implement `Cypress.Commands.add` for each command, with the subject typed as `JQuery<ConcreteType>`
3. Include `declare global { namespace Cypress { interface Chainable { ... } } }` **in the same file**, after the implementations, using `this: Chainable<JQuery<SubjectType>>` constraints and typed return values
4. Use `{ prevSubject: true }` for commands that chain off a previous subject (most UI5 commands do)

**Template:**
```typescript
import type MyComponent from "../../../src/MyComponent.js";
import type InnerElement from "../../../src/InnerElement.js";

Cypress.Commands.add("ui5MyComponentGetInnerElement", { prevSubject: true }, (subject: JQuery<MyComponent>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-inner-element]");
});

Cypress.Commands.add("ui5MyComponentOpen", { prevSubject: true }, (subject: JQuery<MyComponent>) => {
	cy.wrap(subject)
		.as("component")
		.invoke("attr", "open", true);

	cy.get<MyComponent>("@component")
		.ui5MyComponentOpened();
});

Cypress.Commands.add("ui5MyComponentOpened", { prevSubject: true }, (subject: JQuery<MyComponent>) => {
	cy.wrap(subject)
		.as("component");
	cy.get<MyComponent>("@component")
		.should("have.attr", "open");
	cy.get<MyComponent>("@component")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.true;
			expect($rp.width()).to.not.equal(0);
			expect($rp.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
});

Cypress.Commands.add("ui5MyComponentClosed", { prevSubject: true }, (subject: JQuery<MyComponent>) => {
	cy.wrap(subject)
		.as("component");
	cy.get<MyComponent>("@component")
		.should("not.have.attr", "open");
	cy.get<MyComponent>("@component")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.false;
		})
		.and("not.have.attr", "open");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5MyComponentGetInnerElement(
				this: Chainable<JQuery<MyComponent>>
			): Chainable<JQuery<InnerElement>>
			ui5MyComponentOpen(
				this: Chainable<JQuery<MyComponent>>,
				options?: { opener?: string }
			): Chainable<void>
			ui5MyComponentOpened(
				this: Chainable<JQuery<MyComponent>>
			): Chainable<void>
			ui5MyComponentClosed(
				this: Chainable<JQuery<MyComponent>>
			): Chainable<void>
		}
	}
}
```

Key points about the `declare global` block:
- Use `this: Chainable<JQuery<SubjectType>>` to constrain which subject type the command accepts — TypeScript will error if you chain it off the wrong element type
- Return type should be the specific element type when known (`Chainable<JQuery<Calendar>>`, `Chainable<JQuery<HTMLInputElement>>`) rather than `Chainable<JQuery<HTMLElement>>`
- Use `Chainable<void>` for commands that assert or interact but don't return a new subject

### Command naming conventions
All UI5 custom commands are prefixed `ui5` followed by the component name in PascalCase, then the action. The component name in the prefix matches the **subject type**, not the test file:
- `ui5MenuOpen` / `ui5MenuOpened` / `ui5MenuClosed`
- `ui5DatePickerGetInnerInput` — subject is DatePicker
- `ui5CalendarGetDayPicker` — subject is Calendar (not `ui5DatePickerGetDayPicker`)
- `ui5SegmentedButtonItemToggleSelect`

---

## Popup Open/Closed Utilities

Do not repeat the popover state assertion inline in every command. Import `isPopupOpen` and `isPopupClosed` from the shared utils file:

```
packages/main/cypress/support/commands/utils/popup-open.ts
```

These helpers verify the full set of conditions that mean a popup is truly open or closed: the `open` attribute, the `:popover-open` CSS pseudo-class, and non-zero dimensions.

**Using them in a commands file:**

```typescript
import { isPopupOpen, isPopupClosed } from "./utils/popup-open.js";

Cypress.Commands.add("ui5DialogOpened", { prevSubject: true }, (subject: JQuery<Dialog>) => {
	isPopupOpen(() => cy.wrap(subject));
});

Cypress.Commands.add("ui5DialogClosed", { prevSubject: true }, (subject: JQuery<Dialog>) => {
	isPopupClosed(() => cy.wrap(subject));
});
```

When the popup is a shadow-DOM child (e.g. `ResponsivePopover` renders a `ui5-dialog` on phone), pass a getter that navigates to the correct element:

```typescript
Cypress.Commands.add("ui5ResponsivePopoverOpened", { prevSubject: true }, (subject: JQuery<ResponsivePopover>) => {
	if (isPhone()) {
		isPopupOpen(() =>
			cy.wrap(subject)
				.shadow()
				.find("[ui5-dialog]")
		);
	} else {
		isPopupOpen(() => cy.wrap(subject));
	}
});
```

**Never** copy the assertion block manually into a new command — always import from utils.

---

## Shared Types in `commands/common/types.ts`

The file `packages/main/cypress/support/commands/common/types.ts` exports shared types used across multiple command files. Before defining a local type in a commands file, check whether it already exists here.

Currently exported:

```typescript
export type ModifierKey = "shiftKey" | "ctrlKey" | "altKey" | "metaKey";
```

Import it when writing commands that accept modifier keys:

```typescript
import type { ModifierKey } from "../common/types.js";

Cypress.Commands.add("ui5InputType", { prevSubject: true }, (subject: JQuery<Input>, text: string, modifier?: ModifierKey) => {
  // ...
});
```

Add new shared types here (rather than duplicating them) when the same type would appear in two or more commands files.

---

## Registering Commands in commands.ts

After creating `{ComponentName}.commands.ts`, add an import to the package's `cypress/support/commands.ts`:

```typescript
// Keep imports in alphabetical order
import "./commands/{ComponentName}.commands.js";
```

**Note:** The `declare global` block belongs in the individual `{ComponentName}.commands.ts` file, not in `commands.ts`. Do not add type declarations to `commands.ts` — they belong in the component's own commands file.
