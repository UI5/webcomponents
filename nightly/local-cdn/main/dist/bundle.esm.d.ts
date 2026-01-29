import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
declare const testAssets: {
    getAcceptIconPathData: () => Promise<string>;
    generateHighlightedMarkup: typeof generateHighlightedMarkup;
    getExportedIconsValues: () => ("accept" | "SAP-icons-v4/accept" | "SAP-icons-v5/accept" | "tnt/actor" | "tnt-v2/actor" | "tnt-v3/actor" | "business-suite/3d" | "business-suite-v1/3d" | "business-suite-v2/3d")[];
    getAllRegisteredTags: () => string[];
    resetConfiguration: (testEnv?: boolean) => void;
    configuration: {
        getAnimationMode: () => `${import("@ui5/webcomponents-base/dist/types/AnimationMode.js").default}`;
        setAnimationMode: (animationMode: `${import("@ui5/webcomponents-base/dist/types/AnimationMode.js").default}`) => void;
        getTheme: () => string;
        setTheme: (theme: string) => Promise<void>;
        getThemeRoot: () => string | undefined;
        setThemeRoot: (themeRoot: string) => Promise<void> | undefined;
        isLegacyThemeFamily: () => boolean;
        getLanguage: () => string | undefined;
        setLanguage: (language: string) => Promise<void>;
        setNoConflict: (noConflictData: boolean | {
            events: Array<string>;
        }) => void;
        getFirstDayOfWeek: () => number | undefined;
        getTimezone: () => string | undefined;
        setTimezone: (timezone: string) => void;
    };
    invisibleMessage: {
        announce: (message: string, mode: import("@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js").default) => void;
    };
    getElementSelection: (element: HTMLElement) => {
        selectedText: string;
        x: number;
        y: number;
        width: number;
        height: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    getLocaleData: (lang: string) => Promise<import("@ui5/webcomponents-localization/dist/LocaleData.js").default>;
    applyDirection: () => Promise<void>;
    attachDirectionChange: (listener: () => void) => void;
    attachLanguageChange: (listener: (lang: string) => Promise<void | Array<void>>) => void;
    detachLanguageChange: (listener: (lang: string) => Promise<void | Array<void>>) => void;
    ResizeHandler: typeof import("@ui5/webcomponents-base/dist/index.js").ResizeHandler;
    addCustomCSS: (tag: string, css: string) => Promise<void>;
    attachThemeLoaded: (listener: (theme: string) => void) => void;
    detachThemeLoaded: (listener: (theme: string) => void) => void;
    getIconNames: () => Promise<string[]>;
    getIconAccessibleName: (name: string | undefined) => Promise<string | undefined>;
    renderFinished: () => Promise<void>;
    defaultTexts: typeof import("./generated/i18n/i18n-defaults.js");
    getEffectiveIconCollection: (collectionName?: import("@ui5/webcomponents-base/dist/config/Icons.js").IconCollection) => import("@ui5/webcomponents-base/dist/config/Icons.js").IconCollection;
    ignoreCustomElements: (tagPrefix: string) => void;
    shouldIgnoreCustomElement: (tag: string) => boolean;
    startMultipleDrag: (count: number, e: DragEvent) => Promise<void>;
};
export default testAssets;
