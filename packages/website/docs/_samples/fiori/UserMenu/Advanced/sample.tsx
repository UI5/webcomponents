import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef, useCallback } from "react";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserMenuItemGroupClass from "@ui5/webcomponents-fiori/dist/UserMenuItemGroup.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/official-service.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/accelerated.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserMenuItemGroup = createReactComponent(UserMenuItemGroupClass);
const Avatar = createReactComponent(AvatarClass);
const MessageStrip = createReactComponent(MessageStripClass);

function App() {
  const userMenuRef = useRef<UserMenuClass | null>(null);

  const handleProfileClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "profile-click">) => {
      const menu = userMenuRef.current;
      if (menu) {
        menu.opener = e.detail.targetRef;
        menu.open = !menu.open;
      }
    },
    [],
  );

  const handleItemClick = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "item-click">) => {
      const item = e.detail.item.getAttribute("data-id");
      switch (item) {
        case "setting":
          console.log("Open Setting Dialog");
          break;
        case "privacy-policy":
          console.log("Privacy Policy");
          break;
        case "terms-of-use":
          console.log("Terms of Use");
          break;
        case "account-action1":
          console.log("Product-specific account action 1");
          break;
        case "account-action2":
          console.log("Product-specific account action 2");
          break;
        default:
          console.log("Default");
      }
    },
    [],
  );

  const handleAvatarClick = useCallback(() => {
    console.log("Avatar clicked");
  }, []);

  const handleManageAccountClick = useCallback(() => {
    console.log("Manage account clicked");
  }, []);

  const handleEditAccountsClick = useCallback(() => {
    console.log("Edit accounts clicked");
  }, []);

  const handleChangeAccount = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "change-account">) => {
      console.log("Change account account", e.detail);
      e.detail.selectedAccount.loading = true;
      setTimeout(() => {
        e.detail.selectedAccount.loading = false;
      }, 1000);
    },
    [],
  );

  const handleSignOutClick = useCallback((e: Event) => {
    console.log("Sign Out clicked");
    const result = prompt("Sign Out", "Are you sure you want to sign out?");
    if (result) {
      const menu = userMenuRef.current;
      if (menu) {
        menu.open = false;
      }
    }
    e.preventDefault();
  }, []);

  return (
    <>
      <ShellBar onProfileClick={handleProfileClick}>
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
        showManageAccount={true}
        showOtherAccounts={true}
        showEditAccounts={true}
        showEditButton={true}
        onItemClick={handleItemClick}
        onAvatarClick={handleAvatarClick}
        onManageAccountClick={handleManageAccountClick}
        onEditAccountsClick={handleEditAccountsClick}
        onChangeAccount={handleChangeAccount}
        onSignOutClick={handleSignOutClick}
      >
        <MessageStrip slot="infoArea" design="Information" hideCloseButton={true}>
          All actions are recorded under the proxy audit log.
        </MessageStrip>
        <UserMenuAccount
          slot="accounts"
          avatarSrc="/images/avatars/man_avatar_3.png"
          titleText="Alain Chevalier 1"
          subtitleText="alian.chevalier@sap.com"
          description="Delivery Manager, SAP SE"
          selected={true}
        />
        <UserMenuAccount
          slot="accounts"
          avatarInitials="SD"
          titleText="John Walker"
          subtitleText="john.walker@sap.com"
          description="Project Manager"
        />
        <UserMenuAccount
          slot="accounts"
          avatarInitials="DS"
          titleText="David Wilson"
          subtitleText="davud,wilson@sap.com"
          description="Project Manager"
        />
        <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
        <UserMenuItem
          icon="collaborate"
          text="Product-specific account action"
          data-id="product-action"
        >
          <UserMenuItem text="Terms of Use" data-id="terms-of-use" />
          <UserMenuItem text="Private Policy" data-id="privacy-policy" />
        </UserMenuItem>
        <UserMenuItem icon="official-service" text="Legal Information" />
        <UserMenuItem icon="message-information" text="About" data-id="about" />
        <UserMenuItem icon="globe" text="Language" data-id="single-select" showSelection={true}>
          <UserMenuItemGroup checkMode="Single">
            <UserMenuItem text="English" data-id="single-select-item1" checked={true} />
            <UserMenuItem text="Deutsch" data-id="single-select-item2" />
          </UserMenuItemGroup>
        </UserMenuItem>
      </UserMenu>
    </>
  );
}

export default App;
