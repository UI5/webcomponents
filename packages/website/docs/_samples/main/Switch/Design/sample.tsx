import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createReactComponent(SwitchClass);

function App() {

  return (
    <>
      <Switch design="Graphical" />
    <Switch design="Graphical" disabled={true} />
    <Switch design="Textual" textOn="On" textOff="Off" />
    <Switch design="Textual" textOn="On" textOff="Off" disabled={true} />
    </>
  );
}

export default App;
