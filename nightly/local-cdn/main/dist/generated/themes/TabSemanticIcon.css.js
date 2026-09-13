import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-tab-semantic-icon{display:var(--_ui5_tc_headerItemSemanticIcon_display);height:var(--_ui5_tc_headerItemSemanticIcon_size);width:var(--_ui5_tc_headerItemSemanticIcon_size);margin-inline-end:.5rem}.ui5-tab-semantic-icon--positive{color:var(--sapPositiveTextColor)}.ui5-tab-semantic-icon--negative{color:var(--sapNegativeTextColor)}.ui5-tab-semantic-icon--critical{color:var(--sapCriticalTextColor)}
`;
//# sourceMappingURL=TabSemanticIcon.css.js.map