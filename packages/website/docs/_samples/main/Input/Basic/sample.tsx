import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

  return (
    <Input value="Input" />
  );
}

export default App;
