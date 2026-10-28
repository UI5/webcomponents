import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";

const ProductSwitch = createReactComponent(ProductSwitchClass);
const ProductSwitchItem = createReactComponent(ProductSwitchItemClass);
const Button = createReactComponent(ButtonClass);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Button onClick={() => setLoading((prev) => !prev)}>Toggle loading</Button>
      <br />
      <br />
      <ProductSwitch loading={loading} loadingDelay={0}>
        <ProductSwitchItem
          titleText="Home"
          subtitleText="Central Home"
          icon="home"
        />
        <ProductSwitchItem
          titleText="Analytics Cloud"
          subtitleText="Analytics Cloud"
          icon="business-objects-experience"
        />
        <ProductSwitchItem
          titleText="Catalog"
          subtitleText="Ariba"
          icon="contacts"
        />
        <ProductSwitchItem
          titleText="Travel &amp; Expense"
          subtitleText="Concur"
          icon="flight"
        />
      </ProductSwitch>
    </>
  );
}

export default App;
