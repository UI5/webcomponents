import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";

const Switch = createReactComponent(SwitchClass);

export const Example = () => {
  return (
    <>
      <Switch />
      <Switch checked={true} />
      <Switch disabled={true} />
      <Switch disabled={true} checked={true} />
    </>
  );
}
