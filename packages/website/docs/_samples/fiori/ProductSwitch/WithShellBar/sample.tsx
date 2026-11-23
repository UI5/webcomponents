import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useEffect, useRef, useState } from "react";
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
  const productSwitchRef = useRef<ProductSwitchClass>(null);
  const [assistantIcon, setAssistantIcon] = useState("da");

  // Cap the popover to 4 rows, measured from the actual rendered layout.
  const capToFourRows = () => {
    const height = productSwitchRef.current!.getRowsHeight(4);
    popoverRef.current!.style.setProperty("--ps-row-cap", height ? `${height}px` : "none");
  };

  // Recompute whenever the product switch width changes (on open it is measured via onOpen).
  useEffect(() => {
    const observer = new ResizeObserver(capToFourRows);
    observer.observe(productSwitchRef.current!);
    return () => observer.disconnect();
  }, []);

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

  const handleProductSelect = () => {
    // Selecting a product opens its homepage in a new tab, so close the popover in the original tab.
    popoverRef.current!.open = false;
  };

  const handleToggleButtonClick = (
    e: UI5CustomEvent<ToggleButtonClass, "click">,
  ) => {
    const toggleButton = e.currentTarget;
    setAssistantIcon(toggleButton.pressed ? "da-2" : "da");
  };

  return (
    <>
      {/*
        Cap the popover to 4 product-switch rows. The cap lives on the popover's
        content part, which is the single scroll container, so no nested scrollbar
        can appear. The height is computed from the real rendered rows by
        getRowsHeight(4) and passed in via --ps-row-cap, so it follows the current
        column count and any wrapped items.
      */}
      <style>{`
        #productswitch-popover::part(content) {
          padding: 0;
          max-height: var(--ps-row-cap, none);
        }
      `}</style>
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
          design="Transparent"
          slot="assistant"
          onClick={handleToggleButtonClick}
        />
      </ShellBar>
      <Popover ref={popoverRef} id="productswitch-popover" placement="Bottom" onOpen={capToFourRows}>
        <ProductSwitch ref={productSwitchRef}>
          <ProductSwitchItem
            titleText="Home"
            subtitleText="Central Home"
            icon="home"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Analytics Cloud"
            subtitleText="Analytics Cloud"
            icon="business-objects-experience"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Catalog"
            subtitleText="Ariba"
            icon="contacts"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Guided Buying"
            icon="credit-card"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Strategic Procurement"
            icon="cart-3"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Travel &amp; Expense"
            subtitleText="Concur"
            icon="flight"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Vendor Management"
            subtitleText="Fieldglass"
            icon="shipping-status"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Human Capital Management"
            icon="customer"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Sales Cloud"
            subtitleText="Sales Cloud"
            icon="sales-notification"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Commerce Cloud"
            subtitleText="Commerce Cloud"
            icon="retail-store"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Marketing Cloud"
            subtitleText="Marketing Cloud"
            icon="marketing-campaign"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Service Cloud"
            icon="family-care"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Customer Data Cloud"
            icon="customer-briefing"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="S/4HANA"
            icon="batch-payments"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Field Service"
            subtitleText="Service Cloud"
            icon="family-care"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Subscription Billing"
            icon="credit-card"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Integration Suite"
            icon="shipping-status"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
          <ProductSwitchItem
            titleText="Build Process Automation"
            icon="cart-3"
            targetSrc="about:blank"
            target="_blank"
            onClick={handleProductSelect}
          />
        </ProductSwitch>
      </Popover>
    </>
  );
}

export default App;
