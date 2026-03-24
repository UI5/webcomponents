import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const MultiInput = createReactComponent(MultiInputClass);
const Token = createReactComponent(TokenClass);

export const Example = () => {
  const [tokens, setTokens] = useState([
    { text: "green", selected: false },
    { text: "healthy", selected: true },
    { text: "vegan", selected: false },
    { text: "low fat", selected: true },
  ]);

  const handleChange = (e: UI5CustomEvent<MultiInputClass, "change">) => {
    const inputValue = e.currentTarget.value;
    if (inputValue) {
      setTokens((prev) => [...prev, { text: inputValue, selected: false }]);
      e.currentTarget.value = "";
    }
  };

  const handleTokenDelete = (
    e: UI5CustomEvent<MultiInputClass, "token-delete">,
  ) => {
    const deletedTokens = e.detail?.tokens;
    if (deletedTokens) {
      const deletedTexts = deletedTokens.map((t) => t.text);
      setTokens((prev) => prev.filter((t) => !deletedTexts.includes(t.text)));
    }
  };

  return (
    <>
      <MultiInput
        id="multi-input"
        onChange={handleChange}
        onTokenDelete={handleTokenDelete}
      >
        {tokens.map((t, i) => (
          <Token
            key={`${t.text}-${i}`}
            text={t.text}
            selected={t.selected}
            slot="tokens"
          />
        ))}
      </MultiInput>
    </>
  );
}
