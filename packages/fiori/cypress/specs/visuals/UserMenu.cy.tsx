import UserMenu from "../../../src/UserMenu.js";
import UserMenuAccount from "../../../src/UserMenuAccount.js";
import UserMenuItem from "../../../src/UserMenuItem.js";
import UserMenuItemGroup from "../../../src/UserMenuItemGroup.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";

describe("UserMenu visual", () => {
	it("basic state — open with account", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with account description and additional info", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						description="Global Administrator"
						additionalInfo="Account expires in 30 days"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with avatar initials", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						avatarInitials="AC"
						avatarColorScheme="Accent3"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("showManageAccount", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showManageAccount>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("showOtherAccounts — multiple accounts", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showOtherAccounts>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						selected
					/>
					<UserMenuAccount
						slot="accounts"
						titleText="John Doe"
						subtitleText="John.Doe@sap.com"
						avatarInitials="JD"
						avatarColorScheme="Accent6"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("showEditAccounts", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showOtherAccounts showEditAccounts>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						selected
					/>
					<UserMenuAccount
						slot="accounts"
						titleText="John Doe"
						subtitleText="John.Doe@sap.com"
						avatarInitials="JD"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with menu items", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
					/>
					<UserMenuItem text="Settings" icon={actionSettings} />
					<UserMenuItem text="My Profile" icon={personPlaceholder} />
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("showEditButton", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showEditButton>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						avatarInitials="AC"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("no account provided", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" />
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showManageAccount>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						avatarInitials="AC"
					/>
					<UserMenuItem text="Settings" icon={actionSettings} />
				</UserMenu>
			</div>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
