import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  const handleClick = () => {
    menuAdditionalText.open = !menuAdditionalText.open;
  };

  return (
    <>
      <Button id="btnOpenAdditionalText" end-icon="slim-arrow-down">Open Menu</Button> <br />

        <Menu id="menuAdditionalText" opener="btnOpenAdditionalText">
            <MenuItem text="New File" icon="add-document" additional-text="Ctrl+N" />
            <MenuItem text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled={true} />
            <MenuItem text="Open" icon="open-folder" starts-section={true} />
            <MenuItem text="Close" />
            <MenuItem text="Preferences" icon="action-settings" starts-section={true} />
            <MenuItem text="Exit" icon="journey-arrive" additional-text="Ctrl+X" />
        </Menu>
    </>
  );
}

export default App;
