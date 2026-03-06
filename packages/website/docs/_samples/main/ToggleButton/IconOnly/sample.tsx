import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";

const ToggleButton = createComponent(ToggleButtonClass);

function App() {
  return (
    <>
      <ToggleButton icon="edit" design="Default" tooltip="Edit Button" />
      <ToggleButton
        icon="account"
        design="Transparent"
        tooltip="Account Button"
      />
    </>
  );
}

export default App;
