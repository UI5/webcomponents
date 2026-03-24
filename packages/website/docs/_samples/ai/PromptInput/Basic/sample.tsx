import { useState, useRef, useCallback } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import AIPromptInputClass from "@ui5/webcomponents-ai/dist/PromptInput.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const AIPromptInput = createReactComponent(AIPromptInputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

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

export const Example = () => {
  const [valueState, setValueState] = useState<`${ValueState}`>("None");
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
