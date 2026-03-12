export default `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";

@customElement({
  tag: "my-element",
  renderer: jsxRenderer,
})
export class MyElement extends UI5Element {
  @property()
  name?: string;

  render() {
    return (
      <div>
          Hello, {this.name || "World"}!
      </div>
    )
  }

  static styles = \`div {
      padding: 1rem;
      color: #334eff;
  }\`;
}

MyElement.define();
`;
