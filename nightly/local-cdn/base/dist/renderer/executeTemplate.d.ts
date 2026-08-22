import type UI5Element from "../UI5Element.js";
type TemplateFunction = () => object;
/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
declare const executeTemplate: (template: TemplateFunction, component: UI5Element) => object;
export default executeTemplate;
export type { TemplateFunction };
