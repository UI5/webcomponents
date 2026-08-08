import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `:host{font-family:var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-product-switch-root{display:flex;flex-wrap:wrap;justify-content:inherit;align-items:inherit;width:752px;padding:1.25rem .75rem}:host([desktop-columns="3"]) .ui5-product-switch-root{width:564px}@media only screen and (max-width: 900px){.ui5-product-switch-root{width:564px}}@media only screen and (max-width: 600px){.ui5-product-switch-root,:host([desktop-columns="3"]) .ui5-product-switch-root{flex-direction:column;padding:0;width:100%}}
`;
//# sourceMappingURL=ProductSwitch.css.js.map