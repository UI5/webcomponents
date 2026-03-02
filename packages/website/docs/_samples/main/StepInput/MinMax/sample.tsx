import { createReactComponent } from "@ui5/webcomponents-base";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

function App() {

  return (
    <StepInput value={0} min="-50" max={50} step={10} />
  );
}

export default App;
