var _a;
import patchPatcher from "./patchPatcher.js";
import { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, } from "./patchPopup.js";
import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";
import { secondaryBoot } from "../Boot.js";
const OPENUI5_POLLING_INTERVAL = 100;
class OpenUI5Support {
    static isAtLeastVersion116() {
        if (!window.sap.ui.version) {
            return true; // sap.ui.version will be removed in newer OpenUI5 versions
        }
        const version = window.sap.ui.version;
        const parts = version.split(".");
        if (!parts || parts.length < 2) {
            return false;
        }
        return parseInt(parts[0]) > 1 || parseInt(parts[1]) >= 116;
    }
    static isOpenUI5Detected() {
        return typeof window.sap?.ui?.require === "function";
    }
    static awaitForOpenUI5() {
        if (_a.enablePolling) {
            const interval = setInterval(() => {
                if (_a.isOpenUI5Detected()) {
                    clearInterval(interval);
                    _a.OpenUI5DelayedInit();
                }
            }, OPENUI5_POLLING_INTERVAL);
        }
        else {
            document.addEventListener("sap-ui-core-ready", () => {
                _a.OpenUI5DelayedInit();
            });
        }
    }
    static init() {
        if (!_a.isOpenUI5Detected()) {
            return _a.awaitForOpenUI5();
        }
        if (!_a.initPromise) {
            _a.initPromise = new Promise(resolve => {
                window.sap.ui.require(["sap/ui/core/Core"], async (Core) => {
                    const callback = () => {
                        let deps = ["sap/ui/core/Popup", "sap/m/Dialog", "sap/ui/core/Patcher", "sap/ui/core/LocaleData"];
                        if (_a.isAtLeastVersion116()) { // for versions since 1.116.0 and onward, use the modular core
                            deps = [
                                ...deps,
                                "sap/base/i18n/Formatting",
                                "sap/base/i18n/Localization",
                                "sap/ui/core/ControlBehavior",
                                "sap/ui/core/Theming",
                                "sap/ui/core/date/CalendarUtils",
                            ];
                        }
                        window.sap.ui.require(deps, (Popup, Dialog, Patcher) => {
                            patchPatcher(Patcher);
                            patchPopup(Popup, Dialog);
                            resolve();
                        });
                    };
                    if (_a.isAtLeastVersion116()) {
                        await Core.ready();
                        callback();
                    }
                    else {
                        Core.attachInit(callback);
                    }
                });
            });
        }
        return _a.initPromise;
    }
    static getConfigurationSettingsObject() {
        if (!_a.isOpenUI5Detected()) {
            return {};
        }
        if (_a.isAtLeastVersion116()) {
            const ControlBehavior = window.sap.ui.require("sap/ui/core/ControlBehavior");
            const Localization = window.sap.ui.require("sap/base/i18n/Localization");
            const Theming = window.sap.ui.require("sap/ui/core/Theming");
            const Formatting = window.sap.ui.require("sap/base/i18n/Formatting");
            const CalendarUtils = window.sap.ui.require("sap/ui/core/date/CalendarUtils");
            return {
                animationMode: ControlBehavior.getAnimationMode(),
                language: Localization.getLanguage(),
                theme: Theming.getTheme(),
                themeRoot: Theming.getThemeRoot(),
                rtl: Localization.getRTL(),
                timezone: Localization.getTimezone(),
                calendarType: Formatting.getCalendarType(),
                formatSettings: {
                    firstDayOfWeek: CalendarUtils.getWeekConfigurationValues().firstDayOfWeek,
                    legacyDateCalendarCustomizing: Formatting.getCustomIslamicCalendarData?.()
                        ?? Formatting.getLegacyDateCalendarCustomizing?.(),
                },
            };
        }
        const Core = window.sap.ui.require("sap/ui/core/Core");
        const config = Core.getConfiguration();
        const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData");
        return {
            animationMode: config.getAnimationMode(),
            language: config.getLanguage(),
            theme: config.getTheme(),
            themeRoot: typeof config.getThemeRoot === "function" ? config.getThemeRoot() : undefined,
            rtl: config.getRTL(),
            timezone: typeof config.getTimezone === "function" ? config.getTimezone() : undefined,
            calendarType: config.getCalendarType(),
            formatSettings: {
                firstDayOfWeek: LocaleData ? LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek() : undefined,
                legacyDateCalendarCustomizing: config.getFormatSettings().getLegacyDateCalendarCustomizing(),
            },
        };
    }
    static getLocaleDataObject() {
        if (!_a.isOpenUI5Detected()) {
            return;
        }
        const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData");
        if (_a.isAtLeastVersion116()) {
            const Localization = window.sap.ui.require("sap/base/i18n/Localization");
            return LocaleData.getInstance(Localization.getLanguageTag())._get();
        }
        const Core = window.sap.ui.require("sap/ui/core/Core");
        const config = Core.getConfiguration();
        return LocaleData.getInstance(config.getLocale())._get();
    }
    static _listenForThemeChange() {
        if (_a.isAtLeastVersion116()) {
            const Theming = window.sap.ui.require("sap/ui/core/Theming");
            Theming.attachApplied(() => {
                setTheme(Theming.getTheme());
            });
        }
        else {
            const Core = window.sap.ui.require("sap/ui/core/Core");
            const config = Core.getConfiguration();
            Core.attachThemeChanged(() => {
                setTheme(config.getTheme());
            });
        }
    }
    static attachListeners() {
        if (!_a.isOpenUI5Detected()) {
            return false;
        }
        _a._listenForThemeChange();
        return true;
    }
    static cssVariablesLoaded() {
        if (!_a.isOpenUI5Detected()) {
            return;
        }
        const link = [...document.head.children].find(el => el.id === "sap-ui-theme-sap.ui.core"); // more reliable than querySelector early
        if (!link) {
            return false;
        }
        // The file name is "css_variables.css" until 1.127 and "library.css" from 1.127 onwards
        return !!link.href.match(/\/css(-|_)variables\.css/) || !!link.href.match(/\/library\.css/);
    }
    static addOpenedPopup(popupInfo) {
        addOpenedPopup(popupInfo);
    }
    static removeOpenedPopup(popup) {
        removeOpenedPopup(popup);
    }
    static getTopmostPopup() {
        return getTopmostPopup();
    }
}
_a = OpenUI5Support;
OpenUI5Support.enablePolling = false; // set to true for old OpenUI5 versions
/**
 * Important - if OpenUI5 is loaded after UI5 Web Components, configuration is not synchronized and it's up to the app to initialize OpenUI5 with the same settings as UI5 Web Components for consistency.
 */
OpenUI5Support.OpenUI5DelayedInit = async () => {
    _a.init(); // This ensures patchPopover and patchPatcher are called; and from this point OpenUI5 CSS vars start being detected
    await secondaryBoot(); // Re-run the parts of boot that were skipped due to OpenUI5 not having been loaded
};
registerFeature("OpenUI5Support", OpenUI5Support);
export default OpenUI5Support;
//# sourceMappingURL=OpenUI5Support.js.map