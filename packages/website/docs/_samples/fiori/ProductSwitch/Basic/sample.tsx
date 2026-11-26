import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";

const ProductSwitch = createReactComponent(ProductSwitchClass);
const ProductSwitchItem = createReactComponent(ProductSwitchItemClass);

function App() {
  return (
    <>
      <ProductSwitch>
        <ProductSwitchItem
          titleText="Home"
          subtitleText="Central Home"
          icon="home"
          targetSrc="about:blank"
          target="_blank"
        />
        <ProductSwitchItem
          titleText="Analytics Cloud"
          subtitleText="Analytics Cloud"
          icon="business-objects-experience"
          targetSrc="about:blank"
          target="_blank"
        />
        <ProductSwitchItem
          titleText="Catalog"
          subtitleText="Ariba"
          icon="contacts"
          targetSrc="about:blank"
          target="_blank"
        />
        <ProductSwitchItem
          titleText="Travel &amp; Expense"
          subtitleText="Concur"
          icon="flight"
          targetSrc="about:blank"
          target="_blank"
        />
      </ProductSwitch>
    </>
  );
}

export default App;
