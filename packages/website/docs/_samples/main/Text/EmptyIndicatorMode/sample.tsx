import { createReactComponent } from "@ui5/webcomponents-base";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createReactComponent(TextClass);

function App() {

  return (
    <Text empty-indicator-mode="On" />
  );
}

export default App;
