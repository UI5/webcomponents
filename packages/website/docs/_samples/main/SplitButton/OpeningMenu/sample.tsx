import { useRef } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/delete.js";

const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);
const SplitButton = createComponent(SplitButtonClass);

function App() {
  const menuRef = useRef(null);
  const splitBtnRef = useRef(null);

  const handleArrowClick = () => {
    menuRef.current!.open = !menuRef.current!.open;
    menuRef.current!.opener = splitBtnRef.current;
    splitBtnRef.current!.activeArrowButton = menuRef.current!.open;
  };

  const handleMenuClose = () => {
    splitBtnRef.current!.activeArrowButton = false;
  };

  return (
    <>
      <SplitButton ref={splitBtnRef} onArrowClick={handleArrowClick}>Open Menu</SplitButton>

      <div style={{ height: "200px" }}>
        <Menu ref={menuRef} onClose={handleMenuClose}>
          <MenuItem text="Edit" icon="add" />
          <MenuItem text="Save" icon="save" />
          <MenuItem text="Delete" icon="delete" />
        </Menu>
      </div>
    </>
  );
}

export default App;
