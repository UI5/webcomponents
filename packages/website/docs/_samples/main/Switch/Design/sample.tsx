import { createReactComponent } from "@ui5/webcomponents-base";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createReactComponent(SwitchClass);

function App() {

  return (
    <>
      <Switch design="Graphical" />
    <Switch design="Graphical" disabled={true} />
    <Switch design="Textual" text-on="On" text-off="Off" />
    <Switch design="Textual" text-on="On" text-off="Off" disabled={true} />
    </>
  );
}

export default App;
