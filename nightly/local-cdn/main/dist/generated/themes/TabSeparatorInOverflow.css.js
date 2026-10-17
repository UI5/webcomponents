import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `[ui5-li-custom].ui5-tc__separator{min-height:.25rem;border-bottom:.0625rem solid var(--sapGroup_TitleBorderColor);margin-inline-start:calc(var(--_ui5-tab-indentation-level) * .5rem);margin-inline-end:.5rem}[ui5-list]>[ui5-li-custom].ui5-tc__separator:first-child{min-height:.5rem}
`;
//# sourceMappingURL=TabSeparatorInOverflow.css.js.map