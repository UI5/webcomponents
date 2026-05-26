import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Input = createReactComponent(InputClass);

function App() {
  return (
    <>
      <HeroBanner
        headerText="Good Morning, Anna"
        overlineText="Monday, May 26, 2026"
      >
        <Input
          placeholder="Search purchase orders, suppliers, materials..."
          style={{ width: "100%" }}
        />
      </HeroBanner>
    </>
  );
}

export default App;
