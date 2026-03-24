import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";

const ProgressIndicator = createReactComponent(ProgressIndicatorClass);

export const Example = () => {
  return <ProgressIndicator value={25} />;
}
