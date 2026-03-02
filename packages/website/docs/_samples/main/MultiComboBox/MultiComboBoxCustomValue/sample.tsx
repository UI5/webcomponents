import { createReactComponent } from "@ui5/webcomponents-base";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);

function App() {

  return (
    <>
      <MultiComboBox placeholder="Choose your state" no-validation={true}>
            <ui5-mcb-item text="None"></ui5-mcb-item>
            <ui5-mcb-item selected text="Positive"></ui5-mcb-item>
            <ui5-mcb-item text="Negative"></ui5-mcb-item>
            <ui5-mcb-item text="Critical"></ui5-mcb-item>
            <ui5-mcb-item text="Information"></ui5-mcb-item>
        </MultiComboBox>
    </>
  );
}

export default App;
