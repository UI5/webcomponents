import { createReactComponent } from "@ui5/webcomponents-base";
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

function App() {
  return (
    <FlexibleColumnLayout id="fcl" className="fcl">
      <div className="col" slot="startColumn">
        <ShellBar notificationsCount="4" showNotifications={true} showProductSwitch={true}>
          <ShellBarBranding slot="branding">
            Smart Store, New York
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" slot="logo" />
          </ShellBarBranding>
          <ToggleButton icon="sap-icon://da" slot="assistant" />
          <ShellBarItem icon="disconnected" text="Disconnect" />
          <ShellBarItem icon="incoming-call" text="Incoming Calls" />
        </ShellBar>
        <List id="col1list" headerText="Products (13)" selectionMode="Single">
          <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="47.00 EUR">
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="249.00 EUR">
            7 inch Widescreen Portable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="947.00 EUR">
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="647.00 EUR">
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard description="HT-1252" icon="slim-arrow-right" iconEnd={true} additionalText="27.99 EUR">
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="447.90 EUR">
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="647.50 EUR">
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="847.80 EUR">
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="1,250.00 EUR">
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard description="HT-8001" icon="slim-arrow-right" iconEnd={true} additionalText="1,288.00 EUR">
            Camcorder View
          </ListItemStandard>
          <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="996.00 EUR">
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard description="HT-0003" icon="slim-arrow-right" iconEnd={true} additionalText="147.00 EUR">
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard description="HT-1001" icon="slim-arrow-right" iconEnd={true} additionalText="87.90 EUR">
            Gladiator MX
          </ListItemStandard>
        </List>
      </div>
      <div className="col" slot="midColumn">
        <div className="colHeader">
          <Title id="col2title" level="H2" style={{ minWidth: "1px" }} />
          <div className="colSubHeader">
            <Button design="Emphasized">Edit</Button>
            <Button design="Transparent" icon="add" />
            <Button id="fullscreenMidColumn" design="Transparent" icon="full-screen" />
            <Button id="closeMidColumn" icon="decline" design="Transparent" />
          </div>
        </div>
        <br />
        <section style={{ padding: "1rem 1rem" }}>
          <Title level="H3">General Information</Title>
          <br />
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Avatar id="avatar" icon="laptop" colorScheme="Accent5" size="XL" style={{ margin: "0 1rem", minWidth: "7rem" }} />
              <div>
                <div className="productInfo">
                  <Title level="H5">Product:</Title>
                  <Title level="H5" id="lblName" />
                </div>
                <br />
                <div className="productInfo">
                  <Title level="H5">Description:</Title>
                  <Title level="H5" id="lblDesc" />
                </div>
                <br />
                <div className="productInfo">
                  <Title level="H5">Supplier:</Title>
                  <Title level="H5" id="lblSupplier"><b>Titanium</b></Title>
                </div>
              </div>
            </div>
            <div className="productInfo" style={{ alignSelf: "start" }}>
              <Title level="H5">Rating:</Title>
              <RatingIndicator id="productRating" accessibleName="Hello World" value={3.5} />
            </div>
            <span></span>
          </div>
          <br /><br /><br />
          <Title level="H3">Suppliers</Title>
          <br />
          <List id="col2list">
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Titanium</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Technocom</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Red Point Stores</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Very Best Screens</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Smartcards</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Alpha Printers</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Printer for All</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Oxynum</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Fasttech</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Ultrasonic United</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Speaker Experts</ListItemStandard>
            <ListItemStandard icon="slim-arrow-right" iconEnd={true}>Brainsoft</ListItemStandard>
          </List>
        </section>
      </div>
      <div className="col" slot="endColumn">
        <div className="colHeader">
          <Title id="col3title" style={{ minWidth: "1px" }} />
          <div className="colSubHeader">
            <Button design="Emphasized">Edit</Button>
            <Button design="Transparent" icon="add" />
            <Button id="fullscreenEndColumn" design="Transparent" icon="full-screen" />
            <Button id="closeEndColumn" icon="decline" design="Transparent" />
          </div>
        </div>
        <br /><br />
        <TabContainer id="tabContainer1" collapsed={true}>
          <Tab text="Products" additionalText="125" />
          <TabSeparator />
          <Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additionalText="25" />
          <Tab icon="sap-icon://menu" text="Monitors" selected={true} design="Critical" additionalText="45" />
          <Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additionalText="15" />
          <Tab icon="sap-icon://menu2" disabled={true} text="Disabled" design="Negative" additionalText="40" />
          <Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additionalText="40" />
          <Tab icon="sap-icon://menu2" text="Default" additionalText="40" />
        </TabContainer>
        <section style={{ padding: "1rem 1rem", background: "var(--sapList_Background)" }}>
          <p>
            <Title level="H5">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Title>
          </p>
          <p>
            <Title level="H5">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Title>
          </p>
          <p>
            <Title level="H5">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
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
  );
}

export default App;
