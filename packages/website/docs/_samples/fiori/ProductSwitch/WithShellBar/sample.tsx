import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
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

const ProductSwitch = createComponent(ProductSwitchClass);
const ProductSwitchItem = createComponent(ProductSwitchItemClass);
const ShellBar = createComponent(ShellBarClass);
const ShellBarBranding = createComponent(ShellBarBrandingClass);
const Popover = createComponent(PopoverClass);
const ToggleButton = createComponent(ToggleButtonClass);

function App() {
  const popoverRef = useRef(null);
  const [assistantIcon, setAssistantIcon] = useState("da");

  const handleShellbarProductSwitchClick = (
    event: UI5CustomEvent<ShellBarClass, "product-switch-click">,
  ) => {
    if (popoverRef.current!.open) {
      popoverRef.current!.open = false;
    } else {
      event.preventDefault();
      popoverRef.current!.opener = event.detail.targetRef;
      popoverRef.current!.open = true;
    }
  };

  const handleToggleButtonClick = (
    e: UI5CustomEvent<ToggleButtonClass, "click">,
  ) => {
    const toggleButton = e.currentTarget;
    setAssistantIcon(toggleButton.pressed ? "da-2" : "da");
  };

  return (
    <>
      <ShellBar
        id="shellbar"
        secondaryTitle="home"
        showProductSwitch={true}
        onProductSwitchClick={handleShellbarProductSwitchClick}
      >
        <ShellBarBranding slot="branding">
          Corporate Portal
          <img src="/images/sap-logo-svg.svg" alt="SAP Logo" slot="logo" />
        </ShellBarBranding>
        <ToggleButton
          icon={assistantIcon}
          slot="assistant"
          onClick={handleToggleButtonClick}
        />
      </ShellBar>
      <Popover ref={popoverRef} id="productswitch-popover" placement="Bottom">
        <ProductSwitch>
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
          <ProductSwitchItem titleText="Guided Buying" icon="credit-card" />
          <ProductSwitchItem titleText="Strategic Procurement" icon="cart-3" />
          <ProductSwitchItem
            titleText="Travel &amp; Expense"
            subtitleText="Concur"
            icon="flight"
          />
          <ProductSwitchItem
            titleText="Vendor Management"
            subtitleText="Fieldglass"
            icon="shipping-status"
          />
          <ProductSwitchItem
            titleText="Human Capital Management"
            icon="customer"
          />
          <ProductSwitchItem
            titleText="Sales Cloud"
            subtitleText="Sales Cloud"
            icon="sales-notification"
          />
          <ProductSwitchItem
            titleText="Commerce Cloud"
            subtitleText="Commerce Cloud"
            icon="retail-store"
          />
          <ProductSwitchItem
            titleText="Marketing Cloud"
            subtitleText="Marketing Cloud"
            icon="marketing-campaign"
          />
          <ProductSwitchItem titleText="Service Cloud" icon="family-care" />
          <ProductSwitchItem
            titleText="Customer Data Cloud"
            icon="customer-briefing"
          />
          <ProductSwitchItem titleText="S/4HANA" icon="batch-payments" />
        </ProductSwitch>
      </Popover>
    </>
  );
}

export default App;
