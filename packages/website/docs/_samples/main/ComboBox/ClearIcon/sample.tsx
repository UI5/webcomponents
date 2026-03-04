import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createComponent(ComboBoxClass);
const ComboBoxItem = createComponent(ComboBoxItemClass);

function App() {

  return (
    <>
      <ComboBox value="Denmark" showClearIcon={true}>
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
