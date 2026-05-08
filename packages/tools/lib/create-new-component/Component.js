const Component = (componentName, tagName, library, packageName) => {
	return `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import ${componentName}Template from "./${componentName}Template.js";

// Styles
import ${componentName}Css from "./generated/themes/${componentName}.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>${tagName}</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "${packageName}/dist/${componentName}.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "${tagName}",
	renderer: jsxRenderer,
	styles: ${componentName}Css,
	template: ${componentName}Template,
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
@event("interact")
class ${componentName} extends UI5Element {
	eventDetails!: {
		"interact": void,
	};

	/**
	 * Defines the value of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	value?: string;

	/**
	 * Defines the text of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;
}

${componentName}.define();

export default ${componentName};
`;
};

export default Component;
