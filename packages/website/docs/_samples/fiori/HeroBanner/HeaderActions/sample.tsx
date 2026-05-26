import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/bell.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Tag = createReactComponent(TagClass);

function App() {
  return (
    <>
      <HeroBanner
        headerText="Hello, Emma"
        overlineText="Monday, May 26, 2026"
        layout="TwoThirds"
      >
        <Button slot="headerActions" icon="action-settings">Preferences</Button>
        <Button slot="headerActions" icon="bell">3 Notifications</Button>

        <Card>
          <CardHeader slot="header" titleText="My Projects" subtitleText="Active" />
          <div style={{ padding: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
              <span>ERP Migration</span>
              <Tag design="Set2" colorScheme="8">On Track</Tag>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
              <span>Cloud Integration</span>
              <Tag design="Set2" colorScheme="1">At Risk</Tag>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
              <span>Data Analytics Platform</span>
              <Tag design="Set2" colorScheme="8">On Track</Tag>
            </div>
          </div>
        </Card>

        <Card slot="endContent">
          <CardHeader slot="header" titleText="Approvals Pending" subtitleText="Requires action" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>5</div>
        </Card>
      </HeroBanner>
    </>
  );
}

export default App;
