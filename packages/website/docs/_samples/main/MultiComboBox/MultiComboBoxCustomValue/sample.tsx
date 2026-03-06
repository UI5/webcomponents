import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const MultiComboBox = createComponent(MultiComboBoxClass);
const MultiComboBoxItem = createComponent(MultiComboBoxItemClass);

function App() {
  return (
    <>
      <MultiComboBox placeholder="Choose your state" noValidation={true}>
        <MultiComboBoxItem text="None"></MultiComboBoxItem>
        <MultiComboBoxItem selected text="Positive"></MultiComboBoxItem>
        <MultiComboBoxItem text="Negative"></MultiComboBoxItem>
        <MultiComboBoxItem text="Critical"></MultiComboBoxItem>
        <MultiComboBoxItem text="Information"></MultiComboBoxItem>
      </MultiComboBox>
    </>
  );
}

export default App;
