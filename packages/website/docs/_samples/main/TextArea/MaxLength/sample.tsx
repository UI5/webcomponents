import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createComponent(TextAreaClass);

function App() {
  const [valueState, setValueState] = useState("None");

  const handleTextAreaInput = (e: UI5CustomEvent<TextAreaClass, "input">) => {
    const value = e.currentTarget.value;
    const maxlength = e.currentTarget.maxlength;
    setValueState(value.length > maxlength ? "Critical" : "None");
  };

  return (
    <TextArea
      maxlength={10}
      placeholder="Enter more than 10 characters"
      showExceededText={true}
      valueState={valueState as "None" | "Critical"}
      onInput={handleTextAreaInput}
    />
  );
}

export default App;
