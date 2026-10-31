# Example Specs

Four complete, copy-ready specs demonstrating all conventions. Use these as a starting point — adapt imports and assertions to the actual component.

---

## Basic component spec (Button)

Demonstrates: attribute selectors, TypeScript generics, `realClick` + separate `cy.realPress`, stub as JSX prop, disabled state, ARIA in shadow DOM.

```typescript
import Button from "../../src/Button.js";

describe("Button", () => {
	it("fires click event", () => {
		cy.mount(<Button onClick={cy.stub().as("click")}>Press</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick();

		cy.get("@click")
			.should("have.been.calledOnce");
	});

	it("supports keyboard activation", () => {
		cy.mount(<Button onClick={cy.stub().as("click")}>Press</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick();
		cy.realPress("Space");
		cy.realPress("Enter");

		cy.get("@click")
			.should("have.been.calledThrice");
	});

	it("does not fire click when disabled", () => {
		cy.mount(<Button disabled onClick={cy.stub().as("click")}>Press</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick({ force: true });

		cy.get("@click")
			.should("not.have.been.called");
	});

	it("renders accessible name", () => {
		cy.mount(<Button accessibleName="Close dialog" />);

		cy.get<Button>("[ui5-button]")
			.shadow()
			.find("button")
			.should("have.attr", "aria-label", "Close dialog");
	});
});
```

---

## Popup component spec (Popover)

Demonstrates: `invoke("prop", "open", true)` for programmatic open, `ui5PopoverOpened` custom command, shadow DOM assertion, `cy.realPress` for keyboard close.

```typescript
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";

describe("Popover", () => {
	it("opens and shows content", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover opener="btn">
					<span>Content</span>
				</Popover>
			</>
		);

		cy.get<Popover>("[ui5-popover]")
			.invoke("prop", "open", true);

		cy.get<Popover>("[ui5-popover]")
			.ui5PopoverOpened();

		cy.get<Popover>("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");
	});

	it("closes on Escape", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover opener="btn">
					<span>Content</span>
				</Popover>
			</>
		);

		cy.get<Popover>("[ui5-popover]")
			.invoke("prop", "open", true);

		cy.get<Popover>("[ui5-popover]")
			.ui5PopoverOpened();

		cy.realPress("Escape");

		cy.get<Popover>("[ui5-popover]")
			.should("not.have.attr", "open");
	});
});
```

---

## Input component spec (type and value)

Demonstrates: `realClick` to focus, standalone `cy.realType`, `have.prop` vs `have.attr`, shadow DOM inner element assertion.

```typescript
import Input from "../../src/Input.js";

describe("Input", () => {
	it("accepts typed text and reflects the value", () => {
		cy.mount(<Input />);

		cy.get<Input>("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get<Input>("@input")
			.should("be.focused");

		cy.realType("Hello World");

		cy.get("@input")
			.should("have.prop", "value", "Hello World");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "Hello World");
	});

	it("fires change event on Enter", () => {
		cy.mount(<Input onChange={cy.stub().as("change")} />);

		cy.get<Input>("[ui5-input]")
			.realClick();

		cy.realType("changed");
		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("does not accept input when disabled", () => {
		cy.mount(<Input disabled value="initial" />);

		cy.get<Input>("[ui5-input]")
			.as("input");

		cy.get("@input")
			.should("have.attr", "disabled");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.attr", "disabled");
	});
});
```

---

## Dialog focus trap spec

Demonstrates: `invoke("prop", "open", true)` to open programmatically, `ui5DialogOpened` custom command, focus assertion with `should("be.focused")`, TAB trap verification.

```typescript
import Dialog from "../../src/Dialog.js";
import ToolbarButton from "../../src/ToolbarButton.js";

describe("Dialog", () => {
	it("traps focus inside the dialog on Tab", () => {
		cy.mount(
			<Dialog id="dialog">
				<ToolbarButton id="btn" slot="footer" text="OK" />
			</Dialog>
		);

		cy.get("#dialog")
			.invoke("prop", "open", true);

		cy.get<Dialog>("#dialog")
			.ui5DialogOpened();

		cy.get("#btn")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("#btn")
			.should("be.focused");
	});

	it("closes on Escape", () => {
		cy.mount(
			<Dialog id="dialog">
				<ToolbarButton id="btn" slot="footer" text="OK" />
			</Dialog>
		);

		cy.get("#dialog")
			.invoke("prop", "open", true);

		cy.get<Dialog>("#dialog")
			.ui5DialogOpened();

		cy.realPress("Escape");

		cy.get("#dialog")
			.should("not.have.attr", "open");
	});
});
```
