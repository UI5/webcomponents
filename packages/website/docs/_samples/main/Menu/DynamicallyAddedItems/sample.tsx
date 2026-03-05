import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef, useCallback } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const Button = createComponent(ButtonClass);
const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);

function App() {
  const menuSubsRef = useRef(null);
  const delayMenuRef = useRef(null);

  const addItemsDynamically = useCallback((menu) => {
    setTimeout(() => {
      menu.loading = false;
      menu.loadingDelay = 0;
      const oneNode = document.createElement("ui5-menu-item");
      oneNode.text = "Open from Amazon Cloud";
      const twoNode = document.createElement("ui5-menu-item");
      twoNode.text = "Open from Google Cloud";
      menu.append(oneNode, twoNode);
      menu.focus();
    }, 1000);
  }, []);

  const handleBtnAddOpenerDelayClick = useCallback(() => {
    if (delayMenuRef.current) {
      delayMenuRef.current!.open = !delayMenuRef.current!.open;
    }
  }, []);

  const handleBtnOpenBasicClick = useCallback(() => {
    if (menuSubsRef.current) {
      menuSubsRef.current!.open = !menuSubsRef.current!.open;
    }
  }, []);

  const handleDelaymenuUi5BeforeOpen = useCallback(() => {
    const menu = delayMenuRef.current;
    if (menu && !menu.children.length) {
      addItemsDynamically(menu);
    }
  }, [addItemsDynamically]);

  const handleMenuSubsUi5BeforeOpen = useCallback((e: UI5CustomEvent<MenuClass, "before-open">) => {
    const item = e.detail.item;
    if (item && !item.children.length) {
      addItemsDynamically(item);
    }
  }, [addItemsDynamically]);

  return (
    <>
      <Button id="btnOpenBasic" endIcon="slim-arrow-down" onClick={handleBtnOpenBasicClick}>Open Menu</Button>
      <Button id="btnAddOpenerDelay" onClick={handleBtnAddOpenerDelayClick}>Delayed</Button> <br />

      <Menu ref={menuSubsRef} id="menuSubs" opener="btnOpenBasic" onBeforeOpen={handleMenuSubsUi5BeforeOpen}>
        <MenuItem text="New File" icon="add-document" />
        <MenuItem text="New Folder" icon="add-folder" disabled={true} />
        <MenuItem text="Open" icon="open-folder" loadingDelay={100} loading={true} />
      </Menu>

      <Menu ref={delayMenuRef} id="delaymenu" loadingDelay={100} loading={true} opener="btnAddOpenerDelay" onBeforeOpen={handleDelaymenuUi5BeforeOpen} />
    </>
  );
}

export default App;
