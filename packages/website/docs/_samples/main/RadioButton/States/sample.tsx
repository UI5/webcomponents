import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";

const RadioButton = createComponent(RadioButtonClass);

function App() {

  return (
    <>
      <RadioButton text="Option A" checked={true} name="GroupA" />
        <RadioButton text="Option B" valueState="None" name="GroupA" />
        <RadioButton text="Option C" valueState="Critical" name="GroupA" />
        <RadioButton text="Option D" valueState="Negative" name="GroupA" />
        <RadioButton text="Option Е" valueState="Positive" name="GroupA" />
        <RadioButton text="Option F" valueState="Information" name="GroupA" />
        <RadioButton text="Option G" disabled={true} name="GroupA" />
        <RadioButton text="Option H" readonly={true} name="GroupA" />
    </>
  );
}

export default App;
