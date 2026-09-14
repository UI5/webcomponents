import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumberInputClass from "@ui5/webcomponents/dist/NumberInput.js";

const NumberInput = createReactComponent(NumberInputClass);

function App() {
  return (
    <NumberInput value={5} min={0} max={10} step={0.5} valuePrecision={1} />
  );
}

export default App;
