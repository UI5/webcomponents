import { createReactComponent } from "@ui5/webcomponents-base";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createReactComponent(SwitchClass);

function App() {

  return (
    <>
      <Switch />
    <Switch checked={true} />
    <Switch disabled={true} />
    <Switch disabled={true} checked={true} />
    </>
  );
}

export default App;
