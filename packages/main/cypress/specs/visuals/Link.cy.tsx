import Link from "../../../src/Link.js";

describe("Link visual", () => {
	it("basic state", () => {
		cy.mount(<Link>Default Link</Link>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Link>Default Link</Link>
			</div>
		);
		cy.screenshot();
	});

	it("design — Subtle", () => {
		cy.mount(<Link design="Subtle">Subtle Link</Link>);
		cy.screenshot();
	});

	it("design — Emphasized", () => {
		cy.mount(<Link design="Emphasized">Emphasized Link</Link>);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<Link disabled>Disabled Link</Link>);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(<Link icon="employee">View employee profile</Link>);
		cy.screenshot();
	});

	it("with end icon", () => {
		cy.mount(<Link endIcon="cloud">Weather today</Link>);
		cy.screenshot();
	});

	it("wrapping — long text", () => {
		cy.mount(
			<Link style="width: 150px">
				Eu enim consectetur do amet elit Lorem ipsum dolor sit amet consectetur.
			</Link>
		);
		cy.screenshot();
	});

	it("truncated — wrappingType None", () => {
		cy.mount(
			<Link wrappingType="None" style="width: 150px">
				Eu enim consectetur do amet elit Lorem ipsum dolor sit amet consectetur.
			</Link>
		);
		cy.screenshot();
	});

	it("focused", () => {
		cy.mount(<Link>Focused Link</Link>);
		cy.get("[ui5-link]").focus();
		cy.screenshot();
	});
});
