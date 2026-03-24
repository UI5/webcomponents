import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/da-2.js";

const Icon = createReactComponent(IconClass);

export const Example = () => {
  return (
    <>
      <Icon name="da-2" design="Default" />
      <Icon name="da-2" design="Contrast" />
      <Icon name="da-2" design="Critical" />
      <Icon name="da-2" design="Negative" />
      <Icon name="da-2" design="Positive" />
      <Icon name="da-2" design="Information" />
      <Icon name="da-2" design="Neutral" />
      <Icon name="da-2" design="NonInteractive" />
    </>
  );
}
