import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";

const Calendar = createReactComponent(CalendarClass);

export const Example = () => {
  return (
    <Calendar
      valueFormat="dd/MM/yyyy"
      displayFormat="dd/MM/yyyy"
      minDate="7/10/2020"
      maxDate="20/10/2020"
    />
  );
}
