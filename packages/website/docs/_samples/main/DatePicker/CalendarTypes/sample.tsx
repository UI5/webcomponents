import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <DatePicker primary-calendar-type="Japanese" secondary-calendar-type="Islamic" />
  );
}

export default App;
