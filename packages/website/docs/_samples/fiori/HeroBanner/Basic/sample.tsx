import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";

const HeroBanner = createReactComponent(HeroBannerClass);

function App() {
  return (
    <>
      <HeroBanner
        salutationText="Hello, John"
        dateText="Thursday, March 6, 2026"
      />
    </>
  );
}

export default App;
