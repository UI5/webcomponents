import { createReactComponent } from "@ui5/webcomponents-base";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

function App() {

  return (
    <StepInput value={5} min="-0" max={10} step="0.5" value-precision={1} />
  );
}

export default App;
