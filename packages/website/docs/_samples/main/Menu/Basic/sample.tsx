import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);

function App() {

  const handleClick = () => {
    menuBasic.open = !menuBasic.open;
  };

  return (
    <>
      <Button id="btnOpenBasic" end-icon="slim-arrow-down">Open Menu</Button> <br />

        <Menu header-text="Basic Menu with Items" id="menuBasic" opener="btnOpenBasic">
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
