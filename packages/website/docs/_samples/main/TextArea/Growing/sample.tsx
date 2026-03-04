import { createReactComponent } from "@ui5/webcomponents-base";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

function App() {

  return (
    <TextArea growing={true} growingMaxRows={5} placeholder="Enter new rows..." />
  );
}

export default App;
