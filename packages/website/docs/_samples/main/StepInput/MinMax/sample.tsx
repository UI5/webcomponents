import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createComponent(StepInputClass);

function App() {

  return (
    <StepInput value={0} min="-50" max={50} step={10} />
  );
}

export default App;
