import { createReactComponent } from "@ui5/webcomponents-base";
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

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const ShellBarSpacer = createReactComponent(ShellBarSpacerClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const Switch = createReactComponent(SwitchClass);
const Tag = createReactComponent(TagClass);
const Text = createReactComponent(TextClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  return (
    <>
      <ShellBar notifications-count={72} show-notifications={true} show-product-switch={true}>
                <Button icon="menu2" slot="startButton" />
                <Button icon="nav-back" slot="startButton" />

                <ShellBarBranding slot="branding">
                    Product Identifier
                    <img slot="logo" src="/images/sap-logo-svg.svg" />
                </ShellBarBranding>
                <Tag design="Set2" color-scheme={7} slot="content">Trial</Tag>
                <Text slot="content">30 days remaining</Text>
                <ShellBarSpacer slot="content" />
                <div slot="content" style={{ display: "flex", gap: "0 5px", alignItems: "center" }}>
                    <Switch />
                    <Label>Try Beta Version</Label>
                </div>

                <ShellBarSearch slot="searchField" show-clear-icon={true} placeholder="Search Apps, Products" />

                <ShellBarItem icon="sys-help" text="Help" />
                <ToggleButton icon="sap-icon://da" tooltip="Joule" slot="assistant" />
                <Avatar slot="profile">
                    <img src="/images/avatars/man_avatar_3.png"/>
                </Avatar>
            </ShellBar>
    </>
  );
}

export default App;
