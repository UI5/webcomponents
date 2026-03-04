import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createComponent(DateRangePickerClass);

function App() {

  return (
    <DateRangePicker />
  );
}

export default App;
