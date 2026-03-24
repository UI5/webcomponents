import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const Token = createReactComponent(TokenClass);

export const Example = () => {
  return (
    <>
      <Token text="green" />
      <Token text="healthy" selected={true} />
      <Token text="vegan" />
      <Token text="low fat" selected={true} />
    </>
  );
}
