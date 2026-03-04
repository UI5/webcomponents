import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";

const ProductSwitch = createComponent(ProductSwitchClass);
const ProductSwitchItem = createComponent(ProductSwitchItemClass);
const Avatar = createComponent(AvatarClass);

function App() {

  return (
    <>
      <ProductSwitch>
            <ProductSwitchItem titleText="SVG" subtitleText="SVG">
    			<Avatar slot="image" shape="Square" colorScheme="Transparent" fallbackIcon="employee" size="S">
    				<img alt="Woman" src="https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg.adapt.svg/1493030643828.svg" />
    			</Avatar>
    		</ProductSwitchItem>
            <ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home" />
            <ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience" />
            <ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts" />
            <ProductSwitchItem titleText="Travel &amp; Expense" subtitleText="Concur" icon="flight" />
        </ProductSwitch>
    </>
  );
}

export default App;
