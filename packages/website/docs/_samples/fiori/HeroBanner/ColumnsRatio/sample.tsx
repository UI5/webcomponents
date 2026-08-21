import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/receipt.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Title = createReactComponent(TitleClass);

function App() {
  return (
    <>
      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>No columnsRatio (single column)</Title>
      <HeroBanner
        headerText="Welcome back, Sarah"
        overlineText="Monday, May 26, 2026"
      >
        <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button icon="receipt" design="Default">Approve Invoices</Button>
          <Button icon="shipping-status" design="Default">Track Deliveries</Button>
        </div>
        <div>Here you can insert any additional information that may be relevant to the context. This section serves as a placeholder for content that can provide more in-depth explanations, supplementary data, or any other pertinent details that the reader might need.</div>
      </HeroBanner>

      <br />

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>columnsRatio="Equal" (equal width columns)</Title>
      <HeroBanner
        headerText="Hi, David"
        overlineText="Monday, May 26, 2026"
        columnsRatio="Equal"
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

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>columnsRatio="FirstWider" (start column twice as wide)</Title>
      <HeroBanner
        headerText="Good Afternoon, Thomas"
        overlineText="Monday, May 26, 2026"
        columnsRatio="FirstWider"
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
