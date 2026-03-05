import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";

const ProductSwitch = createComponent(ProductSwitchClass);
const ProductSwitchItem = createComponent(ProductSwitchItemClass);

function App() {

  return (
    <>
      <ProductSwitch>
            <ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home" />
            <ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience" />
            <ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts" />
            <ProductSwitchItem titleText="Travel &amp; Expense" subtitleText="Concur" icon="flight" />
        </ProductSwitch>
    </>
  );
}

export default App;
