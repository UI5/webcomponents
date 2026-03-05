import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const Button = createComponent(ButtonClass);
const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);
const MenuSeparator = createComponent(MenuSeparatorClass);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Button id="btnOpenAdditionalText" endIcon="slim-arrow-down" onClick={() => setMenuOpen(!menuOpen)}>Open Menu</Button> <br />

        <Menu open={menuOpen} id="menuAdditionalText" opener="btnOpenAdditionalText" onClose={() => setMenuOpen(false)}>
            <MenuItem text="New File" icon="add-document" additionalText="Ctrl+N" />
            <MenuItem text="New Folder" icon="add-folder" additionalText="Ctrl+F" disabled={true} />
            <MenuSeparator />
            <MenuItem text="Open" icon="open-folder" />
            <MenuItem text="Close" />
            <MenuSeparator />
            <MenuItem text="Preferences" icon="action-settings" />
            <MenuItem text="Exit" icon="journey-arrive" additionalText="Ctrl+X" />
        </Menu>
    </>
  );
}

export default App;
