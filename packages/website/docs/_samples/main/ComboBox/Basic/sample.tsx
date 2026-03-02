import { createReactComponent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  return (
    <>
      <ComboBox placeholder="Enter value">
            <ComboBoxItem text="Austria" />
            <ComboBoxItem text="Bulgaria" />
            <ComboBoxItem text="Germany" />
            <ComboBoxItem text="Italy" />
            <ComboBoxItem text="Spain" />
        </ComboBox>
    </>
  );
}

export default App;
