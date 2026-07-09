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
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
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
const CheckBox = createReactComponent(CheckBoxClass);
const Select = createReactComponent(SelectClass);
const Option = createReactComponent(OptionClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const MessageStrip = createReactComponent(MessageStripClass);
const Panel = createReactComponent(PanelClass);
const Switch = createReactComponent(SwitchClass);
const Text = createReactComponent(TextClass);
const Toast = createReactComponent(ToastClass);

function App() {
  const mobileSecondPageRef = useRef<UserSettingsViewClass | null>(null);
  const toastResetRef = useRef<ToastClass | null>(null);
  const toastResetAllRef = useRef<ToastClass | null>(null);
  const userMenuRef = useRef<UserMenuClass | null>(null);
  const settingsDialogRef = useRef<UserSettingsDialogClass | null>(null);

  const handleShellbarUi5ProfileClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "profile-click">) => {
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
    },
    [],
  );

  const handleUserMenuShellBarItemClick = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "item-click">) => {
      console.log(" menuShellBar item-click");
      const item = e.detail.item.getAttribute("data-id");
      switch (item) {
        case "setting":
          if (settingsDialogRef.current) {
            settingsDialogRef.current.open = true;
          }
          break;
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
    if (toastResetRef.current) {
      toastResetRef.current.open = true;
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

  const handleSettingsSelectionChange = useCallback(
    (e: UI5CustomEvent<UserSettingsDialogClass, "selection-change">) => {
      console.log(`Selection change: ${e.detail.item.text}`, e.detail);
      if (e.detail.item.text === "Language and Region") {
        e.detail.item.loading = true;
        e.detail.item.loadingReason = "Language & Region loading data...";
        setTimeout(() => {
          e.detail.item.loading = false;
        }, 500);
      }
    },
    [],
  );

  const handleSettingsDialogItemSelectionChange = useCallback(
    (e: UI5CustomEvent<UserSettingsItemClass, "selection-change">) => {
      console.log(`Selection change: ${e.detail.view.text}`, e.detail);
    },
    [],
  );

  const handleSettingsOpen = useCallback((e: Event) => {
    console.log("Settings dialog opened", e);
  }, []);

  const handleSettingsBeforeClose = useCallback(
    (e: UI5CustomEvent<UserSettingsDialogClass, "before-close">) => {
      console.log("Settings dialog before close", e.detail);
      if (!confirm("Are you sure you want to close the dialog?")) {
        e.preventDefault();
      }
    },
    [],
  );

  const handleSettingsClose = useCallback((e: Event) => {
    console.log("Settings dialog closed", e);
  }, []);

  return (
    <>
      <style>{`
        .ua-panel{
        	border-top: 2px solid lightgrey;
        	margin: 1rem 0;
        }

        #language-region-strip {
        	display: block;
        	margin-bottom: 1rem;
        }

        .language-region-form {
        	display: flex;
        	flex-direction: column;
        	width: 100%;
        }

        .language-region-row {
        	display: flex;
        	flex-direction: column;
        	width: 100%;
        }

        .language-region-row > ui5-label,
        .language-region-row > [ui5-label] {
        	padding: 0.5rem 0 0.125rem 0;
        }

        .language-region-row:first-child > ui5-label,
        .language-region-row:first-child > [ui5-label] {
        	padding-top: 0;
        }

        .language-region-row > ui5-select,
        .language-region-row > [ui5-select] {
        	display: block;
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
        onSelectionChange={handleSettingsSelectionChange}
        onOpen={handleSettingsOpen}
        onBeforeClose={handleSettingsBeforeClose}
        onClose={handleSettingsClose}
      >
        <UserSettingsItem
          icon="user-settings"
          text="User Account"
          tooltip="User Account"
          headerText="User Account"
          selected={true}
          onSelectionChange={handleSettingsDialogItemSelectionChange}
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
            <Panel fixed={true} class="ua-panel">
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
          onSelectionChange={handleSettingsDialogItemSelectionChange}
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
              <Text class="ui5-user-settings-appearance-view-additional-content-description">
                Increases the size and spacing of controls to allow you to
                interact with them more easily using your fingertip. This is
                useful for hybrid devices that combine touch and mouse events.
              </Text>
            </div>
            <UserSettingsAppearanceViewGroup headerText="Custom">
              <UserSettingsAppearanceViewItem
                itemKey="custom_blue"
                text="Custom Theme Blue"
              />
              <UserSettingsAppearanceViewItem
                itemKey="custom_dark"
                text="Custom Theme Dark"
              />
            </UserSettingsAppearanceViewGroup>
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
          onSelectionChange={handleSettingsDialogItemSelectionChange}
        >
          <UserSettingsView>
            <MessageStrip
              id="language-region-strip"
              design="Information"
              hideCloseButton={true}
            >
              Close to apply your chosen language – the page will reload.
            </MessageStrip>
            <div className="language-region-form">
              <div className="language-region-row">
                <Label for="language" showColon={true}>Display Language</Label>
                <Select id="language">
                  <Option>Browser Language</Option>
                  <Option>English (United Kingdom)</Option>
                  <Option selected={true}>English (United States)</Option>
                  <Option>French (France)</Option>
                  <Option>French (Canada)</Option>
                  <Option>German (Germany)</Option>
                  <Option>German (Switzerland)</Option>
                  <Option>Japanese</Option>
                  <Option>Portuguese (Brazil)</Option>
                  <Option>Simplified Chinese (China)</Option>
                  <Option>Spanish (Mexico)</Option>
                  <Option>Spanish (Spain)</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="region" showColon={true}>Region</Label>
                <Select id="region">
                  <Option>United Kingdom</Option>
                  <Option selected={true}>United States</Option>
                  <Option>France</Option>
                  <Option>Canada</Option>
                  <Option>Germany</Option>
                  <Option>Switzerland</Option>
                  <Option>Japan</Option>
                  <Option>Brazil</Option>
                  <Option>China</Option>
                  <Option>Mexico</Option>
                  <Option>Spain</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="dateFormat" showColon={true}>Date Format</Label>
                <Select id="dateFormat">
                  <Option>MM/DD/YYYY</Option>
                  <Option selected={true}>MM.DD.YYYY</Option>
                  <Option>MM-DD-YYYY</Option>
                  <Option>DD/MM/YYYY</Option>
                  <Option>DD.MM.YYYY</Option>
                  <Option>DD-MM-YYYY</Option>
                  <Option>YYYY/MM/DD</Option>
                  <Option>YYYY.MM.DD</Option>
                  <Option>YYYY-MM-DD</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="timeFormat" showColon={true}>Time Format</Label>
                <Select id="timeFormat">
                  <Option>24 Hour</Option>
                  <Option selected={true}>12 Hour</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="timeZone" showColon={true}>Time Zone</Label>
                <Select id="timeZone">
                  <Option>Pacific Time (UTC -08:00)</Option>
                  <Option>Mountain Time (UTC -07:00)</Option>
                  <Option>Central Time (UTC -06:00)</Option>
                  <Option selected={true}>Eastern Standard Time (UTC -05:00)</Option>
                  <Option>Atlantic Time (UTC -04:00)</Option>
                  <Option>Greenwich Mean Time (UTC +00:00)</Option>
                  <Option>Central European Time (UTC +01:00)</Option>
                  <Option>India Standard Time (UTC +05:30)</Option>
                  <Option>Japan Standard Time (UTC +09:00)</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="currency" showColon={true}>Currency</Label>
                <Select id="currency">
                  <Option selected={true}>USD – United States Dollar</Option>
                  <Option>EUR – Euro</Option>
                  <Option>GBP – British Pound</Option>
                  <Option>JPY – Japanese Yen</Option>
                  <Option>CHF – Swiss Franc</Option>
                  <Option>CAD – Canadian Dollar</Option>
                  <Option>AUD – Australian Dollar</Option>
                  <Option>CNY – Chinese Yuan Renminbi</Option>
                  <Option>INR – Indian Rupee</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="numberFormat" showColon={true}>Number Format</Label>
                <Select id="numberFormat">
                  <Option>1.234,56</Option>
                  <Option selected={true}>1,234.56</Option>
                  <Option>1 234,56</Option>
                  <Option>1'234.56</Option>
                  <Option>1234,56</Option>
                </Select>
              </div>
            </div>
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="iphone"
          text="SAP Mobile Start Application"
          tooltip="SAP Mobile Start Application"
          headerText="SAP Mobile Start Application"
          onSelectionChange={handleSettingsDialogItemSelectionChange}
        >
          <UserSettingsView>
            <Button id="mobile1-button" onClick={handleMobile1ButtonClick}>
              iOS
            </Button>
            <Button id="mobile2-button" onClick={handleMobile2ButtonClick}>
              Android
            </Button>
          </UserSettingsView>

          <UserSettingsView
            text="Inner Page"
            ref={mobileSecondPageRef}
            id="mobile-second-page"
            secondary={true}
          >
            <Text>
              Enable access to your site from the SAP Mobile Start application.
            </Text>
            <Button id="mobile-install">Install</Button>
            <Button id="mobile-register">Register</Button>
            <Text>Scan the QR Code to install the mobile application</Text>
            <Icon style={{ width: "20rem", height: "20rem" }} name="qr-code" />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="bell"
          text="Notifications"
          tooltip="Notifications"
          headerText="Notifications"
          onSelectionChange={handleSettingsDialogItemSelectionChange}
        >
          <UserSettingsView>
            <CheckBox
              checked={true}
              text="Show High-Priority Notification Alerts"
            />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="reset"
          slot="fixedItems"
          text="Reset Settings"
          tooltip="Reset Settings"
          headerText="Reset Settings"
          onSelectionChange={handleSettingsDialogItemSelectionChange}
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
    </>
  );
}

export default App;
