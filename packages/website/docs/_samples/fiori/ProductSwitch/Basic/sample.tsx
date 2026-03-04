import { createReactComponent } from "@ui5/webcomponents-base";
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
            <ProductSwitchItem title-text="Home" subtitle-text="Central Home" icon="home" />
            <ProductSwitchItem title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience" />
            <ProductSwitchItem title-text="Catalog" subtitle-text="Ariba" icon="contacts" />
            <ProductSwitchItem title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight" />
        </ProductSwitch>
    </>
  );
}

export default App;
