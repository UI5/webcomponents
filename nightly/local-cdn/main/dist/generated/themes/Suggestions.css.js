import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme);
export default `.ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(header),.ui5-suggestions-popover::part(content){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.input-root-phone.native-input-wrapper{display:contents}.input-root-phone.native-input-wrapper:before{display:none}.native-input-wrapper .ui5-input-inner-phone{margin:0}
`;
//# sourceMappingURL=Suggestions.css.js.map