import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

function App() {

  return (
    <>
      <Calendar format-pattern="dd/MM/yyyy">
            <ui5-date value="21/11/2024"></ui5-date>
            <ui5-date-range slot="disabledDates" start-value="10/11/2024" end-value="19/11/2024"></ui5-date-range>
    		<ui5-date-range slot="disabledDates" start-value="25/11/2024" end-value="27/11/2024"></ui5-date-range>
        </Calendar>
    </>
  );
}

export default App;
