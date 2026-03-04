import { useState, useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import DynamicDateRangeClass from "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";

const DynamicDateRange = createReactComponent(DynamicDateRangeClass);

function App() {
  const ddrRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [convertedDates, setConvertedDates] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(JSON.stringify(value));

    const dates = ddrRef.current!.toDates(value);
    setConvertedDates(dates.map((date: Date) => date.toLocaleString()).join(" - "));
  };

  return (
    <>
      <DynamicDateRange
        ref={ddrRef}
        id="dynamicDateRange"
        options="TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, LASTDAYS, NEXTDAYS, LASTWEEKS, NEXTWEEKS, LASTMONTHS, NEXTMONTHS, LASTQUARTERS, NEXTQUARTERS, LASTYEARS, NEXTYEARS"
        onChange={handleChange}
      />

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="selectedValue">Selected Value:</label>
        <input id="selectedValue" type="text" readOnly style={{ width: "300px" }} value={selectedValue} />

        <label htmlFor="convertedDates" style={{ marginLeft: "20px" }}>Converted Dates:</label>
        <input id="convertedDates" type="text" readOnly style={{ width: "300px" }} value={convertedDates} />
      </div>
    </>
  );
}

export default App;
