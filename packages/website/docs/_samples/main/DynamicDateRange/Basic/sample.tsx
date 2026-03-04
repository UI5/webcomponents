import { createReactComponent } from "@ui5/webcomponents-base";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import DynamicDateRangeClass from "@ui5/webcomponents/dist/DynamicDateRange.js";

const Text = createReactComponent(TextClass);
const DynamicDateRange = createReactComponent(DynamicDateRangeClass);

function App() {

  return (
    <>
      <Text>All options</Text>
        <DynamicDateRange options="TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, DATETIMERANGE"></DynamicDateRange>

        <Text>Only two options</Text>
        <DynamicDateRange id="dynamicDateRange" options="TODAY, DATE"></DynamicDateRange>
    </>
  );
}

export default App;
