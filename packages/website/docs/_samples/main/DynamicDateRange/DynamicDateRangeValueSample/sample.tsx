import { createReactComponent } from "@ui5/webcomponents-base";



function App() {

  const handleUi5Change = (e) => {
    const selectedValue = e.target.value;

    selectedValueInput.value = JSON.stringify(selectedValue);

    const dates = dynamicDateRange.toDates(selectedValue);
    convertedDatesInput.value = dates.map(date => date.toLocaleString()).join(" - ");
  };

  return (
    <>
      <ui5-dynamic-date-range id="dynamicDateRange"
    		options="TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, LASTDAYS, NEXTDAYS, LASTWEEKS, NEXTWEEKS, LASTMONTHS, NEXTMONTHS, LASTQUARTERS, NEXTQUARTERS, LASTYEARS, NEXTYEARS"></ui5-dynamic-date-range>

    	<div style={{ marginTop: "20px" }}>
    		<label for="selectedValue">Selected Value:</label>
    		<input id="selectedValue" type="text" readonly style={{ width: "300px" }} />

    		<label for="convertedDates" style={{ marginLeft: "20px" }}>Converted Dates:</label>
    		<input id="convertedDates" type="text" readonly style={{ width: "300px" }} />
    	</div>
    </>
  );
}

export default App;
