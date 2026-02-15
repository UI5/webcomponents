import type Button from "./Button.js";
export default function ButtonTemplate(this: Button, injectedProps?: {
    ariaPressed?: boolean;
    ariaValueMax?: number;
    ariaValueMin?: number;
    ariaValueNow?: number;
    ariaValueText?: string;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
