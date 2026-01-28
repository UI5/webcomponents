import Button from "../../src/Button.js";
import ButtonState from "../../src/ButtonState.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(
			<Button>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
				<ButtonState name="generating" text="Stop Generating" icon="stop">Click me</ButtonState>
				<ButtonState name="revise" text="Revise" icon="ai">Click me</ButtonState>
			</Button>
		);
	});
});

describe("Accessibility", () => {
	it("should set correct tooltip to right text button", () => {
		cy.mount(
			<Button>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
				<ButtonState name="revise" text="Revise" icon="stop">Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeInTextButton("tooltip", "Generate with Artificial Intelligence");
	});

	it("should set correct aria-haspopup to SplitButton root element", () => {
		cy.mount(
			<Button accessibilityAttributes={{ root: { hasPopup: "menu" } }}>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-haspopup", "menu");
	});

	it("should set correct aria-roledescription to SplitButton root element", () => {
		cy.mount(
			<Button accessibilityAttributes={{ root: { roleDescription: "Open Menu" } }}>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-roledescription", "Open Menu");
	});

	it("should set correct aria-haspopup to arrow button if shown", () => {
		cy.mount(
			<Button accessibilityAttributes={{ arrowButton: { hasPopup: "menu", expanded: false } }}>
				<ButtonState name="generate" text="Generate" icon="ai" showArrowButton={true}>Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeInArrowButton("aria-haspopup", "menu");
	});

	it("should set correct aria-keyshortcuts to SplitButton root element", () => {
		cy.mount(
			<Button accessibilityAttributes={{ root: { ariaKeyShortcuts: "Alt+G" } }}>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-keyshortcuts", "Alt+G");
	});

	it("should set correct aria-label to SplitButton root element", () => {
		cy.mount(
			<Button id="aiButton" accessibilityAttributes={{ root: { title: "Some title" } }}>
				<ButtonState name="generate" text="Generate" icon="ai"  showArrowButton={false}>Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-label", "Some title");
	});

	it("should set correct aria attributes with default values when not provided", () => {
		cy.mount(
			<Button>
				<ButtonState name="generate" text="Generate" icon="ai" showArrowButton={true}>Click me</ButtonState>
			</Button>
		);

		cy.get("[ui5-ai-button]")
			.as("button");

		cy.get("@button")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-haspopup", "false");

		cy.get("@button")
			.ui5AIButtonCheckAttributeSplitButtonRoot("aria-roledescription", "Split Button");

		cy.get("@button")
			.ui5AIButtonCheckAttributeInArrowButton("aria-haspopup", "menu");

		cy.get("@button")
			.ui5AIButtonCheckAttributeInArrowButton("aria-expanded", "false");
	});
});
