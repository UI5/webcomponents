import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

export const Example = () => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    menuRef.current!.opener = buttonRef.current;
    menuRef.current!.open = true;
    setMenuOpen(true);
    buttonRef.current!.accessibilityAttributes = {
      hasPopup: "menu",
      expanded: true,
    };
  };

  const handleMenuButtonClick = () => {
    openMenu();
  };

  const handleMenuButtonKeydown = (e: KeyboardEvent) => {
    const F4Key =
      !e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.key === "F4";
    const AltArrowDownKey =
      e.altKey &&
      !e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey &&
      e.key === "ArrowDown";
    const AltArrowUpKey =
      e.altKey &&
      !e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey &&
      e.key === "ArrowUp";

    if (F4Key || AltArrowDownKey || AltArrowUpKey) {
      openMenu();
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    buttonRef.current!.accessibilityAttributes = {
      hasPopup: "menu",
      expanded: false,
    };
    buttonRef.current!.focus();
  };

  return (
    <>
      <Button
        ref={buttonRef}
        id="menuButton"
        icon="action-settings"
        endIcon="navigation-down-arrow"
        onClick={handleMenuButtonClick}
        onKeyDown={handleMenuButtonKeydown}
      >
        Menu
      </Button>
      <Menu ref={menuRef} id="myMenu" onClose={handleMenuClose}>
        <MenuItem text="Item 1" />
        <MenuItem text="Item 2" />
        <MenuItem text="Item 3" />
      </Menu>
    </>
  );
}
