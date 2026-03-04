import { useState } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";

const Input = createReactComponent(InputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

const THRESHOLD = 3;

const countries = [
  "Argentina", "Albania", "Algeria", "Angola", "Austria", "Australia",
  "Bulgaria", "Belgium", "Brazil", "Canada", "Columbia", "Croatia",
  "Denmark", "England", "Finland", "France", "Germany", "Greece",
  "Hungary", "Ireland", "Italy", "Japan", "Kuwait", "Luxembourg",
  "Mexico", "Morocco", "Netherlands", "Norway", "Paraguay", "Philippines",
  "Portugal", "Romania", "Spain", "Sweden", "Switzerland", "Sri Lanka",
  "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland",
  "USA", "Ukraine", "Vietnam",
];

function App() {
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;

    if (value.length >= THRESHOLD) {
      const filtered = countries.filter(
        (item) => item.toUpperCase().indexOf(value.toUpperCase()) === 0
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Input
      id="input-threshold-3"
      placeholder="Start typing (threshold: 3 chars)"
      show-suggestions={true}
      onInput={handleInput}
    >
      {suggestions.map((item) => (
        <SuggestionItem key={item} text={item} />
      ))}
    </Input>
  );
}

export default App;
