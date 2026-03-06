import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import ShellBarSpacerClass from "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/da.js";

const ShellBar = createComponent(ShellBarClass);
const ShellBarBranding = createComponent(ShellBarBrandingClass);
const ShellBarItem = createComponent(ShellBarItemClass);
const ShellBarSearch = createComponent(ShellBarSearchClass);
const ShellBarSpacer = createComponent(ShellBarSpacerClass);
const Avatar = createComponent(AvatarClass);
const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);
const Switch = createComponent(SwitchClass);
const Tag = createComponent(TagClass);
const Text = createComponent(TextClass);
const ToggleButton = createComponent(ToggleButtonClass);

function App() {
  return (
    <>
      <ShellBar
        notificationsCount={72}
        showNotifications={true}
        showProductSwitch={true}
      >
        <Button icon="menu2" slot="startButton" />
        <Button icon="nav-back" slot="startButton" />

        <ShellBarBranding slot="branding">
          Product Identifier
          <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        </ShellBarBranding>
        <Tag design="Set2" colorScheme="7" slot="content">
          Trial
        </Tag>
        <Text slot="content">30 days remaining</Text>
        <ShellBarSpacer slot="content" />
        <div
          slot="content"
          style={{ display: "flex", gap: "0 5px", alignItems: "center" }}
        >
          <Switch />
          <Label>Try Beta Version</Label>
        </div>

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
