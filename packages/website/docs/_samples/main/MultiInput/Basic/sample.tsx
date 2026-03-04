import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const MultiInput = createComponent(MultiInputClass);
const Token = createComponent(TokenClass);

function App() {
  const [tokens, setTokens] = useState(["Argentina", "Mexico", "Philippines", "Sweden", "USA"]);

  const handleTokenDelete = (e) => {
    const deletedTokens = e.detail?.tokens;
    if (deletedTokens) {
      const deletedTexts = deletedTokens.map((t) => t.text);
      setTokens((prev) => prev.filter((t) => !deletedTexts.includes(t)));
    }
  };

  return (
    <>
      <MultiInput id="multi-input" onTokenDelete={handleTokenDelete}>
        {tokens.map((t) => (
          <Token key={t} slot="tokens" text={t} />
        ))}
      </MultiInput>
    </>
  );
}

export default App;
