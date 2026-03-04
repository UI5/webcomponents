import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createComponent(DatePickerClass);

function App() {

  return (
    <DatePicker value="now" />
  );
}

export default App;
