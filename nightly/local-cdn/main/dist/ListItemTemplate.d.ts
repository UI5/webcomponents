import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type ListItem from "./ListItem.js";
export type ListItemHooks = {
    listItemPreContent: JsxTemplate;
    listItemContent: JsxTemplate;
    imageBegin: JsxTemplate;
    iconBegin: JsxTemplate;
    iconEnd: JsxTemplate;
    selectionElement: JsxTemplate;
};
export default function ListItemTemplate(this: ListItem, hooks?: Partial<ListItemHooks>): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
