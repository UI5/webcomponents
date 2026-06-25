import { useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/create.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/email.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);

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
      columnsRatio="FirstWider"
      actionsPlacement="BottomStart"
      headerBlockPlacement="Bottom"
    >
      <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button icon="create" design="Default">New Request</Button>
        <Button icon="document" design="Default">Create Report</Button>
        <Button icon="email" design="Default">Send Message</Button>
      </div>
	  <ui-integration-card slot="endContent" style={{ height: "120px" }} manifest={JSON.stringify(revenueManifest)} />
    </HeroBanner>
  );
}

export default App;
