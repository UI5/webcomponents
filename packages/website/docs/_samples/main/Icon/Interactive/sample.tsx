import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/home.js";

const Icon = createReactComponent(IconClass);

export const Example = () => {
  return <Icon name="home" mode="Interactive" />;
}
