import { createReactComponent } from "@ui5/webcomponents-base";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

function App() {

  return (
    <DateRangePicker formatPattern="dd/MM/yyyy" minDate="1/2/2024" maxDate="1/7/2024"
     />
  );
}

export default App;
