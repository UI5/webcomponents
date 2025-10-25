import EventProvider from "../EventProvider.js";
const eventProvider = new EventProvider();
const THEME_LOADED = "themeLoaded";
const attachThemeLoaded = (listener) => {
    eventProvider.attachEvent(THEME_LOADED, listener);
};
const detachThemeLoaded = (listener) => {
    eventProvider.detachEvent(THEME_LOADED, listener);
};
const fireThemeLoaded = (theme) => {
    return eventProvider.fireEvent(THEME_LOADED, theme);
};
export { attachThemeLoaded, detachThemeLoaded, fireThemeLoaded, };
//# sourceMappingURL=ThemeLoaded.js.map