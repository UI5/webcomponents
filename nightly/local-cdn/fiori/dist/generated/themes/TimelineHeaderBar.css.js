import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `:host{display:block;--_ui5_timeline_header_bar_search_max_width: 16rem;--_ui5_timeline_filter_dialog_min_width: 20rem}.ui5-timeline-header-bar-search{max-width:var(--_ui5_timeline_header_bar_search_max_width)}.ui5-timeline-filter-dialog{min-width:var(--_ui5_timeline_filter_dialog_min_width)}.ui5-timeline-filter-list{width:100%}
`;
//# sourceMappingURL=TimelineHeaderBar.css.js.map