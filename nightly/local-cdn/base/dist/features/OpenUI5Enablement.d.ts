import type { TemplateResult } from "lit-html";
import type UI5Element from "../UI5Element.js";
import type OpenUI5Element from "./OpenUI5Element.js";
declare class OpenUI5Enablement {
    static wrapTemplateResultInBusyMarkup(html: (strings: TemplateStringsArray, ...values: Array<unknown>) => TemplateResult, host: OpenUI5Element, templateResult: TemplateResult): TemplateResult;
    static enrichBusyIndicatorSettings(klass: typeof UI5Element): void;
    static enrichBusyIndicatorMetadata(klass: typeof UI5Element): void;
    static enrichBusyIndicatorMethods(UI5ElementPrototype: typeof OpenUI5Element.prototype): void;
    static getBusyIndicatorStyles(): string;
}
export default OpenUI5Enablement;
