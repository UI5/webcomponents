export default `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";

@customElement({
  tag: "my-counter",
  renderer: jsxRender,
})
export class MyCounter extends UI5Element {
  @property({ type: Number })
  count = 0;

  render() {
    return (
      <div>
        <slot></slot>
        <button onClick={() => {this.count += 2}}>
          Count {this.count}
        </button>
      </div>
    );
  }

  static styles = \`button {
    color: #334eff;
    border-color: #334eff;
    border-radius: 0.5rem;
    padding: 1rem;
  }\`;
}

MyCounter.define();
`;
