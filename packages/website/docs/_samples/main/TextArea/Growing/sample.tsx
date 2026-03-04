import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createComponent(TextAreaClass);

function App() {

  return (
    <TextArea growing={true} growingMaxRows={5} placeholder="Enter new rows..." />
  );
}

export default App;
