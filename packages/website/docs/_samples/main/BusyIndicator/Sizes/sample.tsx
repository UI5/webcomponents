import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);

function App() {

  return (
    <>
      <BusyIndicator size="S" active={true} />
        <BusyIndicator size="M" active={true} />
        <BusyIndicator size="L" active={true} />
    </>
  );
}

export default App;
