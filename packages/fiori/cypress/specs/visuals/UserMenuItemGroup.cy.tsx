import UserMenu from "../../../src/UserMenu.js";
import UserMenuAccount from "../../../src/UserMenuAccount.js";
import UserMenuItem from "../../../src/UserMenuItem.js";
import UserMenuItemGroup from "../../../src/UserMenuItemGroup.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import palette from "@ui5/webcomponents-icons/dist/palette.js";
import notification from "@ui5/webcomponents-icons/dist/notification.js";
import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";

describe("UserMenuItemGroup visual", () => {
	it("basic state — single-select group", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Appearance" icon={palette} showSelection>
						<UserMenuItemGroup checkMode="Single">
							<UserMenuItem text="Light" checked />
							<UserMenuItem text="Dark" />
							<UserMenuItem text="High Contrast" />
						</UserMenuItemGroup>
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("multiple-select group", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Notifications" icon={notification}>
						<UserMenuItemGroup checkMode="Multiple">
							<UserMenuItem text="Email notifications" checked />
							<UserMenuItem text="Push notifications" checked />
							<UserMenuItem text="SMS notifications" />
						</UserMenuItemGroup>
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("multiple groups in one item", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier" subtitleText="Alain.Chevalier@sap.com" />
					<UserMenuItem text="Settings" icon={actionSettings}>
						<UserMenuItemGroup checkMode="Single">
							<UserMenuItem text="Light" checked />
							<UserMenuItem text="Dark" />
						</UserMenuItemGroup>
						<UserMenuItemGroup checkMode="Multiple">
							<UserMenuItem text="Show hints" checked />
							<UserMenuItem text="Show tips" />
						</UserMenuItemGroup>
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
					<UserMenuItem text="Appearance" icon={palette} showSelection>
						<UserMenuItemGroup checkMode="Single">
							<UserMenuItem text="Light" checked />
							<UserMenuItem text="Dark" />
						</UserMenuItemGroup>
					</UserMenuItem>
				</UserMenu>
			</div>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
