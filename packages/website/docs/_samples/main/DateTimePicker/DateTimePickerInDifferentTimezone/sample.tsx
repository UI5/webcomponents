import { useRef } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { setTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const DateTimePicker = createComponent(DateTimePickerClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);

function App() {
  const dtpRef = useRef(null);

  const handleSelectChange = (e: any) => {
    const dateFormat = DateFormat.getDateTimeInstance({ "style": "medium" });
    const value = dateFormat.parse(dtpRef.current!.value);
    setTimezone(e.detail.selectedOption.getAttribute("data-timezone"));
    dtpRef.current!.value = dateFormat.format(value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select style={{ width: "300px" }} id="sel" onChange={handleSelectChange}>
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
        <DateTimePicker ref={dtpRef} id="dtp" formatPattern="medium" value="today" />
      </div>
    </>
  );
}

export default App;
