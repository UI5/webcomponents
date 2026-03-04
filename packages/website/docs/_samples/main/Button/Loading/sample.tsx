import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/employee.js";

const Button = createReactComponent(ButtonClass);

function App() {

  return (
    <>
      <div>
            <br />
            <Button icon="sap-icon://edit" tooltip="Accept terms & conditions" loading={true} />
            <Button loading={true}>Loading</Button>
            <Button icon="sap-icon://employee" loading={true}>Loading</Button>
            <Button design="Transparent" loading={true}>Loading</Button>
            <Button icon="sap-icon://employee" design="Transparent" loading={true}>Loading</Button>
            <Button design="Emphasized" loading={true}>Loading</Button>
            <Button icon="sap-icon://employee" design="Emphasized" loading={true}>Loading</Button>
            <Button design="Positive" loading={true}>Loading</Button>
            <Button icon="sap-icon://employee" design="Positive" loading={true}>Loading</Button>
            <Button design="Negative" loading={true}>Loading</Button>
            <Button icon="sap-icon://employee" design="Negative" loading={true}>Loading</Button>
        </div>
    </>
  );
}

export default App;
