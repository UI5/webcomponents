import { createReactComponent } from "@ui5/webcomponents-base";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const MultiInput = createReactComponent(MultiInputClass);
const Token = createReactComponent(TokenClass);

function App() {

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue) {
		multiInput.appendChild(createTokenFromText(inputValue));
		multiInput.value = "";
  };

  const handleTokenDelete = (e) => {
    const tokens = e.detail?.tokens;

	if (tokens) {
		tokens.forEach(token => token.remove());
  };

  return (
    <>
      <MultiInput id="multi-input">
        <Token text="green" slot="tokens" />
        <Token text="healthy" selected={true} slot="tokens" />
        <Token text="vegan" slot="tokens" />
        <Token text="low fat" selected={true} slot="tokens" />
    </MultiInput>
    </>
  );
}

export default App;
