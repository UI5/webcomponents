import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

function App() {
  return (
    <>
      <DateTimePicker formatPattern="dd/MM/yyyy, hh:mm" />

      <DateTimePicker formatPattern="dd/MM/yyyy, hh:mm:ss aa" />

      <DateTimePicker formatPattern="long" />
    </>
  );
}

export default App;
