import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

function App() {

  return (
    <Calendar primaryCalendarType="Japanese" secondaryCalendarType="Islamic" />
  );
}

export default App;
