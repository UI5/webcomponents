import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-time-selection-numeric-input{width:2.875rem;text-align:center}.ui5-time-selection-inputs{min-width:12.5rem;display:flex;justify-content:center;align-items:center}.ui5-time-selection-separator{display:inline-block;min-width:.5rem;padding:0 .125rem;text-align:center;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapTextColor)}.ui5-hidden-text{display:none}
`;
//# sourceMappingURL=TimeSelectionInputs.css.js.map