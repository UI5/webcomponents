import { createReactComponent } from "@ui5/webcomponents-base";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

function App() {

  return (
    <>
      <DateRangePicker value="2024-02-07 - 2024-02-10" formatPattern="yyyy-MM-dd"
         />

        <DateRangePicker value="06/02/2024 - 12/02/2024" formatPattern="dd/MM/yyyy"
         />

        <DateRangePicker value="02/2024 - 07/2024" formatPattern="MM/yyyy"
         />

        <DateRangePicker value="2024 - 2028" formatPattern="yyyy"
         />

        <DateRangePicker formatPattern="long" value="March 31, 2023 - April 9, 2023"
         />
    </>
  );
}

export default App;
