import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);

function App() {

  return (
    <>
      <Label>Simple Label</Label><br />

        <Label for="myInputSimple" showColon={true}>Label</Label>
        <Input id="myInputSimple" placeholder="Type message" />
    </>
  );
}

export default App;
