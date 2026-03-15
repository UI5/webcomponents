import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `.list-item{display:flex;align-items:center;justify-content:space-between;padding:.625rem 0;width:100%}.item-left{display:flex;align-items:center;gap:.75rem;flex:1}.avatar-cozy{display:var(--_ui5_user_settings_avatar_cozy_display)}.avatar-compact{display:var(--_ui5_user_settings_avatar_compact_display)}.item-texts{display:flex;flex-direction:column}.item-title{font-weight:600;font-size:var(--_ui5_list_item_title_size);color:var(--sapList_TextColor);margin:.5rem}.item-subtitle{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize);margin:.5rem}.item-right{display:flex;align-items:center;gap:.5rem}
`;
//# sourceMappingURL=UserSettingsAppearanceViewItem.css.js.map