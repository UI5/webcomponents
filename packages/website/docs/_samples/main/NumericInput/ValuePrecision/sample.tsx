import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumericInputClass from "@ui5/webcomponents/dist/NumericInput.js";

const NumericInput = createReactComponent(NumericInputClass);

function App() {
  return (
    <NumericInput value={5} min={0} max={10} step={0.5} valuePrecision={1} />
  );
}

export default App;
