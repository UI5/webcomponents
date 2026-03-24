import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";

const RadioButton = createReactComponent(RadioButtonClass);

export const Example = () => {
  return (
    <>
      <RadioButton name="myGroup" text="Option A" />
      <RadioButton checked={true} name="myGroup" text="Option B" />
      <RadioButton name="myGroup" text="Option C" />
    </>
  );
}
