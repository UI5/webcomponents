import { createReactComponent } from "@ui5/webcomponents-base";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";

const RadioButton = createReactComponent(RadioButtonClass);

function App() {

  return (
    <>
      <RadioButton text="Option A" checked={true} name="GroupA" />
        <RadioButton text="Option B" value-state="None" name="GroupA" />
        <RadioButton text="Option C" value-state="Critical" name="GroupA" />
        <RadioButton text="Option D" value-state="Negative" name="GroupA" />
        <RadioButton text="Option Е" value-state="Positive" name="GroupA" />
        <RadioButton text="Option F" value-state="Information" name="GroupA" />
        <RadioButton text="Option G" disabled={true} name="GroupA" />
        <RadioButton text="Option H" readonly={true} name="GroupA" />
    </>
  );
}

export default App;
