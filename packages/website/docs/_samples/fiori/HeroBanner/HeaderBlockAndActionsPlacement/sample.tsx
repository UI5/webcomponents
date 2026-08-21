import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);

function App() {
  return (
    <>
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

        <Card slot="endContent" style={{ width: "100%" }}>
          <CardHeader slot="header" titleText="Open Tickets" subtitleText="Support" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold", color: "var(--sapNegativeColor)" }}>42</div>
        </Card>
      </HeroBanner>
    </>
  );
}

export default App;
