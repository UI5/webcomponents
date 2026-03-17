import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createReactComponent(TimePickerClass);

function App() {
  return (
      <TimePicker valueFormat="hh:mm:ss" displayFormat="hh:mm:ss a" />
  );
}

export default App;

