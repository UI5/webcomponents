import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

function App() {

  return (
    <Calendar formatPattern="dd/MM/yyyy" minDate="7/10/2020" maxDate="20/10/2020" />
  );
}

export default App;
