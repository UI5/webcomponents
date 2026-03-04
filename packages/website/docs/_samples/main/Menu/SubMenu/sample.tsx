import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
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

function App() {
  const menuSubsRef = useRef(null);

  const handleBtnOpenBasicClick = () => {
    menuSubsRef.current!.open = !menuSubsRef.current!.open;
  };

  return (
    <>
      <Button id="btnOpenBasic" endIcon="slim-arrow-down" onClick={handleBtnOpenBasicClick}>Open Menu</Button> <br />

        <Menu ref={menuSubsRef} id="menuSubs" opener="btnOpenBasic">
            <MenuItem text="New File" icon="add-document" />
            <MenuItem text="New Folder" icon="add-folder" disabled={true} />
            <MenuItem text="Open" icon="open-folder" startsSection={true}>
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
            <MenuItem text="Preferences" icon="action-settings" startsSection={true} />
            <MenuItem text="Exit" icon="journey-arrive" />
        </Menu>
    </>
  );
}

export default App;
