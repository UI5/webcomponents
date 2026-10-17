import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-time-picker-popover{width:20rem}.ui5-time-picker-popover .ui5-responsive-popover-header .row{justify-content:flex-start;font-family:var(--sapFontHeaderFamily);font-size:var(--sapFontHeader5Size);color:var(--sapPageHeader_TextColor)}.ui5-time-picker-footer{height:fit-content;display:flex;justify-content:flex-end;width:100%}.ui5-time-picker-footer>[ui5-button]{margin:1%;min-width:20%}.ui5-time-picker-popover::part(content){padding:0}.ui5-time-picker-inputs-popover::part(header){padding:0;width:100%}
`;
//# sourceMappingURL=TimePickerPopover.css.js.map