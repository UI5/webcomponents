import { createReactComponent } from "@ui5/webcomponents-base";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createReactComponent(CheckBoxClass);

function App() {

  return (
    <CheckBox text="Basic" />
  );
}

export default App;
