import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Label>Simple Label</Label><br />

        <Label htmlFor="myInputSimple" show-colon={true}>Label</Label>
        <Input id="myInputSimple" placeholder="Type message" />
    </>
  );
}

export default App;
