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
---

# Cypress Test Writer for UI5 Web Components

## Overview

This skill helps write and review Cypress component tests for UI5 web components. It encodes the project's testing conventions so every test file and command is consistent with the existing codebase.

The primary reference for testing patterns is `docs/07-development/10-testing.md`. Read it when in doubt about a pattern.

---

## Quick Rules

### Always use real events
| Instead of | Use |
|---|---|
| `cy.click()` | `cy.realClick()` |
| `cy.type('a')` | `cy.realPress('a')` |
| `cy.type('text')` | `cy.realType('text')` |

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
cy.wrap({ setLanguage }).then(api => api.setLanguage("bg"));

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

### DOM traversal
```typescript
// Shadow DOM
cy.get("[ui5-button]").shadow().find("button")

// Slots / light DOM children
cy.get("[ui5-button]").find("[ui5-icon]")
```

---

## TypeScript Generics

### Type `cy.get<T>()` at every element boundary

Pass the concrete component type as a generic to `cy.get<T>()` so TypeScript can verify that the commands chained on the result are valid for that element type. Do this for every `cy.get` that selects a UI5 component — both selector strings and aliases.

```typescript
// Wrong — TypeScript cannot verify commands are valid for this element
cy.get("[ui5-date-picker]").ui5DatePickerGetCalendar();
cy.get("@datePicker").ui5DatePickerGetCalendar();

// Right — TypeScript knows the subject is a DatePicker
cy.get<DatePicker>("[ui5-date-picker]").ui5DatePickerGetCalendar();
cy.get<DatePicker>("@datePicker").ui5DatePickerGetCalendar();

// When a command returns a typed element, the next get must match
cy.get<DatePicker>("@datePicker").ui5DatePickerGetCalendar().as("calendar");
cy.get<Calendar>("@calendar").ui5CalendarGetDayPicker().should("be.visible");
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
```
packages/{package}/cypress/specs/{ComponentName}.cy.tsx
```

### Minimal structure
```typescript
import ComponentName from "../../src/ComponentName.js";

describe("{ComponentName}", () => {
  it("renders and shows expected default state", () => {
    cy.mount(<ComponentName />);
    cy.get<ComponentName>("[ui5-component-name]").should("exist");
    // Add at least one meaningful assertion beyond "exist"
    cy.get<ComponentName>("[ui5-component-name]").shadow().find(".ui5-component-root").should("be.visible");
  });
});
```

### What makes a test meaningful

A test only asserting `"exist"` is not meaningful. A meaningful test asserts:
- The **rendered state** reflects the props (e.g. `design="Negative"` adds the right CSS class)
- **Events** fire when expected (use `cy.stub` or `cy.spy`)
- **Accessibility** attributes are correct (`aria-label`, `role`, `aria-disabled`)
- **Behavior** after interaction (open/close, value change, focus movement)

**Weak (avoid):**
```typescript
cy.get("[ui5-button]").should("exist");
```

**Strong (prefer):**
```typescript
cy.get("[ui5-button]").should("have.attr", "disabled");
cy.get("[ui5-button]").shadow().find("button").should("have.attr", "disabled");
```

### Testing events
```typescript
cy.mount(<Button></Button>);

cy.get("[ui5-button]").then($button => {
  cy.stub($button[0], "dispatchEvent").as("dispatchEvent");
});

// Or use addEventListener with a stub
cy.get("[ui5-button]").then($el => {
  $el[0].addEventListener("click", cy.stub().as("clicked"));
});

cy.get("[ui5-button]").realClick();
cy.get("@clicked").should("have.been.called");
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

---

## Identifying Repetitive Patterns → Custom Commands

When writing or reviewing tests, look for:
- The same sequence of `cy.get` + `cy.invoke("attr", ...)` + assertion appearing in 2+ tests
- Open/close sequences for overlay components (dialogs, popovers, menus, pickers)
- "Wait for component to be ready" sequences (shadow DOM existence + popover open + size > 0)
- Multi-step form interactions (type, blur, assert validation)

When you find such a pattern, extract it into a custom command.

---

## POM Coverage: Every Internal Sub-Element Needs a Command

When creating or reviewing a commands file for a component, **every internal sub-element the tests interact with must have a dedicated getter command**. Do not leave raw `.shadow().find("ui5-...")` chains in the spec file.

### What to cover

For a picker-type component (DatePicker, DateTimePicker, etc.):
- The input element (`ui5DatePickerGetDateTimeInput`)
- The native input inside the input (`ui5DatePickerGetInnerInput`)
- The icon (`ui5DatePickerGetIcon`)
- The popover/responsive-popover (`ui5DatePickerGetPopover`)
- The calendar (`ui5DatePickerGetCalendar`) — chains off datePicker
- Navigation buttons (`ui5DatePickerGetNextButton`, `ui5DatePickerGetPreviousButton`)
- Header buttons (`ui5DatePickerGetMonthButton`, `ui5DatePickerGetYearButton`)

Sub-elements of `ui5-calendar` belong in `Calendar.commands.ts`, not in the picker's commands file (see "Commands belong to the subject's component" below):
- The day picker (`ui5CalendarGetDayPicker`)
- The month picker (`ui5CalendarGetMonthPicker`)
- The year picker (`ui5CalendarGetYearPicker`)

For a menu/navigation component: the trigger, the list items, the sub-menus.
For a table: rows, cells, column headers, toolbar.

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

### Chaining pattern for nested sub-elements

```typescript
// Chain directly when result is used once
cy.get<DatePicker>("@datePicker")
  .ui5DatePickerGetCalendar()
  .ui5CalendarGetDayPicker()
  .shadow()
  .find(".ui5-dp-content");

// Alias the intermediate element for repeated access in one test
cy.get<DatePicker>("@datePicker")
  .ui5DatePickerGetCalendar()
  .as("calendar");

cy.get<Calendar>("@calendar").ui5CalendarGetMonthPicker().should("be.visible");
cy.get<Calendar>("@calendar").ui5CalendarGetYearPicker().should("be.visible");
```

### Rule: no bare tag selectors in specs

In specs, **never** use bare tag names in `find()`:
```typescript
// Wrong — bare tag selector, bypasses POM
cy.get<DatePicker>("@datePicker").shadow().find("ui5-calendar")
cy.get<Calendar>("@calendar").shadow().find("ui5-daypicker")

// Right — use POM commands
cy.get<DatePicker>("@datePicker").ui5DatePickerGetCalendar()
cy.get<Calendar>("@calendar").ui5CalendarGetDayPicker()
```

The only exception: `find()` inside a getter command's own implementation — the command itself must reference the tag name to locate the element.

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
    cy.get("[ui5-combobox]").realClick();
    // ...
  });

  it("moves focus back on Escape", () => {
    cy.get("[ui5-combobox]").realClick();
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
      cy.wrap(subject).shadow().find("[ui5-dialog]")
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

  cy.get<MyComponent>("@component").ui5MyComponentOpened();
});

Cypress.Commands.add("ui5MyComponentOpened", { prevSubject: true }, (subject: JQuery<MyComponent>) => {
  cy.wrap(subject).as("component");
  cy.get<MyComponent>("@component").should("have.attr", "open");
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
  cy.wrap(subject).as("component");
  cy.get<MyComponent>("@component").should("not.have.attr", "open");
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

## Registering Commands in commands.ts

After creating `{ComponentName}.commands.ts`, add an import to the package's `cypress/support/commands.ts`:

```typescript
// Keep imports in alphabetical order
import "./commands/{ComponentName}.commands.js";
```

**Note:** The `declare global` block belongs in the individual `{ComponentName}.commands.ts` file, not in `commands.ts`. Do not add type declarations to `commands.ts` — they belong in the component's own commands file.

---

## Reviewing Existing Tests

When reviewing a test file, check:

1. **Meaningful assertions** — is every `it()` block asserting something beyond `"exist"`?
2. **Real events** — is `cy.realClick` / `cy.realPress` / `cy.realType` used instead of simulated events?
3. **Attribute selectors** — are components selected with `[ui5-button]` not `ui5-button`?
4. **Async safety** — are base API calls using `async .then()` with explicit `await`, not bare calls or `.then(api => api.method())`?
5. **Repetition** — are the same 3+ line interaction sequences duplicated across `it()` blocks?
6. **Shadow DOM** — when asserting on internal structure, is `.shadow().find(...)` used, or better, a POM command?
7. **Event testing** — when testing that events fire, is `cy.stub` / `cy.spy` used rather than relying on side effects?
8. **POM usage** — are raw `.shadow().find("ui5-...")` chains in the spec replaced by POM commands?
9. **TypeScript generics** — does every `cy.get()` that selects a UI5 component use `cy.get<ComponentType>()`?
10. **Unique test names** — does every `it()` block have a unique, descriptive name within its `describe` block?
11. **Alias consistency** — is the element aliased before use, and is that alias used consistently rather than re-selecting the same element?

For each issue found, either fix it directly or explain what to extract and where to put it.

---

## Workflow

1. **Read the component source** (`packages/{package}/src/{ComponentName}.ts`) to understand props, events, and shadow DOM structure
2. **Check for existing commands** in `packages/{package}/cypress/support/commands/` — don't duplicate
3. **Write the spec file** using the patterns above, with `cy.get<T>()` generics throughout
4. **Extract commands** for any interaction sequence used more than once
5. **Create the commands file** with typed subjects, typed return values, `this:` constraints in `declare global`, and `import type` for all component imports
6. **Update commands.ts** with the import
7. Tell the user what was created and where
