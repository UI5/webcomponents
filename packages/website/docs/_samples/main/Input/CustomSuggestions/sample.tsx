import { useState } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemCustomClass from "@ui5/webcomponents/dist/SuggestionItemCustom.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents-icons/dist/globe.js";

const Input = createReactComponent(InputClass);
const SuggestionItemCustom = createReactComponent(SuggestionItemCustomClass);
const Icon = createReactComponent(IconClass);

const countries = [
  "Albania", "Andorra", "Austria", "Belarus",
  "Belgium", "Bulgaria", "Croatia", "Germany", "Denmark",
];

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setSuggestions(countries.filter(c => c.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <style>{`
        .item-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }
        .green {
            color: green;
        }
        .item-titles {
            display: flex;
            flex-direction: column;
        }
      `}</style>
      <Input placeholder="Type something ..." showSuggestions={true} onInput={handleInput}>
        {suggestions.map((country) => (
          <SuggestionItemCustom key={country} text={country}>
            <div className="item-content">
              <Icon name="globe" />
              <div className="item-titles">
                <span>{country}</span>
                <small>EU</small>
              </div>
              <span className="green"><b>EU</b></span>
            </div>
          </SuggestionItemCustom>
        ))}
      </Input>
    </>
  );
}

export default App;
