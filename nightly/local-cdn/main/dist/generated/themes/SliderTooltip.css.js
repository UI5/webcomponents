import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:popover-open){margin:-28px 0 0;display:inline-block;height:1rem;background:var(--sapBackgroundColor);border:none;box-shadow:var(--sapContent_Shadow1);border-radius:.0625rem;padding:0 .5rem;font-family:var(--sapFontFamily);font-size:var(--sapFontSmallSize);color:var(--sapTextColor);display:flex;justify-content:center;align-items:center;overflow:hidden}:host([editable]:popover-open){cursor:pointer;height:fit-content;border:none;padding:0;margin-top:-3rem;box-shadow:none}:host([editable]:popover-open) [ui5-input]{width:min-content;text-align:center}
`;
//# sourceMappingURL=SliderTooltip.css.js.map