import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const Token = createComponent(TokenClass);

function App() {

  return (
    <>
      <Token text="green" />
    <Token text="healthy" selected={true} />
    <Token text="vegan" />
    <Token text="low fat" selected={true} />
    </>
  );
}

export default App;
