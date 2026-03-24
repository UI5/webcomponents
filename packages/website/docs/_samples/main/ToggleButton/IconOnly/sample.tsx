import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";

const ToggleButton = createReactComponent(ToggleButtonClass);

export const Example = () => {
  return (
    <>
      <ToggleButton icon="edit" design="Default" tooltip="Edit Button" />
      <ToggleButton
        icon="account"
        design="Transparent"
        tooltip="Account Button"
      />
    </>
  );
}
