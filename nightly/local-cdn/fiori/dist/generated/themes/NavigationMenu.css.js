import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}::slotted([ui5-navigation-menu-item]:not(:last-of-type)){margin-block-end:var(--_ui5_side_navigation_item_bottom_margin)}.ui5-navigation-menu .ui5-navigation-menu-main{padding:var(--_ui5_side_navigation_popup_padding)}.ui5-menu-rp.ui5-navigation-menu{min-width:10rem;background:var(--sapGroup_ContentBackground);border:none}
`;
//# sourceMappingURL=NavigationMenu.css.js.map