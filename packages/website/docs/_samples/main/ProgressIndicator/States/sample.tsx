import { createReactComponent } from "@ui5/webcomponents-base";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createReactComponent(ProgressIndicatorClass);

function App() {

  return (
    <>
      <ProgressIndicator value={25} value-state="Positive" />
        <ProgressIndicator value={45} value-state="Information" />
        <ProgressIndicator value={15} value-state="Critical" />
        <ProgressIndicator value={65} value-state="Negative" />
    </>
  );
}

export default App;
