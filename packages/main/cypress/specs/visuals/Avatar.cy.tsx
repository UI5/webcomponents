import Avatar from "../../../src/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";

describe("Avatar visual", () => {
	it("initials — all sizes", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
				<Avatar size="XS" initials="AB" />
				<Avatar size="S" initials="AB" />
				<Avatar size="M" initials="AB" />
				<Avatar size="L" initials="AB" />
				<Avatar size="XL" initials="AB" />
			</div>
		);
		cy.screenshot();
	});

	it("size — XS", () => {
		cy.mount(<Avatar size="XS" initials="XS" />);
		cy.screenshot();
	});

	it("size — S", () => {
		cy.mount(<Avatar size="S" initials="SM" />);
		cy.screenshot();
	});

	it("size — M", () => {
		cy.mount(<Avatar size="M" initials="MD" />);
		cy.screenshot();
	});

	it("size — L", () => {
		cy.mount(<Avatar size="L" initials="LG" />);
		cy.screenshot();
	});

	it("size — XL", () => {
		cy.mount(<Avatar size="XL" initials="XL" />);
		cy.screenshot();
	});

	it("shape — Circle vs Square", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Avatar shape="Circle" size="M" initials="CI" />
				<Avatar shape="Square" size="M" initials="SQ" />
			</div>
		);
		cy.screenshot();
	});

	it("icon content", () => {
		cy.mount(<Avatar size="M" icon="employee" />);
		cy.screenshot();
	});

	it("color schemes", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				<Avatar size="S" initials="A1" colorScheme="Accent1" />
				<Avatar size="S" initials="A2" colorScheme="Accent2" />
				<Avatar size="S" initials="A3" colorScheme="Accent3" />
				<Avatar size="S" initials="A4" colorScheme="Accent4" />
				<Avatar size="S" initials="A5" colorScheme="Accent5" />
				<Avatar size="S" initials="A6" colorScheme="Accent6" />
				<Avatar size="S" initials="A7" colorScheme="Accent7" />
				<Avatar size="S" initials="A8" colorScheme="Accent8" />
				<Avatar size="S" initials="A9" colorScheme="Accent9" />
				<Avatar size="S" initials="10" colorScheme="Accent10" />
			</div>
		);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Avatar size="M" initials="AB" disabled />
				<Avatar size="M" icon="employee" disabled />
			</div>
		);
		cy.screenshot();
	});

	it("placeholder color scheme", () => {
		cy.mount(<Avatar size="M" colorScheme="Placeholder" />);
		cy.screenshot();
	});
});
