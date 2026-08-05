import MultiInput from "../../../src/MultiInput.js";
import Token from "../../../src/Token.js";
import SuggestionItem from "../../../src/SuggestionItem.js";

describe("MultiInput visual", () => {
	it("basic state — empty", () => {
		cy.mount(<MultiInput placeholder="Enter value" />);
		cy.screenshot();
	});

	it("compact mode — empty", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<MultiInput placeholder="Enter value" />
			</div>
		);
		cy.screenshot();
	});

	it("with tokens", () => {
		cy.mount(
			<MultiInput>
				<Token slot="tokens" text="Amet" />
				<Token slot="tokens" text="Bulgaria" />
				<Token slot="tokens" text="Canada" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("with tokens — focused/expanded", () => {
		cy.mount(
			<MultiInput>
				<Token slot="tokens" text="Amet" />
				<Token slot="tokens" text="Bulgaria" />
				<Token slot="tokens" text="Canada" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.get("[ui5-multi-input]").shadow().find("[ui5-tokenizer]").should("have.attr", "expanded");
		cy.screenshot();
	});

	it("with value help icon", () => {
		cy.mount(
			<MultiInput showValueHelpIcon>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(
			<MultiInput readonly>
				<Token slot="tokens" text="Amet" />
				<Token slot="tokens" text="Bulgaria" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<MultiInput disabled>
				<Token slot="tokens" text="Amet" />
				<Token slot="tokens" text="Bulgaria" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<MultiInput valueState="Negative">
				<span slot="valueStateMessage">Error message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(
			<MultiInput valueState="Negative">
				<span slot="valueStateMessage">Error message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<MultiInput valueState="Critical">
				<span slot="valueStateMessage">Warning message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(
			<MultiInput valueState="Critical">
				<span slot="valueStateMessage">Warning message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<MultiInput valueState="Positive">
				<span slot="valueStateMessage">Success message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(
			<MultiInput valueState="Positive">
				<span slot="valueStateMessage">Success message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<MultiInput valueState="Information">
				<span slot="valueStateMessage">Info message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(
			<MultiInput valueState="Information">
				<span slot="valueStateMessage">Info message</span>
				<Token slot="tokens" text="Amet" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("overflowing tokens — n-more indicator", () => {
		cy.mount(
			<MultiInput style={{ width: "250px" }}>
				<Token slot="tokens" text="Albania" />
				<Token slot="tokens" text="Argentina" />
				<Token slot="tokens" text="Bulgaria" />
				<Token slot="tokens" text="Canada" />
				<Token slot="tokens" text="Denmark" />
			</MultiInput>
		);
		cy.screenshot();
	});

	it("suggestions dropdown open", () => {
		cy.mount(
			<MultiInput showSuggestions>
				<SuggestionItem text="Bulgaria" />
				<SuggestionItem text="Brazil" />
				<SuggestionItem text="Belgium" />
			</MultiInput>
		);
		cy.get("[ui5-multi-input]").shadow().find("input").realClick();
		cy.realType("B");
		cy.get("[ui5-multi-input]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
