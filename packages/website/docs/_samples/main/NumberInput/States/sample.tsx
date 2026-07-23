import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumberInputClass from "@ui5/webcomponents/dist/NumberInput.js";

const NumberInput = createReactComponent(NumberInputClass);

function App() {
  return (
    <>
      <NumberInput disabled={true} value={5} />
      <br />
      <br />
      <NumberInput readonly={true} value={5} />
      <br />
      <br />
      <NumberInput valueState="Positive" value={5} />
      <br />
      <br />
      <NumberInput valueState="Information" value={5} />
      <br />
      <br />
      <NumberInput valueState="Critical" value={5} />
      <br />
      <br />
      <NumberInput valueState="Negative" value={5} />
      <br />
      <br />
      <NumberInput
        valueState="Negative"
        value={5}
        placeholder="Custom value-state message"
      >
        <div slot="valueStateMessage">Please provide valid value</div>
      </NumberInput>
    </>
  );
}

export default App;
