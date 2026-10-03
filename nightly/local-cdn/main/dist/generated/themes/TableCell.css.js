import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{border-top:var(--sapList_BorderWidth) solid var(--sapList_BorderColor)}:host([merged]),:host([data-border-merged]){--_ui5_table_cell_merged_border_color: var(--_ui5_table_cell_border_merged) transparent;border-top-color:var(--_ui5_table_cell_merged_border_color, var(--sapList_BorderColor))}:host([merged]) ::slotted(*){--_ui5_table_cell_merged_content_opacity: var(--_ui5_table_cell_content_merged) 0;opacity:var(--_ui5_table_cell_merged_content_opacity, 1);transition:opacity .3s ease}:host([_popin]){padding-inline-start:0;padding-inline-end:0;align-items:center;border-top:none}:host([_popin]) #popin-header{color:var(--sapContent_LabelColor)}#popin-colon{padding-inline-end:.5rem;white-space:pre}#popin-header{display:contents}
`;
//# sourceMappingURL=TableCell.css.js.map