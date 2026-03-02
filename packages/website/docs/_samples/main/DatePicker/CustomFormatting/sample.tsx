import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <DatePicker display-format="medium" value-format="yyyy-MM-dd" />
  );
}

export default App;
