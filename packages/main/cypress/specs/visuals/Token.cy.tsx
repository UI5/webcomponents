import Tokenizer from "../../../src/Tokenizer.js";
import Token from "../../../src/Token.js";

describe("Token visual", () => {
	it("basic state", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("selected", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" selected />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" readonly />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("focused", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Algeria" />
			</Tokenizer>
		);
		cy.get("[ui5-token]").realClick();
		cy.screenshot();
	});

	it("long text", () => {
		cy.mount(
			<Tokenizer>
				<Token text="Lose yourself in the music moment" />
			</Tokenizer>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Tokenizer>
					<Token text="Algeria" />
					<Token text="Bulgaria" selected />
				</Tokenizer>
			</div>
		);
		cy.screenshot();
	});
});
