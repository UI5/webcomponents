import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);

function App() {

  return (
    <>
      <Label htmlFor="input" required={true} showColon={true}>Secret Code</Label>
        <Input id="input" placeholder="Enter your Secret Code" required={true} type="Password" />
    </>
  );
}

export default App;
