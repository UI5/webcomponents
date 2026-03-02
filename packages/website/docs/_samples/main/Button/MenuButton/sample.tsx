import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  const handleClick = () => {
    openMenu(myMenu, menuButton);
  };

  const handleKeydown = (e) => {
    const F4Key = !e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.key === "F4";
	const AltArrowDownKey = e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.key === "ArrowDown";
	const AltArrowUpKey = e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.key === "ArrowUp";

	if (F4Key || AltArrowDownKey || AltArrowUpKey) {
		openMenu(myMenu, menuButton);
  };

  const handleClose = () => {
    closeMenu(menuButton);
  };

  return (
    <>
      <Button id="menuButton" icon="action-settings" end-icon="navigation-down-arrow">Menu</Button>
    	<Menu id="myMenu">
    		<MenuItem text="Item 1" />
    		<MenuItem text="Item 2" />
    		<MenuItem text="Item 3" />
    	</Menu>
    </>
  );
}

export default App;
