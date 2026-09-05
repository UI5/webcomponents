import type ListItemBase from "./ListItemBase.js";
import type { AriaRole, JsxTemplate } from "@ui5/webcomponents-base/";
export default function ListItemBaseTemplate(this: ListItemBase, hooks?: {
    listItemContent: JsxTemplate;
}, injectedProps?: {
    role?: AriaRole;
    title?: string;
    ariaSetsize?: number;
    ariaPosinset?: number;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
