import { createReactComponent } from "@ui5/webcomponents-base";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const SplitButton = createReactComponent(SplitButtonClass);

function App() {

  const handleArrowClick = () => {
    menu.open = !menu.open;
	menu.opener = splitBtn;
	splitBtn.activeArrowButton = menu.open;
  };

  const handleClose = () => {
    splitBtn.activeArrowButton = false;
  };

  return (
    <>
      <SplitButton>Open Menu</SplitButton>

        <div style={{ height: "200px" }}>
            <Menu>
                <MenuItem text="Edit" icon="add" />
                <MenuItem text="Save" icon="save" />
                <MenuItem text="Delete" icon="delete" />
            </Menu>
        </div>
    </>
  );
}

export default App;
