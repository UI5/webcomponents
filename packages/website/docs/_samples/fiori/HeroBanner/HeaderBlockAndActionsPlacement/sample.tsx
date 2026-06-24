import { useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import "@ui5/webcomponents-icons/dist/create.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/email.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Carousel = createReactComponent(CarouselClass);

const ticketsManifest = {
  "sap.app": { id: "ticketsCard", type: "card" },
  "sap.card": {
    type: "List",
    header: {
      icon: { src: "sap-icon://customer-order-entry" },
      title: "Open Tickets",
      subtitle: "Support queue",
      status: { text: "42 open" },
    },
  },
};

const revenueManifest = {
  "sap.app": { id: "revenueCard", type: "card" },
  "sap.card": {
    type: "List",
    header: {
      icon: { src: "sap-icon://money-bills" },
      title: "Revenue YTD",
      subtitle: "Q2 2026",
      status: { text: "€4.2M" },
    },
  },
};

const tasksManifest = {
  "sap.app": { id: "tasksCard", type: "card" },
  "sap.card": {
    type: "List",
    header: {
      icon: { src: "sap-icon://task" },
      title: "Pending Approvals",
      subtitle: "Needs attention",
      status: { text: "7 total" },
    },
  },
};

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.openui5.org/resources/sap-ui-integration.js";
    script.setAttribute("id", "sap-ui-bootstrap");
    script.setAttribute("data-sap-ui-theme", "sap_horizon");
    document.head.appendChild(script);
  }, []);
  return (
    <HeroBanner
      headerText="Good Morning, Anna"
      overlineText="Monday, May 26, 2026"
      columnsRatio="Equal"
      actionsPlacement="BottomStart"
      headerBlockPlacement="Bottom"
    >
      <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button icon="create" design="Default">New Request</Button>
        <Button icon="document" design="Default">Create Report</Button>
        <Button icon="email" design="Default">Send Message</Button>
      </div>

      <Carousel slot="endContent" style={{ width: "100%" }}>
        <ui-integration-card style={{ width: "280px", height: "100%" }} manifest={JSON.stringify(ticketsManifest)} />
        <ui-integration-card style={{ width: "280px", height: "100%" }} manifest={JSON.stringify(revenueManifest)} />
        <ui-integration-card style={{ width: "280px", height: "100%" }} manifest={JSON.stringify(tasksManifest)} />
      </Carousel>
    </HeroBanner>
  );
}

export default App;
