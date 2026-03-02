import { createReactComponent } from "@ui5/webcomponents-base";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const MultiInput = createReactComponent(MultiInputClass);
const Token = createReactComponent(TokenClass);

function App() {

  const handleTokenDelete = (e) => {
    const tokens = e.detail?.tokens;

	if (tokens) {
		tokens.forEach(token => token.remove());
  };

  return (
    <>
      <MultiInput id="multi-input">
            <Token slot="tokens" text="Argentina" />
            <Token slot="tokens" text="Mexico" />
            <Token slot="tokens" text="Philippines" />
            <Token slot="tokens" text="Sweden" />
            <Token slot="tokens" text="USA" />
        </MultiInput>
    </>
  );
}

export default App;
