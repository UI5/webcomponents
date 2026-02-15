import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{background:var(--sapList_HeaderBackground);border-top:var(--sapList_BorderWidth) solid var(--sapList_BorderColor);border-bottom:var(--sapList_BorderWidth) solid var(--sapList_HeaderBorderColor);grid-template-rows:auto 0px}:host([hidden]){display:none}:host([sticky]){position:sticky;top:var(--ui5_grid_sticky_top, 0);z-index:3}#popin-cell{padding:0;width:0;height:0}#selection-cell [ui5-icon]{width:var(--_ui5_checkbox_inner_width_height);height:var(--_ui5_checkbox_inner_width_height)}#popin-cell-content,#actions-cell-content{position:absolute;clip:rect(0,0,0,0)}
`;
//# sourceMappingURL=TableHeaderRow.css.js.map