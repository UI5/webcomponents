import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import NumericInputClass from "@ui5/webcomponents/dist/NumericInput.js";

const NumericInput = createReactComponent(NumericInputClass);

function App() {
  return <NumericInput />;
}

export default App;
