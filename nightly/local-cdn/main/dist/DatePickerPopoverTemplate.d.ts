import type DatePicker from "./DatePicker.js";
type TemplateHook = () => void;
export default function DatePickerPopoverTemplate(this: DatePicker, hooks?: {
    header?: TemplateHook;
    content?: TemplateHook;
    footer?: TemplateHook;
    initialFocus?: string;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
export {};
