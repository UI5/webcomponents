import Button from "../../src/Button.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

describe("ResponsivePopover general interaction", () => {
	it("header and footer are displayed by default", () => {
		cy.mount(
			<>
				<Button id="btnOpen" />
				<ResponsivePopover opener={"btnOpen"}>
					<div slot="header" />
					<div slot="footer" />
				</ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("exist");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find(".ui5-popup-footer-root")
			.should("exist");
	});

	it("header and footer are hidden on desktop", () => {
		cy.mount(
			<>
				<Button id="btnOpen3" />
				<ResponsivePopover contentOnlyOnDesktop={true} opener="btnOpen3">
					<div slot="header" />
				</ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);

		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.get("[ui5-responsive-popover]").shadow().find(".ui5-popup-header-root").should("not.exist");
	});

	it("Initial focus NOT prevented", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocus" />
				<ResponsivePopover opener={"btnInitialFocus"} />
			</>
		);

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();

		cy.get("[ui5-responsive-popover]").should("have.focus");
		cy.get("[ui5-button]").should("not.have.focus");
	});

	it("Initial focus prevented", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocusPrevented" />
				<ResponsivePopover preventInitialFocus={true} opener={"btnInitialFocusPrevented"} />
			</>
		);

		cy.get("[ui5-button]").realClick();

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();

		cy.get("[ui5-button]").should("have.focus");
	});

	it("tests popover toggling with 'open' attribute", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocusPrevented" />
				<ResponsivePopover opener={"btnInitialFocusPrevented"} />
			</>
		);

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", true);
		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();

		cy.get("[ui5-responsive-popover]").invoke("attr", "open", false);
		cy.get<ResponsivePopover>("[ui5-responsive-popover]").ui5ResponsivePopoverClosed();
	});
});

describe("Acc", () => {
	it("tests accessible-role=Dialog", () => {
		cy.mount(<ResponsivePopover id="respPopover" />);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog")
			.and("have.attr", "aria-modal", "true");
	});

	it("tests accessible-role=AlertDialog", () => {
		cy.mount(<ResponsivePopover id="rPAlertRole" accessibleRole="AlertDialog" />);

		cy.get("#rPAlertRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog")
			.and("have.attr", "aria-modal", "true");
	});

	it("tests none accessible-role", () => {
		cy.mount(
			<>
				<Button id="btnRoleNone" />
				<ResponsivePopover id="rPNoneRole" accessibleRole="None" opener={"btnRoleNone"} />
			</>
		);

		cy.get("#rPNoneRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role",)

		cy.get("#rPNoneRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal");
	});
});