import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createComponent(TextAreaClass);

function App() {
  return (
    <>
      <TextArea disabled={true} />
      <TextArea readonly={true} />
      <TextArea valueState="Positive" placeholder="Positive" />
      <TextArea valueState="Information" placeholder="Information" />
      <TextArea valueState="Critical" placeholder="Critical" />
      <TextArea valueState="Negative" placeholder="Negative" />
      <TextArea valueState="Negative" placeholder="Custom value-state message">
        <div slot="valueStateMessage">Please provide valid value</div>
      </TextArea>
    </>
  );
}

export default App;
