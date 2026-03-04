import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const Button = createReactComponent(ButtonClass);

function App() {

  return (
    <>
      <Button>Press</Button>
        <Button icon="sap-icon://edit">Edit</Button>
        <Button disabled={true}>Merge</Button>
    </>
  );
}

export default App;
