import { createReactComponent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import ComboBoxItemGroupClass from "@ui5/webcomponents/dist/ComboBoxItemGroup.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const ComboBoxItemGroup = createReactComponent(ComboBoxItemGroupClass);

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
