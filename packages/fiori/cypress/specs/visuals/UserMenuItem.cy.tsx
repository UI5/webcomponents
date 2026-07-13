import UserMenu from "../../../src/UserMenu.js";
import UserMenuAccount from "../../../src/UserMenuAccount.js";
import UserMenuItem from "../../../src/UserMenuItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import palette from "@ui5/webcomponents-icons/dist/palette.js";
import notification from "@ui5/webcomponents-icons/dist/notification.js";

describe("UserMenuItem visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" />
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" icon={actionSettings} />
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("multiple items with icons", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" icon={actionSettings} />
					<UserMenuItem text="My Profile" icon={personPlaceholder} />
					<UserMenuItem text="Appearance" icon={palette} />
					<UserMenuItem text="Notifications" icon={notification} />
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with sub-items", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" icon={actionSettings}>
						<UserMenuItem text="Account Settings" />
						<UserMenuItem text="Privacy Settings" />
						<UserMenuItem text="Security Settings" />
					</UserMenuItem>
					<UserMenuItem text="My Profile" icon={personPlaceholder} />
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("showSelection — with checked sub-item", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Appearance" icon={palette} showSelection>
						<UserMenuItem text="Light" checked />
						<UserMenuItem text="Dark" />
						<UserMenuItem text="High Contrast" />
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" icon={actionSettings} />
					<UserMenuItem text="My Profile" icon={personPlaceholder} />
				</UserMenu>
			</div>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
