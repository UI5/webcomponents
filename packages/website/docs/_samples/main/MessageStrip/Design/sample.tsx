import { createReactComponent } from "@ui5/webcomponents-base";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <>
      <MessageStrip design="Information">Information MessageStrip</MessageStrip><br /><br />
        <MessageStrip design="Negative">Negative MessageStrip</MessageStrip><br /><br />
        <MessageStrip design="Critical">Critical MessageStrip</MessageStrip><br /><br />
        <MessageStrip design="Positive">Positive MessageStrip</MessageStrip>
    </>
  );
}

export default App;
