import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type MenuItem from "./MenuItem.js";
import type { ListItemHooks } from "./ListItemTemplate.js";
export type MenuItemHooks = ListItemHooks & {
    menuItemTextContent: JsxTemplate;
};
export default function MenuItemTemplate(this: MenuItem, hooks?: Partial<MenuItemHooks>): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
