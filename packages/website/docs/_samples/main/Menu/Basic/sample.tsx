import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
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

function App() {
  const menuBasicRef = useRef(null);

  const handleBtnOpenBasicClick = () => {
    menuBasicRef.current.open = !menuBasicRef.current.open;
  };

  return (
    <>
      <Button id="btnOpenBasic" end-icon="slim-arrow-down" onClick={handleBtnOpenBasicClick}>Open Menu</Button> <br />

        <Menu header-text="Basic Menu with Items" ref={menuBasicRef} id="menuBasic" opener="btnOpenBasic">
            <MenuItem text="New File" icon="add-document" />
            <MenuItem text="New Folder" icon="add-folder" disabled={true} />
            <MenuSeparator />
            <MenuItem text="Open" icon="open-folder" />
            <MenuItem text="Close" />
            <MenuSeparator />
            <MenuItem text="Preferences" icon="action-settings" />
            <MenuItem text="Exit" icon="journey-arrive" />
        </Menu>
    </>
  );
}

export default App;
