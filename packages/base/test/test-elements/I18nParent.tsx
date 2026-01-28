import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import i18n from "../../src/decorators/i18n.js";
import type I18nBundle from "../../src/i18nBundle.js";

@customElement("i18n-parent")
class I18nParent extends UI5Element {
	@i18n("custom-language")
	static i18nBundle: I18nBundle;

	get i18nText() {
		return I18nParent.i18nBundle.getText("PLEASE_WAIT")
	}
}

I18nParent.define();

export default I18nParent;
