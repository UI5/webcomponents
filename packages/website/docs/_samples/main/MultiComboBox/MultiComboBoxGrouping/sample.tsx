import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import MultiComboBoxItemGroupClass from "@ui5/webcomponents/dist/MultiComboBoxItemGroup.js";

const MultiComboBox = createComponent(MultiComboBoxClass);
const MultiComboBoxItem = createComponent(MultiComboBoxItemClass);
const MultiComboBoxItemGroup = createComponent(MultiComboBoxItemGroupClass);

function App() {

  return (
    <>
      <MultiComboBox placeholder="Select a country">
            <MultiComboBoxItemGroup headerText="Asia">
                <MultiComboBoxItem text="Afghanistan"></MultiComboBoxItem>
                <MultiComboBoxItem text="China"></MultiComboBoxItem>
                <MultiComboBoxItem text="India"></MultiComboBoxItem>
                <MultiComboBoxItem text="Indonesia"></MultiComboBoxItem>
            </MultiComboBoxItemGroup>
            <MultiComboBoxItemGroup headerText="Europe">
                <MultiComboBoxItem text="Austria"></MultiComboBoxItem>
                <MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
                <MultiComboBoxItem text="Germany"></MultiComboBoxItem>
                <MultiComboBoxItem text="Italy"></MultiComboBoxItem>
                <MultiComboBoxItem text="The United Kingdom of Great Britain and Northern Ireland"></MultiComboBoxItem>
            </MultiComboBoxItemGroup>
            <MultiComboBoxItemGroup headerText="North America">
                <MultiComboBoxItem text="Canada"></MultiComboBoxItem>
                <MultiComboBoxItem text="Granada"></MultiComboBoxItem>
                <MultiComboBoxItem text="Haiti"></MultiComboBoxItem>
                <MultiComboBoxItem text="United States"></MultiComboBoxItem>
            </MultiComboBoxItemGroup>

        </MultiComboBox>
    </>
  );
}

export default App;
