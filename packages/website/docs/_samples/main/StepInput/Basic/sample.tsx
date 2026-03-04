import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

function App() {

  return (
    <StepInput />
  );
}

export default App;
