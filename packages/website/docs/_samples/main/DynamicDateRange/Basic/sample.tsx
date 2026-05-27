import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import DynamicDateRangeClass from "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateTimeRange.js";

const Text = createReactComponent(TextClass);
const DynamicDateRange = createReactComponent(DynamicDateRangeClass);

function App() {
  return (
    <>
      <Text>All options</Text>
      <DynamicDateRange options="TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, DATETIMERANGE"></DynamicDateRange>

      <Text>Only two options</Text>
      <DynamicDateRange
        id="dynamicDateRange"
        options="TODAY, DATE"
      ></DynamicDateRange>
    </>
  );
}

export default App;
