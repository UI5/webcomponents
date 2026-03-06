import { useState, useRef, useCallback } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import AIPromptInputClass from "@ui5/webcomponents-ai/dist/PromptInput.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const AIPromptInput = createComponent(AIPromptInputClass);
const SuggestionItem = createComponent(SuggestionItemClass);

const countries = [
  "Brazil",
  "Belgium",
  "Bangladesh",
  "Bulgaria",
  "Bahamas",
  "Barbados",
  "Belarus",
  "Benin",
  "Bhutan",
  "Bolivia",
];

function App() {
  const [valueState, setValueState] = useState("None");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInput = useCallback(
    (e: UI5CustomEvent<AIPromptInputClass, "input">) => {
      const inputValue = e.currentTarget.value;
      const maxLen = 10;

      setValueState(inputValue.length > maxLen ? "Negative" : "None");

      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setSuggestions(inputValue ? filtered : []);
    },
    [],
  );

  return (
    <>
      <div style={{ height: "320px" }}>
        <AIPromptInput
          id="prompt-input"
          showClearIcon={true}
          placeholder="Ask me anything..."
          label="User prompt:"
          maxlength={10}
          showExceededText={true}
          showSuggestions={true}
          valueState={valueState as "Negative" | "None"}
          onInput={handleInput}
        >
          {suggestions.map((country) => (
            <SuggestionItem key={country} text={country} />
          ))}
        </AIPromptInput>
      </div>
    </>
  );
}

export default App;
