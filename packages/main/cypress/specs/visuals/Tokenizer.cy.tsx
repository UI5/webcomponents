import Tokenizer from "../../../src/Tokenizer.js";
import Token from "../../../src/Token.js";

describe("Tokenizer visual", () => {
	it("basic state", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" />
				<Token text="Bulgaria" />
				<Token text="Canada" />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("with selected tokens", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" selected />
				<Token text="Bulgaria" selected />
				<Token text="Canada" />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(
			<Tokenizer readonly>
				<Token text="Algeria" />
				<Token text="Bulgaria" />
				<Token text="Canada" />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("overflow — nMore label visible", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
				<Tokenizer>
					<Token text="Algeria" />
					<Token text="Bulgaria" />
					<Token text="Canada" />
					<Token text="Denmark" />
					<Token text="Estonia" />
				</Tokenizer>
			</div>
		);
		cy.get("[ui5-tokenizer]").shadow().find(".ui5-tokenizer-more-text").should("exist");
		cy.screenshot();
	});

	it("expanded — all tokens visible", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
				<Tokenizer preventPopoverOpen>
					<Token text="Algeria" />
					<Token text="Bulgaria" />
					<Token text="Canada" />
					<Token text="Denmark" />
					<Token text="Estonia" />
				</Tokenizer>
			</div>
		);
		cy.get("[ui5-tokenizer]").shadow().find(".ui5-tokenizer-more-text").should("exist").realClick();
		cy.get("[ui5-tokenizer]").should("have.attr", "expanded");
		cy.screenshot();
	});

	it("nMore popover open", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
				<Tokenizer>
					<Token text="Algeria" />
					<Token text="Bulgaria" />
					<Token text="Canada" />
					<Token text="Denmark" />
					<Token text="Estonia" />
				</Tokenizer>
			</div>
		);
		cy.get("[ui5-tokenizer]").shadow().find(".ui5-tokenizer-more-text").should("exist").realClick();
		cy.get("[ui5-tokenizer]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Tokenizer>
					<Token text="Algeria" />
					<Token text="Bulgaria" />
					<Token text="Canada" />
				</Tokenizer>
			</div>
		);
		cy.screenshot();
	});
});
