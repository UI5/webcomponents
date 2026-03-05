import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createComponent(MessageStripClass);

function App() {
  return (
    <>
      <MessageStrip hideCloseButton={true}>Message</MessageStrip>
      <br />
      <br />
      <MessageStrip hideIcon={true} hideCloseButton={true}>
        Message
      </MessageStrip>
    </>
  );
}

export default App;
