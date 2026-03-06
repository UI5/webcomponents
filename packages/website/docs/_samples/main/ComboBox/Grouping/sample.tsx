import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import ComboBoxItemGroupClass from "@ui5/webcomponents/dist/ComboBoxItemGroup.js";

const ComboBox = createComponent(ComboBoxClass);
const ComboBoxItem = createComponent(ComboBoxItemClass);
const ComboBoxItemGroup = createComponent(ComboBoxItemGroupClass);

function App() {
  return (
    <>
      <ComboBox placeholder="Grouping of items">
        <ComboBoxItemGroup headerText="A">
          <ComboBoxItem text="Argentina" />
          <ComboBoxItem text="Australia" />
          <ComboBoxItem text="Austria" />
        </ComboBoxItemGroup>
        <ComboBoxItemGroup headerText="B">
          <ComboBoxItem text="Bahrain" />
          <ComboBoxItem text="Belgium" />
          <ComboBoxItem text="Brazil" />
        </ComboBoxItemGroup>
        <ComboBoxItemGroup headerText="C">
          <ComboBoxItem text="Canada" />
          <ComboBoxItem text="Chile" />
        </ComboBoxItemGroup>
      </ComboBox>
    </>
  );
}

export default App;
