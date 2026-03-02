import { createReactComponent } from "@ui5/webcomponents-base";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

function App() {

  return (
    <>
      <TextArea disabled={true} />
    <TextArea readonly={true} />
    <TextArea value-state="Positive" placeholder="Positive" />
    <TextArea value-state="Information" placeholder="Information" />
    <TextArea value-state="Critical" placeholder="Critical" />
    <TextArea value-state="Negative" placeholder="Negative" />
    <TextArea value-state="Negative" placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
    </TextArea>
    </>
  );
}

export default App;
