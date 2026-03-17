import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {
  return (
    <>
      <DatePicker value="2024-02-29" valueState="Information">
        <div slot="valueStateMessage">
          This date exists only once every four years!
        </div>
      </DatePicker>
      <DatePicker value="2024-02-29" valueState="Positive" />
      <DatePicker value="2024-02-29" valueState="Negative" />
      <DatePicker value="2024-02-29" valueState="Critical" />
    </>
  );
}

export default App;
