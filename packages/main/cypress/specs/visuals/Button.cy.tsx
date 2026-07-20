import Button from "../../../src/Button.js";
import ButtonBadge from "../../../src/ButtonBadge.js";
import download from "@ui5/webcomponents-icons/dist/download.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";

describe("Button visual", () => {
	it("basic state", () => {
		cy.mount(<Button>Default Button</Button>);
		cy.screenshot();
	});

	it("all design variants", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				<Button design="Default">Default</Button>
				<Button design="Emphasized">Emphasized</Button>
				<Button design="Positive">Positive</Button>
				<Button design="Negative">Negative</Button>
				<Button design="Transparent">Transparent</Button>
				<Button design="Attention">Attention</Button>
			</div>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Button icon={download}>Download</Button>
				<Button icon={edit} design="Emphasized">Edit</Button>
			</div>
		);
		cy.screenshot();
	});

	it("icon only", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Button icon={download} />
				<Button icon={edit} design="Emphasized" />
				<Button icon={download} design="Negative" />
			</div>
		);
		cy.screenshot();
	});

	it("icon end", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Button icon={download} iconEnd>Download</Button>
				<Button icon={edit} iconEnd design="Emphasized">Edit</Button>
			</div>
		);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				<Button disabled>Default</Button>
				<Button disabled design="Emphasized">Emphasized</Button>
				<Button disabled design="Positive">Positive</Button>
				<Button disabled design="Negative">Negative</Button>
				<Button disabled icon={download}>With Icon</Button>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", gap: "8px" }}>
				<Button>Default</Button>
				<Button design="Emphasized">Emphasized</Button>
				<Button icon={download}>With Icon</Button>
				<Button icon={download} />
			</div>
		);
		cy.screenshot();
	});

	it("with badge — attention dot", () => {
		cy.mount(
			<Button design="Emphasized">
				Messages
				<ButtonBadge slot="badge" design="AttentionDot" />
			</Button>
		);
		cy.screenshot();
	});

	it("with badge — counter", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Button>
					Notifications
					<ButtonBadge slot="badge" text="5" />
				</Button>
				<Button design="Emphasized">
					Alerts
					<ButtonBadge slot="badge" text="42" />
				</Button>
			</div>
		);
		cy.screenshot();
	});

	it("focused state", () => {
		cy.mount(<Button>Focus Me</Button>);
		cy.get("[ui5-button]").focus();
		cy.screenshot();
	});
});
