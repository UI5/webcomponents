import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ColorPickerClass from "@ui5/webcomponents/dist/ColorPicker.js";

const ColorPicker = createReactComponent(ColorPickerClass);

function App() {

  return (
    <ColorPicker simplified={true} value="#F6A192">Picker</ColorPicker>
  );
}

export default App;
