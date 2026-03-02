import { createReactComponent } from "@ui5/webcomponents-base";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createReactComponent(TimePickerClass);

function App() {

  return (
    <>
      <TimePicker format-pattern="hh:mm" />
    <TimePicker format-pattern="hh:mm:ss" />
    <TimePicker format-pattern="hh:mm:ss a" />
    </>
  );
}

export default App;
