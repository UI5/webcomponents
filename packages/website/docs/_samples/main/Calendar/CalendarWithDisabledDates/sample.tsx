import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import SpecialCalendarDateClass from "@ui5/webcomponents/dist/SpecialCalendarDate.js";
import DateRangeClass from "@ui5/webcomponents/dist/CalendarDateRange.js";

const Calendar = createReactComponent(CalendarClass);
const SpecialCalendarDate = createReactComponent(SpecialCalendarDateClass);
const DateRange = createReactComponent(DateRangeClass);

export const Example = () => {
  return (
    <>
      <Calendar valueFormat="dd/MM/yyyy" displayFormat="dd/MM/yyyy">
        <SpecialCalendarDate value="21/11/2024"></SpecialCalendarDate>
        <DateRange
          slot="disabledDates"
          startValue="10/11/2024"
          endValue="19/11/2024"
        ></DateRange>
        <DateRange
          slot="disabledDates"
          startValue="25/11/2024"
          endValue="27/11/2024"
        ></DateRange>
      </Calendar>
    </>
  );
}
