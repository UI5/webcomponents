import { createReactComponent } from "@ui5/webcomponents-base";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  return (
    <>
      <ToggleButton>Toggle</ToggleButton>
        <ToggleButton icon="edit">Edit</ToggleButton>
    </>
  );
}

export default App;
