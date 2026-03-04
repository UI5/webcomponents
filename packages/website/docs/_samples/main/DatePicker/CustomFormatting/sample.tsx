import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <DatePicker displayFormat="medium" valueFormat="yyyy-MM-dd" />
  );
}

export default App;
