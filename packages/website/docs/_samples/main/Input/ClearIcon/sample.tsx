import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

  return (
    <Input value="Input" showClearIcon={true} />
  );
}

export default App;
