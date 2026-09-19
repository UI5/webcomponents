import type Input from "./Input.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
type TemplateHook = () => JsxTemplateResult;
export default function InputTemplate(this: Input, hooks?: {
    preContent: TemplateHook;
    postContent: TemplateHook;
    suggestionsList?: TemplateHook;
    mobileHeader?: TemplateHook;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
export {};
