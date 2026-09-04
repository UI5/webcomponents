# Writing Spec Files

Detailed conventions for authoring a Cypress spec: file layout, meaningful assertions, event testing, configuration, device/viewport/time control, mount helpers, and shared `beforeEach`/`afterEach` setup. Load this alongside `SKILL.md` whenever writing or restructuring a spec file.

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

Two patterns exist — use JSX props when the event is exposed as a prop, `addEventListener` otherwise:

```typescript
// When the event is exposed as a JSX prop — pass the stub directly
const onNavigate = cy.stub().as("navigate");
cy.mount(
	<Carousel onNavigate={onNavigate}>
		<Button>Slide 1</Button>
	</Carousel>
);

cy.get("@navigate")
	.should("have.been.calledOnce");

// When the event is not exposed as a JSX prop — attach via addEventListener
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
```typescript
cy.mount(<MyComponent />);
cy.ui5SimulateDevice("phone");
cy.get("[ui5-my-component]")
	.should("have.class", "ui5-my-component-mobile");
```

### Freezing time with `cy.clock`

Components that depend on the current date/time (`Calendar`, `DatePicker`, `DateTimePicker`, `TimePicker`, `DateRangePicker`, `DynamicDateRange`) render differently every day. A test that mounts them without pinning the clock is non-deterministic — it passes today and fails on another date. Freeze the clock in `beforeEach` **before** `cy.mount()`, and only stub the `Date` object:

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

Rules:
- Pass `["Date"]` as the second argument so only `Date` is faked — faking `setTimeout`/`setInterval` (the default) can freeze the component's own async rendering and hang the test.
- Set the clock **before** `cy.mount()` so the component reads the frozen time during its first render.
- Reuse a single `FIXED_VALUE` constant for the value and the clock date so they never drift apart.
- Never assert against "today" computed at runtime — assert against the frozen date literal.

### Viewport sizing for responsive tests

`cy.ui5SimulateDevice("phone")` only flips the `isPhone` flag — it does **not** resize the window. To test overflow, breakpoints, or layout that reacts to the actual window size (e.g. `Toolbar`, `Carousel`, `Dialog`, `Tokenizer`, `Popover`), set the real viewport with `cy.viewport(width, height)`:

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

