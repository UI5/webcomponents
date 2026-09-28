import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumericInputClass from "@ui5/webcomponents/dist/NumericInput.js";

const NumericInput = createReactComponent(NumericInputClass);

function App() {
  return (
    <>
      <NumericInput disabled={true} value={5} />
      <br />
      <br />
      <NumericInput readonly={true} value={5} />
      <br />
      <br />
      <NumericInput valueState="Positive" value={5} />
      <br />
      <br />
      <NumericInput valueState="Information" value={5} />
      <br />
      <br />
      <NumericInput valueState="Critical" value={5} />
      <br />
      <br />
      <NumericInput valueState="Negative" value={5} />
      <br />
      <br />
      <NumericInput
        valueState="Negative"
        value={5}
        placeholder="Custom value-state message"
      >
        <div slot="valueStateMessage">Please provide valid value</div>
      </NumericInput>
    </>
  );
}

export default App;
