import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ColorPickerClass from "@ui5/webcomponents/dist/ColorPicker.js";

const ColorPicker = createComponent(ColorPickerClass);

function App() {

  return (
    <ColorPicker value="rgba(220, 208, 255, 1)">Picker</ColorPicker>
  );
}

export default App;
