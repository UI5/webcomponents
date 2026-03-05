import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createComponent(CalendarClass);

function App() {
  return (
    <Calendar
      formatPattern="dd/MM/yyyy"
      minDate="7/10/2020"
      maxDate="20/10/2020"
    />
  );
}

export default App;
