import Link from "../../src/Link.js";

describe("Eventing", () => {
	it("Default prevented", () => {
		cy.mount(
			<Link
				href="#newPrevented"
				onClick={event => event.preventDefault()}
			>
				Default prevented
			</Link >
		);

		cy.url()
			.should("not.include", "#newPrevented");

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("not.include", "#newPrevented");
	});

	it("Default not prevented", () => {
		cy.mount(
			<Link href="#newNotPrevented">
				Normal link
			</Link >
		);

		cy.url()
			.should("not.include", "#newNotPrevented");

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("include", "#newNotPrevented");
	});
});