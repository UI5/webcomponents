import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "c" + "o" + "m" + "p" + "a" + "t", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:table-cell;font-family:var(--sapFontFamily);font-size:.875rem;height:var(--ui5_table_row_height);box-sizing:border-box;color:var(--sapList_TextColor);word-break:break-word;vertical-align:middle}td{display:contents}:host([popined]){padding-left:0;padding-top:.25rem}:host([_popined-inline]){padding-top:0}::slotted([ui5-label]){color:inherit}
`;
//# sourceMappingURL=TableCell.css.js.map