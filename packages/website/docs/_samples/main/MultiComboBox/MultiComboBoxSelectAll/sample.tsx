import { createReactComponent } from "@ui5/webcomponents-base";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);

function App() {

  return (
    <>
      <MultiComboBox placeholder="Type your value" show-select-all={true}>
            <ui5-mcb-item text="Albania"></ui5-mcb-item>
            <ui5-mcb-item selected text="Argentina"></ui5-mcb-item>
            <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
            <ui5-mcb-item text="Denmark"></ui5-mcb-item>
            <ui5-mcb-item text="England"></ui5-mcb-item>
            <ui5-mcb-item text="Germany"></ui5-mcb-item>
            <ui5-mcb-item text="Philippines"></ui5-mcb-item>
            <ui5-mcb-item text="Portugal"></ui5-mcb-item>
            <ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
        </MultiComboBox>
    </>
  );
}

export default App;
