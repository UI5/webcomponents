import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-user-settings-notifications-view-content{display:flex;flex-direction:column;gap:.5rem}.ui5-user-settings-notifications-view-list{padding:0;margin:0;--ui5-group-header-listitem-background-color: var(--sapList_Background)}.ui5-user-settings-notifications-view-form{background:var(--sapGroup_ContentBackground);border-bottom:.0625rem solid var(--sapList_BorderColor);overflow:visible}slot[name=additionalContent]::slotted(*){display:block}
`;
//# sourceMappingURL=UserSettingsNotificationsView.css.js.map