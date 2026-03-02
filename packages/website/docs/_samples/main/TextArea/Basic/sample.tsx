import { createReactComponent } from "@ui5/webcomponents-base";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

function App() {

  return (
    <TextArea placeholder="Type message..." />
  );
}

export default App;
