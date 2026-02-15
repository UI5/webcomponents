import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-time-picker-tsc-container{margin:0 auto;box-sizing:border-box;width:100%;padding:1rem;text-align:center}.ui5-time-picker-tsc-container:focus{outline:none}.ui5-time-picker-tsc-buttons{display:flex;justify-content:center;align-items:center;padding-bottom:1rem;width:100%}.ui5-time-picker-tsc-buttons .ui5-time-selection-separator{min-width:.5rem;padding:0 .125rem;text-align:center;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapContent_LabelColor)}.ui5-time-picker-tsc-clocks{display:block;text-align:center;width:100%;touch-action:none}
`;
//# sourceMappingURL=TimeSelectionClocks.css.js.map