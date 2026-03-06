import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createComponent(DateRangePickerClass);

function App() {
  return (
    <DateRangePicker
      displayFormat="dd/MM/yyyy"
      valueFormat="dd/MM/yyyy"
      minDate="1/2/2024"
      maxDate="1/7/2024"
    />
  );
}

export default App;
