import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import {{INIT_PACKAGE_VAR_CLASS_NAME}}Template from "./{{INIT_PACKAGE_VAR_CLASS_NAME}}Template.js";

// Styles
import {{INIT_PACKAGE_VAR_CLASS_NAME}}Css from "./generated/themes/{{INIT_PACKAGE_VAR_CLASS_NAME}}.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>{{INIT_PACKAGE_VAR_TAG}}</code> component is a demo component that displays some text.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "{{INIT_PACKAGE_VAR_TAG}}",
	renderer: jsxRenderer,
	styles: {{INIT_PACKAGE_VAR_CLASS_NAME}}Css,
	template: {{INIT_PACKAGE_VAR_CLASS_NAME}}Template,
})
class {{INIT_PACKAGE_VAR_CLASS_NAME}} extends UI5Element {
	@i18n("{{INIT_PACKAGE_VAR_NAME}}")
	static i18nBundle: I18nBundle;

	/**
	 * Defines the component count.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	count = 0;

	onClick() {
		this.count++;
	}

	get counterText() {
		return {{INIT_PACKAGE_VAR_CLASS_NAME}}.i18nBundle.getText(COUNT);
	}
}

{{INIT_PACKAGE_VAR_CLASS_NAME}}.define();

export default {{INIT_PACKAGE_VAR_CLASS_NAME}};
