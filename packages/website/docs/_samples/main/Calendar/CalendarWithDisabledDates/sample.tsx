import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import SpecialCalendarDateClass from "@ui5/webcomponents/dist/SpecialCalendarDate.js";
import DateRangeClass from "@ui5/webcomponents/dist/DateRange.js";

const Calendar = createReactComponent(CalendarClass);
const SpecialCalendarDate = createReactComponent(SpecialCalendarDateClass);
const DateRange = createReactComponent(DateRangeClass);

function App() {

  return (
    <>
      <Calendar format-pattern="dd/MM/yyyy">
            <SpecialCalendarDate value="21/11/2024"></SpecialCalendarDate>
            <DateRange slot="disabledDates" start-value="10/11/2024" end-value="19/11/2024"></DateRange>
    		<DateRange slot="disabledDates" start-value="25/11/2024" end-value="27/11/2024"></DateRange>
        </Calendar>
    </>
  );
}

export default App;
