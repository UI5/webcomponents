import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-date-picker-popover{width:var(--_ui5_calendar_width);.ui5-popover-header{width:100%}}.ui5-date-picker-popover .ui5-responsive-popover-header .row{justify-content:flex-start;font-family:var(--sapFontHeaderFamily);font-size:var(--sapFontHeader5Size);color:var(--sapPageHeader_TextColor)}[ui5-calendar]{width:100%;display:flex;justify-content:center}[ui5-responsive-popover]::part(content){padding:0}.ui5-dt-picker-footer{display:flex;justify-content:flex-end;align-items:center;height:2.75rem;width:100%}.ui5-dt-picker-footer.ui5-dt-picker-footer-time-hidden{padding:0}.ui5-dt-picker-action{margin:.25rem}
`;
//# sourceMappingURL=DatePickerPopover.css.js.map