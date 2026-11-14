import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import type Input from "./Input.js";
export default function InputPopoverTemplate(this: Input, hooks?: {
    suggestionsList?: (this: Input) => JsxTemplateResult;
    mobileHeader?: (this: Input) => JsxTemplateResult;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
