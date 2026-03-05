import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createComponent(TimePickerClass);

function App() {

  return (
    <>
      <TimePicker disabled={true} />
    <TimePicker readonly={true} />
    <TimePicker valueState="Positive" placeholder="Positive" />
    <TimePicker valueState="Information" placeholder="Information" />
    <TimePicker valueState="Critical" placeholder="Critical" />
    <TimePicker valueState="Negative" placeholder="Negative" />
    <TimePicker valueState="Negative" placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
    </TimePicker>
    </>
  );
}

export default App;
