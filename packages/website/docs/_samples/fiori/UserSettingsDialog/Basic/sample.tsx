import { createReactComponent } from "@ui5/webcomponents-base";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserSettingsDialogClass from "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import UserSettingsItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const ShellBar = createReactComponent(ShellBarClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserSettingsDialog = createReactComponent(UserSettingsDialogClass);
const UserSettingsItem = createReactComponent(UserSettingsItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);
const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const Dialog = createReactComponent(DialogClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const Panel = createReactComponent(PanelClass);
const Switch = createReactComponent(SwitchClass);
const Text = createReactComponent(TextClass);
const Toast = createReactComponent(ToastClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {

  const handleUi5ProfileClick = (e) => {
    console.log(" menuShellBar ui5-profile-click")

	menuShellBar.opener = e.detail.targetRef;
	if (menuShellBar.open) {
		menuShellBar.open = false;
  };

  const handleItemClick = (e) => {
    console.log(" menuShellBar item-click")
	const item = e.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			settingsDialog.open = true;
  };

  const handleEditAccountsClick = () => {
    console.log("Avatar clicked");
  };

  const handleManageAccountClick = () => {
    console.log("Manage account clicked");
  };

  const handleClick = () => {
    additionalDialog.open = true;
  };

  const handleSelectionChange = () => {
    additionalDialog.open = true;
  };

  const handleSelectionChange = (e) => {
    const selectedItem = e.detail.item;
			
	if (selectedItem?.itemKey) {
		setTheme(selectedItem.itemKey);
  };

  const handleClick = () => {
    additionalDialog.open = false;
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e?.detail.item?.text
  };

  const handleClick = () => {
    mobileSecondPage.selected = true;
	mobileSecondPage.text = "iOS";
  };

  const handleClick = () => {
    mobileSecondPage.selected = true;
	mobileSecondPage.text = "Android";
  };

  const handleClick = () => {
    toastReset.open = true;
  };

  const handleClick = () => {
    toastResetAll.open = true;
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e.detail.item.text
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e.detail.view.text
  };

  const handleOpen = (e) => {
    console.log("Settings dialog opened", e);
  };

  const handleBeforeClose = (e) => {
    console.log("Settings dialog before close", e.detail);
	if (!confirm("Are you sure you want to close the dialog?")) {
		e.preventDefault();
  };

  const handleClose = (e) => {
    console.log("Settings dialog closed", e);
  };

  return (
    <>
      <ShellBar id="shellbar">
    	<ui5-shellbar-branding slot="branding">
    		Corporate Portal
    		<img slot="logo" src="/images/sap-logo-svg.svg"/>
    	</ui5-shellbar-branding>
    	<Avatar slot="profile">
    		<img src="/images/avatars/man_avatar_3.png"/>
    	</Avatar>
    </ShellBar>
    <UserMenu id="userMenuShellBar">
    	<UserMenuAccount slot="accounts" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" selected={true} />
    	<UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
    </UserMenu>

    <UserSettingsDialog id="settings" header-text="Settings" show-search-field={true}>
    	<UserSettingsItem icon="user-settings" text="User Account" tooltip="User Account" header-text="User Account">
    		<ui5-user-settings-account-view id="account" show-manage-account="true">
    			<UserMenuAccount slot="account" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" />
    			<Label htmlFor="reset-all-button">Personalization</Label><br />
    			<Button id="reset-all-button">Reset All Personalization</Button>
    			<Panel fixed={true} className="ua-panel">
    				<Text>
    					Reset your personalization settings for the launchpad (such as theme, language, user activities, and home page content).
    				</Text>
    			</Panel>

    		</ui5-user-settings-account-view>
    	</UserSettingsItem>

    	<UserSettingsItem icon="palette" text="Appearance" tooltip="Appearance" header-text="Appearance">
    		<ui5-user-settings-appearance-view text="Themes">
    			<div slot="additionalContent">
    				<div className="ui5-user-settings-appearance-view-additional-content-header">
    					<Text>Optimize for Touch Input</Text>
    					<Switch />
    				</div>
    				<Text className="ui5-user-settings-appearance-view-additional-content-description">
    					Increases the size and spacing of controls to allow you to interact with them more easily using your fingertip.
    					This is useful for hybrid devices that combine touch and mouse events.
    				</Text>
    			</div>
    			<ui5-user-settings-appearance-view-group header-text="SAP Horizon">
    				<ui5-user-settings-appearance-view-item item-key="sap_horizon" text="SAP Morning Horizon"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_horizon_dark" text="SAP Evening Horizon"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_horizon_hcb" text="SAP Horizon High Contrast Black"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_horizon_hcw" text="SAP Horizon High Contrast White"></ui5-user-settings-appearance-view-item>
    			</ui5-user-settings-appearance-view-group>
    			<ui5-user-settings-appearance-view-group header-text="SAP Quartz">
    				<ui5-user-settings-appearance-view-item item-key="sap_fiori_3" text="SAP Quartz Light"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_fiori_3_dark" text="SAP Quartz Dark"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_fiori_3_hcb" text="SAP Quartz High Contrast Black"></ui5-user-settings-appearance-view-item>
    				<ui5-user-settings-appearance-view-item item-key="sap_fiori_3_hcw" text="SAP Quartz High Contrast White"></ui5-user-settings-appearance-view-item>
    			</ui5-user-settings-appearance-view-group>
    		</ui5-user-settings-appearance-view>
    	</UserSettingsItem>

    	<UserSettingsItem text="Language and Region" tooltip="Language and Region" header-text="Language and Region">
    		<ui5-user-settings-view>
    			<div id="language-region-container" className="language-region-container">
    				<Label className="language-region-label">Display Language:</Label>
    				<ComboBox id="language" className="language-region-control" placeholder="Language" value="English (United States)">
    					<ComboBoxItem text="Browser Language" selected={true} additional-text="English" />
    					<ComboBoxItem text="English (United Kingdom)" additional-text="English (United Kingdom)" />
    					<ComboBoxItem text="English (United States)" additional-text="English (United States)" />
    					<ComboBoxItem text="French (France)" additional-text="Français (France)" />
    					<ComboBoxItem text="French (Canada)" additional-text="Français (Canada)" />
    					<ComboBoxItem text="German (Germany)" additional-text="Deutsch (Deutschland)" />
    					<ComboBoxItem text="German (Switzerland)" additional-text="Deutsch (Schweiz)" />
    					<ComboBoxItem text="Japanese" additional-text="日本語 (日本)" />
    					<ComboBoxItem text="Portuguese (Brazil)" additional-text="Português (Brasil)"  />
    					<ComboBoxItem text="Simplified Chinese (China)" additional-text="简体中文（中国)" />
    					<ComboBoxItem text="Spanish (Mexico)" additional-text="Español (América Latina)" />
    					<ComboBoxItem text="Spanish (Spain)" additional-text="Español (España)" />
    				</ComboBox>
    				<Label className="language-region-label">Region:</Label>
    				<ComboBox id="region" className="language-region-control" placeholder="Region" value="United States">
    					<ComboBoxItem text="United Kingdom" additional-text="GB" />
    					<ComboBoxItem text="United States" additional-text="US" />
    					<ComboBoxItem text="French (France)" additional-text="FR" />
    					<ComboBoxItem text="French (Canada)" additional-text="CA" />
    					<ComboBoxItem text="German (Germany)" additional-text="DE" />
    					<ComboBoxItem text="German (Switzerland)" additional-text="CH"  />
    					<ComboBoxItem text="Japanese" additional-text="JP" />
    					<ComboBoxItem text="Portuguese (Brazil)" additional-text="BR" />
    					<ComboBoxItem text="Simplified Chinese (China)" additional-text="CN" />
    					<ComboBoxItem text="Spanish (Mexico)" additional-text="MX" />
    					<ComboBoxItem text="Spanish (Spain)" additional-text="ES" />
    				</ComboBox>
    				<Label className="language-region-label">Date Format:</Label>
    				<ComboBox id="dateFormat" className="language-region-control" placeholder="Date Format" value="MM.DD.YYYY">
    					<ComboBoxItem text="MM/DD/YYYY" additional-text="e.g. 10/23/2025" />
    					<ComboBoxItem text="MM.DD.YYYY" additional-text="e.g. 10.23.2025" />
    					<ComboBoxItem text="MM-DD-YYYY" additional-text="e.g. 10-23-2025" />
    					<ComboBoxItem text="DD/MM/YYYY" additional-text="e.g. 23/10/2025" />
    					<ComboBoxItem text="DD.MM.YYYY" additional-text="e.g. 23.10.2025" />
    					<ComboBoxItem text="DD-MM-YYYY" additional-text="e.g. 23-10-2025" />
    					<ComboBoxItem text="YYYY/MM/DD" additional-text="e.g. 2025/10/23" />
    					<ComboBoxItem text="YYYY.MM.DD" additional-text="e.g. 2025.10.23" />
    					<ComboBoxItem text="YYYY-MM-DD" additional-text="e.g. 2025-10-23" />
    				</ComboBox>
    				<Label className="language-region-label">Time Format:</Label>
    				<ComboBox id="timeFormat" className="language-region-control" placeholder="Time Format" value="12 Hour">
    					<ComboBoxItem text="24 Hour" additional-text="e.g. 12:05:10" />
    					<ComboBoxItem text="12 Hour" additional-text="e.g. 12:05:10 PM" />
    					<ComboBoxItem text="12 Hour (lowercase)" additional-text="e.g. 12:05:10 pm" />
    					<ComboBoxItem text="Hours from 0 to 11" additional-text="e.g. 00:05:10 PM" />
    					<ComboBoxItem text="Hours from 0 to 11 (lowercase)" additional-text="e.g. 00:05:10 pm" />
    				</ComboBox>
    				<Label className="language-region-label">Time Zone:</Label>
    				<ComboBox id="timeZone" className="language-region-control" placeholder="Time Zone" value="Eastern Standard Time (UTC -05:00)">
    					<ComboBoxItem text="Pacific Time (UTC -08:00)" additional-text="Sacramento, United States" />
    					<ComboBoxItem text="Mountain Time (UTC -07:00)" additional-text="Denver, United States" />
    					<ComboBoxItem text="Central Time (UTC -06:00)" additional-text="Austin, United States" />
    					<ComboBoxItem text="Eastern Standard Time (UTC -05:00)" additional-text="Washington, United States" />
    					<ComboBoxItem text="Atlantic Time (UTC -04:00)" additional-text="Halifax, Canada" />
    					<ComboBoxItem text="Newfoundland Time (UTC -03:30)" additional-text="St. John's, Canada" />
    					<ComboBoxItem text="Brasilia Time (UTC -03:00)" additional-text="Brasília, Brazil" />
    					<ComboBoxItem text="Argentina Time (UTC -03:00)" additional-text="Buenos Aires, Argentina" />
    					<ComboBoxItem text="Greenwich Mean Time (UTC +00:00)" additional-text="London, United Kingdom" />
    					<ComboBoxItem text="Central European Time (UTC +01:00)" additional-text="Berlin, Germany" />
    					<ComboBoxItem text="Eastern European Time (UTC +02:00)" additional-text="Athens, Greece" />
    					<ComboBoxItem text="Turkey Time (UTC +03:00)" additional-text="Ankara, Türkiye" />
    					<ComboBoxItem text="Arabian Time (UTC +04:00)" additional-text="Abu Dhabi, United Arab Emirates" />
    					<ComboBoxItem text="Pakistan Standard Time (UTC +05:00)" additional-text="Islamabad, Pakistan" />
    					<ComboBoxItem text="India Standard Time (UTC +05:30)" additional-text="New Delhi, India" />
    					<ComboBoxItem text="Bangladesh Standard Time (UTC +06:00)" additional-text="Dhaka, Bangladesh" />
    					<ComboBoxItem text="Indochina Time (UTC +07:00)" additional-text="Bangkok, Thailand" />
    					<ComboBoxItem text="China Standard Time (UTC +08:00)" additional-text="Beijing, China" />
    					<ComboBoxItem text="Singapore Time (UTC +08:00)" additional-text="Singapore, Singapore" />
    					<ComboBoxItem text="Hong Kong Time (UTC +08:00)" additional-text="Hong Kong, China" />
    					<ComboBoxItem text="Japan Standard Time (UTC +09:00)" additional-text="Tokyo, Japan" />
    					<ComboBoxItem text="Korea Standard Time (UTC +09:00)" additional-text="Seoul, South Korea" />
    					<ComboBoxItem text="Australian Eastern Time (UTC +10:00)" additional-text="Canberra, Australia" />
    					<ComboBoxItem text="New Zealand Time (UTC +12:00)" additional-text="Wellington, New Zealand" />
    				</ComboBox>
    				<Label className="language-region-label">Currency:</Label>
    				<ComboBox id="currency" className="language-region-control" placeholder="Currency" value="USD - United States Dollar">
    					<ComboBoxItem text="USD - United States Dollar" additional-text="USD" value="USD" />
    					<ComboBoxItem text="Euro" additional-text="EUR" />
    					<ComboBoxItem text="British Pound" additional-text="GBP" />
    					<ComboBoxItem text="Japanese Yen" additional-text="JPY" />
    					<ComboBoxItem text="Swiss Franc" additional-text="CHF" />
    					<ComboBoxItem text="Canadian Dollar" additional-text="CAD" />
    					<ComboBoxItem text="Australian Dollar" additional-text="AUD" />
    					<ComboBoxItem text="New Zealand Dollar" additional-text="NZD" />
    					<ComboBoxItem text="Chinese Yuan Renminbi" additional-text="CNY" />
    					<ComboBoxItem text="Indian Rupee" additional-text="INR" />
    					<ComboBoxItem text="Brazilian Real" additional-text="BRL" />
    					<ComboBoxItem text="South African Rand" additional-text="ZAR" />
    					<ComboBoxItem text="Russian Ruble" additional-text="RUB" />
    					<ComboBoxItem text="Mexican Peso" additional-text="MXN" />
    					<ComboBoxItem text="Singapore Dollar" additional-text="SGD" />
    					<ComboBoxItem text="Hong Kong Dollar" additional-text="HKD" />
    					<ComboBoxItem text="Norwegian Krone" additional-text="NOK" />
    					<ComboBoxItem text="Swedish Krona" additional-text="SEK" />
    					<ComboBoxItem text="South Korean Won" additional-text="KRW" />
    					<ComboBoxItem text="Turkish Lira" additional-text="TRY" />
    				</ComboBox>
    				<Label className="language-region-label">Number Format:</Label>
    				<ComboBox id="numberFormat" className="language-region-control" placeholder="Number Format" value="1,234.56">
    					<ComboBoxItem text="1.234,56" additional-text="Germany" />
    					<ComboBoxItem text="1,234.56" additional-text="US/UK" />
    					<ComboBoxItem text="1 234,56" additional-text="France" />
    					<ComboBoxItem text="1'234.56" additional-text="Switzerland" />
    					<ComboBoxItem text="1234,56" additional-text="SI/SO Format" />
    				</ComboBox>
    			</div>
    		</ui5-user-settings-view>
    	</UserSettingsItem>


    	<UserSettingsItem icon="iphone" text="SAP Mobile Start Application" tooltip="SAP Mobile Start Application" header-text="SAP Mobile Start Application">
    		<ui5-user-settings-view>
    			<Button id="mobile1-button">iOS</Button>
    			<Button id="mobile2-button">Android</Button>
    		</ui5-user-settings-view>

    		<ui5-user-settings-view text="Inner Page" id="mobile-second-page" secondary>
    			<Text>Enable access to your site from the SAP Mobile Start application.</Text>
    			<Button id="mobile-install">Install</Button><Button id="mobile-register">Register</Button>
    			<Text>Scan the QR Code to install the mobile application</Text>
    			<Icon style={{ width: "20rem", height: "20rem" }} name="qr-code" />
    		</ui5-user-settings-view>
    	</UserSettingsItem>

    	<UserSettingsItem icon="bell" text="Notifications" tooltip="Notifications" header-text="Notifications">
    		<ui5-user-settings-view>
    			<CheckBox checked={true} text="Show High-Priority Notification Alerts" />
    		</ui5-user-settings-view>
    	</UserSettingsItem>

    	<UserSettingsItem icon="reset" slot="fixedItems" text="Reset Settings" tooltip="Reset Settings" header-text="Reset Settings">
    		<ui5-user-settings-view text="Reset Personalization">
    			<Button id="resetPersonalization">Reset Personalization content</Button>
    			<Toast id="toastReset" design="Emphasized">Changes Reset.</Toast>
    		</ui5-user-settings-view>
    		<ui5-user-settings-view text="Reset All Settings">
    			<Button id="resetAll">Reset All Settings content</Button>
    			<Toast id="toastResetAll" design="Emphasized">All changes Reset.</Toast>
    		</ui5-user-settings-view>
    	</UserSettingsItem>
    </UserSettingsDialog>

    <Dialog id="additionalDialog" state="Information" header-text="Change Display Language">
    	<Text>Changing the display language to [New Language] will update the language across the user interface.</Text>
    	<Toolbar slot="footer">
    		<ToolbarButton className="dialogCloser" design="Emphasized" text="Change Language" />
    		<ToolbarButton className="dialogCloser" design="Transparent" text="Cancel" />
    	</Toolbar>
    </Dialog>
    </>
  );
}

export default App;
