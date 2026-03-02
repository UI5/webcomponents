import { createReactComponent } from "@ui5/webcomponents-base";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {

  return (
    <DateTimePicker value="Jan 11, 2020, 11:11:11 AM" format-pattern="long" min-date="Jan 11, 2020, 00:00:00 AM" max-date="Jan 31, 2020, 11:59:59 PM"
     />
  );
}

export default App;
