# Writing Spec Files

Detailed conventions for authoring a Cypress spec: file layout, meaningful assertions, event testing, configuration, device/viewport/time control, mount helpers, and shared `beforeEach`/`afterEach` setup. Load this alongside `SKILL.md` whenever writing or restructuring a spec file.

---

## Writing a Test File

### Location

| File | Purpose |
|------|---------|
| `packages/{package}/cypress/specs/{ComponentName}.cy.tsx` | Main spec |
| `packages/{package}/cypress/specs/{ComponentName}.mobile.cy.tsx` | Phone-only tests — use when tests require `cy.ui5SimulateDevice("phone")` for the entire file |

**File naming:** the only two valid suffixes are `.cy.tsx` and `.mobile.cy.tsx`. The file name must start with the PascalCase component name — `DatePicker.cy.tsx`, not `date-picker.cy.tsx` or `DatePickerGerman.cy.tsx`. All tests for a component belong in one of these two files.

### Minimal structure
```typescript
import ComponentName from "../../src/ComponentName.js";

describe("{ComponentName}", () => {
	it("renders and shows expected default state", () => {
		cy.mount(<ComponentName />);

		cy.get<ComponentName>("[ui5-component-name]")
			.as("component");

		cy.get("@component")
			.should("exist");
		// Add at least one meaningful assertion beyond "exist"
		cy.get("@component")
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

#### Rendered state reflects the props

**Weak (avoid):**
```typescript
cy.mount(<Button design="Negative">Delete</Button>);

cy.get("[ui5-button]")
	.should("exist");
```

**Strong (prefer):**
```typescript
cy.mount(<Button design="Negative">Delete</Button>);

cy.get("[ui5-button]")
	.shadow()
	.find(".ui5-button-root")
	.should("have.class", "ui5-button-negative");
```

#### Events fire when expected

**Weak (avoid):**
```typescript
cy.mount(<Button>Press</Button>);

cy.get("[ui5-button]")
	.realClick();
// no assertion that anything happened
```

**Strong (prefer):**
```typescript
cy.mount(<Button onClick={cy.stub().as("click")}>Press</Button>);

cy.get("[ui5-button]")
	.realClick();
cy.get("@click")
	.should("have.been.calledOnce");
```

#### Accessibility attributes are correct

**Weak (avoid):**
```typescript
cy.mount(<Button accessibleName="Close dialog" />);

cy.get("[ui5-button]")
	.should("exist");
```

**Strong (prefer):**
```typescript
cy.mount(<Button accessibleName="Close dialog" />);

cy.get("[ui5-button]")
	.shadow()
	.find("button")
	.should("have.attr", "aria-label", "Close dialog");
```

#### Behavior after interaction

**Weak (avoid):**
```typescript
cy.mount(<Popover opener="btn"><span>Content</span></Popover>);

cy.get("[ui5-popover]")
	.should("exist");
```

**Strong (prefer):**
```typescript
cy.mount(<Popover opener="btn" open><span>Content</span></Popover>);

cy.get("[ui5-popover]")
	.should("have.attr", "open");
cy.get("[ui5-popover]")
	.shadow()
	.find(".ui5-popup-root")
	.should("be.visible");
```

#### Keyboard path, not just the click path

**Weak (avoid):**
```typescript
cy.mount(<Button>Press</Button>);

cy.get("[ui5-button]")
	.realClick();
cy.get("@click")
	.should("have.been.calledOnce");
```

**Strong (prefer):**
```typescript
cy.mount(<Button onClick={cy.stub().as("click")}>Press</Button>);

cy.get("[ui5-button]")
	.realClick();
cy.get("[ui5-button]")
	.realPress("Space");
cy.get("[ui5-button]")
	.realPress("Enter");
cy.get("@click")
	.should("have.been.calledThrice");
```

#### Disabled and read-only states do not react

**Weak (avoid):**
```typescript
cy.mount(<Button disabled>Press</Button>);

cy.get("[ui5-button]")
	.should("have.attr", "disabled");
```

**Strong (prefer):**
```typescript
cy.mount(<Button disabled onClick={cy.stub().as("click")}>Press</Button>);

cy.get("[ui5-button]")
	.realClick({ force: true });
cy.get("@click")
	.should("not.have.been.called");
```

### Testing events

Every event dispatched by the framework is available as a JSX prop — prefer passing the stub directly as a prop. `addEventListener` is the older approach and is only worth using for native DOM events or when you must attach a listener after mount:

```typescript
// Preferred — every framework event is exposed as a JSX prop, pass the stub directly
const onNavigate = cy.stub().as("navigate");
cy.mount(
	<Carousel onNavigate={onNavigate}>
		<Button>Slide 1</Button>
	</Carousel>
);

cy.get("@navigate")
	.should("have.been.calledOnce");

// Legacy alternative — attach via addEventListener (e.g. for native DOM events)
cy.mount(<Button></Button>);

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

Phone-only tests belong in a separate `{ComponentName}.mobile.cy.tsx` file (see [Location](#location)), and `cy.ui5SimulateDevice("phone")` must run in a `beforeEach` **before** `cy.mount()` so the component renders its mobile path from the first render:

```typescript
describe("MyComponent - mobile", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("renders the mobile layout", () => {
		cy.mount(<MyComponent />);

		cy.get("[ui5-my-component]")
			.should("have.class", "ui5-my-component-mobile");
	});
});
```

### Freezing time with `cy.clock`

Components that depend on the current date/time (`Calendar`, `DatePicker`, `DateTimePicker`, `TimePicker`, `DateRangePicker`, `DynamicDateRange`) render differently every day. A test that mounts them without pinning the clock is non-deterministic — it passes today and fails on another date. The critical rule is that the clock must be frozen **before** `cy.mount()`, and only the `Date` object should be stubbed.

Use `beforeEach` when every test in the block shares the same frozen time:

```typescript
describe("DatePicker", () => {
	beforeEach(() => {
		cy.clock(new Date("Jan 15, 2024").getTime(), ["Date"]);
	});

	it("renders the fixed value", () => {
		cy.mount(<DatePicker value="Jan 15, 2024" />);
		// today's date now resolves to Jan 15, 2024 everywhere in the component
	});
});
```

Set it inline when only one test needs a frozen clock, or when tests in the block need different dates — just keep it before `cy.mount()`:

```typescript
it("marks a specific day as today", () => {
	cy.clock(new Date("Jan 15, 2024").getTime(), ["Date"]);

	cy.mount(<DatePicker value="Jan 15, 2024" />);
	// ...
});
```

Rules:
- Pass `["Date"]` as the second argument so only `Date` is faked — faking `setTimeout`/`setInterval` (the default) can freeze the component's own async rendering and hang the test.
- Set the clock **before** `cy.mount()` so the component reads the frozen time during its first render.
- Reuse a single `FIXED_VALUE` constant for the value and the clock date so they never drift apart.
- Never assert against "today" computed at runtime — assert against the frozen date literal.

### Viewport sizing for responsive tests

`cy.ui5SimulateDevice("phone")` is **not** a substitute here — it only flips the `isPhone` flag and does **not** resize the window. To test overflow, breakpoints, or layout that reacts to the actual window size (e.g. `Toolbar`, `Carousel`, `Dialog`, `Tokenizer`, `Popover`), set the real viewport with `cy.viewport(width, height)`:

```typescript
it("overflows items into the menu below 400px", () => {
	cy.viewport(300, 600);
	cy.mount(
		<Toolbar>
			<ToolbarButton text="One" />
			<ToolbarButton text="Two" />
			<ToolbarButton text="Three" />
		</Toolbar>
	);

	cy.get("[ui5-toolbar]")
		.shadow()
		.find(".ui5-tb-overflow-btn")
		.should("be.visible");
});
```

Rules:
- Call `cy.viewport()` **before** `cy.mount()` when the first render must already reflect the size.
- To restore the configured default within a test, use `cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"))` rather than a hard-coded size.
- Use `cy.viewport()` for pixel-size / overflow behavior; use `cy.ui5SimulateDevice("phone")` for phone-specific rendering paths. They are independent — combine them when a test needs both.

### Disabling animations

Use `setAnimationMode("none")` in a `before()` hook when testing components that have animations, to prevent timing-dependent failures:

```typescript
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";

before(() => {
	cy.wrap({ setAnimationMode })
		.then(async ({ setAnimationMode }) => {
			await setAnimationMode("none");
		});
});
```

### Wrapper elements for layout testing

When testing responsive or layout-dependent behavior, wrap the component in a `div` with inline styles:

```typescript
cy.mount(
	<div style={{ width: "300px" }}>
		<Breadcrumbs>
			<BreadcrumbsItem href="#">Link 1</BreadcrumbsItem>
			<BreadcrumbsItem href="#">Link 2</BreadcrumbsItem>
		</Breadcrumbs>
	</div>
);
```

### Form validity testing

For form components, test `validity`, `formValidity`, `checkValidity()`, `reportValidity()`, and the `:invalid` CSS pseudo-class:

```typescript
cy.get("#cb")
	.then($el => {
		const checkbox = $el[0] as CheckBox;
		expect(checkbox.validity.valueMissing).to.be.true;
		expect(checkbox.validity.valid).to.be.false;
		expect(checkbox.checkValidity()).to.be.false;
	});

cy.get("#cb:invalid")
	.should("exist");
```

### Available framework commands

| Command | Behaviour |
|---------|-----------|
| `cy.mount(jsx)` | Mount, wait for render, wait for `document.fonts.ready` |
| `cy.waitRenderFinished()` | Drain the render queue. **Rarely needed** — `cy.mount()` and the `real*` interactions already wait for rendering. Only reach for it after a direct property/attribute mutation that isn't followed by a `real*` call. Never use `cy.wait(<number>)`. |
| `cy.ui5SimulateDevice("phone")` | Force phone behaviour; `"phone"` is the only valid device |
| `cy.ui5AssertValidityState(partial)` | Assert any subset of form validity state |
| `realClick`, `realHover`, `realPress`, `realType` | Wait for render before dispatching real events |
| `cy.screenshot` | Honoured with `SCREENSHOT_DELAY` env var |

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

## Real events

**CRITICAL: `realPress` and `realType` are global commands that dispatch to the focused element. Never chain them after `.realClick()` on the same line. Always use two separate statements: focus first, then call `cy.realPress()` or `cy.realType()` standalone.**

After `.realClick()` to focus an element, call `cy.realType()` as a separate statement — never chain `.realType()` after `.realClick()` on the same line, as the focus change hasn't settled.

`realPress` and `realType` dispatch CDP key events to whatever currently has focus — a piped subject is silently ignored. Focus the target first, then call them as a separate statement:

```typescript
// Wrong — realType chained after realClick; the focus change hasn't settled
cy.get("@input")
	.realClick()
	.realType("23");

// Right — two statements
cy.get("@input")
	.realClick();
cy.realType("23");
```

Never use a numeric `cy.wait(<ms>)` to bridge async UI — assert the condition instead and let `should` retry.

## Async base API methods

The UI5 base API (`setLanguage`, `setTheme`, etc.) returns Promises. Cypress won't await a bare call, and `.then(api => api.method())` does not await either. Use async/await inside `.then()`:

```typescript
// Correct — promise is resolved before Cypress continues
cy.wrap({ setLanguage })
	.then(async ({ setLanguage }) => {
		await setLanguage("bg");
	});

// Reading the result after an async call
cy.wrap({ getLanguage })
	.then(({ getLanguage }) => getLanguage())
	.should("equal", "bg");
```

## Setting properties and attributes

```typescript
cy.get("[ui5-button]")
	.invoke("prop", "myProp", "newValue");

cy.get("[ui5-button]")
	.invoke("attr", "open", true);
```

## TypeScript generics

Pass the component type to every `cy.get<T>()` selecting a UI5 component — selector strings and aliases — so TypeScript can verify the chained commands. When a command returns a typed element, the next `cy.get` must match. Use `import type` for type-only names; a plain import when the name is also a value (JSX, static access, `instanceof`).

```typescript
// Wrong — TypeScript cannot verify the command
cy.get("@datePicker")
	.ui5DatePickerGetCalendar();

// Right
cy.get<DatePicker>("@datePicker")
	.ui5DatePickerGetCalendar()
	.as("calendar");
cy.get<Calendar>("@calendar")
	.ui5CalendarGetDayPicker();
```

## Asserting

Use `have.attr` for reflected properties and ARIA attributes; use `have.prop` for state not reflected to an attribute:

```typescript
cy.get("[ui5-button]")
	.should("have.attr", "title", "my tooltip");

cy.get("#myInput")
	.should("have.prop", "focused", true);
```

**ARIA attributes inside shadow DOM** — UI5 components render their accessible markup inside shadow roots. Always traverse `.shadow().find(...)` to reach the native element that carries the ARIA attribute, and verify the exact value from the component source or i18n bundle — never guess literals:

```typescript
// Wrong — the host element rarely carries ARIA attrs directly
cy.get("[ui5-input]")
	.should("have.attr", "aria-roledescription", "Search");

// Right — reach the inner input inside the shadow root
cy.get("[ui5-input]")
	.shadow()
	.find("input")
	.should("have.attr", "aria-roledescription", "Search")
	.and("have.attr", "aria-label", "Amount");

// Asserting absence of an ARIA attribute
cy.get("[ui5-input]")
	.shadow()
	.find("input")
	.should("not.have.attr", "aria-expanded");
```

Before asserting an ARIA attribute value, read the component source or i18n bundle for the exact string — never guess English literals. Guessed values break under locale changes and fail when the actual text differs. Check `packages/{package}/src/{ComponentName}.ts` or the i18n bundle for the specific attribute value — especially for localised attributes like `aria-label`.

**Events** — no global helper; attach a stub, then assert call count and payload:

```typescript
cy.get("[ui5-tag]")
	.then($tag => {
		$tag[0].addEventListener("click", cy.stub().as("clicked"));
	});

cy.get("[ui5-tag]")
	.realClick();
cy.get("@clicked")
	.should("have.been.calledOnce");

cy.get("@clickHandler")
	.should("be.calledWithMatch", { detail: { ctrlKey: true } });
```

**Computed styles / CSS custom properties** — when a class assertion cannot express the check (or the component publishes a `--_ui5_...` custom property on its host), read the computed style inside a `.then()`. Trim the result — custom-property values come with leading whitespace. Assert the specific declared value, not just `.to.not.equal("")`. Prefer `should("have.class", ...)` when a class reflects the state.

```typescript
cy.get<Input>("[ui5-input]")
	.shadow()
	.find("[ui5-icon]")
	.then($icon => {
		const padding = getComputedStyle($icon[0])
			.getPropertyValue("--_ui5_input_icon_state_padding")
			.trim();
		expect(padding).to.equal("0.5rem");
	});
```

## Text and i18n

Compare against the i18n bundle, never English literals — the test stays correct under locale changes. Import `Assets.js` for non-default locales.

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

