---
name: visual-test
description: >
  Write basic Cypress visual tests for UI5 web components, placing them in
  cypress/specs/visuals/. Use this skill whenever the user asks to create,
  add, or write a visual test (or screenshot test) for any UI5 web component.
  Also trigger when the user says things like "add a visual spec for X",
  "create a visual test for X", or "write a cypress visual for X".
---

# Writing Visual Tests for UI5 Web Components

Visual tests live in `packages/main/cypress/specs/visuals/` and capture
screenshots of a component at key states. They are intentionally minimal —
their job is to record what the component looks like, not to assert on DOM
internals.

## One component per file

Each file tests exactly ONE component. Do not import unrelated components.
If the component uses child items (e.g. `MultiComboBoxItem` inside
`MultiComboBox`), those child imports are fine — they are part of the same
component family.

**Wrong:** importing `RangeSlider` in a `MultiComboBox` test just to
demonstrate a layout.

**Right:** only `MultiComboBox` + `MultiComboBoxItem`.

## Required parent containers

Some components cannot render meaningfully (or at all) without a specific
parent. Always wrap them in the minimal required parent — and import that
parent too. The parent is part of the component's contract, not an
"unrelated component".

| Component(s) | Required parent |
|---|---|
| `ListItemStandard`, `ListItemCustom`, `ListItemGroup` | `List` |
| `TableRow`, `TableHeaderRow`, `TableGroupRow`, `TableCell`, `TableHeaderCell` | `Table` |
| `Tab`, `TabSeparator` | `TabContainer` |
| `TreeItem`, `TreeItemCustom` | `Tree` |
| `MenuItem`, `MenuItemGroup`, `MenuSeparator` | `Menu` |
| `Option` | `Select` |
| `BreadcrumbsItem` | `Breadcrumbs` |
| `Token` | `Tokenizer` |
| `ToolbarButton`, `ToolbarSelect`, `ToolbarSeparator`, `ToolbarSpacer` | `Toolbar` |
| `CarouselPage` (or any direct child) | `Carousel` |
| `NotificationListItem`, `NotificationListGroupItem` | `NotificationList` |

When writing a visual test for a child component (e.g. `ListItemStandard`),
name the **file** after the child (`ListItemStandard.cy.tsx`), but wrap it
in the minimal parent — just enough items to show the component, nothing
more.

## File location and naming

```
packages/main/cypress/specs/visuals/ComponentName.cy.tsx   # for @ui5/webcomponents
packages/fiori/cypress/specs/visuals/ComponentName.cy.tsx  # for @ui5/webcomponents-fiori
```

Use the same PascalCase name as the source component file.

## Import paths

For **main** package components, import three levels up from `visuals/`:

```tsx
import MultiComboBox from "../../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../../src/MultiComboBoxItem.js";
```

For **fiori** package components, import two levels up from `visuals/`:

```tsx
import IllustratedMessage from "../../src/IllustratedMessage.js";
import Timeline from "../../src/Timeline.js";
```

When a fiori component needs a main-package component (e.g. a Button in a slot), import from the dist package:

```tsx
import Button from "@ui5/webcomponents/dist/Button.js";
```

For `IllustratedMessage`, there are no individual illustration source files — import the single bundle from src:

```tsx
import "../../../src/illustrations/AllIllustrations.js";
```

Import only what you actually use in the test.

## Before writing: read the existing functional test

Before writing a visual test for `ComponentName`, always read the existing
functional test file at:

```
packages/main/cypress/specs/ComponentName.cy.tsx     # main package
packages/fiori/cypress/specs/ComponentName.cy.tsx    # fiori package
```

Skim it for:
- **What prop combinations** it exercises (these are the states worth
  capturing visually).
- **What interactions** it triggers — open, focus, type, navigate — that
  produce a distinct visual state.
- **What custom commands** it uses — these are already available for reuse
  in the visual test.
- **What child components and slots** it uses, which tells you the correct
  parent container and slot names.

You do not need to cover every functional test case — only the ones that
produce a meaningfully different visual appearance. But anything the
functional test exercises that you had not considered is a signal worth
checking.

## Test structure: one case per distinct visual state

Write one `it` per meaningful visual state. Do not bundle multiple states
into a single test — each screenshot should capture exactly one thing.

A single `it` can contain multiple `cy.screenshot()` calls if you are
stepping through a sequential interaction and each intermediate step is
worth recording (e.g. arrow-key navigation through a list). But if two
states are reached by completely independent setups, use two separate `it`
blocks.

### Standard cases to consider for every component

1. **Initial/basic state** — component mounted with minimal props, no
   interaction. Always include this.
2. **Compact mode** — remount the same component with `data-ui5-compact-size`
   on a wrapper `<div>`, then screenshot. Most components render
   differently in compact.
3. **Interactive/open state** — dropdown open, popover visible, focused,
   etc.

### Additional cases based on what the component supports

Look at what the component can show and add cases accordingly:

- **Item focus in dropdown** — open the picker, press ArrowDown to focus
  the first item, screenshot. Press again to focus a group header if present.
- **Filtering** — type a character to filter suggestions, screenshot the
  narrowed list.
- **Selected items / tokens** — pre-select items, screenshot the tokenized
  state.
- **Value state** — when a component accepts `valueState`, write one `it` per
  value state value. The full set is `Negative`, `Critical`, `Positive`,
  `Information`. `None` is the default and is already covered by the basic
  state test — do not add a separate case for it. Always include a
  `valueStateMessage` slot so the message strip renders. Applies to Input,
  MultiComboBox, Select, DatePicker, DateTimePicker, etc.
- **No items** — empty list state (e.g. `<MultiComboBox>` with no children,
  dropdown open).
- **Wrapping / long content** — pass a very long text or many tokens to
  capture overflow/wrapping behaviour.

### What does NOT need its own test

- Trivial prop changes that produce no visible difference.
- States already covered by another `it`.

There is no fixed maximum — cover what the component genuinely shows.

## Slot assignment

Always assign slotted children as **child elements with a `slot` attribute**,
never as JSX props on the parent component:

```tsx
// WRONG — passing slot content as a JSX prop
<Page header={<Bar>...</Bar>} footer={<Bar>...</Bar>} />

// CORRECT — slot attribute on the child element
<Page>
  <Bar slot="header">...</Bar>
  <div>Main content</div>
  <Bar slot="footer">...</Bar>
</Page>
```

This matches how web component slots work in the DOM. Passing slot content
as a prop bypasses the slot mechanism and will not render correctly.



Use attribute selectors, not tag names:

```tsx
cy.get("[ui5-multi-combobox]")   // correct
cy.get("ui5-multi-combobox")     // wrong
```

The attribute selector matches the `[ui5-*]` marker that web components add
to themselves and is more resilient to tag name changes.

## Triggering interactions

Always prefer the existing custom commands over raw DOM queries — they
already handle waiting and shadow DOM traversal correctly.

### Available custom commands (use these for interactions)

| Component | Command | What it does |
|---|---|---|
| `DatePicker` | `.ui5DatePickerValueHelpIconPress()` | Opens the calendar popover |
| `TimePicker` | `.ui5TimePickerValueHelpIconPress()` | Opens the time picker popover |
| `Menu` | `.ui5MenuOpen()` | Opens the menu popover |
| `Menu` | `.ui5MenuOpened()` | Asserts menu is open (use after open) |
| `ColorPalettePopover` | `.ui5ColorPalettePopoverOpen()` | Opens the color palette popover |
| `DynamicDateRange` | `.ui5DynamicDateRangeOpen()` | Opens the DDR popover |
| `TabContainer` | `.ui5TabContainerOpenEndOverflow()` | Opens the overflow tab list |
| `Dialog` | `.ui5DialogOpened()` | Asserts dialog is open |
| `Popover` | `.ui5PopoverOpened()` | Asserts popover is open |
| `ResponsivePopover` | `.ui5ResponsivePopoverOpened()` | Asserts responsive popover is open |

For components without a custom command, use `realClick()`:

```tsx
// Open a select dropdown
cy.get("[ui5-select]").realClick();

// Open a multicombobox dropdown via its icon
cy.get("[ui5-multi-combobox]").shadow().find("[icon]").realClick();
```

After triggering the interaction, call `cy.screenshot()` immediately — no
assertions needed.

## Complete example

The example below covers the full range of meaningful visual states for
MultiComboBox — the same states tested in the openui5 visual regression
suite: basic, open, filtering, item focus, tokens, value state, no items.

```tsx
import MultiComboBox from "../../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../../src/MultiComboBoxItem.js";

describe("MultiComboBox visual", () => {
	it("basic state", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("filtering — type to narrow list", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});

	it("dropdown open — first item focused via arrow key", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("with selected tokens", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected text="Algeria" />
				<MultiComboBoxItem selected text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<MultiComboBox valueState="Negative">
				<span slot="valueStateMessage">Error message</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<MultiComboBox valueState="Critical">
				<span slot="valueStateMessage">Warning message</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<MultiComboBox valueState="Positive">
				<span slot="valueStateMessage">Success message</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<MultiComboBox valueState="Information">
				<span slot="valueStateMessage">Info message</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("no items — empty dropdown open", () => {
		cy.mount(<MultiComboBox />);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.screenshot();
	});
});
```

## What NOT to do

- No `.should()` assertions — this is a visual test, not a functional one.
- No interactions unrelated to the component's own UI (don't open a Dialog
  just to show the component inside it).
- No extra wrapper components to "set up" the test — if the component needs
  a value, pass it as a prop directly.
- No `cy.wait()` or arbitrary timeouts — if you need to wait for an open
  animation, use `.ui5ResponsivePopoverOpened()` (chained off the popover
  element found in shadow DOM) to verify the popup is open before screenshotting.

## Avoid dynamic / non-deterministic content

Screenshots must be identical on every run. Anything that changes between
runs will cause false diffs and make the test useless as a visual baseline.

**Avoid:**
- `BusyIndicator` — the spinner animation frame varies per run.
- `DatePicker`, `TimePicker`, `DateRangePicker`, `DateTimePicker` without a
  fixed value — they display today's date, which changes daily. Always pass
  a hardcoded `value` prop: `<DatePicker value="2024-01-15" />`.
- `DynamicDateRange` without a fixed option selected.
- Any component that fetches or derives content at runtime (clocks,
  relative timestamps, random IDs shown in the UI).

**If you must include a date/time component**, pin the value:
```tsx
<DatePicker value="Jan 15, 2024" />
<TimePicker value="10:00:00" />
```

## Running the test

```bash
cd packages/main
npx cypress run --component --browser chrome --spec cypress/specs/visuals/ComponentName.cy.tsx
```

Or open interactive mode:
```bash
cd packages/main
yarn test:cypress:open
```
