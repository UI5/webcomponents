import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createComponent(CalendarClass);

function App() {

  return (
    <Calendar primaryCalendarType="Japanese" secondaryCalendarType="Islamic" />
  );
}

export default App;
