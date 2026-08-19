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

| Task | Files to load |
|---|---|
| Writing a new spec file | This file only |
| Adding or modifying custom commands | This file + [`COMMANDS.md`](./references/COMMANDS.md) |
| Reviewing an existing spec | This file + [`REVIEWING.md`](./references/REVIEWING.md) |
| Both writing a spec and adding commands | This file + [`COMMANDS.md`](./references/COMMANDS.md) |
| Debugging a flaky or intermittent test | This file + [`FLAKY-TESTS.md`](./references/FLAKY-TESTS.md) |

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

### Location

| File | Purpose |
|------|---------|
| `packages/{package}/cypress/specs/{ComponentName}.cy.tsx` | Main spec |
| `packages/{package}/cypress/specs/{ComponentName}.mobile.cy.tsx` | Phone-only tests — use when tests require `cy.ui5SimulateDevice("phone")` for the entire file |

Use a separate `.mobile.cy.tsx` file when all tests in it need phone simulation. Do not add `cy.ui5SimulateDevice("phone")` to a `beforeEach` in the main spec just to group mobile tests — put them in a dedicated mobile file instead.

### Minimal structure
```typescript
import ComponentName from "../../src/ComponentName.js";

describe("{ComponentName}", () => {
	it("renders and shows expected default state", () => {
		cy.mount(<ComponentName />);

		cy.get<ComponentName>("[ui5-component-name]")
			.should("exist");
		// Add at least one meaningful assertion beyond "exist"
		cy.get<ComponentName>("[ui5-component-name]")
			.shadow()
			.find(".ui5-component-root")
			.should("be.visible");
	});
});
```

### What makes a test meaningful

A test only asserting `"exist"` is not meaningful. A meaningful test asserts:
- The **rendered state** reflects the props (e.g. `design="Negative"` adds the right CSS class)
- **Events** fire when expected (use `cy.stub` or `cy.spy`), including the correct payload and call count
- **Accessibility** attributes are correct (`aria-label`, `role`, `aria-disabled`)
- **Behavior** after interaction (open/close, value change, focus movement)
- The **keyboard path**, not just the click path — test `realPress` navigation as well as `realClick`
- **Disabled and read-only states do not react** — assert that interactions produce no change

**Weak (avoid):**
```typescript
cy.get("[ui5-button]")
	.should("exist");
```

**Strong (prefer):**
```typescript
cy.get("[ui5-button]")
	.should("have.attr", "disabled");
cy.get("[ui5-button]")
	.shadow()
	.find("button")
	.should("have.attr", "disabled");
```

### Testing events
```typescript
cy.mount(<Button></Button>);

cy.get("[ui5-button]")
	.then($button => {
		cy.stub($button[0], "dispatchEvent").as("dispatchEvent");
	});

// Or use addEventListener with a stub
cy.get("[ui5-button]")
	.then($el => {
		$el[0].addEventListener("click", cy.stub().as("clicked"));
	});

cy.get("[ui5-button]")
	.realClick();
cy.get("@clicked")
	.should("have.been.called");
```

### Configuration (theme, language)

```typescript
import { setTheme, getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

cy.wrap({ setTheme })
	.then(async ({ setTheme }) => {
		await setTheme("sap_horizon_hcb");
	});

cy.wrap({ getTheme })
	.then(({ getTheme }) => getTheme())
	.should("equal", "sap_horizon_hcb");
```

For language tests, always import Assets.js:
```typescript
import "../../src/Assets.js"; // required for extra languages

cy.wrap({ setLanguage })
	.then(async ({ setLanguage }) => {
		await setLanguage("bg");
	});
```

### Mobile / device simulation
```typescript
cy.mount(<MyComponent />);
cy.ui5SimulateDevice("phone");
cy.get("[ui5-my-component]").should("have.class", "ui5-my-component-mobile");
```

### Available framework commands

| Command | Behaviour |
|---------|-----------|
| `cy.mount(jsx)` | Mount, wait for render, wait for `document.fonts.ready` |
| `cy.waitRenderFinished()` | Drain the render queue — use instead of `cy.wait(<number>)` |
| `cy.ui5SimulateDevice("phone")` | Force phone behaviour; `"phone"` is the only valid device |
| `cy.ui5AssertValidityState(partial)` | Assert any subset of form validity state |
| `realClick`, `realHover`, `realPress`, `realType` | Wait for render before dispatching real events |
| `cy.screenshot` | Honoured with `SCREENSHOT_DELAY` env var |

**`cy.ui5DOMRef()` is declared in `support/commands.ts` but never implemented — it will fail at runtime. Do not call it.**

**Import every icon you use.** The test bundle contains all icons, so a missing import passes locally and breaks in a real application.

---

## Mount Helper Functions

When a spec needs the same component configuration in many `it()` blocks, extract it into a named helper function at the top of the file rather than repeating the JSX inline. This keeps each `it()` block focused on the assertion, not the setup.

```typescript
// Define helpers at the top of the spec file, before describe()
const getDefaultCalendar = (date: Date) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	return (
		<Calendar id="calendar1" timestamp={date.valueOf() / 1000} formatPattern="dd/MM/yyyy">
			<CalendarDate value={`${day}/${month}/${year}`} />
		</Calendar>
	);
};

const getCalendarWithDisabledDates = (id: string, formatPattern: string, ranges: DateRange[]) => (
	<Calendar id={id} formatPattern={formatPattern}>
		{ranges.map((range, idx) => (
			<CalendarDateRange key={idx} slot="disabledDates" startValue={range.startValue} endValue={range.endValue} />
		))}
	</Calendar>
);

// Use in tests
describe("Calendar", () => {
	it("navigates to the current day", () => {
		cy.mount(getDefaultCalendar(new Date(Date.UTC(2000, 10, 22))));
		// ...
	});
});
```

Use fragment wrappers (`<>...</>`) when a helper needs to render multiple sibling components:

```typescript
const getCalendarsWithWeekNumbers = () => (<>
	<Calendar id="calendar1" calendarWeekNumbering="ISO_8601">
		<CalendarDate value="Jan 1, 2023" />
	</Calendar>
	<Calendar id="calendar2" calendarWeekNumbering="MiddleEastern">
		<CalendarDate value="Jan 1, 2023" />
	</Calendar>
</>);
```

---

## `beforeEach` and `afterEach`

Use `beforeEach` and `afterEach` at the `describe` level to share setup and teardown across every test in that block. Do not use them for things that only one test needs — keep those inline.

### `beforeEach` — shared mount or shared state

**Shared component mount:** When every test in a `describe` block uses the same component tree, mount it in `beforeEach` rather than repeating `cy.mount()` in every `it()`.

```typescript
describe("ComboBox - keyboard navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<ComboBox valueState="Negative">
				<ComboBoxItem text="Albania" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
			<Input id="nextInput" placeholder="Next input" />
		</>);
	});

	it("moves focus to the first link in the value state message", () => {
		cy.get("[ui5-combobox]")
			.realClick();
		// ...
	});

	it("moves focus back on Escape", () => {
		cy.get("[ui5-combobox]")
			.realClick();
		cy.realPress("Escape");
		// ...
	});
});
```

**Shared device/environment setup:** When all tests in a block require the same device simulation or global config state, set it in `beforeEach`:

```typescript
describe("ComboBox - mobile", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("renders the mobile picker", () => {
		cy.mount(<ComboBox><ComboBoxItem text="Algeria" /></ComboBox>);
		// ...
	});
});
```

**Shared language baseline:** When a `describe` block depends on a specific language being set, ensure it in `beforeEach` so tests don't rely on whatever the previous test left:

```typescript
describe("Calendar accessibility", () => {
	beforeEach(() => {
		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("en");
			});
	});
	// ...
});
```

### `afterEach` — mandatory cleanup for global state

Any test that changes global configuration (language, theme) **must reset it in `afterEach`**. Without cleanup, a failing test corrupts state for every test that follows.

**Language reset:**
```typescript
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import "../../src/Assets.js"; // required for non-English languages

describe("DatePicker - language", () => {
	afterEach(() => {
		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("en");
			});
	});

	it("displays Bulgarian month names", () => {
		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("bg");
			});
		// ...
	});
});
```

**Theme reset** — same pattern, reset to `"sap_horizon"`:
```typescript
afterEach(() => {
	cy.wrap({ setTheme })
		.then(async ({ setTheme }) => {
			await setTheme("sap_horizon");
		});
});
```

### When NOT to use beforeEach/afterEach

- Do not mount in `beforeEach` when tests need different component configurations — use mount helper functions instead (see above).
- Do not use `afterEach` to reset state that the next `cy.mount()` will implicitly reset anyway (e.g. component-local state).
- Do not use `beforeEach` for setup that only one or two tests need — keep it inline.

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
3. **Write the spec file** using the patterns above, with `cy.get<T>()` generics throughout
4. **Extract commands** for any interaction sequence used more than once — see [`COMMANDS.md`](./references/COMMANDS.md)
5. **Create the commands file** following the template and conventions in [`COMMANDS.md`](./references/COMMANDS.md)
6. **Update commands.ts** with the import (alphabetical order)
7. **When reviewing** an existing test file, use the checklist in [`REVIEWING.md`](./references/REVIEWING.md)
8. Tell the user what was created and where
