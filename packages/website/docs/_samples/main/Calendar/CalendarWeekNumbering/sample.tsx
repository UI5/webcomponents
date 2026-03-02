import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const Calendar = createReactComponent(CalendarClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {

  return (
    <>
      <Select style={{ width: "300px" }} id="sel">
            <Option data-calendar-week-numbering="ISO_8601" selected={true}>ISO_8601</Option>
            <Option data-calendar-week-numbering="MiddleEastern">MiddleEastern</Option>
            <Option data-calendar-week-numbering="WesternTraditional">WesternTraditional</Option>
        </Select>
        <Calendar id="cal" />
    </>
  );
}

export default App;
