import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <DatePicker formatPattern="dd/MM/yyyy" minDate="1/1/2020" maxDate="4/5/2020" />
  );
}

export default App;
