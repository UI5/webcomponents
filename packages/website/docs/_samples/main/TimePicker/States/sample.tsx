import { createReactComponent } from "@ui5/webcomponents-base";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createReactComponent(TimePickerClass);

function App() {

  return (
    <>
      <TimePicker disabled={true} />
    <TimePicker readonly={true} />
    <TimePicker value-state="Positive" placeholder="Positive" />
    <TimePicker value-state="Information" placeholder="Information" />
    <TimePicker value-state="Critical" placeholder="Critical" />
    <TimePicker value-state="Negative" placeholder="Negative" />
    <TimePicker value-state="Negative" placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
    </TimePicker>
    </>
  );
}

export default App;
