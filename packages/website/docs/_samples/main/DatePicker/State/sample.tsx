import { createReactComponent } from "@ui5/webcomponents-base";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

function App() {

  return (
    <>
      <DatePicker value="2024-02-29" value-state="Information">
            <div slot="valueStateMessage">This date exists only once every four years!</div>
        </DatePicker>
        <DatePicker value="2024-02-29" value-state="Positive" />
        <DatePicker value="2024-02-29" value-state="Negative" />
        <DatePicker value="2024-02-29" value-state="Critical" />
    </>
  );
}

export default App;
