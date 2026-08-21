import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Button = createReactComponent(ButtonClass);

function App() {
  return (
    <>
      <Button design="Emphasized">Emphasized</Button>
      <Button design="Default">Default</Button>
      <Button design="Attention">Attention</Button>
      <Button design="Positive">Positive</Button>
      <Button design="Negative">Negative</Button>
      <Button design="Transparent">Transparent</Button>
    </>
  );
}

export default App;
