/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template, component) => {
    return template.call(component);
};
export default executeTemplate;
//# sourceMappingURL=executeTemplate.js.map