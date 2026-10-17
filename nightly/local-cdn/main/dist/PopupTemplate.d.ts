import type { JsxTemplate } from "@ui5/webcomponents-base";
import type Popup from "./Popup.js";
export default function PopupTemplate(this: Popup, hooks?: {
    beforeContent?: JsxTemplate;
    afterContent?: JsxTemplate;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
export declare function beforeContent(this: Popup): void;
export declare function afterContent(this: Popup): void;
