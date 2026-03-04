import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  return (
    <>
      <ComboBox placeholder="Contains Filtering" filter="Contains">
            <ComboBoxItem text="Austria" />
            <ComboBoxItem text="Bulgaria" />
            <ComboBoxItem text="Germany" />
            <ComboBoxItem text="Kazakhstan" />
            <ComboBoxItem text="The United Kingdom of Great Britain and Northern Ireland" />
        </ComboBox>
    </>
  );
}

export default App;
