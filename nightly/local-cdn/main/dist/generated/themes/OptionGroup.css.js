import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:block}.ui5-option-group-root{width:100%;box-sizing:border-box;padding:0;margin:0}.ui5-option-group-header{display:flex;align-items:flex-end;padding:1.25rem 1rem .5rem;box-sizing:border-box;border-bottom:1px solid var(--sapList_GroupHeaderBorderColor);background:var(--sapList_GroupHeaderBackground);color:var(--sapList_TableGroupHeaderTextColor);font-family:var(--sapFontHeaderFamily);font-size:var(--sapFontHeader6Size);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;user-select:none}
`;
//# sourceMappingURL=OptionGroup.css.js.map