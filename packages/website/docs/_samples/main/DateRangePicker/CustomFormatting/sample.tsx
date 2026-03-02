import { createReactComponent } from "@ui5/webcomponents-base";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

function App() {

  return (
    <DateRangePicker display-format="medium" value-format="yyyy-MM-dd" />
  );
}

export default App;
