import { createReactComponent } from "@ui5/webcomponents-base";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <MessageStrip design="Information">Information Message</MessageStrip>
  );
}

export default App;
