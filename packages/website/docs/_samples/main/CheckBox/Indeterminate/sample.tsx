import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createComponent(CheckBoxClass);

function App() {

  return (
    <CheckBox text="indeterminate" indeterminate={true} checked={true} />
  );
}

export default App;
