import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/receipt.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);

function App() {
  return (
    <>
      <h4>FullWidth Layout</h4>
      <HeroBanner
        headerText="Welcome back, Sarah"
        overlineText="Monday, May 26, 2026"
        layout="FullWidth"
      >
        <div slot="headerActions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button icon="receipt" design="Default">Approve Invoices</Button>
          <Button icon="shipping-status" design="Default">Track Deliveries</Button>
        </div>
        <p>Here you can insert any additional information that may be relevant to the context. This section serves as a placeholder for content that can provide more in-depth explanations, supplementary data, or any other pertinent details that the reader might need.</p>
      </HeroBanner>

      <br />

      <h4>HalfWidth Layout (50/50)</h4>
      <HeroBanner
        headerText="Hi, David"
        overlineText="Monday, May 26, 2026"
        layout="HalfWidth"
      >
        <Card>
          <CardHeader slot="header" titleText="Leave Balance" subtitleText="Days remaining" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>18 of 30</div>
        </Card>
        <Card slot="endContent">
          <CardHeader slot="header" titleText="Next Payroll" subtitleText="June 2026" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>Jun 30</div>
        </Card>
      </HeroBanner>

      <br />

      <h4>TwoThirds Layout (2/3 + 1/3)</h4>
      <HeroBanner
        headerText="Good Afternoon, Thomas"
        overlineText="Monday, May 26, 2026"
        layout="TwoThirds"
      >
        <Card>
          <CardHeader slot="header" titleText="Sales Pipeline" subtitleText="Q2 2026" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>€4.2M</div>
        </Card>
        <Card slot="endContent">
          <CardHeader slot="header" titleText="Overdue Tasks" subtitleText="Action needed" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold", color: "var(--sapCriticalTextColor)" }}>3</div>
        </Card>
      </HeroBanner>
    </>
  );
}

export default App;
