import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createReactComponent(TextClass);

function App() {
  return <Text emptyIndicatorMode="On" />;
}

export default App;
