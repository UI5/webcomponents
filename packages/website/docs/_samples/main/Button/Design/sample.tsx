import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Button = createComponent(ButtonClass);

function App() {

  return (
    <>
      <Button design="Emphasized">
            Emphasized
        </Button>
        <Button design="Default">
            Default
        </Button>
        <Button design="Attention">
            Attention
        </Button>
        <Button design="Positive">
            Positive
        </Button>
        <Button design="Negative">
            Negative
        </Button>
        <Button design="Transparent">
            Transparent
        </Button>
    </>
  );
}

export default App;
