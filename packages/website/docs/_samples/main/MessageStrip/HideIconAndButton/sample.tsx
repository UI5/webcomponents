import { createReactComponent } from "@ui5/webcomponents-base";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <>
      <MessageStrip hideCloseButton={true}>Message</MessageStrip><br /><br />
        <MessageStrip hideIcon={true} hideCloseButton={true}>Message</MessageStrip>
    </>
  );
}

export default App;
