import { createReactComponent } from "@ui5/webcomponents-base";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {

  return (
    <>
      <DateTimePicker format-pattern="dd/MM/yyyy, hh:mm"
         />

        <DateTimePicker format-pattern="dd/MM/yyyy, hh:mm:ss aa"
         />

        <DateTimePicker format-pattern="long" />
    </>
  );
}

export default App;
