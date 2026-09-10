import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Tag = createReactComponent(TagClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {
  const [jouleIconEmea, setJouleIconEmea] = useState("da");
  const [jouleIconApj, setJouleIconApj] = useState("da");

  return (
    <>
      <ShellBar style={{ marginBottom: "1rem" }} notificationsCount="72" showNotifications={true}>
        <ShellBarBranding slot="branding">
          Product Identifier
          <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        </ShellBarBranding>
        <Button icon="menu2" slot="startButton" />

        <Tag design="Set2" colorScheme="10" slot="content">
          Region EMEA
        </Tag>

        <ShellBarSearch
          slot="searchField"
          showClearIcon={true}
          placeholder="Search Apps, Products"
        />

        <ShellBarItem icon="sys-help" text="Help" />
        <ToggleButton
          icon={jouleIconEmea}
          tooltip="Joule"
          slot="assistant"
          onClick={(e) => setJouleIconEmea((e.target as EventTarget & { pressed: boolean }).pressed ? "da-2" : "da")}
        />
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" alt="Profile" />
        </Avatar>
      </ShellBar>

      <ShellBar notificationsCount="72" showNotifications={true}>
        <ShellBarBranding slot="branding">
          Product Identifier
          <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        </ShellBarBranding>
        <Button icon="menu2" slot="startButton" />

        <Tag design="Set2" colorScheme="10" slot="content">
          Region APJ
        </Tag>

        <ShellBarSearch
          slot="searchField"
          showClearIcon={true}
          placeholder="Search Apps, Products"
        />

        <ShellBarItem icon="sys-help" text="Help" />
        <ToggleButton
          icon={jouleIconApj}
          tooltip="Joule"
          slot="assistant"
          onClick={(e) => setJouleIconApj((e.target as EventTarget & { pressed: boolean }).pressed ? "da-2" : "da")}
        />
        <Avatar slot="profile">
          <img src="/images/avatars/man_avatar_3.png" alt="Profile" />
        </Avatar>
      </ShellBar>
    </>
  );
}

export default App;
