import { useMemo } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import CalendarLegendClass from "@ui5/webcomponents/dist/CalendarLegend.js";
import CalendarLegendItemClass from "@ui5/webcomponents/dist/CalendarLegendItem.js";
import SpecialCalendarDateClass from "@ui5/webcomponents/dist/SpecialCalendarDate.js";

const Calendar = createComponent(CalendarClass);
const CalendarLegend = createComponent(CalendarLegendClass);
const CalendarLegendItem = createComponent(CalendarLegendItemClass);
const SpecialCalendarDate = createComponent(SpecialCalendarDateClass);

function App() {
  const specialDates = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const formattedMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const types = ["Type05", "Type07", "Type13", "NonWorking"];
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const assignedDays = new Set<number>();

    function generateUniqueRandomDay() {
      let randomDay: number;
      do {
        randomDay = Math.floor(Math.random() * daysInMonth) + 1;
      } while (assignedDays.has(randomDay));
      assignedDays.add(randomDay);
      return randomDay.toString().padStart(2, "0");
    }

    return Array.from({ length: 11 }, (_, index) => ({
      value: year + "-" + formattedMonth + "-" + generateUniqueRandomDay(),
      type: types[index % types.length],
    }));
  }, []);

  return (
    <>
      <Calendar>
        {specialDates.map((sd, i) => (
          <SpecialCalendarDate
            key={i}
            slot="specialDates"
            value={sd.value}
            type={sd.type}
          />
        ))}

        <CalendarLegend
          slot="calendarLegend"
          id="calendarLegend"
          hideToday={true}
          hideSelectedDay={true}
        >
          <CalendarLegendItem type="Type05" text="Holiday" />
          <CalendarLegendItem type="Type07" text="School Vacation" />
          <CalendarLegendItem type="Type13" text="Wedding" />
        </CalendarLegend>
      </Calendar>
    </>
  );
}

export default App;
