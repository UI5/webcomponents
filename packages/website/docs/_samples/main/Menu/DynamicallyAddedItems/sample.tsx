import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef, useCallback, useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {
  const menuSubsRef = useRef(null);
  const delayMenuRef = useRef(null);
  const [menuSubsOpen, setMenuSubsOpen] = useState(false);
  const [delayMenuOpen, setDelayMenuOpen] = useState(false);

  const addItemsDynamically = useCallback((menu: any) => {
    setTimeout(() => {
      menu.loading = false;
      menu.loadingDelay = 0;
      const oneNode = document.createElement("ui5-menu-item") as MenuItemClass;
      oneNode.text = "Open from Amazon Cloud";
      const twoNode = document.createElement("ui5-menu-item") as MenuItemClass;
      twoNode.text = "Open from Google Cloud";
      menu.append(oneNode, twoNode);
      menu.focus();
    }, 1000);
  }, []);

  const handleDelaymenuUi5BeforeOpen = useCallback(() => {
    const menu = delayMenuRef.current;
    if (menu && !menu.children.length) {
      addItemsDynamically(menu);
    }
  }, [addItemsDynamically]);

  const handleMenuSubsUi5BeforeOpen = useCallback(
    (e: UI5CustomEvent<MenuClass, "before-open">) => {
      const item = e.detail.item;
      if (item && !item.children.length) {
        addItemsDynamically(item);
      }
    },
    [addItemsDynamically],
  );

  return (
    <>
      <Button
        id="btnOpenBasic"
        endIcon="slim-arrow-down"
        onClick={() => setMenuSubsOpen(!menuSubsOpen)}
      >
        Open Menu
      </Button>
      <Button
        id="btnAddOpenerDelay"
        onClick={() => setDelayMenuOpen(!delayMenuOpen)}
      >
        Delayed
      </Button>{" "}
      <br />
      <Menu
        ref={menuSubsRef}
        open={menuSubsOpen}
        id="menuSubs"
        opener="btnOpenBasic"
        onBeforeOpen={handleMenuSubsUi5BeforeOpen}
        onClose={() => setMenuSubsOpen(false)}
      >
        <MenuItem text="New File" icon="add-document" />
        <MenuItem text="New Folder" icon="add-folder" disabled={true} />
        <MenuItem
          text="Open"
          icon="open-folder"
          loadingDelay={100}
          loading={true}
        />
      </Menu>
      <Menu
        ref={delayMenuRef}
        open={delayMenuOpen}
        id="delaymenu"
        loadingDelay={100}
        loading={true}
        opener="btnAddOpenerDelay"
        onBeforeOpen={handleDelaymenuUi5BeforeOpen}
        onClose={() => setDelayMenuOpen(false)}
      />
    </>
  );
}

export default App;
