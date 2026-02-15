import type { PopupInfo } from "./patchPopup.js";
import type { CLDRData } from "../asset-registries/LocaleData.js";
import type { LegacyDateCalendarCustomizing } from "../features/LegacyDateFormats.js";
declare class OpenUI5Support {
    static enablePolling: boolean;
    static isAtLeastVersion116(): boolean;
    static isOpenUI5Detected(): boolean;
    static initPromise?: Promise<void>;
    /**
     * Important - if OpenUI5 is loaded after UI5 Web Components, configuration is not synchronized and it's up to the app to initialize OpenUI5 with the same settings as UI5 Web Components for consistency.
     */
    static OpenUI5DelayedInit: () => Promise<void>;
    static awaitForOpenUI5(): void;
    static init(): void | Promise<void>;
    static getConfigurationSettingsObject(): {
        animationMode?: undefined;
        language?: undefined;
        theme?: undefined;
        themeRoot?: undefined;
        rtl?: undefined;
        timezone?: undefined;
        calendarType?: undefined;
        formatSettings?: undefined;
    } | {
        animationMode: string;
        language: string;
        theme: string;
        themeRoot: string | undefined;
        rtl: string;
        timezone: string | undefined;
        calendarType: string;
        formatSettings: {
            firstDayOfWeek: number | undefined;
            legacyDateCalendarCustomizing: LegacyDateCalendarCustomizing;
        };
    };
    static getLocaleDataObject(): CLDRData | undefined;
    static _listenForThemeChange(): void;
    static attachListeners(): boolean;
    static cssVariablesLoaded(): boolean | undefined;
    static addOpenedPopup(popupInfo: PopupInfo): void;
    static removeOpenedPopup(popup: object): void;
    static getTopmostPopup(): object | null;
}
export default OpenUI5Support;
