import { useState } from "react";
import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import TokenizerClass from "@ui5/webcomponents/dist/Tokenizer.js";

const Token = createReactComponent(TokenClass);
const Tokenizer = createReactComponent(TokenizerClass);

function App() {
  const [tokens, setTokens] = useState([
    "Andora", "Bulgaria", "Canada", "Denmark", "Estonia",
    "Finland", "Germany", "Hungary", "Ireland", "Japan", "Korea", "Latvia",
  ]);

  const handleTokenDelete = (e) => {
    const deletedTokens = e.detail?.tokens;
    if (deletedTokens) {
      const deletedTexts = deletedTokens.map((t) => t.text);
      setTokens((prev) => prev.filter((t) => !deletedTexts.includes(t)));
    }
  };

  return (
    <>
      <Tokenizer style={{ width: "320px" }} id="clear-all" show-clear-all={true} multi-line={true} onTokenDelete={handleTokenDelete}>
        {tokens.map((t) => (
          <Token key={t} text={t} />
        ))}
      </Tokenizer>
    </>
  );
}

export default App;
