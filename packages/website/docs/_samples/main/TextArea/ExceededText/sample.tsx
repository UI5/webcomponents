import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

function App() {
  const [valueState, setValueState] = useState<`${ValueState}`>("None");

  // App-controlled threshold
  const handleTextAreaInput = (e: UI5CustomEvent<TextAreaClass, "input">) => {
    const value = e.currentTarget.value;
    const maxlength = e.currentTarget.maxlength;
    const percentage = (value.length / maxlength) * 100;

    if (percentage >= 75) {
      setValueState("Critical");
    } else {
      setValueState("None");
    }
  };

  return (
    <TextArea
      maxlength={100}
      placeholder="Focus to see character counter"
      showExceededTextFocus={true}
      valueState={valueState}
      onInput={handleTextAreaInput}
    />
  );
}

export default App;
