import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{color:var(--sapList_TableGroupHeaderTextColor);background:var(--sapList_TableGroupHeaderBackground);font-weight:700;min-height:2rem}#group-cell{grid-column:1 / -1;padding-inline:var(--_ui5_first_table_cell_horizontal_padding)}:host([_render-dummy-cell]) #group-cell{grid-column:1 / -2}:host(:first-of-type)>[ui5-table-cell][aria-colspan]{border-bottom:var(--sapList_BorderWidth) solid var(--sapList_BorderColor);border-top:none}
`;
//# sourceMappingURL=TableGroupRow.css.js.map