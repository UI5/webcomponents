import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

function App() {

  return (
    <>
      <StepInput disabled={true} value={5} /><br /><br />
    <StepInput readonly={true} value={5} /><br /><br />
    <StepInput valueState="Positive" value={5} /><br /><br />
    <StepInput valueState="Information" value={5} /><br /><br />
    <StepInput valueState="Critical" value={5} /><br /><br />
    <StepInput valueState="Negative" value={5} /><br /><br />
    <StepInput valueState="Negative" value={5} placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
    </StepInput>
    </>
  );
}

export default App;
