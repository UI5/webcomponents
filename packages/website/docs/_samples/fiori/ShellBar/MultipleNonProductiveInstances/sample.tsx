import { createReactComponent } from "@ui5/webcomponents-base";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/da.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Tag = createReactComponent(TagClass);
const Text = createReactComponent(TextClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  return (
    <>
      <ShellBar style={{ marginBottom: "1rem" }} notifications-count={72} show-notifications={true}>
                <ShellBarBranding slot="branding">
                    Product Identifier
                    <img slot="logo" src="/images/sap-logo-svg.svg" />
                </ShellBarBranding>

                <Button icon="menu2" slot="startButton" />

                <Tag design="Set2" colorScheme="8" slot="content">Q System</Tag>
                <Text slot="content">Region EMEA</Text>

                <ShellBarSearch slot="searchField" showClearIcon={true} placeholder="Search Apps, Products" />

                <ShellBarItem icon="sys-help" text="Help" />
                <ToggleButton icon="sap-icon://da" tooltip="Joule" slot="assistant" />
                <Avatar slot="profile">
                    <img src="/images/avatars/man_avatar_3.png"/>
                </Avatar>
            </ShellBar>

            <ShellBar primaryTitle="Product Identifier" notificationsCount={72} showNotifications={true}>
                <Button icon="menu2" slot="startButton" />
                <img slot="logo" src="/images/sap-logo-svg.svg" />

                <Tag design="Set2" colorScheme="8" slot="content">Q System</Tag>
                <Text slot="content">Region APJ</Text>

                <ShellBarSearch slot="searchField" showClearIcon={true} placeholder="Search Apps, Products" />

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
