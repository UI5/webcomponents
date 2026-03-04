import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {

  return (
    <DateTimePicker value="Jan 11, 2020, 11:11:11 AM" formatPattern="long" minDate="Jan 11, 2020, 00:00:00 AM" maxDate="Jan 31, 2020, 11:59:59 PM"
     />
  );
}

export default App;
