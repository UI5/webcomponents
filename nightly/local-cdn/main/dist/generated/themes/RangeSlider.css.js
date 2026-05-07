import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{vertical-align:middle}:host{display:inline-block;height:var(--_ui5_slider_height, 2.75rem);width:100%}:host([label-interval]:not([label-interval="0"])){height:3.75rem;align-items:flex-start}.ui5-slider-evo-root{width:100%;height:100%;display:flex;align-items:center;padding:var(--_ui5_slider_root_side_padding);box-sizing:border-box;min-width:var(--_ui5_slider_inner_min_width)}:host([disabled]){opacity:var(--_ui5_slider_disabled_opacity);cursor:default;pointer-events:none}
`;
//# sourceMappingURL=RangeSlider.css.js.map