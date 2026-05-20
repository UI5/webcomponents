import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/create.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/email.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);

function App() {
  return (
    <>
      <HeroBanner
        salutationText="Hello, Emma"
        dateText="Thursday, March 6, 2026"
        layout="FullWidth"
      >
        <Button slot="headerActions" icon="settings">Settings</Button>
        <Button slot="headerActions" icon="bell">Notifications</Button>

        <div role="group" aria-label="Quick actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button icon="create">New Request</Button>
          <Button icon="document" design="Default">Create Report</Button>
          <Button icon="email" design="Default">Send Message</Button>
        </div>

        <div slot="endContent" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
          <Card>
            <CardHeader slot="header" titleText="Open Tickets" subtitleText="Support" />
            <div style={{ padding: "0.75rem", textAlign: "start", fontSize: "1.5rem", fontWeight: "bold" }}>42</div>
          </Card>
          <Card>
            <CardHeader slot="header" titleText="Resolved" subtitleText="This week" />
            <div style={{ padding: "0.75rem", textAlign: "start", fontSize: "1.5rem", fontWeight: "bold" }}>118</div>
          </Card>
          <Card>
            <CardHeader slot="header" titleText="Avg. Response" subtitleText="Time" />
            <div style={{ padding: "0.75rem", textAlign: "end", fontSize: "1.5rem", fontWeight: "bold" }}>1.4h</div>
          </Card>
        </div>
      </HeroBanner>
    </>
  );
}

export default App;
