import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {
  return (
    <>
      <DateTimePicker valueFormat="dd/MM/yyyy, hh:mm" displayFormat="dd/MM/yyyy, hh:mm" style={{ width: "17.5rem" }} />

      <DateTimePicker valueFormat="dd/MM/yyyy, hh:mm:ss aa" displayFormat="dd/MM/yyyy, hh:mm:ss aa" style={{ width: "17.5rem" }} />

      <DateTimePicker valueFormat="long" displayFormat="long" style={{ width: "17.5rem" }} />
    </>
  );
}

export default App;
