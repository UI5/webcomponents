import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createComponent(StepInputClass);

function App() {
  return (
    <StepInput value={5} min={0} max={10} step={0.5} valuePrecision={1} />
  );
}

export default App;
