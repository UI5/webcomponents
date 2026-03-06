import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createComponent(ProgressIndicatorClass);

function App() {
  return <ProgressIndicator value={25} />;
}

export default App;
