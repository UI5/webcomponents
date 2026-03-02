import { createReactComponent } from "@ui5/webcomponents-base";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);

function App() {

  return (
    <BusyIndicator active={true} />
  );
}

export default App;
