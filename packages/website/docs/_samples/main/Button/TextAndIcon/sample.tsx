import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";

const Button = createReactComponent(ButtonClass);

export const Example = () => {
  return (
    <>
      <Button icon="edit">Edit</Button>
      <Button icon="account">Account</Button>
    </>
  );
}
