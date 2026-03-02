import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Button = createReactComponent(ButtonClass);

function App() {

  return (
    <>
      <Button icon="sap-icon://edit" design="Default" tooltip="Edit Button" />
        <Button icon="sap-icon://account" design="Transparent" tooltip="Account Button" />
    </>
  );
}

export default App;
