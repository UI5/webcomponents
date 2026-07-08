import Button from "../../../src/Button.js";
import ResponsivePopover from "../../../src/ResponsivePopover.js";

describe("ResponsivePopover visual", () => {
	it("basic state — open with content", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<ResponsivePopover opener="btnOpen">
					<div style={{ padding: "1rem" }}>Popover content</div>
				</ResponsivePopover>
			</>
		);
		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with header and footer slots", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<ResponsivePopover opener="btnOpen">
					<div slot="header" style={{ padding: "0.5rem 1rem", fontWeight: "bold" }}>Popover Header</div>
					<div style={{ padding: "1rem" }}>Popover content goes here.</div>
					<div slot="footer" style={{ padding: "0.5rem 1rem" }}>
						<Button design="Emphasized">Confirm</Button>
						<Button>Cancel</Button>
					</div>
				</ResponsivePopover>
			</>
		);
		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("contentOnlyOnDesktop — no header/footer on desktop", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<ResponsivePopover opener="btnOpen" contentOnlyOnDesktop>
					<div slot="header">Header</div>
					<div style={{ padding: "1rem" }}>Content only on desktop — header hidden.</div>
				</ResponsivePopover>
			</>
		);
		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("placement — End", () => {
		cy.mount(
			<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
				<Button id="btnOpen">Open</Button>
				<ResponsivePopover opener="btnOpen" placement="End">
					<div style={{ padding: "1rem" }}>Popover placed at End</div>
				</ResponsivePopover>
			</div>
		);
		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("placement — Top", () => {
		cy.mount(
			<div style={{ display: "flex", justifyContent: "center", paddingTop: "8rem" }}>
				<Button id="btnOpen">Open</Button>
				<ResponsivePopover opener="btnOpen" placement="Top">
					<div style={{ padding: "1rem" }}>Popover placed at Top</div>
				</ResponsivePopover>
			</div>
		);
		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
