import { createReactComponent } from "@ui5/webcomponents-base";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
    			<Select style={{ width: "300px" }} id="sel">
    				<Option data-timezone="Pacific/Honolulu">Pacific/Honolulu</Option>
    				<Option data-timezone="America/Los_Angeles">America/Los_Angeles</Option>
    				<Option data-timezone="America/New_York">America/New_York</Option>
    				<Option data-timezone="Europe/London">Europe/London</Option>
    				<Option data-timezone="Europe/Sofia" selected={true}>Europe/Sofia</Option>
    				<Option data-timezone="Asia/Dubai">Asia/Dubai</Option>
    				<Option data-timezone="Asia/Bishkek">Asia/Bishkek</Option>
    				<Option data-timezone="Australia/Sydney">Australia/Sydney</Option>
    				<Option data-timezone="Pacific/Apia">Pacific/Apia</Option>
    			</Select>
    			<DateTimePicker id="dtp" format-pattern="medium" value="today" />
    		</div>
    </>
  );
}

export default App;
