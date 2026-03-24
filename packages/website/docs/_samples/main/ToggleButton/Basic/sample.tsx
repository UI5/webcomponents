import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const ToggleButton = createReactComponent(ToggleButtonClass);

export const Example = () => {
  return (
    <>
      <ToggleButton>Toggle</ToggleButton>
      <ToggleButton icon="edit">Edit</ToggleButton>
    </>
  );
}
