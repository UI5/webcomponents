import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host([ui5-mcb-item]){height:auto;min-height:var(--_ui5_list_item_base_height)}:host([ui5-mcb-item]) .ui5-li-root{padding-inline-start:0;min-height:var(--_ui5_list_item_base_height)}:host([ui5-mcb-item]) .ui5-li-content{padding-bottom:.5rem;padding-top:.5rem;box-sizing:border-box}:host([ui5-mcb-item]) [ui5-checkbox]{overflow:visible}
`;
//# sourceMappingURL=MultiComboBoxItem.css.js.map