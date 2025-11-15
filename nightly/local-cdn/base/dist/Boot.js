import whenDOMReady from "./util/whenDOMReady.js";
import EventProvider from "./EventProvider.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import insertScrollbarStyles from "./ScrollbarStyles.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { registerCurrentRuntime } from "./Runtimes.js";
import { getFeature } from "./FeaturesRegistry.js";
import { attachThemeRegistered } from "./theming/ThemeRegistered.js";
import fixSafariActiveState from "./util/fixSafariActiveState.js";
let booted = false;
let bootPromise;
const eventProvider = new EventProvider();
const isBooted = () => {
    return booted;
};
/**
 * Attaches a callback that will be executed after boot finishes.
 * **Note:** If the framework already booted, the callback will be immediately executed.
 * @public
 * @param { Function } listener
 */
const attachBoot = (listener) => {
    if (!booted) {
        eventProvider.attachEvent("boot", listener);
        return;
    }
    listener();
};
const boot = async () => {
    if (bootPromise !== undefined) {
        return bootPromise;
    }
    const bootExecutor = async (resolve) => {
        registerCurrentRuntime();
        if (typeof document === "undefined") {
            resolve();
            return;
        }
        attachThemeRegistered(onThemeRegistered);
        const openUI5Support = getFeature("OpenUI5Support");
        const isOpenUI5Loaded = openUI5Support ? openUI5Support.isOpenUI5Detected() : false;
        const f6Navigation = getFeature("F6Navigation");
        if (openUI5Support) {
            await openUI5Support.init();
        }
        if (f6Navigation && !isOpenUI5Loaded) {
            f6Navigation.init();
        }
        await whenDOMReady();
        await applyTheme(getTheme());
        openUI5Support && openUI5Support.attachListeners();
        insertFontFace();
        insertSystemCSSVars();
        insertScrollbarStyles();
        fixSafariActiveState();
        resolve();
        booted = true;
        eventProvider.fireEvent("boot");
    };
    bootPromise = new Promise(bootExecutor);
    return bootPromise;
};
/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme) => {
    if (booted && theme === getTheme()) { // getTheme should only be called if "booted" is true
        applyTheme(getTheme());
    }
};
export { boot, attachBoot, isBooted, };
//# sourceMappingURL=Boot.js.map