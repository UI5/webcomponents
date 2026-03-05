import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import TokenizerClass from "@ui5/webcomponents/dist/Tokenizer.js";

const Token = createComponent(TokenClass);
const Tokenizer = createComponent(TokenizerClass);

function App() {
  const [tokens, setTokens] = useState([
    "Andora",
    "Bulgaria",
    "Canada",
    "Denmark",
    "Estonia",
  ]);

  const handleTokenDelete = (
    e: UI5CustomEvent<TokenizerClass, "token-delete">,
  ) => {
    const deletedTokens = e.detail?.tokens;
    if (deletedTokens) {
      const deletedTexts = deletedTokens.map((t) => t.text);
      setTokens((prev) => prev.filter((t) => !deletedTexts.includes(t)));
    }
  };

  return (
    <>
      <Tokenizer
        style={{ width: "250px" }}
        id="delete-tokenizer"
        onTokenDelete={handleTokenDelete}
      >
        {tokens.map((t) => (
          <Token key={t} text={t} />
        ))}
      </Tokenizer>
    </>
  );
}

export default App;
