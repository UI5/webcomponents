import { createReactComponent } from "@ui5/webcomponents-base";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

function App() {

  return (
    <>
      <StepInput disabled={true} value={5} /><br /><br />
    <StepInput readonly={true} value={5} /><br /><br />
    <StepInput value-state="Positive" value={5} /><br /><br />
    <StepInput value-state="Information" value={5} /><br /><br />
    <StepInput value-state="Critical" value={5} /><br /><br />
    <StepInput value-state="Negative" value={5} /><br /><br />
    <StepInput value-state="Negative" value={5} placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
    </StepInput>
    </>
  );
}

export default App;
