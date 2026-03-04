import { createReactComponent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback } from "react";
import FlexibleColumnLayoutClass from "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";
import TabSeparatorClass from "@ui5/webcomponents/dist/TabSeparator.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/incoming-call.js";
import "@ui5/webcomponents-icons/dist/disconnected.js";
import "@ui5/webcomponents-icons/dist/camera.js";
import "@ui5/webcomponents-icons/dist/laptop.js";
import "@ui5/webcomponents-icons/dist/desktop-mobile.js";
import "@ui5/webcomponents-icons/dist/responsive.js";
import "@ui5/webcomponents-icons/dist/print.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/ipad.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/menu.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import "@ui5/webcomponents-icons/dist/full-screen.js";
import "@ui5/webcomponents-icons/dist/add.js";

const FlexibleColumnLayout = createReactComponent(FlexibleColumnLayoutClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const RatingIndicator = createReactComponent(RatingIndicatorClass);
const Tab = createReactComponent(TabClass);
const TabContainer = createReactComponent(TabContainerClass);
const TabSeparator = createReactComponent(TabSeparatorClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

const avatarIcons = ["camera", "laptop", "desktop-mobile", "responsive", "print", "iphone", "ipad"];
const avatarColors = ["Accent1", "Accent2", "Accent3", "Accent4", "Accent5", "Accent6", "Accent7", "Accent8", "Accent9", "Accent10"];
const supplierNames = ["Titanium", "Technocom", " Red Point Stores", " Very Best Screens", "Smartcards", "Alpha Printers", "Printer for All", "Oxynum", "Fasttech", "Ultrasonic United", "Speaker Experts", "Brainsoft"];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [layout, setLayout] = useState("OneColumn");
  const [col2Title, setCol2Title] = useState("");
  const [col3Title, setCol3Title] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productSupplier, setProductSupplier] = useState("Titanium");
  const [avatarIcon, setAvatarIcon] = useState("laptop");
  const [avatarColor, setAvatarColor] = useState("Accent5");
  const [ratingValue, setRatingValue] = useState("3.5");
  const [midFullscreenIcon, setMidFullscreenIcon] = useState("full-screen");
  const [endFullscreenIcon, setEndFullscreenIcon] = useState("full-screen");
  const [toggleIcon, setToggleIcon] = useState("sap-icon://da");

  const midFullScreenRef = useRef(false);
  const endFullScreenRef = useRef(false);
  const fclRef = useRef(null);

  const enterFullScreen = useCallback(() => {
    endFullScreenRef.current = true;
    midFullScreenRef.current = true;
    setMidFullscreenIcon("exit-full-screen");
    setEndFullscreenIcon("exit-full-screen");
  }, []);

  const exitFullScreen = useCallback(() => {
    endFullScreenRef.current = false;
    midFullScreenRef.current = false;
    setMidFullscreenIcon("full-screen");
    setEndFullscreenIcon("full-screen");
  }, []);

  const nextLayout = useCallback((target) => {
    if (target === "col1") {
      exitFullScreen();
      return "TwoColumnsMidExpanded";
    }
    if (target === "col2") {
      if (midFullScreenRef.current) {
        enterFullScreen();
        return "EndColumnFullScreen";
      }
      exitFullScreen();
      return "ThreeColumnsMidExpanded";
    }
    if (target === "col2close") {
      if (midFullScreenRef.current) {
        enterFullScreen();
      } else {
        exitFullScreen();
      }
      return "OneColumn";
    }
    if (target === "col3close") {
      if (fclRef.current && fclRef.current.media === "phone") {
        endFullScreenRef.current = true;
      }
      if (endFullScreenRef.current) {
        enterFullScreen();
        return "MidColumnFullScreen";
      }
      exitFullScreen();
      return "ThreeColumnsMidExpandedEndHidden";
    }
    if (target === "col2fullscreen") {
      if (!midFullScreenRef.current) {
        enterFullScreen();
        return "MidColumnFullScreen";
      }
      exitFullScreen();
      return "ThreeColumnsMidExpandedEndHidden";
    }
    if (target === "col3fullscreen") {
      if (!endFullScreenRef.current) {
        enterFullScreen();
        return "EndColumnFullScreen";
      }
      exitFullScreen();
      return "ThreeColumnsEndExpanded";
    }
    return layout;
  }, [layout, enterFullScreen, exitFullScreen]);

  const handleCol1ItemClick = useCallback((e) => {
    const item = e.detail.item;
    setAvatarIcon(avatarIcons[getRandomInt(6)]);
    setAvatarColor(avatarColors[getRandomInt(9) + 1]);
    setRatingValue(String(getRandomInt(4) + 1));
    setCol2Title(item.textContent);
    setProductName(item.textContent);
    setProductDesc(item.description);
    setProductSupplier(supplierNames[getRandomInt(11)]);
    setLayout(nextLayout("col1"));
  }, [nextLayout]);

  const handleCol2ItemClick = useCallback((e) => {
    setCol3Title(e.detail.item.textContent);
    setLayout(nextLayout("col2"));
  }, [nextLayout]);

  const handleCloseMidColumn = useCallback(() => {
    setLayout(nextLayout("col2close"));
  }, [nextLayout]);

  const handleCloseEndColumn = useCallback(() => {
    setLayout(nextLayout("col3close"));
  }, [nextLayout]);

  const handleFullscreenMidColumn = useCallback(() => {
    setLayout(nextLayout("col2fullscreen"));
  }, [nextLayout]);

  const handleFullscreenEndColumn = useCallback(() => {
    setLayout(nextLayout("col3fullscreen"));
  }, [nextLayout]);

  const handleToggleClick = useCallback((e) => {
    const pressed = e.target.pressed;
    setToggleIcon(pressed ? "sap-icon://da-2" : "sap-icon://da");
  }, []);

  return (
    <>
      <style>{`
        .fcl {
          height: 600px;
        }
        .col {
          height: 100%;
        }
        .colHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 2.75rem;
          padding: 0.25rem 1rem 0.25rem 1rem;
          background: var(--sapList_Background);
          box-sizing: border-box;
        }
        .colSubHeader {
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .productInfo {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
        }
      `}</style>
      <FlexibleColumnLayout ref={fclRef} className="fcl" layout={layout}>
        <div className="col" slot="startColumn">
          <ShellBar notifications-count="4" show-notifications={true} show-product-switch={true}>
            <ShellBarBranding slot="branding">
              Smart Store, New York
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" slot="logo" />
            </ShellBarBranding>
            <ToggleButton icon={toggleIcon} slot="assistant" onClick={handleToggleClick} />
            <ShellBarItem icon="disconnected" text="Disconnect" />
            <ShellBarItem icon="incoming-call" text="Incoming Calls" />
          </ShellBar>
          <List header-text="Products (13)" selection-mode="Single" onItemClick={handleCol1ItemClick}>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
            <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
            <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
            <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
            <ListItemStandard description="HT-1001" icon="slim-arrow-right" icon-end={true} additional-text="87.90 EUR">Gladiator MX</ListItemStandard>
          </List>
        </div>
        <div className="col" slot="midColumn">
          <div className="colHeader">
            <Title level="H2" style={{ minWidth: "1px" }}>{col2Title}</Title>
            <div className="colSubHeader">
              <Button design="Emphasized">Edit</Button>
              <Button design="Transparent" icon="add" />
              <Button design="Transparent" icon={midFullscreenIcon} onClick={handleFullscreenMidColumn} />
              <Button icon="decline" design="Transparent" onClick={handleCloseMidColumn} />
            </div>
          </div>
          <br />
          <section style={{ padding: "1rem 1rem" }}>
            <Title level="H3">General Information</Title>
            <br />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Avatar icon={avatarIcon} color-scheme={avatarColor} size="XL" style={{ margin: "0 1rem", minWidth: "7rem" }} />
                <div>
                  <div className="productInfo">
                    <Title level="H5">Product:</Title>
                    <Title level="H5"><b>{productName}</b></Title>
                  </div>
                  <br />
                  <div className="productInfo">
                    <Title level="H5">Description:</Title>
                    <Title level="H5"><b>{productDesc}</b></Title>
                  </div>
                  <br />
                  <div className="productInfo">
                    <Title level="H5">Supplier:</Title>
                    <Title level="H5"><b>{productSupplier}</b></Title>
                  </div>
                </div>
              </div>
              <div className="productInfo" style={{ alignSelf: "start" }}>
                <Title level="H5">Rating:</Title>
                <RatingIndicator accessible-name="Hello World" value={ratingValue} />
              </div>
              <span></span>
            </div>
            <br /><br /><br />
            <Title level="H3">Suppliers</Title>
            <br />
            <List onItemClick={handleCol2ItemClick}>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Titanium</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Technocom</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Red Point Stores</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Very Best Screens</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Smartcards</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Alpha Printers</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Printer for All</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Oxynum</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Fasttech</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Ultrasonic United</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Speaker Experts</ListItemStandard>
              <ListItemStandard icon="slim-arrow-right" icon-end={true}>Brainsoft</ListItemStandard>
            </List>
          </section>
        </div>
        <div className="col" slot="endColumn">
          <div className="colHeader">
            <Title style={{ minWidth: "1px" }}>{col3Title}</Title>
            <div className="colSubHeader">
              <Button design="Emphasized">Edit</Button>
              <Button design="Transparent" icon="add" />
              <Button design="Transparent" icon={endFullscreenIcon} onClick={handleFullscreenEndColumn} />
              <Button icon="decline" design="Transparent" onClick={handleCloseEndColumn} />
            </div>
          </div>
          <br /><br />
          <TabContainer collapsed={true}>
            <Tab text="Products" additional-text="125" />
            <TabSeparator />
            <Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additional-text="25" />
            <Tab icon="sap-icon://menu" text="Monitors" selected={true} design="Critical" additional-text="45" />
            <Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additional-text="15" />
            <Tab icon="sap-icon://menu2" disabled={true} text="Disabled" design="Negative" additional-text="40" />
            <Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additional-text="40" />
            <Tab icon="sap-icon://menu2" text="Default" additional-text="40" />
          </TabContainer>
          <section style={{ padding: "1rem 1rem", background: "var(--sapList_Background)" }}>
            <p>
              <Title level="H5">"Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Title>
            </p>
            <p>
              <Title level="H5">"Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Title>
            </p>
            <p>
              <Title level="H5">"Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Title>
            </p>
          </section>
        </div>
      </FlexibleColumnLayout>
    </>
  );
}

export default App;
