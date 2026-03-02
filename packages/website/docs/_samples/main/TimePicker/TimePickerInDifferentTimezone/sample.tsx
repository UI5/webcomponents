import { createReactComponent } from "@ui5/webcomponents-base";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createReactComponent(TimePickerClass);

function App() {

  return (
    <TimePicker value="now" />
  );
}

export default App;
