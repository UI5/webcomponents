import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createComponent(TextClass);

function App() {

  return (
    <Text>Simple Text</Text>
  );
}

export default App;
