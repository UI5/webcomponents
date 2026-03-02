import { createReactComponent } from "@ui5/webcomponents-base";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <Text>All options</Text>
        <ui5-dynamic-date-range options="TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, DATETIMERANGE"></ui5-dynamic-date-range>

        <Text>Only two options</Text>
        <ui5-dynamic-date-range id="dynamicDateRange" options="TODAY, DATE"></ui5-dynamic-date-range>
    </>
  );
}

export default App;
