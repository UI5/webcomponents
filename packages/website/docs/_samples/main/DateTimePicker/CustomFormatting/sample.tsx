import { createReactComponent } from "@ui5/webcomponents-base";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {

  return (
    <DateTimePicker displayFormat="medium" valueFormat="yyyy-MM-dd HH:mm:ss" />
  );
}

export default App;
