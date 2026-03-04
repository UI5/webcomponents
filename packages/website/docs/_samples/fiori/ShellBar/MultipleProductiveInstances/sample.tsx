import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
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

const ShellBar = createComponent(ShellBarClass);
const ShellBarItem = createComponent(ShellBarItemClass);
const ShellBarSearch = createComponent(ShellBarSearchClass);
const Avatar = createComponent(AvatarClass);
const Button = createComponent(ButtonClass);
const Tag = createComponent(TagClass);
const ToggleButton = createComponent(ToggleButtonClass);

function App() {

  return (
    <>
      <ShellBar style={{ marginBottom: "1rem" }} primary-title="Product Identifier" notifications-count={72} show-notifications={true}>
                <Button icon="menu2" slot="startButton" />
                <img slot="logo" src="/images/sap-logo-svg.svg" />

                <Tag design="Set2" colorScheme="10" slot="content">Region EMEA</Tag>

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

                <Tag design="Set2" colorScheme="10" slot="content">Region APJ</Tag>

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
