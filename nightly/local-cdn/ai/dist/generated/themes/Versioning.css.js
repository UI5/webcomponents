import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "a" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:inline-flex;align-items:center}#versioning-history{display:flex;align-items:center;gap:0}.version-step-counter{margin:0 .25rem;display:flex;align-items:center;color:var(--sapContent_LabelColor);font-size:var(--sapFontSmallSize);line-height:1}
`;
//# sourceMappingURL=Versioning.css.js.map