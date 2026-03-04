import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <>
      <MessageStrip design="Negative">
            <img src="/images/loading.gif" width="16" height="16" slot="icon" />
            Custom MessageStrip with animated gif
        </MessageStrip>
    </>
  );
}

export default App;
