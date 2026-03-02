import { createReactComponent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  return (
    <>
      <ComboBox placeholder="Two-column layout">
        <ComboBoxItem text="Austria" additional-text="AT" />
        <ComboBoxItem text="Belgium" additional-text="BE" />
        <ComboBoxItem text="Brazil" additional-text="BR" />
        <ComboBoxItem text="Bulgaria" additional-text="BG" />
        <ComboBoxItem text="Canada" additional-text="CA" />
        <ComboBoxItem text="The United Kingdom of Great Britain and Northern Ireland" additional-text="UK" />
      </ComboBox>
    </>
  );
}

export default App;
