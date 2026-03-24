import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);

export const Example = () => {
  return <BusyIndicator active={true} />;
}
