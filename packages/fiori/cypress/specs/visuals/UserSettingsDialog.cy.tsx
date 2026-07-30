import UserSettingsDialog from "../../../src/UserSettingsDialog.js";
import UserSettingsItem from "../../../src/UserSettingsItem.js";
import UserSettingsView from "../../../src/UserSettingsView.js";
import UserSettingsAccountView from "../../../src/UserSettingsAccountView.js";
import UserSettingsAppearanceView from "../../../src/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewGroup from "../../../src/UserSettingsAppearanceViewGroup.js";
import UserSettingsAppearanceViewItem from "../../../src/UserSettingsAppearanceViewItem.js";
import UserMenuAccount from "../../../src/UserMenuAccount.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("UserSettingsDialog visual", () => {
	it("basic state — open with header and items", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings" style={{ position: "relative" }}>
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView>
						<p>Account settings content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Appearance" icon="palette">
					<UserSettingsView>
						<p>Appearance settings content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Language &amp; Region" icon="globe">
					<UserSettingsView>
						<p>Language settings content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("with search field", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings" showSearchField>
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView>
						<p>Account content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Appearance" icon="palette">
					<UserSettingsView>
						<p>Appearance content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Notifications" icon="bell">
					<UserSettingsView>
						<p>Notifications content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsItem — disabled item", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView>
						<p>Account content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Appearance" icon="palette" disabled>
					<UserSettingsView>
						<p>Disabled item content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Language" icon="globe">
					<UserSettingsView>
						<p>Language content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsItem — mixed icons and no-icon items", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView>
						<p>Account content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="No Icon Item" icon="">
					<UserSettingsView>
						<p>No icon content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsItem — fixed items in footer", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView>
						<p>Account content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Appearance" icon="palette">
					<UserSettingsView>
						<p>Appearance content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="About" icon="sys-help" slot="fixedItems">
					<UserSettingsView>
						<p>About content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsView — with header text and custom content", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Notifications" icon="bell" headerText="Notification Settings" selected>
					<UserSettingsView>
						<p>Configure your notification preferences here.</p>
						<Button>Save</Button>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsView — tabs layout", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView text="General" slot="tabs">
						<p>General account settings.</p>
					</UserSettingsView>
					<UserSettingsView text="Security" slot="tabs">
						<p>Security settings.</p>
					</UserSettingsView>
					<UserSettingsView text="Privacy" slot="tabs">
						<p>Privacy settings.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsView — secondary page with back button", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsView slot="pages" secondary selected>
						<p>Secondary page content — back button visible.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsAccountView — with account info", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsAccountView>
						<UserMenuAccount
							slot="account"
							titleText="Alain Chevalier"
							subtitleText="Alain.Chevalier@sap.com"
							description="Delivery Manager, SAP SE"
						/>
					</UserSettingsAccountView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsAccountView — with manage account button", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee" selected>
					<UserSettingsAccountView showManageAccount>
						<UserMenuAccount
							slot="account"
							titleText="Alain Chevalier"
							subtitleText="Alain.Chevalier@sap.com"
						/>
					</UserSettingsAccountView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsAppearanceView — flat items", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Appearance" icon="palette" selected>
					<UserSettingsAppearanceView>
						<UserSettingsAppearanceViewItem itemKey="light" text="Morning Horizon" icon="sun" colorScheme="Accent1" selected />
						<UserSettingsAppearanceViewItem itemKey="dark" text="Evening Horizon" icon="crm-analytics" colorScheme="Accent10" />
						<UserSettingsAppearanceViewItem itemKey="hcb" text="High Contrast Black" icon="contrast" colorScheme="Accent8" />
					</UserSettingsAppearanceView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsAppearanceViewGroup — grouped items", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Appearance" icon="palette" selected>
					<UserSettingsAppearanceView>
						<UserSettingsAppearanceViewGroup headerText="Light Themes">
							<UserSettingsAppearanceViewItem itemKey="light" text="Morning Horizon" icon="sun" colorScheme="Accent1" selected />
							<UserSettingsAppearanceViewItem itemKey="light-hc" text="High Contrast White" icon="contrast" colorScheme="Accent2" />
						</UserSettingsAppearanceViewGroup>
						<UserSettingsAppearanceViewGroup headerText="Dark Themes">
							<UserSettingsAppearanceViewItem itemKey="dark" text="Evening Horizon" icon="crm-analytics" colorScheme="Accent10" />
							<UserSettingsAppearanceViewItem itemKey="hcb" text="High Contrast Black" icon="contrast" colorScheme="Accent8" />
						</UserSettingsAppearanceViewGroup>
					</UserSettingsAppearanceView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("UserSettingsAppearanceView — with additional content", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Appearance" icon="palette" selected>
					<UserSettingsAppearanceView>
						<UserSettingsAppearanceViewItem itemKey="light" text="Morning Horizon" icon="sun" colorScheme="Accent1" selected />
						<UserSettingsAppearanceViewItem itemKey="dark" text="Evening Horizon" icon="crm-analytics" colorScheme="Accent10" />
						<div slot="additionalContent" style={{ padding: "8px 16px" }}>
							<p>Additional appearance settings below.</p>
						</div>
					</UserSettingsAppearanceView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("multiple items — second item selected", () => {
		cy.mount(
			<UserSettingsDialog open headerText="Settings">
				<UserSettingsItem text="Account" icon="employee">
					<UserSettingsView>
						<p>Account content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="Appearance" icon="palette" selected>
					<UserSettingsAppearanceView>
						<UserSettingsAppearanceViewItem itemKey="light" text="Morning Horizon" icon="sun" colorScheme="Accent1" selected />
						<UserSettingsAppearanceViewItem itemKey="dark" text="Evening Horizon" icon="crm-analytics" colorScheme="Accent10" />
					</UserSettingsAppearanceView>
				</UserSettingsItem>
				<UserSettingsItem text="Language" icon="globe">
					<UserSettingsView>
						<p>Language content.</p>
					</UserSettingsView>
				</UserSettingsItem>
				<UserSettingsItem text="About" icon="sys-help" slot="fixedItems">
					<UserSettingsView>
						<p>About content.</p>
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<UserSettingsDialog open headerText="Settings">
					<UserSettingsItem text="Account" icon="employee" selected>
						<UserSettingsView>
							<p>Account content.</p>
						</UserSettingsView>
					</UserSettingsItem>
					<UserSettingsItem text="Appearance" icon="palette">
						<UserSettingsView>
							<p>Appearance content.</p>
						</UserSettingsView>
					</UserSettingsItem>
				</UserSettingsDialog>
			</div>
		);
		cy.get("[ui5-user-settings-dialog]").shadow().find("[ui5-dialog]").ui5DialogOpened();
		cy.screenshot();
	});
});
