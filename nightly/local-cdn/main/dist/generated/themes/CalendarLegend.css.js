import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-calendar-legend-root{column-width:7.5rem;gap:.5rem;padding:var(--_ui5-calendar-legend-root-padding);margin:1rem 0;width:var(--_ui5-calendar-legend-root-width);background-color:var(--sapList_Background)}
`;
//# sourceMappingURL=CalendarLegend.css.js.map