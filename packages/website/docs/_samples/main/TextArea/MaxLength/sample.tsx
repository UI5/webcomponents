import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createComponent(TextAreaClass);

function App() {
  const [valueState, setValueState] = useState("None");

  const handleTextAreaInput = (e: any) => {
    const value = e.target.value;
    const maxlength = e.target.maxlength;
    setValueState(value.length > maxlength ? "Critical" : "None");
  };

  return (
    <TextArea maxLength={10} placeholder="Enter more than 10 characters" showExceededText={true} valueState={valueState} onInput={handleTextAreaInput} />
  );
}

export default App;
