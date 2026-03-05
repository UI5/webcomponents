import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";

const Button = createComponent(ButtonClass);

function App() {

  return (
    <>
      <Button icon="edit" design="Default" tooltip="Edit Button" />
        <Button icon="account" design="Transparent" tooltip="Account Button" />
    </>
  );
}

export default App;
