import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ColorPickerClass from "@ui5/webcomponents/dist/ColorPicker.js";

const ColorPicker = createReactComponent(ColorPickerClass);

export const Example = () => {
  return <ColorPicker value="rgba(220, 208, 255, 1)">Picker</ColorPicker>;
}
