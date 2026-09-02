import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumberInputClass from "@ui5/webcomponents/dist/NumberInput.js";

const NumberInput = createReactComponent(NumberInputClass);

function App() {
  return <NumberInput />;
}

export default App;
