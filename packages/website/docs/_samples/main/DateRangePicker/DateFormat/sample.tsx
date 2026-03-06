import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createComponent(DateRangePickerClass);

function App() {
  return (
    <>
      <DateRangePicker
        value="2024-02-07 - 2024-02-10"
        displayFormat="yyyy-MM-dd"
		valueFormat="yyyy-MM-dd"
      />

      <DateRangePicker
        value="06/02/2024 - 12/02/2024"
        displayFormat="dd/MM/yyyy"
        valueFormat="dd/MM/yyyy"
      />

      <DateRangePicker 
        value="02/2024 - 07/2024"
        displayFormat="MM/yyyy"
        valueFormat="MM/yyyy"
      />

      <DateRangePicker 
        value="2024 - 2028"
        displayFormat="yyyy"
        valueFormat="yyyy" 
      />	

      <DateRangePicker
        value="March 31, 2023 - April 9, 2023"
        displayFormat="long"
        valueFormat="long"
      />
    </>
  );
}

export default App;
