import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon name="business-suite/add-polygon" />
        <Icon name="business-suite/2x1-grid-layout" />
        <Icon name="business-suite/activate" />
        <Icon name="business-suite/3d" />
        <Icon name="business-suite/ab-testing" />
    </>
  );
}

export default App;
