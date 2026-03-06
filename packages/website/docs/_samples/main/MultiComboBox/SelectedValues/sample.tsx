import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const MultiComboBox = createComponent(MultiComboBoxClass);
const MultiComboBoxItem = createComponent(MultiComboBoxItemClass);

function App() {
  return (
    <MultiComboBox placeholder="Select countries" selectedValues={["DE", "FR"]}>
      <MultiComboBoxItem text="Germany" value="DE" />
      <MultiComboBoxItem text="France" value="FR" />
      <MultiComboBoxItem text="Italy" value="IT" />
      <MultiComboBoxItem text="Spain" value="ES" />
      <MultiComboBoxItem text="United Kingdom" value="GB" />
    </MultiComboBox>
  );
}

export default App;
