import EventProvider from "../EventProvider.js";
const eventProvider = new EventProvider();
const THEME_REGISTERED = "themeRegistered";
const attachThemeRegistered = (listener) => {
    eventProvider.attachEvent(THEME_REGISTERED, listener);
};
const fireThemeRegistered = (theme) => {
    return eventProvider.fireEvent(THEME_REGISTERED, theme);
};
export { attachThemeRegistered, fireThemeRegistered, };
//# sourceMappingURL=ThemeRegistered.js.map