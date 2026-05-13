import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BannerClass from "@ui5/webcomponents-fiori/dist/Banner.js";

const Banner = createReactComponent(BannerClass);

function App() {
  return (
    <>
      <Banner
        salutationText="Hello, John"
        dateText="Thursday, March 6, 2026"
      />
    </>
  );
}

export default App;
