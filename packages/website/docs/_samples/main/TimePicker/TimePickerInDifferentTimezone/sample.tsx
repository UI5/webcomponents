import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createComponent(TimePickerClass);

function App() {

  return (
    <TimePicker value="now" />
  );
}

export default App;
