import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/da.js";

const ShellBar = createComponent(ShellBarClass);
const ShellBarBranding = createComponent(ShellBarBrandingClass);
const ShellBarItem = createComponent(ShellBarItemClass);
const ShellBarSearch = createComponent(ShellBarSearchClass);
const Avatar = createComponent(AvatarClass);
const Button = createComponent(ButtonClass);
const ToggleButton = createComponent(ToggleButtonClass);

function App() {
  return (
    <>
      <ShellBar notificationsCount={72} showNotifications={true}>
        <ShellBarBranding slot="branding">
          Product Identifier
          <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        </ShellBarBranding>

        <Button icon="nav-back" slot="startButton" />
        <ShellBarSearch
          slot="searchField"
          showClearIcon={true}
          placeholder="Search Apps, Products"
        />

        <ShellBarItem icon="sys-help" text="Help" />
        <ToggleButton icon="da" tooltip="Joule" slot="assistant" />
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" alt="Profile" />
        </Avatar>
      </ShellBar>
    </>
  );
}

export default App;
