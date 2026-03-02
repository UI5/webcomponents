import { createReactComponent } from "@ui5/webcomponents-base";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const ShellBar = createReactComponent(ShellBarClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const Avatar = createReactComponent(AvatarClass);

function App() {

  const handleUi5ProfileClick = (e) => {
    menu.opener = e.detail.targetRef;
	menu.open = true;
  };

  const handleItemClick = (e) => {
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
  };

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleSignOutClick = () => {
    console.log("Sign Out clicked");

	const result = prompt("Sign Out", "Are you sure you want to sign out?");
	if (result) {
		menu.open = false;
  };

  return (
    <>
      <ShellBar id="shellbar">
    	<ui5-shellbar-branding slot="branding">
    		Corporate Portal
    		<img slot="logo" src="/images/sap-logo-svg.svg" />
    	</ui5-shellbar-branding>
    	<Avatar slot="profile">
    		<img src="/images/avatars/man_avatar_3.png"/>
    	</Avatar>
    </ShellBar>
    <UserMenu id="userMenu" opener="btnOpenUserMenu">
    	<UserMenuAccount slot="accounts" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alaina Chevalier" subtitle-text="aliana.chevalier@sap.com" description="Delivery Manager" selected={true} />
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
