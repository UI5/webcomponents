import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createComponent(InputClass);

function App() {

  return (
    <Input value="Input" />
  );
}

export default App;
