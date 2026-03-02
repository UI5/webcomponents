import { createReactComponent } from "@ui5/webcomponents-base";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <>
      <MessageStrip hide-close-button={true}>Message</MessageStrip><br /><br />
        <MessageStrip hide-icon={true} hide-close-button={true}>Message</MessageStrip>
    </>
  );
}

export default App;
