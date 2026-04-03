import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

function App() {
  return (
    <>
      <MultiComboBox value="Italy" noValidation={true} showClearIcon={true}>
        <MultiComboBoxItem text="Albania"></MultiComboBoxItem>
        <MultiComboBoxItem selected text="Argentina"></MultiComboBoxItem>
        <MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
        <MultiComboBoxItem text="Denmark"></MultiComboBoxItem>
        <MultiComboBoxItem text="England"></MultiComboBoxItem>
        <MultiComboBoxItem text="Germany"></MultiComboBoxItem>
        <MultiComboBoxItem text="Philippines"></MultiComboBoxItem>
        <MultiComboBoxItem text="Portugal"></MultiComboBoxItem>
        <MultiComboBoxItem text="The United Kingdom of Great Britain and Northern Ireland"></MultiComboBoxItem>
      </MultiComboBox>
    </>
  );
}

export default App;
