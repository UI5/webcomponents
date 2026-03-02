import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons-business-suite/dist/add-polygon.js";
import "@ui5/webcomponents-icons-business-suite/dist/2x1-grid-layout.js";
import "@ui5/webcomponents-icons-business-suite/dist/activate.js";
import "@ui5/webcomponents-icons-business-suite/dist/3d.js";
import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";

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
