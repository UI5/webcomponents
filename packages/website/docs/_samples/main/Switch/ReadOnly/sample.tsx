import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createReactComponent(SwitchClass);

function App() {
  return (
    <>
      <Switch readonly={true} />
      <Switch readonly={true} checked={true} />
      <Switch readonly={true} design="Textual" textOn="On" textOff="Off" />
      <Switch readonly={true} checked={true} design="Textual" textOn="On" textOff="Off" />

    </>
  );
}

export default App;
