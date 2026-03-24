import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents-icons/dist/palette.js";

const Icon = createReactComponent(IconClass);
const MessageStrip = createReactComponent(MessageStripClass);

export const Example = () => {
  return (
    <>
      <MessageStrip design="ColorSet2">
        MessageStrip with default custom color without icon
      </MessageStrip>
      <br />
      <br />
      <MessageStrip design="ColorSet1" colorScheme="8">
        <Icon name="palette" slot="icon" />
        MessageStrip with custom icon and color set
      </MessageStrip>
    </>
  );
}
