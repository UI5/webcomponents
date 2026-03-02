import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  const handleClick = () => {
    menuEndContent.opener = btnOpenEndContent;
	menuEndContent.open = !menuEndContent.open;
  };

  const handleClick = () => {
    alert("Add button pressed");
  };

  const handleClick = () => {
    alert("Hint button pressed");
  };

  const handleClick = () => {
    alert("Favorite button pressed");
  };

  return (
    <>
      <Button id="btnOpenEndContent">Open Menu</Button>

    	<Menu id="menuEndContent" header-text="My ui5-menu">
    		<MenuItem text="New File" accessible-name="Opens a file explorer" additional-text="Ctrl+Alt+Shift+N" tooltip="Select a file - prevent default" icon="add-document">
    			<Button id="newAdd" slot="endContent" icon="add" design="Transparent" />
    			<Button id="newHint" slot="endContent" icon="hint" design="Transparent" />
    			<Button id="newFavorite" slot="endContent" icon="favorite" design="Transparent" />
    		</MenuItem>
    		<MenuItem text="New Folder" additional-text="Ctrl+F" icon="add-folder" />
    		<MenuItem text="Open" icon="open-folder" accessible-name="Choose platform" starts-section={true}>
    			<MenuItem text="Open Locally" icon="open-folder" additional-text="Ctrl+K" />
    			<MenuItem text="Open from SAP Cloud" additional-text="Ctrl+L" />
    		</MenuItem>
    		<MenuItem text="Save with very long title for a menu item text inside" icon="save">
    			<MenuItem text="Save Locally" icon="save" />
    			<MenuItem text="Save on Cloud" icon="upload-to-cloud" />
    		</MenuItem>
    		<MenuItem text="Close" additional-text="Ctrl+W" />
    		<MenuItem text="Preferences" icon="action-settings" starts-section={true} />
    		<MenuItem text="Exit" icon="journey-arrive" />
    	</Menu>
    </>
  );
}

export default App;
