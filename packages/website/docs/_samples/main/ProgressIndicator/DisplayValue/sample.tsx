import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createReactComponent(ProgressIndicatorClass);

function App() {

  return (
    <ProgressIndicator value={25} displayValue="1/4" />
  );
}

export default App;
