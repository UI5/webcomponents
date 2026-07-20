import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
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
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
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
import "@ui5/webcomponents-icons/dist/reset.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserSettingsAccountView = createReactComponent(UserSettingsAccountViewClass);
const UserSettingsAppearanceView = createReactComponent(
  UserSettingsAppearanceViewClass,
);
const UserSettingsAppearanceViewGroup = createReactComponent(
  UserSettingsAppearanceViewGroupClass,
);
const UserSettingsAppearanceViewItem = createReactComponent(
  UserSettingsAppearanceViewItemClass,
);
const UserSettingsDialog = createReactComponent(UserSettingsDialogClass);
const UserSettingsItem = createReactComponent(UserSettingsItemClass);
const UserSettingsView = createReactComponent(UserSettingsViewClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const Dialog = createReactComponent(DialogClass);
const Label = createReactComponent(LabelClass);
const Panel = createReactComponent(PanelClass);
const Switch = createReactComponent(SwitchClass);
const Text = createReactComponent(TextClass);
const Toast = createReactComponent(ToastClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {
  const additionalDialogRef = useRef<DialogClass | null>(null);
  const confirmSaveDialogRef = useRef<DialogClass | null>(null);
  const toastResetRef = useRef<ToastClass | null>(null);
  const toastResetAllRef = useRef<ToastClass | null>(null);
  const userMenuRef = useRef<UserMenuClass | null>(null);
  const settingsDialogRef = useRef<UserSettingsDialogClass | null>(null);

  const handleShellbarUi5ProfileClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "profile-click">) => {
      const menu = userMenuRef.current;
      if (menu) {
        menu.opener = e.detail.targetRef;
        menu.open = !menu.open;
      }
    },
    [],
  );

  const handleUserMenuShellBarItemClick = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "item-click">) => {
      const item = e.detail.item.getAttribute("data-id");
      if (item === "setting" && settingsDialogRef.current) {
        settingsDialogRef.current.open = true;
      }
    },
    [],
  );

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

  const handleAppearanceViewSelectionChange = useCallback(
    (
      e: UI5CustomEvent<UserSettingsAppearanceViewClass, "selection-change">,
    ) => {
      const selectedItem = e.detail.item;
      if (selectedItem?.itemKey) {
        setTheme(selectedItem.itemKey);
      }
    },
    [],
  );

  const handleDialogCloserClick = useCallback(() => {
    if (additionalDialogRef.current) {
      additionalDialogRef.current.open = false;
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

  // Save-mode demo: Save opens a confirmation dialog; Yes closes the settings dialog, No returns to it.
  // Cancel closes the settings dialog directly. In a real application the Save flow would trigger
  // the backend persistence and close after success.
  const handleSettingsSave = useCallback(() => {
    if (confirmSaveDialogRef.current) {
      confirmSaveDialogRef.current.open = true;
    }
  }, []);

  const handleSettingsCancel = useCallback(() => {
    if (settingsDialogRef.current) {
      settingsDialogRef.current.open = false;
    }
  }, []);

  const handleConfirmSaveYes = useCallback(() => {
    if (confirmSaveDialogRef.current) {
      confirmSaveDialogRef.current.open = false;
    }
    if (settingsDialogRef.current) {
      settingsDialogRef.current.open = false;
    }
  }, []);

  const handleConfirmSaveNo = useCallback(() => {
    if (confirmSaveDialogRef.current) {
      confirmSaveDialogRef.current.open = false;
    }
  }, []);

  return (
    <>
      <style>{`
        .ua-panel{
        	border-top: 2px solid lightgrey;
        	margin: 1rem 0;
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
          <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        </ShellBarBranding>
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" alt="Profile" />
        </Avatar>
      </ShellBar>
      <UserMenu
        ref={userMenuRef}
        id="userMenuShellBar"
        onItemClick={handleUserMenuShellBarItemClick}
      >
        <UserMenuAccount
          slot="accounts"
          avatarSrc="/images/avatars/man_avatar_3.png"
          titleText="Alain Chevalier"
          subtitleText="alian.chevalier@sap.com"
          description="Delivery Manager, SAP SE"
          selected={true}
        />
        <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
      </UserMenu>

      <UserSettingsDialog
        ref={settingsDialogRef}
        id="settings"
        headerText="Settings"
        showSearchField={true}
        saveMode={true}
        onSave={handleSettingsSave}
        onCancel={handleSettingsCancel}
      >
        <UserSettingsItem
          icon="user-settings"
          text="User Account"
          tooltip="User Account"
          headerText="User Account"
          selected={true}
        >
          <UserSettingsAccountView
            id="account"
            showManageAccount={true}
            onEditAccountsClick={handleAccountEditAccountsClick}
            onManageAccountClick={handleAccountManageAccountClick}
          >
            <UserMenuAccount
              slot="account"
              avatarSrc="/images/avatars/man_avatar_3.png"
              titleText="Alain Chevalier"
              subtitleText="alian.chevalier@sap.com"
              description="Delivery Manager, SAP SE"
            />
            <Label for="reset-all-button">Personalization</Label>
            <br />
            <Button id="reset-all-button" onClick={handleResetAllButtonClick}>
              Reset All Personalization
            </Button>
            <Panel fixed={true} className="ua-panel">
              <Text>
                Reset your personalization settings for the launchpad (such as
                theme, language, user activities, and home page content).
              </Text>
            </Panel>
          </UserSettingsAccountView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="palette"
          text="Appearance"
          tooltip="Appearance"
          headerText="Appearance"
        >
          <UserSettingsAppearanceView
            text="Themes"
            onSelectionChange={handleAppearanceViewSelectionChange}
          >
            <div slot="additionalContent">
              <div className="ui5-user-settings-appearance-view-additional-content-header">
                <Text id="touch-input-label">Optimize for Touch Input</Text>
                <Switch accessibleNameRef="touch-input-label" />
              </div>
              <Text className="ui5-user-settings-appearance-view-additional-content-description">
                Increases the size and spacing of controls to allow you to
                interact with them more easily using your fingertip. This is
                useful for hybrid devices that combine touch and mouse events.
              </Text>
            </div>
            <UserSettingsAppearanceViewGroup headerText="Horizon">
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon"
                text="Morning Horizon"
                selected={true}
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_dark"
                text="Evening Horizon"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_hcb"
                text="Horizon High Contrast Black"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_hcw"
                text="Horizon High Contrast White"
              />
            </UserSettingsAppearanceViewGroup>
            <UserSettingsAppearanceViewGroup headerText="Quartz">
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3"
                text="Quartz Light"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_dark"
                text="Quartz Dark"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_hcb"
                text="Quartz High Contrast Black"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_hcw"
                text="Quartz High Contrast White"
              />
            </UserSettingsAppearanceViewGroup>
          </UserSettingsAppearanceView>
        </UserSettingsItem>

        <UserSettingsItem
          text="Language and Region"
          tooltip="Language and Region"
          headerText="Language and Region"
        >
          <UserSettingsView>
            <div
              id="language-region-container"
              className="language-region-container"
            >
              <Label for="language" showColon={true} className="language-region-label">Display Language</Label>
              <ComboBox
                id="language"
                className="language-region-control"
                placeholder="Language"
                value="English (United States)"
                onSelectionChange={handleLanguageSelectionChange}
              >
                <ComboBoxItem
                  text="Browser Language"
                  selected={true}
                  additionalText="English"
                />
                <ComboBoxItem
                  text="English (United Kingdom)"
                  additionalText="English (United Kingdom)"
                />
                <ComboBoxItem
                  text="English (United States)"
                  additionalText="English (United States)"
                />
                <ComboBoxItem
                  text="French (France)"
                  additionalText="Français (France)"
                />
                <ComboBoxItem
                  text="French (Canada)"
                  additionalText="Français (Canada)"
                />
                <ComboBoxItem
                  text="German (Germany)"
                  additionalText="Deutsch (Deutschland)"
                />
                <ComboBoxItem
                  text="German (Switzerland)"
                  additionalText="Deutsch (Schweiz)"
                />
                <ComboBoxItem text="Japanese" additionalText="日本語 (日本)" />
                <ComboBoxItem
                  text="Portuguese (Brazil)"
                  additionalText="Português (Brasil)"
                />
                <ComboBoxItem
                  text="Simplified Chinese (China)"
                  additionalText="简体中文（中国)"
                />
                <ComboBoxItem
                  text="Spanish (Mexico)"
                  additionalText="Español (América Latina)"
                />
                <ComboBoxItem
                  text="Spanish (Spain)"
                  additionalText="Español (España)"
                />
              </ComboBox>
              <Label for="region" showColon={true} className="language-region-label">Region</Label>
              <ComboBox
                id="region"
                className="language-region-control"
                placeholder="Region"
                value="United States"
              >
                <ComboBoxItem text="United Kingdom" additionalText="GB" />
                <ComboBoxItem text="United States" additionalText="US" />
                <ComboBoxItem text="French (France)" additionalText="FR" />
                <ComboBoxItem text="French (Canada)" additionalText="CA" />
                <ComboBoxItem text="German (Germany)" additionalText="DE" />
                <ComboBoxItem text="German (Switzerland)" additionalText="CH" />
                <ComboBoxItem text="Japanese" additionalText="JP" />
                <ComboBoxItem text="Portuguese (Brazil)" additionalText="BR" />
                <ComboBoxItem
                  text="Simplified Chinese (China)"
                  additionalText="CN"
                />
                <ComboBoxItem text="Spanish (Mexico)" additionalText="MX" />
                <ComboBoxItem text="Spanish (Spain)" additionalText="ES" />
              </ComboBox>
              <Label for="dateFormat" showColon={true} className="language-region-label">Date Format</Label>
              <ComboBox
                id="dateFormat"
                className="language-region-control"
                placeholder="Date Format"
                value="MM.DD.YYYY"
              >
                <ComboBoxItem
                  text="MM/DD/YYYY"
                  additionalText="e.g. 10/23/2025"
                />
                <ComboBoxItem
                  text="MM.DD.YYYY"
                  additionalText="e.g. 10.23.2025"
                />
                <ComboBoxItem
                  text="MM-DD-YYYY"
                  additionalText="e.g. 10-23-2025"
                />
                <ComboBoxItem
                  text="DD/MM/YYYY"
                  additionalText="e.g. 23/10/2025"
                />
                <ComboBoxItem
                  text="DD.MM.YYYY"
                  additionalText="e.g. 23.10.2025"
                />
                <ComboBoxItem
                  text="DD-MM-YYYY"
                  additionalText="e.g. 23-10-2025"
                />
                <ComboBoxItem
                  text="YYYY/MM/DD"
                  additionalText="e.g. 2025/10/23"
                />
                <ComboBoxItem
                  text="YYYY.MM.DD"
                  additionalText="e.g. 2025.10.23"
                />
                <ComboBoxItem
                  text="YYYY-MM-DD"
                  additionalText="e.g. 2025-10-23"
                />
              </ComboBox>
              <Label for="timeFormat" showColon={true} className="language-region-label">Time Format</Label>
              <ComboBox
                id="timeFormat"
                className="language-region-control"
                placeholder="Time Format"
                value="12 Hour"
              >
                <ComboBoxItem text="24 Hour" additionalText="e.g. 12:05:10" />
                <ComboBoxItem
                  text="12 Hour"
                  additionalText="e.g. 12:05:10 PM"
                />
                <ComboBoxItem
                  text="12 Hour (lowercase)"
                  additionalText="e.g. 12:05:10 pm"
                />
                <ComboBoxItem
                  text="Hours from 0 to 11"
                  additionalText="e.g. 00:05:10 PM"
                />
                <ComboBoxItem
                  text="Hours from 0 to 11 (lowercase)"
                  additionalText="e.g. 00:05:10 pm"
                />
              </ComboBox>
              <Label for="timeZone" showColon={true} className="language-region-label">Time Zone</Label>
              <ComboBox
                id="timeZone"
                className="language-region-control"
                placeholder="Time Zone"
                value="Eastern Standard Time (UTC -05:00)"
              >
                <ComboBoxItem
                  text="Pacific Time (UTC -08:00)"
                  additionalText="Sacramento, United States"
                />
                <ComboBoxItem
                  text="Mountain Time (UTC -07:00)"
                  additionalText="Denver, United States"
                />
                <ComboBoxItem
                  text="Central Time (UTC -06:00)"
                  additionalText="Austin, United States"
                />
                <ComboBoxItem
                  text="Eastern Standard Time (UTC -05:00)"
                  additionalText="Washington, United States"
                />
                <ComboBoxItem
                  text="Atlantic Time (UTC -04:00)"
                  additionalText="Halifax, Canada"
                />
                <ComboBoxItem
                  text="Newfoundland Time (UTC -03:30)"
                  additionalText="St. John's, Canada"
                />
                <ComboBoxItem
                  text="Brasilia Time (UTC -03:00)"
                  additionalText="Brasília, Brazil"
                />
                <ComboBoxItem
                  text="Argentina Time (UTC -03:00)"
                  additionalText="Buenos Aires, Argentina"
                />
                <ComboBoxItem
                  text="Greenwich Mean Time (UTC +00:00)"
                  additionalText="London, United Kingdom"
                />
                <ComboBoxItem
                  text="Central European Time (UTC +01:00)"
                  additionalText="Berlin, Germany"
                />
                <ComboBoxItem
                  text="Eastern European Time (UTC +02:00)"
                  additionalText="Athens, Greece"
                />
                <ComboBoxItem
                  text="Turkey Time (UTC +03:00)"
                  additionalText="Ankara, Türkiye"
                />
                <ComboBoxItem
                  text="Arabian Time (UTC +04:00)"
                  additionalText="Abu Dhabi, United Arab Emirates"
                />
                <ComboBoxItem
                  text="Pakistan Standard Time (UTC +05:00)"
                  additionalText="Islamabad, Pakistan"
                />
                <ComboBoxItem
                  text="India Standard Time (UTC +05:30)"
                  additionalText="New Delhi, India"
                />
                <ComboBoxItem
                  text="Bangladesh Standard Time (UTC +06:00)"
                  additionalText="Dhaka, Bangladesh"
                />
                <ComboBoxItem
                  text="Indochina Time (UTC +07:00)"
                  additionalText="Bangkok, Thailand"
                />
                <ComboBoxItem
                  text="China Standard Time (UTC +08:00)"
                  additionalText="Beijing, China"
                />
                <ComboBoxItem
                  text="Singapore Time (UTC +08:00)"
                  additionalText="Singapore, Singapore"
                />
                <ComboBoxItem
                  text="Hong Kong Time (UTC +08:00)"
                  additionalText="Hong Kong, China"
                />
                <ComboBoxItem
                  text="Japan Standard Time (UTC +09:00)"
                  additionalText="Tokyo, Japan"
                />
                <ComboBoxItem
                  text="Korea Standard Time (UTC +09:00)"
                  additionalText="Seoul, South Korea"
                />
                <ComboBoxItem
                  text="Australian Eastern Time (UTC +10:00)"
                  additionalText="Canberra, Australia"
                />
                <ComboBoxItem
                  text="New Zealand Time (UTC +12:00)"
                  additionalText="Wellington, New Zealand"
                />
              </ComboBox>
              <Label for="currency" showColon={true} className="language-region-label">Currency</Label>
              <ComboBox
                id="currency"
                className="language-region-control"
                placeholder="Currency"
                value="USD - United States Dollar"
              >
                <ComboBoxItem
                  text="USD - United States Dollar"
                  additionalText="USD"
                  value="USD"
                />
                <ComboBoxItem text="Euro" additionalText="EUR" />
                <ComboBoxItem text="British Pound" additionalText="GBP" />
                <ComboBoxItem text="Japanese Yen" additionalText="JPY" />
                <ComboBoxItem text="Swiss Franc" additionalText="CHF" />
                <ComboBoxItem text="Canadian Dollar" additionalText="CAD" />
                <ComboBoxItem text="Australian Dollar" additionalText="AUD" />
                <ComboBoxItem text="New Zealand Dollar" additionalText="NZD" />
                <ComboBoxItem
                  text="Chinese Yuan Renminbi"
                  additionalText="CNY"
                />
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
              <Label for="numberFormat" showColon={true} className="language-region-label">Number Format</Label>
              <ComboBox
                id="numberFormat"
                className="language-region-control"
                placeholder="Number Format"
                value="1,234.56"
              >
                <ComboBoxItem text="1.234,56" additionalText="Germany" />
                <ComboBoxItem text="1,234.56" additionalText="US/UK" />
                <ComboBoxItem text="1 234,56" additionalText="France" />
                <ComboBoxItem text="1'234.56" additionalText="Switzerland" />
                <ComboBoxItem text="1234,56" additionalText="SI/SO Format" />
              </ComboBox>
            </div>
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="reset"
          slot="fixedItems"
          text="Reset Settings"
          tooltip="Reset Settings"
          headerText="Reset Settings"
        >
          <UserSettingsView text="Reset Personalization">
            <Button
              id="resetPersonalization"
              onClick={handleResetPersonalizationClick}
            >
              Reset Personalization content
            </Button>
            <Toast ref={toastResetRef} id="toastReset">
              Changes Reset.
            </Toast>
          </UserSettingsView>
          <UserSettingsView text="Reset All Settings">
            <Button id="resetAll" onClick={handleResetAllClick}>
              Reset All Settings content
            </Button>
            <Toast ref={toastResetAllRef} id="toastResetAll">
              All changes Reset.
            </Toast>
          </UserSettingsView>
        </UserSettingsItem>
      </UserSettingsDialog>

      <Dialog
        ref={confirmSaveDialogRef}
        id="confirmSaveDialog"
        state="Information"
        headerText="Save Settings"
      >
        <Text>Do you want to save your changes and close the dialog?</Text>
        <Toolbar slot="footer">
          <ToolbarButton
            design="Emphasized"
            text="Yes"
            onClick={handleConfirmSaveYes}
          />
          <ToolbarButton
            design="Transparent"
            text="No"
            onClick={handleConfirmSaveNo}
          />
        </Toolbar>
      </Dialog>

      <Dialog
        ref={additionalDialogRef}
        id="additionalDialog"
        state="Information"
        headerText="Change Display Language"
      >
        <Text>
          Changing the display language to [New Language] will update the
          language across the user interface.
        </Text>
        <Toolbar slot="footer">
          <ToolbarButton
            design="Emphasized"
            text="Change Language"
            onClick={handleDialogCloserClick}
          />
          <ToolbarButton
            design="Transparent"
            text="Cancel"
            onClick={handleDialogCloserClick}
          />
        </Toolbar>
      </Dialog>
    </>
  );
}

export default App;
