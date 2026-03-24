import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

export const Example = () => {
  return <MessageStrip design="Information">Information Message</MessageStrip>;
}
