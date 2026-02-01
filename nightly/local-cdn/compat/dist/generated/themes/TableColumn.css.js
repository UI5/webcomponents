import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "c" + "o" + "m" + "p" + "a" + "t", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:contents}th{background:var(--sapList_HeaderBackground);width:inherit;font-weight:var(--ui5_table_header_row_font_weight);font-size:var(--sapFontMediumSize);font-family:var(--ui5_table_header_row_font_family);padding:.5rem;box-sizing:border-box;text-align:start;vertical-align:middle}:host([first]) th{padding-inline-start:1rem}th ::slotted([ui5-label]){font-weight:var(--ui5_table_header_row_font_weight);font-size:var(--sapFontMediumSize);font-family:var(--ui5_table_header_row_font_family)}
`;
//# sourceMappingURL=TableColumn.css.js.map