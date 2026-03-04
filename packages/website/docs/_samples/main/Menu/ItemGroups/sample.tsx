import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/text-align-left.js";
import "@ui5/webcomponents-icons/dist/text-align-center.js";
import "@ui5/webcomponents-icons/dist/text-align-right.js";
import "@ui5/webcomponents-icons/dist/bold-text.js";
import "@ui5/webcomponents-icons/dist/italic-text.js";
import "@ui5/webcomponents-icons/dist/underline-text.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import MenuItemGroupClass from "@ui5/webcomponents/dist/MenuItemGroup.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);
const MenuItemGroup = createReactComponent(MenuItemGroupClass);

function App() {
  const menuGroupsRef = useRef(null);

  const handleBtnOpenGroupsClick = () => {
    menuGroupsRef.current!.opener = btnOpenGroups;
	menuGroupsRef.current!.open = !menuGroupsRef.current!.open;
  };

  return (
    <>
      <Button id="btnOpenGroups" onClick={handleBtnOpenGroupsClick}>Open Menu</Button>
    	<Menu ref={menuGroupsRef} id="menuGroups" headerText="My ui5-menu">
    		<MenuItem text="New Paragraph" icon="add-document" />
    		<MenuItem text="New Text" />

    		<MenuSeparator />

    		<MenuItemGroup checkMode="Single">
    			<MenuItem text="Left Alignment" icon="text-align-left" checked={true} />
    			<MenuItem text="Center Alignment" icon="text-align-center" checked={true} />
    			<MenuItem text="Right Alignment" icon="text-align-right" checked={true} />
    		</MenuItemGroup>

    		<MenuSeparator />

    		<MenuItemGroup checkMode="Multiple">
    			<MenuItem text="Bold" icon="bold-text" checked={true}>
    				<Button id="newLock2" slot="endContent" icon="locked" design="Transparent" />
    			</MenuItem>
    			<MenuItem text="Italic" icon="italic-text" additionalText="Cursive Text" checked={true} />
    			<MenuItem text="Underline" icon="underline-text" checked={true} />
    		</MenuItemGroup>

    		<MenuSeparator />

    		<MenuItem text="Exit" />
    	</Menu>
    </>
  );
}

export default App;
