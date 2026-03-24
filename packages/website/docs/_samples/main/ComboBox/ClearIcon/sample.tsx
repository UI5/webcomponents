import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

export const Example = () => {
  return (
    <>
      <ComboBox value="Denmark" showClearIcon={true}>
        <ComboBoxItem text="Austria" />
        <ComboBoxItem text="Bulgaria" />
        <ComboBoxItem text="Germany" />
        <ComboBoxItem text="Italy" />
        <ComboBoxItem text="Spain" />
      </ComboBox>
    </>
  );
}
