import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  return (
    <>
      <ComboBox placeholder="Two-column layout">
        <ComboBoxItem text="Austria" additionalText="AT" />
        <ComboBoxItem text="Belgium" additionalText="BE" />
        <ComboBoxItem text="Brazil" additionalText="BR" />
        <ComboBoxItem text="Bulgaria" additionalText="BG" />
        <ComboBoxItem text="Canada" additionalText="CA" />
        <ComboBoxItem text="The United Kingdom of Great Britain and Northern Ireland" additionalText="UK" />
      </ComboBox>
    </>
  );
}

export default App;
