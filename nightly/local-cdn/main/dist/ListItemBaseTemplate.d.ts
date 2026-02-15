import type ListItemBase from "./ListItemBase.js";
import type { AriaRole } from "@ui5/webcomponents-base/";
export default function ListItemBaseTemplate(this: ListItemBase, hooks?: {
    listItemContent: () => void;
}, injectedProps?: {
    role?: AriaRole;
    title?: string;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
