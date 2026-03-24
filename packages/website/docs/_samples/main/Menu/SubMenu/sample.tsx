import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);

export const Example = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Button
        id="btnOpenBasic"
        endIcon="slim-arrow-down"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Open Menu
      </Button>{" "}
      <br />
      <Menu
        open={menuOpen}
        id="menuSubs"
        opener="btnOpenBasic"
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem text="New File" icon="add-document" />
        <MenuItem text="New Folder" icon="add-folder" disabled={true} />
        <MenuSeparator />
        <MenuItem text="Open" icon="open-folder">
          <MenuItem text="Open Locally" icon="open-folder">
            <MenuItem text="Open from C" />
            <MenuItem text="Open from D" />
            <MenuItem text="Open from E" />
          </MenuItem>
          <MenuItem text="Open from Cloud" />
        </MenuItem>
        <MenuItem text="Save" icon="save">
          <MenuItem text="Save Locally" icon="save">
            <MenuItem text="Save on C" icon="save" />
            <MenuItem text="Save on D" icon="save" />
            <MenuItem text="Save on E" icon="save" />
          </MenuItem>
          <MenuItem text="Save on Cloud" icon="upload-to-cloud" />
        </MenuItem>
        <MenuItem text="Close" />
        <MenuSeparator />
        <MenuItem text="Preferences" icon="action-settings" />
        <MenuItem text="Exit" icon="journey-arrive" />
      </Menu>
    </>
  );
}
