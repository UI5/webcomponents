import customElement from "../../src/decorators/customElement.js";
import i18n from "../../src/decorators/i18n.js";
import type I18nBundle from "../../src/i18nBundle.js";
import I18nParent from "./I18nParent.js";

@customElement("i18n-child")
class I18nChild extends I18nParent {
	@i18n("custom-language")
	static i18nBundle: I18nBundle;
}

I18nChild.define();

export default I18nChild;
