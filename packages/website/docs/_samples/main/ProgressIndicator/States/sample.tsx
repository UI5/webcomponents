import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createComponent(ProgressIndicatorClass);

function App() {

  return (
    <>
      <ProgressIndicator value={25} valueState="Positive" />
        <ProgressIndicator value={45} valueState="Information" />
        <ProgressIndicator value={15} valueState="Critical" />
        <ProgressIndicator value={65} valueState="Negative" />
    </>
  );
}

export default App;
