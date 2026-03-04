import { createReactComponent } from "@ui5/webcomponents-base";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

function App() {

  return (
    <DateRangePicker show-clear-icon={true} />
  );
}

export default App;
