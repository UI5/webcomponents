import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "a" + "i", "sap_horizon", async () => defaultTheme, "host");
export default `.ui5-ai-writing-assistant-footer-bar{background:var(--_ui5_texteditor_toolbar_background, var(--sapPageFooter_Background));width:100%;box-sizing:border-box;box-shadow:none;border-bottom:none;border-top:none;padding:.5rem;display:flex;align-items:center;justify-content:flex-start}.ui5-ai-writing-assistant-footer-bar--with-border{border-top:1px solid var(--sapPageFooter_BorderColor)}.ui5-ai-writing-assistant-action-label{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);margin-left:.25rem}
`;
//# sourceMappingURL=WritingAssistant.css.js.map