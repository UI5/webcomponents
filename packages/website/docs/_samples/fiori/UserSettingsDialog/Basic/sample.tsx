import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
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

const ShellBar = createComponent(ShellBarClass);
const ShellBarBranding = createComponent(ShellBarBrandingClass);
const UserMenu = createComponent(UserMenuClass);
const UserMenuAccount = createComponent(UserMenuAccountClass);
const UserMenuItem = createComponent(UserMenuItemClass);
const UserSettingsAccountView = createComponent(UserSettingsAccountViewClass);
const UserSettingsAppearanceView = createComponent(UserSettingsAppearanceViewClass);
const UserSettingsAppearanceViewGroup = createComponent(UserSettingsAppearanceViewGroupClass);
const UserSettingsAppearanceViewItem = createComponent(UserSettingsAppearanceViewItemClass);
const UserSettingsDialog = createComponent(UserSettingsDialogClass);
const UserSettingsItem = createComponent(UserSettingsItemClass);
const UserSettingsView = createComponent(UserSettingsViewClass);
const Avatar = createComponent(AvatarClass);
const Button = createComponent(ButtonClass);
const CheckBox = createComponent(CheckBoxClass);
const ComboBox = createComponent(ComboBoxClass);
const ComboBoxItem = createComponent(ComboBoxItemClass);
const Dialog = createComponent(DialogClass);
const Icon = createComponent(IconClass);
const Label = createComponent(LabelClass);
const Panel = createComponent(PanelClass);
const Switch = createComponent(SwitchClass);
const Text = createComponent(TextClass);
const Toast = createComponent(ToastClass);
const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);

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
          settingsDialogRef.current!.open = true;
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
      additionalDialogRef.current!.open = true;
    }
  }, []);

  const handleLanguageSelectionChange = useCallback(() => {
    if (additionalDialogRef.current) {
      additionalDialogRef.current!.open = true;
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
      additionalDialogRef.current!.open = false;
    }
  }, []);

  const handleSettingsItemSelectionChange = useCallback((e) => {
    console.log(`Selection change: ${e?.detail.item?.text}`, e.detail);
  }, []);

  const handleMobile1ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current!.selected = true;
      mobileSecondPageRef.current!.text = "iOS";
    }
  }, []);

  const handleMobile2ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current!.selected = true;
      mobileSecondPageRef.current!.text = "Android";
    }
  }, []);

  const handleResetPersonalizationClick = useCallback(() => {
    if (toastResetRef.current) {
      toastResetRef.current!.open = true;
    }
  }, []);

  const handleResetAllClick = useCallback(() => {
    if (toastResetAllRef.current) {
      toastResetAllRef.current!.open = true;
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
      <ShellBar id="shellbar" onProfileClick={handleShellbarUi5ProfileClick}>
        <ShellBarBranding slot="branding">
          Corporate Portal
          <img slot="logo" src="/images/sap-logo-svg.svg" />
        </ShellBarBranding>
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" />
        </Avatar>
      </ShellBar>
      <UserMenu ref={userMenuRef} id="userMenuShellBar" onItemClick={handleUserMenuShellBarItemClick}>
        <UserMenuAccount slot="accounts" avatarSrc="/images/avatars/man_avatar_3.png" titleText="Alain Chevalier" subtitleText="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" selected={true} />
        <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
      </UserMenu>

      <UserSettingsDialog
        ref={settingsDialogRef}
        id="settings"
        headerText="Settings"
        showSearchField={true}
        onSelectionChange={handleSettingsSelectionChange}
        onOpen={handleSettingsOpen}
        onBeforeClose={handleSettingsBeforeClose}
        onClose={handleSettingsClose}
      >
        <UserSettingsItem icon="user-settings" text="User Account" tooltip="User Account" headerText="User Account" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsAccountView id="account" showManageAccount="true" onEditAccountsClick={handleAccountEditAccountsClick} onManageAccountClick={handleAccountManageAccountClick}>
            <UserMenuAccount slot="account" avatarSrc="/images/avatars/man_avatar_3.png" titleText="Alain Chevalier" subtitleText="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" />
            <Label htmlFor="reset-all-button">Personalization</Label><br />
            <Button id="reset-all-button" onClick={handleResetAllButtonClick}>Reset All Personalization</Button>
            <Panel fixed={true} class="ua-panel">
              <Text>
                Reset your personalization settings for the launchpad (such as theme, language, user activities, and home page content).
              </Text>
            </Panel>
          </UserSettingsAccountView>
        </UserSettingsItem>

        <UserSettingsItem icon="palette" text="Appearance" tooltip="Appearance" headerText="Appearance" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsAppearanceView text="Themes" onSelectionChange={handleAppearanceViewSelectionChange}>
            <div slot="additionalContent">
              <div className="ui5-user-settings-appearance-view-additional-content-header">
                <Text>Optimize for Touch Input</Text>
                <Switch />
              </div>
              <Text class="ui5-user-settings-appearance-view-additional-content-description">
                Increases the size and spacing of controls to allow you to interact with them more easily using your fingertip.
                This is useful for hybrid devices that combine touch and mouse events.
              </Text>
            </div>
            <UserSettingsAppearanceViewGroup headerText="SAP Horizon">
              <UserSettingsAppearanceViewItem itemKey="sap_horizon" text="SAP Morning Horizon" />
              <UserSettingsAppearanceViewItem itemKey="sap_horizon_dark" text="SAP Evening Horizon" />
              <UserSettingsAppearanceViewItem itemKey="sap_horizon_hcb" text="SAP Horizon High Contrast Black" />
              <UserSettingsAppearanceViewItem itemKey="sap_horizon_hcw" text="SAP Horizon High Contrast White" />
            </UserSettingsAppearanceViewGroup>
            <UserSettingsAppearanceViewGroup headerText="SAP Quartz">
              <UserSettingsAppearanceViewItem itemKey="sap_fiori_3" text="SAP Quartz Light" />
              <UserSettingsAppearanceViewItem itemKey="sap_fiori_3_dark" text="SAP Quartz Dark" />
              <UserSettingsAppearanceViewItem itemKey="sap_fiori_3_hcb" text="SAP Quartz High Contrast Black" />
              <UserSettingsAppearanceViewItem itemKey="sap_fiori_3_hcw" text="SAP Quartz High Contrast White" />
            </UserSettingsAppearanceViewGroup>
          </UserSettingsAppearanceView>
        </UserSettingsItem>

        <UserSettingsItem text="Language and Region" tooltip="Language and Region" headerText="Language and Region" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView>
            <div id="language-region-container" className="language-region-container">
              <Label class="language-region-label">Display Language:</Label>
              <ComboBox id="language" class="language-region-control" placeholder="Language" value="English (United States)" onSelectionChange={handleLanguageSelectionChange}>
                <ComboBoxItem text="Browser Language" selected={true} additionalText="English" />
                <ComboBoxItem text="English (United Kingdom)" additionalText="English (United Kingdom)" />
                <ComboBoxItem text="English (United States)" additionalText="English (United States)" />
                <ComboBoxItem text="French (France)" additionalText="Fran&ccedil;ais (France)" />
                <ComboBoxItem text="French (Canada)" additionalText="Fran&ccedil;ais (Canada)" />
                <ComboBoxItem text="German (Germany)" additionalText="Deutsch (Deutschland)" />
                <ComboBoxItem text="German (Switzerland)" additionalText="Deutsch (Schweiz)" />
                <ComboBoxItem text="Japanese" additionalText="&#26085;&#26412;&#35486; (&#26085;&#26412;)" />
                <ComboBoxItem text="Portuguese (Brazil)" additionalText="Portugu&ecirc;s (Brasil)" />
                <ComboBoxItem text="Simplified Chinese (China)" additionalText="&#31616;&#20307;&#20013;&#25991;&#65288;&#20013;&#22269;)" />
                <ComboBoxItem text="Spanish (Mexico)" additionalText="Espa&ntilde;ol (Am&eacute;rica Latina)" />
                <ComboBoxItem text="Spanish (Spain)" additionalText="Espa&ntilde;ol (Espa&ntilde;a)" />
              </ComboBox>
              <Label class="language-region-label">Region:</Label>
              <ComboBox id="region" class="language-region-control" placeholder="Region" value="United States" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="United Kingdom" additionalText="GB" />
                <ComboBoxItem text="United States" additionalText="US" />
                <ComboBoxItem text="French (France)" additionalText="FR" />
                <ComboBoxItem text="French (Canada)" additionalText="CA" />
                <ComboBoxItem text="German (Germany)" additionalText="DE" />
                <ComboBoxItem text="German (Switzerland)" additionalText="CH" />
                <ComboBoxItem text="Japanese" additionalText="JP" />
                <ComboBoxItem text="Portuguese (Brazil)" additionalText="BR" />
                <ComboBoxItem text="Simplified Chinese (China)" additionalText="CN" />
                <ComboBoxItem text="Spanish (Mexico)" additionalText="MX" />
                <ComboBoxItem text="Spanish (Spain)" additionalText="ES" />
              </ComboBox>
              <Label class="language-region-label">Date Format:</Label>
              <ComboBox id="dateFormat" class="language-region-control" placeholder="Date Format" value="MM.DD.YYYY" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="MM/DD/YYYY" additionalText="e.g. 10/23/2025" />
                <ComboBoxItem text="MM.DD.YYYY" additionalText="e.g. 10.23.2025" />
                <ComboBoxItem text="MM-DD-YYYY" additionalText="e.g. 10-23-2025" />
                <ComboBoxItem text="DD/MM/YYYY" additionalText="e.g. 23/10/2025" />
                <ComboBoxItem text="DD.MM.YYYY" additionalText="e.g. 23.10.2025" />
                <ComboBoxItem text="DD-MM-YYYY" additionalText="e.g. 23-10-2025" />
                <ComboBoxItem text="YYYY/MM/DD" additionalText="e.g. 2025/10/23" />
                <ComboBoxItem text="YYYY.MM.DD" additionalText="e.g. 2025.10.23" />
                <ComboBoxItem text="YYYY-MM-DD" additionalText="e.g. 2025-10-23" />
              </ComboBox>
              <Label class="language-region-label">Time Format:</Label>
              <ComboBox id="timeFormat" class="language-region-control" placeholder="Time Format" value="12 Hour" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="24 Hour" additionalText="e.g. 12:05:10" />
                <ComboBoxItem text="12 Hour" additionalText="e.g. 12:05:10 PM" />
                <ComboBoxItem text="12 Hour (lowercase)" additionalText="e.g. 12:05:10 pm" />
                <ComboBoxItem text="Hours from 0 to 11" additionalText="e.g. 00:05:10 PM" />
                <ComboBoxItem text="Hours from 0 to 11 (lowercase)" additionalText="e.g. 00:05:10 pm" />
              </ComboBox>
              <Label class="language-region-label">Time Zone:</Label>
              <ComboBox id="timeZone" class="language-region-control" placeholder="Time Zone" value="Eastern Standard Time (UTC -05:00)" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="Pacific Time (UTC -08:00)" additionalText="Sacramento, United States" />
                <ComboBoxItem text="Mountain Time (UTC -07:00)" additionalText="Denver, United States" />
                <ComboBoxItem text="Central Time (UTC -06:00)" additionalText="Austin, United States" />
                <ComboBoxItem text="Eastern Standard Time (UTC -05:00)" additionalText="Washington, United States" />
                <ComboBoxItem text="Atlantic Time (UTC -04:00)" additionalText="Halifax, Canada" />
                <ComboBoxItem text="Newfoundland Time (UTC -03:30)" additionalText="St. John's, Canada" />
                <ComboBoxItem text="Brasilia Time (UTC -03:00)" additionalText="Bras&iacute;lia, Brazil" />
                <ComboBoxItem text="Argentina Time (UTC -03:00)" additionalText="Buenos Aires, Argentina" />
                <ComboBoxItem text="Greenwich Mean Time (UTC +00:00)" additionalText="London, United Kingdom" />
                <ComboBoxItem text="Central European Time (UTC +01:00)" additionalText="Berlin, Germany" />
                <ComboBoxItem text="Eastern European Time (UTC +02:00)" additionalText="Athens, Greece" />
                <ComboBoxItem text="Turkey Time (UTC +03:00)" additionalText="Ankara, T&uuml;rkiye" />
                <ComboBoxItem text="Arabian Time (UTC +04:00)" additionalText="Abu Dhabi, United Arab Emirates" />
                <ComboBoxItem text="Pakistan Standard Time (UTC +05:00)" additionalText="Islamabad, Pakistan" />
                <ComboBoxItem text="India Standard Time (UTC +05:30)" additionalText="New Delhi, India" />
                <ComboBoxItem text="Bangladesh Standard Time (UTC +06:00)" additionalText="Dhaka, Bangladesh" />
                <ComboBoxItem text="Indochina Time (UTC +07:00)" additionalText="Bangkok, Thailand" />
                <ComboBoxItem text="China Standard Time (UTC +08:00)" additionalText="Beijing, China" />
                <ComboBoxItem text="Singapore Time (UTC +08:00)" additionalText="Singapore, Singapore" />
                <ComboBoxItem text="Hong Kong Time (UTC +08:00)" additionalText="Hong Kong, China" />
                <ComboBoxItem text="Japan Standard Time (UTC +09:00)" additionalText="Tokyo, Japan" />
                <ComboBoxItem text="Korea Standard Time (UTC +09:00)" additionalText="Seoul, South Korea" />
                <ComboBoxItem text="Australian Eastern Time (UTC +10:00)" additionalText="Canberra, Australia" />
                <ComboBoxItem text="New Zealand Time (UTC +12:00)" additionalText="Wellington, New Zealand" />
              </ComboBox>
              <Label class="language-region-label">Currency:</Label>
              <ComboBox id="currency" class="language-region-control" placeholder="Currency" value="USD - United States Dollar" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="USD - United States Dollar" additionalText="USD" value="USD" />
                <ComboBoxItem text="Euro" additionalText="EUR" />
                <ComboBoxItem text="British Pound" additionalText="GBP" />
                <ComboBoxItem text="Japanese Yen" additionalText="JPY" />
                <ComboBoxItem text="Swiss Franc" additionalText="CHF" />
                <ComboBoxItem text="Canadian Dollar" additionalText="CAD" />
                <ComboBoxItem text="Australian Dollar" additionalText="AUD" />
                <ComboBoxItem text="New Zealand Dollar" additionalText="NZD" />
                <ComboBoxItem text="Chinese Yuan Renminbi" additionalText="CNY" />
                <ComboBoxItem text="Indian Rupee" additionalText="INR" />
                <ComboBoxItem text="Brazilian Real" additionalText="BRL" />
                <ComboBoxItem text="South African Rand" additionalText="ZAR" />
                <ComboBoxItem text="Russian Ruble" additionalText="RUB" />
                <ComboBoxItem text="Mexican Peso" additionalText="MXN" />
                <ComboBoxItem text="Singapore Dollar" additionalText="SGD" />
                <ComboBoxItem text="Hong Kong Dollar" additionalText="HKD" />
                <ComboBoxItem text="Norwegian Krone" additionalText="NOK" />
                <ComboBoxItem text="Swedish Krona" additionalText="SEK" />
                <ComboBoxItem text="South Korean Won" additionalText="KRW" />
                <ComboBoxItem text="Turkish Lira" additionalText="TRY" />
              </ComboBox>
              <Label class="language-region-label">Number Format:</Label>
              <ComboBox id="numberFormat" class="language-region-control" placeholder="Number Format" value="1,234.56" onSelectionChange={handleSettingsItemSelectionChange}>
                <ComboBoxItem text="1.234,56" additionalText="Germany" />
                <ComboBoxItem text="1,234.56" additionalText="US/UK" />
                <ComboBoxItem text="1 234,56" additionalText="France" />
                <ComboBoxItem text="1'234.56" additionalText="Switzerland" />
                <ComboBoxItem text="1234,56" additionalText="SI/SO Format" />
              </ComboBox>
            </div>
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem icon="iphone" text="SAP Mobile Start Application" tooltip="SAP Mobile Start Application" headerText="SAP Mobile Start Application" onSelectionChange={handleSettingsDialogItemSelectionChange}>
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

        <UserSettingsItem icon="bell" text="Notifications" tooltip="Notifications" headerText="Notifications" onSelectionChange={handleSettingsDialogItemSelectionChange}>
          <UserSettingsView>
            <CheckBox checked={true} text="Show High-Priority Notification Alerts" />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem icon="reset" slot="fixedItems" text="Reset Settings" tooltip="Reset Settings" headerText="Reset Settings" onSelectionChange={handleSettingsDialogItemSelectionChange}>
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

      <Dialog ref={additionalDialogRef} id="additionalDialog" state="Information" headerText="Change Display Language">
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
