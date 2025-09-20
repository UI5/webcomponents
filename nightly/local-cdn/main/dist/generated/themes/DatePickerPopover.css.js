import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme);
export default `.ui5-date-picker-popover{width:var(--_ui5-v2-15-0-rc-0_calendar_width);.ui5-popover-header{width:100%}}[ui5-calendar]{width:100%;display:flex;justify-content:center}[ui5-responsive-popover]::part(content){padding:0}
`;
//# sourceMappingURL=DatePickerPopover.css.js.map