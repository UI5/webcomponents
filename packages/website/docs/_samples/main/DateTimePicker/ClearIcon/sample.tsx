import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createComponent(DateTimePickerClass);

function App() {

  return (
    <DateTimePicker showClearIcon={true} />
  );
}

export default App;
