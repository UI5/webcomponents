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
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/favorite.js";

const Button = createComponent(ButtonClass);
const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);
const MenuSeparator = createComponent(MenuSeparatorClass);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNewAddClick = () => {
    alert("Add button pressed");
  };

  const handleNewHintClick = () => {
    alert("Hint button pressed");
  };

  const handleNewFavoriteClick = () => {
    alert("Favorite button pressed");
  };

  return (
    <>
      <Button id="btnOpenEndContent" onClick={() => setMenuOpen(!menuOpen)}>
        Open Menu
      </Button>

      <Menu
        open={menuOpen}
        opener="btnOpenEndContent"
        id="menuEndContent"
        headerText="My ui5-menu"
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem
          text="New File"
          accessibleName="Opens a file explorer"
          additionalText="Ctrl+Alt+Shift+N"
          tooltip="Select a file - prevent default"
          icon="add-document"
        >
          <Button
            id="newAdd"
            slot="endContent"
            icon="add"
            design="Transparent"
            onClick={handleNewAddClick}
          />
          <Button
            id="newHint"
            slot="endContent"
            icon="hint"
            design="Transparent"
            onClick={handleNewHintClick}
          />
          <Button
            id="newFavorite"
            slot="endContent"
            icon="favorite"
            design="Transparent"
            onClick={handleNewFavoriteClick}
          />
        </MenuItem>
        <MenuItem text="New Folder" additionalText="Ctrl+F" icon="add-folder" />
        <MenuSeparator />
        <MenuItem
          text="Open"
          icon="open-folder"
          accessibleName="Choose platform"
        >
          <MenuItem
            text="Open Locally"
            icon="open-folder"
            additionalText="Ctrl+K"
          />
          <MenuItem text="Open from SAP Cloud" additionalText="Ctrl+L" />
        </MenuItem>
        <MenuItem
          text="Save with very long title for a menu item text inside"
          icon="save"
        >
          <MenuItem text="Save Locally" icon="save" />
          <MenuItem text="Save on Cloud" icon="upload-to-cloud" />
        </MenuItem>
        <MenuItem text="Close" additionalText="Ctrl+W" />
        <MenuSeparator />
        <MenuItem text="Preferences" icon="action-settings" />
        <MenuItem text="Exit" icon="journey-arrive" />
      </Menu>
    </>
  );
}

export default App;
