import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createComponent(DatePickerClass);

function App() {

  return (
    <DatePicker formatPattern="dd/MM/yyyy" minDate="1/1/2020" maxDate="4/5/2020" />
  );
}

export default App;
