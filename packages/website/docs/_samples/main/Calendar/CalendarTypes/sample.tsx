import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

function App() {

  return (
    <Calendar primary-calendar-type="Japanese" secondary-calendar-type="Islamic" />
  );
}

export default App;
