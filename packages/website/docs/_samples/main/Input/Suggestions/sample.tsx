import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useCallback } from "react";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const Input = createReactComponent(InputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

const ui5_database_entries = [
  "Argentina",
  "Albania",
  "Algeria",
  "Angola",
  "Austria",
  "Australia",
  "Bulgaria",
  "Canada",
  "Columbia",
  "Croatia",
  "Denmark",
  "England",
  "Finland",
  "France",
  "Germany",
  "Hungary",
  "Ireland",
  "Italy",
  "Kuwait",
  "Luxembourg",
  "Mexico",
  "Morocco",
  "Norway",
  "Paraguay",
  "Philippines",
  "Portugal",
  "Spain",
  "Sweden",
  "Sri Lanka",
  "Senegal",
  "Thailand",
  "The United Kingdom of Great Britain and Northern Ireland",
  "USA",
];

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputInput = useCallback(
    (e: UI5CustomEvent<InputClass, "input">) => {
      const value = e.currentTarget.value;
      if (value) {
        const filtered = ui5_database_entries.filter((item) => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    },
    [],
  );

  return (
    <Input
      id="input"
      showSuggestions={true}
      placeholder="Type 'a'"
      onInput={handleInputInput}
    >
      {suggestions.map((item) => (
        <SuggestionItem key={item} text={item} />
      ))}
    </Input>
  );
}

export default App;
