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
      <Tokenizer style={{ width: "320px" }} id="clear-all" show-clear-all={true} multi-line={true}>
        <Token text="Andora" />
        <Token text="Bulgaria" />
        <Token text="Canada" />
        <Token text="Denmark" />
        <Token text="Estonia" />
        <Token text="Finland" />
        <Token text="Germany" />
        <Token text="Hungary" />
        <Token text="Ireland" />
        <Token text="Japan" />
        <Token text="Korea" />
        <Token text="Latvia" />
    </Tokenizer>
    </>
  );
}

export default App;
