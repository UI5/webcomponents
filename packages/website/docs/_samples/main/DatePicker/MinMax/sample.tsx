import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <DatePicker format-pattern="dd/MM/yyyy" min-date="1/1/2020" max-date="4/5/2020" />
  );
}

export default App;
