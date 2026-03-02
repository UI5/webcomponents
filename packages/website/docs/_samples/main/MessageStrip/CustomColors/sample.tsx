import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";

const Icon = createReactComponent(IconClass);
const MessageStrip = createReactComponent(MessageStripClass);

function App() {

  return (
    <>
      <MessageStrip design="ColorSet2">MessageStrip with default custom color without icon</MessageStrip><br /><br />
        <MessageStrip design="ColorSet1" color-scheme={8}><Icon name="palette" slot="icon" />MessageStrip with custom icon and color set</MessageStrip>
    </>
  );
}

export default App;
