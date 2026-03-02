import { createReactComponent } from "@ui5/webcomponents-base";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createReactComponent(ProgressIndicatorClass);

function App() {

  return (
    <ProgressIndicator value={25} />
  );
}

export default App;
