import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";

const RadioButton = createComponent(RadioButtonClass);

function App() {
  return (
    <>
      <RadioButton name="myGroup" text="Option A" />
      <RadioButton checked={true} name="myGroup" text="Option B" />
      <RadioButton name="myGroup" text="Option C" />
    </>
  );
}

export default App;
