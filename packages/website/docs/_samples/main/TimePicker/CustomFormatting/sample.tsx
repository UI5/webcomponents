import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createComponent(TimePickerClass);

function App() {
  return (
      <TimePicker valueFormat="hh:mm:ss" displayFormat="hh:mm:ss a" />
  );
}

export default App;
