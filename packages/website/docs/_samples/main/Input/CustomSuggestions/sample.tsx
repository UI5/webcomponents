import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemCustomClass from "@ui5/webcomponents/dist/SuggestionItemCustom.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents-icons/dist/globe.js";

const Input = createReactComponent(InputClass);
const SuggestionItemCustom = createReactComponent(SuggestionItemCustomClass);
const Icon = createReactComponent(IconClass);

const countries = [
  "Albania",
  "Andorra",
  "Austria",
  "Belarus",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Germany",
  "Denmark",
];

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSelectionChange = (e: UI5CustomEvent<InputClass, "selection-change">) => {
    const text = (e.detail as any).item?.text;
    announce(text + " EU", "Polite");
  };

  const handleInput = (e: UI5CustomEvent<InputClass, "input">) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    if (value) {
      setSuggestions(
        countries.filter((c) =>
          c.toLowerCase().startsWith(value.toLowerCase()),
        ),
      );
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
      <Input
        placeholder="Type something ..."
        showSuggestions={true}
        onInput={handleInput}
        onSelectionChange={handleSelectionChange}
      >
        {suggestions.map((country) => (
          <SuggestionItemCustom key={country} text={country}>
            <div className="item-content">
              <Icon name="globe" aria-hidden="true" />
              <div className="item-titles">
                <span>{country}</span>
                <small>EU</small>
              </div>
              <span className="green">
                <b>EU</b>
              </span>
            </div>
          </SuggestionItemCustom>
        ))}
      </Input>
    </>
  );
}

export default App;
