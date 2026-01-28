import "@ui5/webcomponents/dist/Assets-fetch.js";
import "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";

const dynamicDateRange = document.getElementById("dynamicDateRange");
const selectedValueInput = document.getElementById("selectedValue");
const convertedDatesInput = document.getElementById("convertedDates");

dynamicDateRange.addEventListener("ui5-change", (e) => {
    const selectedValue = e.target.value;

    selectedValueInput.value = JSON.stringify(selectedValue);

    const dates = dynamicDateRange.toDates(selectedValue);
    convertedDatesInput.value = dates.map(date => date.toLocaleString()).join(" - ");

});