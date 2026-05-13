import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BannerClass from "@ui5/webcomponents-fiori/dist/Banner.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Banner = createReactComponent(BannerClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Input = createReactComponent(InputClass);

function App() {
  return (
    <>
      <h4>FullWidth Layout</h4>
      <Banner
        salutationText="Welcome back, Alex"
        dateText="Thursday, March 6, 2026"
        layout="FullWidth"
      >
        <Input
          placeholder="Search products, documents, reports..."
          style={{ width: "100%" }}
        />
      </Banner>

      <br />

      <h4>HalfWidth Layout (50/50)</h4>
      <Banner
        salutationText="Hello, Maria"
        dateText="Thursday, March 6, 2026"
        layout="HalfWidth"
      >
        <Card>
          <CardHeader slot="header" titleText="Open Orders" subtitleText="This Week" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>1,247</div>
        </Card>
        <Card slot="endContent">
          <CardHeader slot="header" titleText="Revenue YTD" subtitleText="Target" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>€4.2M</div>
        </Card>
      </Banner>

      <br />

      <h4>TwoThirds Layout (2/3 + 1/3)</h4>
      <Banner
        salutationText="Good Afternoon, Thomas"
        dateText="Thursday, March 6, 2026"
        layout="TwoThirds"
      >
        <Card>
          <CardHeader slot="header" titleText="Pipeline Overview" subtitleText="Q1 2026" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>€12.8M</div>
        </Card>
        <Card slot="endContent">
          <CardHeader slot="header" titleText="Tasks Due" subtitleText="Today" />
          <div style={{ padding: "0.75rem", fontSize: "1.5rem", fontWeight: "bold" }}>7</div>
        </Card>
      </Banner>
    </>
  );
}

export default App;
