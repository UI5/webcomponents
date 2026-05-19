import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";

const MultiInput = createReactComponent(MultiInputClass);
const Token = createReactComponent(TokenClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

const suggestions = [
  "Argentina",
  "Bulgaria",
  "England",
  "Finland",
  "Germany",
  "Hungary",
  "Italy",
  "Luxembourg",
  "Mexico",
  "Philippines",
  "Sweden",
  "USA",
];

function App() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [valueState, setValueState] = useState<`${ValueState}`>("None");
  const multiInputRef = useRef(null);

  const handleTokenDelete = (
    e: UI5CustomEvent<MultiInputClass, "token-delete">,
  ) => {
    const deletedTokens = e.detail?.tokens;
    if (deletedTokens) {
      const deletedTexts = deletedTokens.map((t) => t.text);
      setTokens((prev) => prev.filter((t) => !deletedTexts.includes(t)));
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData(
      "text/plain",
    );
    if (!pastedText) {
      return;
    }
    const separatedTexts = pastedText
      .split(/\r\n|\r|\n|\t/g)
      .filter((t) => !!t);
    if (separatedTexts.length === 1) {
      if (multiInputRef.current) {
        multiInputRef.current!.value += separatedTexts[0];
      }
      return;
    }
    setTokens((prev) => [...prev, ...separatedTexts.filter(Boolean)]);
  };

  const handleChange = (e: UI5CustomEvent<MultiInputClass, "change">) => {
    if (!e.currentTarget.value) {
      return;
    }
    const isDuplicate = tokens.some((t) => t === e.currentTarget.value);
    if (isDuplicate) {
      setValueState("Negative");
      setTimeout(() => {
        setValueState("None");
      }, 2000);
      return;
    }
    setTokens((prev) => [...prev, e.currentTarget.value]);
    e.currentTarget.value = "";
  };

  return (
    <>
      <MultiInput
        ref={multiInputRef}
        id="multi-input"
        placeholder="Start typing country name"
        showSuggestions={true}
        valueState={valueState}
        onTokenDelete={handleTokenDelete}
        onPaste={handlePaste}
        onChange={handleChange}
      >
        {tokens.map((t, i) => (
          <Token key={`${t}-${i}`} slot="tokens" text={t} />
        ))}
        {suggestions.map((s) => (
          <SuggestionItem key={s} text={s} />
        ))}
        <div slot="valueStateMessage">Token is already in the list</div>
      </MultiInput>
    </>
  );
}

export default App;
