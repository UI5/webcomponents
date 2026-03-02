import { createReactComponent } from "@ui5/webcomponents-base";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";

const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  return (
    <>
      <ToggleButton icon="sap-icon://edit" design="Default" tooltip="Edit Button" />
        <ToggleButton icon="sap-icon://account" design="Transparent" tooltip="Account Button" />
    </>
  );
}

export default App;
