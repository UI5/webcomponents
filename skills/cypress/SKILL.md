---
name: cypress-test-writer
description: |
  Write, review, and improve Cypress component tests for UI5 web components following the project's testing conventions. Use this skill whenever the user asks to:
  - Write or add Cypress tests for a UI5 component ("write cypress tests for X", "add cypress spec for X", "create tests for X")
  - Review existing cypress test files for quality or correctness
  - Add custom Cypress commands for a component ("add cypress commands for X")
  - Extract repetitive interaction patterns into reusable commands
  - Check whether tests follow UI5 testing conventions (real events, attribute selectors, async API patterns)
  Trigger even when the user says things like "test this component", "make sure X works", or "help me write a spec" without saying "Cypress" explicitly — if the context is a UI5 web component in this repo, use this skill.
user-invocable: false
---

# Cypress Test Writer for UI5 Web Components

## Overview

This skill helps write and review Cypress component tests for UI5 web components. It encodes the project's testing conventions so every test file and command is consistent with the existing codebase.

### Which files to load

`SKILL.md` (this file) is always loaded. Load the additional references below that match your task — combine them when a task spans several.

| When you are… | Also load |
|---|---|
| Writing or restructuring a spec file | [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) |
| Adding or modifying custom commands | [`COMMANDS.md`](./references/COMMANDS.md) |
| Reviewing an existing spec | [`REVIEWING.md`](./references/REVIEWING.md) (checklist) + [`WRITING-SPECS.md`](./references/WRITING-SPECS.md) (the standard) |
| Debugging a flaky or intermittent test | [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) |

---

## Quick Rules

### Interacting — always use real events

| Use | Not |
|-----|-----|
| `.realClick()` | `.click()` |
| `.realPress("Enter")` | `.type("{enter}")` |
| `.realType("hello")` | `.type("hello")` |
| `.realHover()` | `.trigger("mouseover")` |

**`realPress` and `realType` take no subject.** They dispatch CDP key events to whatever currently has focus — a piped subject is silently ignored. Focus the target first, then call them as a separate statement:

```typescript
// Wrong — realType is chained after realClick; the focus change hasn't settled
cy.get("@input")
	.realClick()
	.realType("23");

// Right — two statements
cy.get("@input")
	.realClick();
cy.realType("23");
```

**There is no `realClear()`.** To clear a native input inside the shadow root use Cypress's built-in `.clear()`. Otherwise: select all and type over, press Escape, or click the component's own clear icon.

**Never use `cy.wait(<number>)`.** Assert the condition instead — `should` retries automatically. To wait for a render cycle use `cy.waitRenderFinished()`:

```typescript
// Wrong — numeric wait
cy.wait(3000);
cy.get("[ui5-responsive-popover]")
	.ui5ResponsivePopoverClosed();

// Right — assert the condition; should retries
cy.get("[ui5-responsive-popover]")
	.ui5ResponsivePopoverClosed();

// When you need to wait for a render cycle
cy.waitRenderFinished();
```

### Always use attribute selectors
```typescript
// Wrong
cy.get("ui5-button")
// Right
cy.get("[ui5-button]")
```

### Calling async base API methods
The UI5 base API (`setLanguage`, `setTheme`, etc.) returns Promises. Never call them bare — Cypress won't await them. Always use `cy.wrap({ fn }).then(async ({ fn }) => { await fn(args); })`:

```typescript
// Wrong — promise not awaited
setLanguage("bg");

// Wrong — .then(api => ...) does not await the promise
cy.wrap({ setLanguage })
	.then(api => api.setLanguage("bg"));

// Correct — async/await inside .then() ensures the promise is resolved before Cypress continues
cy.wrap({ setLanguage })
	.then(async ({ setLanguage }) => {
		await setLanguage("bg");
	});

// Reading the result after an async call
cy.wrap({ getLanguage })
	.then(({ getLanguage }) => getLanguage())
	.should("equal", "bg");
```

### Setting properties and attributes

Use `.invoke()` to set a property or attribute on a component:

```typescript
// Set a property
cy.get("[ui5-button]")
	.invoke("prop", "myProp", "newValue");

// Set an attribute
cy.get("[ui5-button]")
	.invoke("attr", "open", true);
```

### DOM traversal
```typescript
// Shadow DOM
cy.get("[ui5-button]")
	.shadow()
	.find("button")

// Slots / light DOM children
cy.get("[ui5-button]")
	.find("[ui5-icon]")
```

---

## Formatting

### One method per line

Every chained method gets its own line with a leading tab. Never chain methods on the same line as `cy.get()`:

```typescript
// Wrong
cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverClosed();
cy.get("[ui5-button]").shadow().find("button").should("be.visible");

// Right
cy.get("[ui5-responsive-popover]")
	.ui5ResponsivePopoverClosed();

cy.get("[ui5-button]")
	.shadow()
	.find("button")
	.should("be.visible");
```

### Blank lines between steps

Separate distinct test steps with a blank line:

```typescript
cy.get("[ui5-button]")
	.as("button");

cy.get("@button")
	.realClick();

cy.get("@clicked")
	.should("have.been.calledOnce");
```

### Multiple assertions — use `.and()`

```typescript
cy.get("@clickHandler")
	.should("have.been.calledOnce")
	.and("be.calledWithMatch", {
		type: "click"
	});
```

### `.then()` callbacks

Opening brace on the same line as the arrow function; body indented; closing brace on its own line:

```typescript
cy.get<Button>("[ui5-button]")
	.then($button => {
		const button = $button.get(0);
		expect(button.accessibilityInfo.role).to.equal("button");
	});
```

### `cy.mount()` with JSX

JSX children indented, closing tag aligned with the component opening tag:

```typescript
cy.mount(
	<ComboBox valueState="Negative">
		<ComboBoxItem text="Albania" />
		<ComboBoxItem text="Bulgaria" />
	</ComboBox>
);
```

### Indentation

Use **tabs**, not spaces.

---

## TypeScript Generics

### Type `cy.get<T>()` at every element boundary

Pass the concrete component type as a generic to `cy.get<T>()` so TypeScript can verify that the commands chained on the result are valid for that element type. Do this for every `cy.get` that selects a UI5 component — both selector strings and aliases.

```typescript
// Wrong — TypeScript cannot verify commands are valid for this element
cy.get("[ui5-date-picker]")
	.ui5DatePickerGetCalendar();
cy.get("@datePicker")
	.ui5DatePickerGetCalendar();

// Right — TypeScript knows the subject is a DatePicker
cy.get<DatePicker>("[ui5-date-picker]")
	.ui5DatePickerGetCalendar();
cy.get<DatePicker>("@datePicker")
	.ui5DatePickerGetCalendar();

// When a command returns a typed element, the next get must match
cy.get<DatePicker>("@datePicker")
	.ui5DatePickerGetCalendar()
	.as("calendar");
cy.get<Calendar>("@calendar")
	.ui5CalendarGetDayPicker()
	.should("be.visible");
```

### `import type` vs plain import

Use `import type` when a name is only used in type positions. Use a plain import when the name is also used as a value (JSX, static property access, `instanceof`, etc.).

```typescript
// In a spec file:
import DatePicker from "../../src/DatePicker.js";       // plain — used in JSX and DatePicker.i18nBundle
import type Calendar from "../../src/Calendar.js";     // type-only — only used in cy.get<Calendar>()

// In a commands file:
import type DatePicker from "../../../src/DatePicker.js";        // type-only — only used as JQuery<DatePicker>
import type Calendar from "../../../src/Calendar.js";           // type-only — only used as JQuery<Calendar>
import type ResponsivePopover from "../../../src/ResponsivePopover.js"; // type-only — only used as .find<ResponsivePopover>()
```

---

## Writing a Test File

When writing or restructuring a spec file, load [`WRITING-SPECS.md`](./references/WRITING-SPECS.md). It covers file location, minimal structure, what makes a test meaningful, event testing, configuration (theme/language), device simulation, `cy.clock`, viewport sizing, disabling animations, form validity, the framework command reference, mount helper functions, and shared `beforeEach`/`afterEach` setup.

---

## Asserting

Use `have.attr` for reflected properties and ARIA attributes; use `have.prop` for state that is not reflected to an attribute:

```typescript
// Reflected to DOM attribute — use have.attr
cy.get("[ui5-button]")
	.should("have.attr", "title", "my tooltip");
cy.get("[ui5-input]")
	.should("have.attr", "aria-label", "Search");

// Non-reflected JS property — use have.prop
cy.get("#myInput")
	.should("have.prop", "focused", true);
```

### Asserting on computed styles and CSS custom properties

When a test needs to verify applied styling — a CSS class is not enough, or the component publishes a CSS custom property (`--_ui5_...`) on its host — read the computed style inside a `.then()` callback with `getComputedStyle(...).getPropertyValue(...)`. Trim the result, since custom-property values are returned with leading whitespace:

```typescript
cy.get<Input>("[ui5-input]")
	.shadow()
	.find("[ui5-icon]")
	.then($icon => {
		const padding = getComputedStyle($icon[0])
			.getPropertyValue("--_ui5_input_icon_state_padding")
			.trim();
		expect(padding).to.not.equal("");
	});
```

Rules:
- Assert the specific declared value where one exists (`.to.equal("none")`), not just `.to.not.equal("")`.
- Only reach for computed styles when a class assertion cannot express the check — prefer `should("have.class", ...)` when a class reflects the state.
- Private custom properties (`--_ui5_*`) are internal contracts; when asserting on them, add a short comment explaining which selector publishes the value.

### Asserting on events

No global event helper — attach a stub:

```typescript
cy.get("[ui5-tag]")
	.then($tag => {
		$tag[0].addEventListener("click", cy.stub().as("clicked"));
	});

cy.get("[ui5-tag]")
	.realClick();
cy.get("@clicked")
	.should("have.been.calledOnce");

// Assert event payload
cy.get("@clickHandler")
	.should("be.calledWithMatch", { detail: { ctrlKey: true } });
```

### Asserting on focus

`UI5Element.focus()` is asynchronous — an alias captured before the interaction can be stale and race in CI:

```typescript
// Wrong — races in CI
cy.get("@defaultColorButton")
	.should("have.focus");

// Right — cy.focused() returns the live inner shadow focus ref
cy.focused()
	.should("have.attr", "aria-label")
	.and("include", "cyan");
```

`cy.focused()` returns the inner shadow focus ref, not the host element — assert `aria-label` or other attributes present on that ref, not host-level properties.

---

## Text and i18n

Never compare against English string literals. Compare against the i18n bundle so the test stays correct under locale changes:

```typescript
// Wrong — breaks if the bundle text ever changes
cy.get("[ui5-form-group]")
	.should("have.attr", "aria-label", "Group 1");

// Right — compare against the bundle
cy.get("[ui5-form-group]")
	.should(
		"have.attr",
		"aria-label",
		Form.i18nBundle.getText(FORM_GROUP_ACCESSIBLE_NAME, "1")
	);
```

For non-default locales, always import `Assets.js` (see "Configuration" above).

---

## Flaky Tests

See [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) for a full list of causes and recipes. Load it only when debugging an intermittent failure.

---

## Workflow

1. **Read the component source** (`packages/{package}/src/{ComponentName}.ts`) to understand props, events, and shadow DOM structure
2. **Check for existing commands** in `packages/{package}/cypress/support/commands/` — don't duplicate
3. **Write the spec file** following [`WRITING-SPECS.md`](./references/WRITING-SPECS.md), with `cy.get<T>()` generics throughout
4. **Extract commands** for any interaction sequence used more than once — see [`COMMANDS.md`](./references/COMMANDS.md)
5. **Create the commands file** following the template and conventions in [`COMMANDS.md`](./references/COMMANDS.md)
6. **Update commands.ts** with the import (alphabetical order)
7. **When reviewing** an existing test file, use the checklist in [`REVIEWING.md`](./references/REVIEWING.md)
8. Tell the user what was created and where
