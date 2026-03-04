import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";

const Button = createComponent(ButtonClass);

function App() {

  return (
    <>
      <Button icon="sap-icon://edit">Edit</Button>
        <Button icon="sap-icon://account">Account</Button>
    </>
  );
}

export default App;
