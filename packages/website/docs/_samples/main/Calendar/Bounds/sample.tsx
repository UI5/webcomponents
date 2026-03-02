import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

function App() {

  return (
    <Calendar format-pattern="dd/MM/yyyy" min-date="7/10/2020" max-date="20/10/2020" />
  );
}

export default App;
