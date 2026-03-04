import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef, useState } from "react";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/sales-notification.js";
import "@ui5/webcomponents-icons/dist/retail-store.js";
import "@ui5/webcomponents-icons/dist/marketing-campaign.js";
import "@ui5/webcomponents-icons/dist/family-care.js";
import "@ui5/webcomponents-icons/dist/customer-briefing.js";
import "@ui5/webcomponents-icons/dist/batch-payments.js";
import "@ui5/webcomponents-icons/dist/cart-3.js";
import "@ui5/webcomponents-icons/dist/credit-card.js";

const ProductSwitch = createReactComponent(ProductSwitchClass);
const ProductSwitchItem = createReactComponent(ProductSwitchItemClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const Popover = createReactComponent(PopoverClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {
  const popoverRef = useRef(null);
  const [assistantIcon, setAssistantIcon] = useState("sap-icon://da");

  const handleShellbarProductSwitchClick = (event) => {
    if (popoverRef.current.open) {
        popoverRef.current.open = false;
    } else {
        event.preventDefault();
        popoverRef.current.opener = event.detail.targetRef;
        popoverRef.current.open = true;
    }
  };

  const handleToggleButtonClick = (e) => {
    const toggleButton = e.target;
    setAssistantIcon(toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da");
  };

  return (
    <>
      <ShellBar id="shellbar" secondary-title="home" show-product-switch={true} onProductSwitchClick={handleShellbarProductSwitchClick}>
            <ShellBarBranding slot="branding">
                Corporate Portal
                <img src="/images/sap-logo-svg.svg" alt="SAP Logo" slot="logo" />
            </ShellBarBranding>
    		<ToggleButton icon={assistantIcon} slot="assistant" onClick={handleToggleButtonClick} />
        </ShellBar>
        <Popover ref={popoverRef} id="productswitch-popover" placement="Bottom">
            <ProductSwitch>
                <ProductSwitchItem title-text="Home" subtitle-text="Central Home" icon="home" />
                <ProductSwitchItem title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience" />
                <ProductSwitchItem title-text="Catalog" subtitle-text="Ariba" icon="contacts" />
                <ProductSwitchItem title-text="Guided Buying" icon="credit-card" />
                <ProductSwitchItem title-text="Strategic Procurement" icon="cart-3" />
                <ProductSwitchItem title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight" />
                <ProductSwitchItem title-text="Vendor Management" subtitle-text="Fieldglass" icon="shipping-status" />
                <ProductSwitchItem title-text="Human Capital Management" icon="customer" />
                <ProductSwitchItem title-text="Sales Cloud" subtitle-text="Sales Cloud" icon="sales-notification" />
                <ProductSwitchItem title-text="Commerce Cloud" subtitle-text="Commerce Cloud" icon="retail-store" />
                <ProductSwitchItem title-text="Marketing Cloud" subtitle-text="Marketing Cloud" icon="marketing-campaign" />
                <ProductSwitchItem title-text="Service Cloud" icon="family-care" />
                <ProductSwitchItem title-text="Customer Data Cloud" icon="customer-briefing" />
                <ProductSwitchItem title-text="S/4HANA" icon="batch-payments" />
            </ProductSwitch>

        </Popover>
    </>
  );
}

export default App;
