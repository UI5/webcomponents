import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const SplitButton = createReactComponent(SplitButtonClass);

export const Example = () => {
  return <SplitButton>Split Button</SplitButton>;
}
