import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:inline-block;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapTextColor)}:host([hidden]){display:none}.ui5-exp-text-text{display:inline}.ui5-exp-text-text,.ui5-exp-text-toggle{font-family:inherit;font-size:inherit}.ui5-exp-text-text,.ui5-exp-text-ellipsis{color:inherit}.ui5-exp-text-popover::part(content){padding-inline:1rem}.ui5-exp-text-footer{width:100%;display:flex;align-items:center;justify-content:flex-end}
`;
//# sourceMappingURL=ExpandableText.css.js.map