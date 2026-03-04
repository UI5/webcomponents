import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef, useCallback } from "react";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserSettingsAccountViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";
import UserSettingsAppearanceViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewGroupClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";
import UserSettingsAppearanceViewItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";
import UserSettingsDialogClass from "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import UserSettingsItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import UserSettingsViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsView.js";
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
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/palette.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/qr-code.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/reset.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserSettingsAccountView = createReactComponent(UserSettingsAccountViewClass);
const UserSettingsAppearanceView = createReactComponent(UserSettingsAppearanceViewClass);
const UserSettingsAppearanceViewGroup = createReactComponent(UserSettingsAppearanceViewGroupClass);
const UserSettingsAppearanceViewItem = createReactComponent(UserSettingsAppearanceViewItemClass);
const UserSettingsDialog = createReactComponent(UserSettingsDialogClass);
const UserSettingsItem = createReactComponent(UserSettingsItemClass);
const UserSettingsView = createReactComponent(UserSettingsViewClass);
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
  const additionalDialogRef = useRef(null);
  const mobileSecondPageRef = useRef(null);
  const toastResetRef = useRef(null);
  const toastResetAllRef = useRef(null);
  const userMenuRef = useRef(null);
  const settingsDialogRef = useRef(null);

  const handleShellbarUi5ProfileClick = useCallback((e) => {
    console.log(" menuShellBar ui5-profile-click");
    const menu = userMenuRef.current;
    if (menu) {
      menu.opener = e.detail.targetRef;
      if (menu.open) {
        menu.open = false;
      } else {
        menu.open = true;
      }
    }
  }, []);

  const handleUserMenuShellBarItemClick = useCallback((e) => {
    console.log(" menuShellBar item-click");
    const item = e.detail.item.getAttribute("data-id");
    switch (item) {
      case "setting":
        if (settingsDialogRef.current) {
          settingsDialogRef.current.open = true;
        }
        break;
    }
  }, []);

  const handleAccountEditAccountsClick = useCallback(() => {
    console.log("Avatar clicked");
  }, []);

  const handleAccountManageAccountClick = useCallback(() => {
    console.log("Manage account clicked");
  }, []);

  const handleResetAllButtonClick = useCallback(() => {
    if (additionalDialogRef.current) {
      additionalDialogRef.current.open = true;
    }
  }, []);

  const handleLanguageSelectionChange = useCallback(() => {
    if (additionalDialogRef.current) {
      additionalDialogRef.current.open = true;
    }
  }, []);

  const handleAppearanceViewSelectionChange = useCallback((e) => {
    const selectedItem = e.detail.item;
    if (selectedItem?.itemKey) {
      setTheme(selectedItem.itemKey);
    }
  }, []);

  const handleDialogCloserClick = useCallback(() => {
    if (additionalDialogRef.current) {
      additionalDialogRef.current.open = false;
    }
  }, []);

  const handleSettingsItemSelectionChange = useCallback((e) => {
    console.log(`Selection change: ${e?.detail.item?.text}`, e.detail);
  }, []);

  const handleMobile1ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current.selected = true;
      mobileSecondPageRef.current.text = "iOS";
    }
  }, []);

  const handleMobile2ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current.selected = true;
      mobileSecondPageRef.current.text = "Android";
    }
  }, []);

  const handleResetPersonalizationClick = useCallback(() => {
    if (toastResetRef.current) {
      toastResetRef.current.open = true;
    }
  }, []);

  const handleResetAllClick = useCallback(() => {
    if (toastResetAllRef.current) {
      toastResetAllRef.current.open = true;
    }
  }, []);

  const handleSettingsSelectionChange = useCallback((e) => {
    console.log(`Selection change: ${e.detail.item.text}`, e.detail);
    if (e.detail.item.text === "Language and Region") {
      e.detail.item.loading = true;
      e.detail.item.loadingReason = "Language & Region loading data...";
      setTimeout(() => {
        e.detail.item.loading = false;
      }, 500);
    }
  }, []);

  const handleSettingsDialogItemSelectionChange = useCallback((e) => {
    console.log(`Selection change: ${e.detail.view.text}`, e.detail);
  }, []);

  const handleSettingsOpen = useCallback((e) => {
    console.log("Settings dialog opened", e);
  }, []);

  const handleSettingsBeforeClose = useCallback((e) => {
    console.log("Settings dialog before close", e.detail);
    if (!confirm("Are you sure you want to close the dialog?")) {
      e.preventDefault();
    }
  }, []);

  const handleSettingsClose = useCallback((e) => {
    console.log("Settings dialog closed", e);
  }, []);

  return (
    <>
      <style>{`
        .ua-name{
        	display:inline;
        	margin:0.5rem
        }
        .container{
        	display: flex;
        	flex-direction: column;
        	gap: 1rem;
        	margin: 3rem;
        }

        .ua-info-item{
        	display: grid;
        	grid-template-columns: 50px 1fr;
        	align-items: center;
        	gap: 16px;
        }

        .ua-panel{
        	border-top: 2px solid lightgrey;
        	margin: 1rem 0;
        }

        .save-btn{
        	position: absolute;
        	bottom: 1rem;
        }

        .lr-item{
        	display: grid;
        	grid-template-columns: 150px 1fr;
        	align-items: center;
        	gap: 16px;
        }

        .lt-time-format{
        	display: flex;
        	align-items: center;
        	margin: 0 1rem 0 1rem;
        }

        .language-region-container{
        	display: flex;
        	min-height: 2.5rem;
        	align-item:flex-start;
        	flex-direction: column;
        	gap: 0.563rem;
        }

        .language-region-label{
        	display: flex;
        	flex: 1 0 0;
        	width: 100%;
        }

        .language-region-control{
        	display: flex;
        	gap: 0.188rem;
        	width: 100%;
        }

        .ui5-user-settings-appearance-view-additional-content-header {
        	display: flex;
        	justify-content: space-between;
        	align-items: center;
        	margin-bottom: 0.5rem;
        	width: 100%;
        }
        .ui5-user-settings-appearance-view-additional-content-description {
        	display: block;
        	color: var(--sapContent_LabelColor);
        	font-size: var(--sapFontSmallSize);
        }
      `}</style>
      <ShellBar id="shellbar" onUi5ProfileClick={handleShellbarUi5ProfileClick}>
        <ShellBarBranding slot="branding">
          Corporate Portal
          <img slot="logo" src="/images/sap-logo-svg.svg" />
        </ShellBarBranding>
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" />
        </Avatar>
      </ShellBar>
      <UserMenu ref={userMenuRef} id="userMenuShellBar" onItemClick={handleUserMenuShellBarItemClick}>
        <UserMenuAccount slot="accounts" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" selected={true} />
        <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
      </UserMenu>

      <UserSettingsDialog
        ref={settingsDialogRef}
        id="settings"
        header-text="Settings"
        show-search-field={true}
        onSelectionChange={handleSettingsSelectionChange}
        onOpen={handleSettingsOpen}
        onBeforeClose={handleSettingsBeforeClose}
        onClose={handleSettingsClose}
      >
        <UserSettingsItem icon="user-settings" text="User Account" tooltip="User Account" header-text="User Account" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsAccountView id="account" show-manage-account="true" onEditAccountsClick={handleAccountEditAccountsClick} onManageAccountClick={handleAccountManageAccountClick}>
            <UserMenuAccount slot="account" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" />
            <Label htmlFor="reset-all-button">Personalization</Label><br />
            <Button id="reset-all-button" onClick={handleResetAllButtonClick}>Reset All Personalization</Button>
            <Panel fixed={true} className="ua-panel">
              <Text>
                Reset your personalization settings for the launchpad (such as theme, language, user activities, and home page content).
              </Text>
            </Panel>
          </UserSettingsAccountView>
        </UserSettingsItem>

        <UserSettingsItem icon="palette" text="Appearance" tooltip="Appearance" header-text="Appearance" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsAppearanceView text="Themes" onSelectionChange={handleAppearanceViewSelectionChange}>
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
            <UserSettingsAppearanceViewGroup header-text="SAP Horizon">
              <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" />
              <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" />
              <UserSettingsAppearanceViewItem item-key="sap_horizon_hcb" text="SAP Horizon High Contrast Black" />
              <UserSettingsAppearanceViewItem item-key="sap_horizon_hcw" text="SAP Horizon High Contrast White" />
            </UserSettingsAppearanceViewGroup>
            <UserSettingsAppearanceViewGroup header-text="SAP Quartz">
              <UserSettingsAppearanceViewItem item-key="sap_fiori_3" text="SAP Quartz Light" />
              <UserSettingsAppearanceViewItem item-key="sap_fiori_3_dark" text="SAP Quartz Dark" />
              <UserSettingsAppearanceViewItem item-key="sap_fiori_3_hcb" text="SAP Quartz High Contrast Black" />
              <UserSettingsAppearanceViewItem item-key="sap_fiori_3_hcw" text="SAP Quartz High Contrast White" />
            </UserSettingsAppearanceViewGroup>
          </UserSettingsAppearanceView>
        </UserSettingsItem>

        <UserSettingsItem text="Language and Region" tooltip="Language and Region" header-text="Language and Region" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView>
            <div id="language-region-container" className="language-region-container">
              <Label className="language-region-label">Display Language:</Label>
              <ComboBox id="language" className="language-region-control" placeholder="Language" value="English (United States)" onSelectionChange={handleLanguageSelectionChange}>
                <ComboBoxItem text="Browser Language" selected={true} additional-text="English" />
                <ComboBoxItem text="English (United Kingdom)" additional-text="English (United Kingdom)" />
                <ComboBoxItem text="English (United States)" additional-text="English (United States)" />
                <ComboBoxItem text="French (France)" additional-text="Fran&ccedil;ais (France)" />
                <ComboBoxItem text="French (Canada)" additional-text="Fran&ccedil;ais (Canada)" />
                <ComboBoxItem text="German (Germany)" additional-text="Deutsch (Deutschland)" />
                <ComboBoxItem text="German (Switzerland)" additional-text="Deutsch (Schweiz)" />
                <ComboBoxItem text="Japanese" additional-text="&#26085;&#26412;&#35486; (&#26085;&#26412;)" />
                <ComboBoxItem text="Portuguese (Brazil)" additional-text="Portugu&ecirc;s (Brasil)" />
                <ComboBoxItem text="Simplified Chinese (China)" additional-text="&#31616;&#20307;&#20013;&#25991;&#65288;&#20013;&#22269;)" />
                <ComboBoxItem text="Spanish (Mexico)" additional-text="Espa&ntilde;ol (Am&eacute;rica Latina)" />
                <ComboBoxItem text="Spanish (Spain)" additional-text="Espa&ntilde;ol (Espa&ntilde;a)" />
              </ComboBox>
              <Label className="language-region-label">Region:</Label>
              <ComboBox id="region" className="language-region-control" placeholder="Region" value="United States" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="United Kingdom" additional-text="GB" />
                <ComboBoxItem text="United States" additional-text="US" />
                <ComboBoxItem text="French (France)" additional-text="FR" />
                <ComboBoxItem text="French (Canada)" additional-text="CA" />
                <ComboBoxItem text="German (Germany)" additional-text="DE" />
                <ComboBoxItem text="German (Switzerland)" additional-text="CH" />
                <ComboBoxItem text="Japanese" additional-text="JP" />
                <ComboBoxItem text="Portuguese (Brazil)" additional-text="BR" />
                <ComboBoxItem text="Simplified Chinese (China)" additional-text="CN" />
                <ComboBoxItem text="Spanish (Mexico)" additional-text="MX" />
                <ComboBoxItem text="Spanish (Spain)" additional-text="ES" />
              </ComboBox>
              <Label className="language-region-label">Date Format:</Label>
              <ComboBox id="dateFormat" className="language-region-control" placeholder="Date Format" value="MM.DD.YYYY" onSelectionChange={handleSettingsItemSelectionChange}>
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
              <ComboBox id="timeFormat" className="language-region-control" placeholder="Time Format" value="12 Hour" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="24 Hour" additional-text="e.g. 12:05:10" />
                <ComboBoxItem text="12 Hour" additional-text="e.g. 12:05:10 PM" />
                <ComboBoxItem text="12 Hour (lowercase)" additional-text="e.g. 12:05:10 pm" />
                <ComboBoxItem text="Hours from 0 to 11" additional-text="e.g. 00:05:10 PM" />
                <ComboBoxItem text="Hours from 0 to 11 (lowercase)" additional-text="e.g. 00:05:10 pm" />
              </ComboBox>
              <Label className="language-region-label">Time Zone:</Label>
              <ComboBox id="timeZone" className="language-region-control" placeholder="Time Zone" value="Eastern Standard Time (UTC -05:00)" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="Pacific Time (UTC -08:00)" additional-text="Sacramento, United States" />
                <ComboBoxItem text="Mountain Time (UTC -07:00)" additional-text="Denver, United States" />
                <ComboBoxItem text="Central Time (UTC -06:00)" additional-text="Austin, United States" />
                <ComboBoxItem text="Eastern Standard Time (UTC -05:00)" additional-text="Washington, United States" />
                <ComboBoxItem text="Atlantic Time (UTC -04:00)" additional-text="Halifax, Canada" />
                <ComboBoxItem text="Newfoundland Time (UTC -03:30)" additional-text="St. John's, Canada" />
                <ComboBoxItem text="Brasilia Time (UTC -03:00)" additional-text="Bras&iacute;lia, Brazil" />
                <ComboBoxItem text="Argentina Time (UTC -03:00)" additional-text="Buenos Aires, Argentina" />
                <ComboBoxItem text="Greenwich Mean Time (UTC +00:00)" additional-text="London, United Kingdom" />
                <ComboBoxItem text="Central European Time (UTC +01:00)" additional-text="Berlin, Germany" />
                <ComboBoxItem text="Eastern European Time (UTC +02:00)" additional-text="Athens, Greece" />
                <ComboBoxItem text="Turkey Time (UTC +03:00)" additional-text="Ankara, T&uuml;rkiye" />
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
              <ComboBox id="currency" className="language-region-control" placeholder="Currency" value="USD - United States Dollar" onSelectionChange={handleSettingsItemSelectionChange}>
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
              <ComboBox id="numberFormat" className="language-region-control" placeholder="Number Format" value="1,234.56" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="1.234,56" additional-text="Germany" />
                <ComboBoxItem text="1,234.56" additional-text="US/UK" />
                <ComboBoxItem text="1 234,56" additional-text="France" />
                <ComboBoxItem text="1'234.56" additional-text="Switzerland" />
                <ComboBoxItem text="1234,56" additional-text="SI/SO Format" />
              </ComboBox>
            </div>
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem icon="iphone" text="SAP Mobile Start Application" tooltip="SAP Mobile Start Application" header-text="SAP Mobile Start Application" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView>
            <Button id="mobile1-button" onClick={handleMobile1ButtonClick}>iOS</Button>
            <Button id="mobile2-button" onClick={handleMobile2ButtonClick}>Android</Button>
          </UserSettingsView>

          <UserSettingsView text="Inner Page" ref={mobileSecondPageRef} id="mobile-second-page" secondary={true}>
            <Text>Enable access to your site from the SAP Mobile Start application.</Text>
            <Button id="mobile-install">Install</Button><Button id="mobile-register">Register</Button>
            <Text>Scan the QR Code to install the mobile application</Text>
            <Icon style={{ width: "20rem", height: "20rem" }} name="qr-code" />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem icon="bell" text="Notifications" tooltip="Notifications" header-text="Notifications" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView>
            <CheckBox checked={true} text="Show High-Priority Notification Alerts" />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem icon="reset" slot="fixedItems" text="Reset Settings" tooltip="Reset Settings" header-text="Reset Settings" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView text="Reset Personalization">
            <Button id="resetPersonalization" onClick={handleResetPersonalizationClick}>Reset Personalization content</Button>
            <Toast ref={toastResetRef} id="toastReset" design="Emphasized">Changes Reset.</Toast>
          </UserSettingsView>
          <UserSettingsView text="Reset All Settings">
            <Button id="resetAll" onClick={handleResetAllClick}>Reset All Settings content</Button>
            <Toast ref={toastResetAllRef} id="toastResetAll" design="Emphasized">All changes Reset.</Toast>
          </UserSettingsView>
        </UserSettingsItem>
      </UserSettingsDialog>

      <Dialog ref={additionalDialogRef} id="additionalDialog" state="Information" header-text="Change Display Language">
        <Text>Changing the display language to [New Language] will update the language across the user interface.</Text>
        <Toolbar slot="footer">
          <ToolbarButton design="Emphasized" text="Change Language" onClick={handleDialogCloserClick} />
          <ToolbarButton design="Transparent" text="Cancel" onClick={handleDialogCloserClick} />
        </Toolbar>
      </Dialog>
    </>
  );
}

export default App;
