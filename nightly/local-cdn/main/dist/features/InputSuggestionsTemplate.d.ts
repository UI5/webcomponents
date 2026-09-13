import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import Input from "../Input.js";
export default function InputSuggestionsTemplate(this: Input, hooks?: {
    suggestionsList?: (this: Input) => JsxTemplateResult;
    mobileHeader?: (this: Input) => JsxTemplateResult;
    valueStateMessage: (this: Input) => JsxTemplateResult;
    valueStateMessageInputIcon: (this: Input) => string;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
