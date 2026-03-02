import { createReactComponent } from "@ui5/webcomponents-base";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

function App() {

  const handleInput = () => {
    const value = textArea.value;
	const maxlength = textArea.maxlength;

	textArea.valueState = value.length > maxlength ? "Critical" : "None";
  };

  return (
    <TextArea maxLength={10} placeholder="Enter more than 10 characters" show-exceeded-text={true} />
  );
}

export default App;
