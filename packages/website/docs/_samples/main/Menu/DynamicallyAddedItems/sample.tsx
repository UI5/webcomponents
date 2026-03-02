import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const Button = createReactComponent(ButtonClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  const handleClick = () => {
    delayMenu.open = !delayMenu.open;
  };

  const handleClick = () => {
    menuSubs.open = !menuSubs.open;
  };

  const handleUi5BeforeOpen = () => {
    if (delayMenu && !delayMenu.children.length) {
        addItemsDynamically(delayMenu);
  };

  const handleUi5BeforeOpen = (e) => {
    const item = e.detail.item;
    if (item && !item.children.length) {
        addItemsDynamically(item);
  };

  return (
    <>
      <Button id="btnOpenBasic" end-icon="slim-arrow-down">Open Menu</Button>
        <Button id="btnAddOpenerDelay">Delayed</Button> <br />

        <Menu id="menuSubs" opener="btnOpenBasic">
            <MenuItem text="New File" icon="add-document" />
            <MenuItem text="New Folder" icon="add-folder" disabled={true} />
            <MenuItem text="Open" icon="open-folder" loading-delay={100} loading={true} />
        </Menu>

        <Menu id="delaymenu" loading-delay={100} loading={true} opener="btnAddOpenerDelay" />
    </>
  );
}

export default App;
