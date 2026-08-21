import Avatar from "../../../src/Avatar.js";
import AvatarBadge from "../../../src/AvatarBadge.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/alert.js";

describe("AvatarBadge visual", () => {
	it("basic state — icon badge on avatar", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("value state — None", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" state="None" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" state="Positive" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" state="Critical" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" state="Negative" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<Avatar>
				<AvatarBadge slot="badge" icon="employee" state="Information" />
			</Avatar>
		);
		cy.screenshot();
	});

	it("all sizes", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
				<Avatar size="XS">
					<AvatarBadge slot="badge" icon="alert" state="Negative" />
				</Avatar>
				<Avatar size="S">
					<AvatarBadge slot="badge" icon="alert" state="Negative" />
				</Avatar>
				<Avatar size="M">
					<AvatarBadge slot="badge" icon="alert" state="Negative" />
				</Avatar>
				<Avatar size="L">
					<AvatarBadge slot="badge" icon="alert" state="Negative" />
				</Avatar>
				<Avatar size="XL">
					<AvatarBadge slot="badge" icon="alert" state="Negative" />
				</Avatar>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Avatar>
					<AvatarBadge slot="badge" icon="employee" state="Negative" />
				</Avatar>
			</div>
		);
		cy.screenshot();
	});
});
