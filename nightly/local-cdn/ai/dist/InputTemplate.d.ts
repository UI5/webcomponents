import type Input from "./Input.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base";
type TemplateHook = () => JsxTemplateResult;
export default function InputTemplate(this: Input, hooks?: {
    preContent: TemplateHook;
    postContent: TemplateHook;
}): import("@ui5/webcomponents-base").JSX.Element;
export {};
