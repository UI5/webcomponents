import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const SplitButton = createReactComponent(SplitButtonClass);

export const Example = () => {
  return (
    <>
      <SplitButton design="Emphasized">Emphasized</SplitButton>
      <SplitButton design="Default">Default</SplitButton>
      <SplitButton design="Attention">Attention</SplitButton>
      <SplitButton design="Positive">Positive</SplitButton>
      <SplitButton design="Negative">Negative</SplitButton>
      <SplitButton design="Transparent">Transparent</SplitButton>
    </>
  );
}
