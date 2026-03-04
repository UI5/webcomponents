import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ColorPickerClass from "@ui5/webcomponents/dist/ColorPicker.js";

const ColorPicker = createComponent(ColorPickerClass);

function App() {

  return (
    <ColorPicker simplified={true} value="#F6A192">Picker</ColorPicker>
  );
}

export default App;
