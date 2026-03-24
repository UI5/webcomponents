import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createReactComponent(CheckBoxClass);

export const Example = () => {
  return <CheckBox text="Basic" />;
}
