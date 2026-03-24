import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const StepInput = createReactComponent(StepInputClass);

export const Example = () => {
  return (
    <StepInput value={5} min={0} max={10} step={0.5} valuePrecision={1} />
  );
}
