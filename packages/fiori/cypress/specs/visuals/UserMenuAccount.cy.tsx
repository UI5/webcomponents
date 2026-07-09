import UserMenu from "../../../src/UserMenu.js";
import UserMenuAccount from "../../../src/UserMenuAccount.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("UserMenuAccount visual", () => {
	it("basic state — title and subtitle", () => {
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

	it("with description", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						description="Global Administrator"
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with additional info", () => {
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
					/>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("avatarColorScheme — Accent3", () => {
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

	it("selected state — multiple accounts", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<UserMenu open opener="opener" showOtherAccounts>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						avatarInitials="AC"
						selected
					/>
					<UserMenuAccount
						slot="accounts"
						titleText="John Doe"
						subtitleText="John.Doe@sap.com"
						avatarInitials="JD"
						avatarColorScheme="Accent6"
					/>
					<UserMenuAccount
						slot="accounts"
						titleText="Maria Garcia"
						subtitleText="Maria.Garcia@sap.com"
						avatarInitials="MG"
						avatarColorScheme="Accent2"
					/>
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
				<UserMenu open opener="opener" showOtherAccounts>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier"
						subtitleText="Alain.Chevalier@sap.com"
						avatarInitials="AC"
						selected
					/>
					<UserMenuAccount
						slot="accounts"
						titleText="John Doe"
						subtitleText="John.Doe@sap.com"
						avatarInitials="JD"
					/>
				</UserMenu>
			</div>
		);
		cy.get("[ui5-user-menu]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
