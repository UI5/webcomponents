import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `:host{height:2.5rem;min-height:2.5rem;border:none}.ui5-li-root{min-height:2.5rem}:host(:last-of-type){margin-bottom:0}:host(:first-of-type){margin-top:0}:host([show-selection]){height:3.25rem;min-height:3.25rem}:host([show-selection]) .ui5-li-root{min-height:3.25rem;padding-block:.5rem}.ui5-user-menu-item-text-wrapper{display:flex;flex-direction:column;gap:.25rem;overflow:hidden;flex:1;min-width:0}.ui5-user-menu-item-selection-text{font-family:var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;color:var(--sapContent_LabelColor);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`;
//# sourceMappingURL=UserMenuItem.css.js.map