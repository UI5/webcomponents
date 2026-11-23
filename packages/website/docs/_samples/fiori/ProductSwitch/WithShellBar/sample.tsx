import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
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
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {
  const [assistantIcon, setAssistantIcon] = useState("da");

  const handleToggleButtonClick = (
    e: UI5CustomEvent<ToggleButtonClass, "click">,
  ) => {
    const toggleButton = e.currentTarget;
    setAssistantIcon(toggleButton.pressed ? "da-2" : "da");
  };

  return (
    <ShellBar
      id="shellbar"
      secondaryTitle="home"
      showProductSwitch={true}
    >
      <ShellBarBranding slot="branding">
        Corporate Portal
        <img src="/images/sap-logo-svg.svg" alt="SAP Logo" slot="logo" />
      </ShellBarBranding>
      <ToggleButton
        icon={assistantIcon}
        design="Transparent"
        slot="assistant"
        onClick={handleToggleButtonClick}
      />

      {/* The ShellBar owns and opens the popover and caps it at 4 rows, so the app
          needs no popover and no open/close logic. */}
      <ProductSwitch slot="productSwitch">
        <ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Guided Buying" icon="credit-card" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Strategic Procurement" icon="cart-3" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Travel &amp; Expense" subtitleText="Concur" icon="flight" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Vendor Management" subtitleText="Fieldglass" icon="shipping-status" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Human Capital Management" icon="customer" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Sales Cloud" subtitleText="Sales Cloud" icon="sales-notification" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Commerce Cloud" subtitleText="Commerce Cloud" icon="retail-store" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Marketing Cloud" subtitleText="Marketing Cloud" icon="marketing-campaign" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Service Cloud" icon="family-care" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Customer Data Cloud" icon="customer-briefing" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="S/4HANA" icon="batch-payments" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Field Service" subtitleText="Service Cloud" icon="family-care" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Subscription Billing" icon="credit-card" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Integration Suite" icon="shipping-status" targetSrc="about:blank" target="_blank" />
        <ProductSwitchItem titleText="Build Process Automation" icon="cart-3" targetSrc="about:blank" target="_blank" />
      </ProductSwitch>
    </ShellBar>
  );
}

export default App;
