import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

function App() {
  return <DateRangePicker style={{ width: "16.5rem" }}/>;
}

export default App;
