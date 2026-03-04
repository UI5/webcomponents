import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {
  const menuAdditionalTextRef = useRef(null);

  const handleBtnOpenAdditionalTextClick = () => {
    menuAdditionalTextRef.current!.open = !menuAdditionalTextRef.current!.open;
  };

  return (
    <>
      <Button id="btnOpenAdditionalText" endIcon="slim-arrow-down" onClick={handleBtnOpenAdditionalTextClick}>Open Menu</Button> <br />

        <Menu ref={menuAdditionalTextRef} id="menuAdditionalText" opener="btnOpenAdditionalText">
            <MenuItem text="New File" icon="add-document" additionalText="Ctrl+N" />
            <MenuItem text="New Folder" icon="add-folder" additionalText="Ctrl+F" disabled={true} />
            <MenuItem text="Open" icon="open-folder" startsSection={true} />
            <MenuItem text="Close" />
            <MenuItem text="Preferences" icon="action-settings" startsSection={true} />
            <MenuItem text="Exit" icon="journey-arrive" additionalText="Ctrl+X" />
        </Menu>
    </>
  );
}

export default App;
