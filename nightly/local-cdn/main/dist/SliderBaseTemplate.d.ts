import type { JsxTemplate } from "@ui5/webcomponents-base";
import type SliderBase from "./SliderBase.js";
export default function SliderBaseTemplate(this: SliderBase, hooks?: {
    handlesAriaText?: JsxTemplate;
    progressBar?: JsxTemplate;
    handles?: JsxTemplate;
}): import("@ui5/webcomponents-base").JSX.Element;
export declare function handlesAriaText(this: SliderBase): void;
export declare function progressBar(this: SliderBase): void;
export declare function handles(this: SliderBase): void;
