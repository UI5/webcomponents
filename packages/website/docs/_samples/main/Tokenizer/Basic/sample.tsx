import { createReactComponent } from "@ui5/webcomponents-base";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import TokenizerClass from "@ui5/webcomponents/dist/Tokenizer.js";

const Token = createReactComponent(TokenClass);
const Tokenizer = createReactComponent(TokenizerClass);

function App() {

  const handleUi5TokenDelete = (e) => {
    const tokens = e.detail?.tokens;

    if (tokens) {
        tokens.forEach(token => token.remove());
  };

  return (
    <>
      <Tokenizer style={{ width: "250px" }} id="delete-tokenizer">
        <Token text="Andora" />
        <Token text="Bulgaria" />
        <Token text="Canada" />
        <Token text="Denmark" />
        <Token text="Estonia" />
    </Tokenizer>
    </>
  );
}

export default App;
