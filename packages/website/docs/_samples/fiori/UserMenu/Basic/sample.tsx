import { createReactComponent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback } from "react";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
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
const Avatar = createReactComponent(AvatarClass);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openerRef = useRef(null);

  const handleProfileClick = useCallback((e) => {
    openerRef.current = e.detail.targetRef;
    setMenuOpen(true);
  }, []);

  const handleItemClick = useCallback((e) => {
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
  }, []);

  const handleAvatarClick = useCallback(() => {
    console.log("Avatar clicked");
  }, []);

  const handleSignOutClick = useCallback((e) => {
    console.log("Sign Out clicked");
    const result = prompt("Sign Out", "Are you sure you want to sign out?");
    if (result) {
      setMenuOpen(false);
    }
    e.preventDefault();
  }, []);

  return (
    <>
      <ShellBar onProfileClick={handleProfileClick}>
        <ShellBarBranding slot="branding">
          Corporate Portal
          <img slot="logo" src="/images/sap-logo-svg.svg" />
        </ShellBarBranding>
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png"/>
        </Avatar>
      </ShellBar>
      <UserMenu
        open={menuOpen}
        opener={openerRef.current}
        onItemClick={handleItemClick}
        onAvatarClick={handleAvatarClick}
        onSignOutClick={handleSignOutClick}
        onClose={() => setMenuOpen(false)}
      >
        <UserMenuAccount
          slot="accounts"
          avatarSrc="/images/avatars/man_avatar_3.png"
          titleText="Alaina Chevalier"
          subtitleText="aliana.chevalier@sap.com"
          description="Delivery Manager"
          selected={true}
        />
        <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
        <UserMenuItem icon="collaborate" text="Product-specific account action" data-id="product-action">
          <UserMenuItem text="Terms of Use" data-id="terms-of-use" />
          <UserMenuItem text="Private Policy" data-id="privacy-policy" />
        </UserMenuItem>
        <UserMenuItem icon="official-service" text="Legal Information" />
        <UserMenuItem icon="message-information" text="About" data-id="about" />
      </UserMenu>
    </>
  );
}

export default App;
