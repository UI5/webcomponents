import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

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
