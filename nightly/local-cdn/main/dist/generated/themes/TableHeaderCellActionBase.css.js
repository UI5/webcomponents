import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{flex-shrink:0}:host([_popin]){margin-inline:.0625rem 0}[ui5-button]{min-width:1.625rem;width:1.625rem;height:1.625rem}[ui5-button]::part(icon){width:1rem;height:1rem}:host([_popin]) [ui5-button]::part(icon){width:.75rem;height:.75rem}
`;
//# sourceMappingURL=TableHeaderCellActionBase.css.js.map