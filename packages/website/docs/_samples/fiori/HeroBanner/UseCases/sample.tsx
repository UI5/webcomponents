import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/task.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/create.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Search = createReactComponent(SearchClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Title = createReactComponent(TitleClass);

function App() {
  return (
    <>
      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>Search</Title>
      <HeroBanner
        headerText="Good Morning, Anna"
        overlineText="Monday, May 26, 2026"
      >
        <Button slot="actions" icon="cart">Cart</Button>
        <Search
          placeholder="Search purchase orders, suppliers, materials..."
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </HeroBanner>

      <br />

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>Header Actions Only</Title>
      <HeroBanner
        headerText="Welcome, Lisa"
        overlineText="Tuesday, May 27, 2026"
      >
        <Button slot="actions" icon="action-settings">Settings</Button>
        <Button slot="actions" icon="log">Activity Log</Button>
      </HeroBanner>

      <br />

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>Content with Actions</Title>
      <HeroBanner
        headerText="Good Morning, Robert"
        overlineText="Tuesday, May 27, 2026"
      >
        <div style={{ margin: 0 }}>You have 3 pending approvals and 12 new notifications since your last visit. Review your tasks below or use the quick actions to get started.</div>
        <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button icon="task" design="Default">Review Approvals</Button>
          <Button icon="add-document" design="Default">Create Report</Button>
          <Button icon="collaborate" design="Default">Team Overview</Button>
        </div>
      </HeroBanner>

      <br />

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>Actions Below Header (actionsPlacement="BottomStart")</Title>
      <HeroBanner
        headerText="Hello, Emma"
        overlineText="Wednesday, May 28, 2026"
        actionsPlacement="BottomStart"
        columnsRatio="Equal"
      >
        <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button icon="create" design="Default">New Request</Button>
          <Button icon="add-document" design="Default">Create Report</Button>
          <Button icon="collaborate" design="Default">Team Overview</Button>
        </div>
        <Card slot="endContent" style={{ width: "100%" }}>
          <CardHeader slot="header" titleText="Open Tickets" subtitleText="Support" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold", color: "var(--sapNegativeColor)" }}>42</div>
        </Card>
      </HeroBanner>

      <br />

      <Title size="H4" style={{ display: "block", marginBottom: "0.5rem" }}>Header at Bottom (headerBlockPlacement="Bottom")</Title>
      <HeroBanner
        headerText="Good Afternoon, James"
        overlineText="Wednesday, May 28, 2026"
        columnsRatio="FirstWider"
        headerBlockPlacement="Bottom"
      >
        <div slot="actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button icon="cart" design="Default">Orders</Button>
          <Button icon="task" design="Default">Tasks</Button>
        </div>
        <Card slot="endContent" style={{ width: "100%" }}>
          <CardHeader slot="header" titleText="Revenue YTD" subtitleText="Q2 2026" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>€4.2M</div>
        </Card>
      </HeroBanner>
    </>
  );
}

export default App;
