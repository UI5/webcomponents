import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createComponent(SwitchClass);

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
