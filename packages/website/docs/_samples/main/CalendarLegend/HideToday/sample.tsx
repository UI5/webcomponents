import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CalendarLegendClass from "@ui5/webcomponents/dist/CalendarLegend.js";
import CalendarLegendItemClass from "@ui5/webcomponents/dist/CalendarLegendItem.js";

const CalendarLegend = createComponent(CalendarLegendClass);
const CalendarLegendItem = createComponent(CalendarLegendItemClass);

function App() {

  return (
    <>
      <CalendarLegend hideToday={true} hideWorkingDay={true} hideNonWorkingDay={true} hideSelectedDay={true}>
            <CalendarLegendItem type="Type01" text="Type01" />
            <CalendarLegendItem type="Type02" text="Type02" />
            <CalendarLegendItem type="Type03" text="Type03" />
            <CalendarLegendItem type="Type04" text="Type04" />
            <CalendarLegendItem type="Type05" text="Type05" />
            <CalendarLegendItem type="Type06" text="Type06" />
            <CalendarLegendItem type="Type07" text="Type07" />
            <CalendarLegendItem type="Type08" text="Type08" />
            <CalendarLegendItem type="Type09" text="Type09" />
            <CalendarLegendItem type="Type10" text="Type10" />
            <CalendarLegendItem type="Type11" text="Type11" />
            <CalendarLegendItem type="Type12" text="Type12" />
            <CalendarLegendItem type="Type13" text="Type13" />
            <CalendarLegendItem type="Type14" text="Type14" />
            <CalendarLegendItem type="Type15" text="Type15" />
            <CalendarLegendItem type="Type16" text="Type16" />
            <CalendarLegendItem type="Type17" text="Type17" />
            <CalendarLegendItem type="Type18" text="Type18" />
            <CalendarLegendItem type="Type19" text="Type19" />
            <CalendarLegendItem type="Type20" text="Type20" />
        </CalendarLegend>
    </>
  );
}

export default App;
