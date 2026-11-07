/**
 * A decorator that converts a class member into a getter that
 * executes a querySelector on the element's shadow DOM.
 *
 * @param { string } selector DOM String containing selector to match
 * @returns { QueryDecorator }
 *
 * ```ts
 * class MyComponnet extends UI5Element {
 *   @query('.myComponentRoot')
 *   root?: HTMLElement;
 *
 *   render() {
 *     return html`
 *       <div class=".root">
 * 		  </div>
 *     `;
 *   }
 * }
 * ```
 */
const query = (selector) => {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            get() {
                return this.shadowRoot?.querySelector(selector);
            },
        });
    };
};
export default query;
//# sourceMappingURL=query.js.map