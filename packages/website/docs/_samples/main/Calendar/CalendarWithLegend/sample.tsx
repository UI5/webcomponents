import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import CalendarLegendClass from "@ui5/webcomponents/dist/CalendarLegend.js";
import CalendarLegendItemClass from "@ui5/webcomponents/dist/CalendarLegendItem.js";
import SpecialCalendarDateClass from "@ui5/webcomponents/dist/SpecialCalendarDate.js";

const Calendar = createReactComponent(CalendarClass);
const CalendarLegend = createReactComponent(CalendarLegendClass);
const CalendarLegendItem = createReactComponent(CalendarLegendItemClass);
const SpecialCalendarDate = createReactComponent(SpecialCalendarDateClass);

function App() {

  return (
    <>
      <Calendar>
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />
            <SpecialCalendarDate slot="specialDates" />

            <CalendarLegend slot="calendarLegend" id="calendarLegend" hide-today={true} hide-selected-day={true}>
                <CalendarLegendItem type="Type05" text="Holiday" />
                <CalendarLegendItem type="Type07" text="School Vacation" />
                <CalendarLegendItem type="Type13" text="Wedding" />
            </CalendarLegend>
        </Calendar>
    </>
  );
}

export default App;
