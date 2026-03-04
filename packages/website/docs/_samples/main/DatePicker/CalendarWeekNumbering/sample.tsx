import { useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const DatePicker = createReactComponent(DatePickerClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {
  const dpRef = useRef(null);

  const handleSelectChange = (e: any) => {
    dpRef.current.calendarWeekNumbering = e.detail.selectedOption.getAttribute("data-calendar-week-numbering");
  };

  return (
    <>
      <Select style={{ width: "300px" }} id="sel" onChange={handleSelectChange}>
        <Option data-calendar-week-numbering="ISO_8601" selected={true}>ISO_8601</Option>
        <Option data-calendar-week-numbering="MiddleEastern">MiddleEastern</Option>
        <Option data-calendar-week-numbering="WesternTraditional">WesternTraditional</Option>
      </Select>
      <DatePicker ref={dpRef} id="dp" />
    </>
  );
}

export default App;
