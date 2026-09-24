import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumericInputClass from "@ui5/webcomponents/dist/NumericInput.js";

const NumericInput = createReactComponent(NumericInputClass);

function App() {
  return <NumericInput value={0} min={-50} max={50} step={10} />;
}

export default App;
