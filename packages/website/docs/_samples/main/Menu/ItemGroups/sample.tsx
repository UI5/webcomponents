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
    menuGroups.opener = btnOpenGroups;
	menuGroups.open = !menuGroups.open;
  };

  return (
    <>
      <Button id="btnOpenGroups">Open Menu</Button>
    	<Menu id="menuGroups" header-text="My ui5-menu">
    		<MenuItem text="New Paragraph" icon="add-document" />
    		<MenuItem text="New Text" />

    		<MenuSeparator />

    		<ui5-menu-item-group check-mode="Single">
    			<MenuItem text="Left Alignment" icon="text-align-left" checked={true} />
    			<MenuItem text="Center Alignment" icon="text-align-center" checked={true} />
    			<MenuItem text="Right Alignment" icon="text-align-right" checked={true} />
    		</ui5-menu-item-group>

    		<MenuSeparator />

    		<ui5-menu-item-group check-mode="Multiple">
    			<MenuItem text="Bold" icon="bold-text" checked={true}>
    				<Button id="newLock2" slot="endContent" icon="locked" design="Transparent" />
    			</MenuItem>
    			<MenuItem text="Italic" icon="italic-text" additional-text="Cursive Text" checked={true} />
    			<MenuItem text="Underline" icon="underline-text" checked={true} />
    		</ui5-menu-item-group>

    		<MenuSeparator />

    		<MenuItem text="Exit" />
    	</Menu>
    </>
  );
}

export default App;
