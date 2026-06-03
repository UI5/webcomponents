import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";

const HeroBanner = createReactComponent(HeroBannerClass);

function App() {
  return (
    <>
      <HeroBanner
        headerText="Good Morning, Anna"
        overlineText="Monday, May 26, 2026"
		backgroundImage="https://sdk.openui5.org/test-resources/sap/uxap/images/headerImg.jpg"
      />
    </>
  );
}

export default App;
