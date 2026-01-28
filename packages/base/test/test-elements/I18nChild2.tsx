import customElement from "../../src/decorators/customElement.js";
import i18n from "../../src/decorators/i18n.js";
import type I18nBundle from "../../src/i18nBundle.js";
import I18nParent from "./I18nParent.js";

@customElement("i18n-child2")
class I18nChild2 extends I18nParent {
	@i18n("another-custom-language")
	static i18nBundle: I18nBundle;

	get i18nText() {
		return I18nChild2.i18nBundle.getText("SOME_KEY")
	}
}

I18nChild2.define();

export default I18nChild2;
