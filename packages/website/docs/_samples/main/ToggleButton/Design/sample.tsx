import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";

const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {
  return (
    <>
      <ToggleButton design="Emphasized">Emphasized</ToggleButton>
      <ToggleButton design="Default">Default</ToggleButton>
      <ToggleButton design="Attention">Attention</ToggleButton>
      <ToggleButton design="Positive">Positive</ToggleButton>
      <ToggleButton design="Negative">Negative</ToggleButton>
      <ToggleButton design="Transparent">Transparent</ToggleButton>
    </>
  );
}

export default App;
