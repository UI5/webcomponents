import { createReactComponent } from "@ui5/webcomponents-base";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);

function App() {

  return (
    <>
      <MultiComboBox placeholder="Select a country">
            <ui5-mcb-item-group header-text="Asia">
                <ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
                <ui5-mcb-item text="China"></ui5-mcb-item>
                <ui5-mcb-item text="India"></ui5-mcb-item>
                <ui5-mcb-item text="Indonesia"></ui5-mcb-item>
            </ui5-mcb-item-group>
            <ui5-mcb-item-group header-text="Europe">
                <ui5-mcb-item text="Austria"></ui5-mcb-item>
                <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
                <ui5-mcb-item text="Germany"></ui5-mcb-item>
                <ui5-mcb-item text="Italy"></ui5-mcb-item>
                <ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
            </ui5-mcb-item-group>
            <ui5-mcb-item-group header-text="North America">
                <ui5-mcb-item text="Canada"></ui5-mcb-item>
                <ui5-mcb-item text="Granada"></ui5-mcb-item>
                <ui5-mcb-item text="Haiti"></ui5-mcb-item>
                <ui5-mcb-item text="United States"></ui5-mcb-item>
            </ui5-mcb-item-group>

        </MultiComboBox>
    </>
  );
}

export default App;
