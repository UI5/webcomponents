import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-user-settings-view-container{container-type:inline-size}.ui5-user-settings-view{padding:1rem}@container (width > 37.5rem){.ui5-user-settings-view{padding-inline:2rem}}.user-settings-appearance-view-list-header{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;font-size:var(--sapFontHeader4Size);font-family:var(--sapFontFamily);color:var(--sapGroup_TitleTextColor);height:3rem;line-height:3rem;padding:0 1rem;background-color:var(--sapGroup_TitleBackground);border-bottom:1px solid var(--sapGroup_TitleBorderColor)}
`;
//# sourceMappingURL=UserSettingsView.css.js.map