import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

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
