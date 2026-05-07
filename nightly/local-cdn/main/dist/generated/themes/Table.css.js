import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:block;position:relative;color:var(--sapList_TextColor);font:var(--sapFontSize) var(--sapFontFamily)}:host([hidden]){display:none}#table{display:grid;grid-auto-rows:minmax(min-content,max-content)}:host([overflow-mode="Scroll"]) #table{overflow-x:auto;height:100%}#rows,#spacer{display:grid;grid-template-rows:min-content;grid-template-columns:subgrid;grid-column:1 / -1}#no-data-cell{grid-column:1 / -1;justify-content:center}#loading{position:absolute;inset:0;height:100%;z-index:2}:host([loading]) #table:has(#loading[_is-busy]) ::slotted(*){opacity:var(--sapContent_DisabledOpacity)}
`;
//# sourceMappingURL=Table.css.js.map