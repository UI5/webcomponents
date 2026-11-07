import EventProvider from "../EventProvider.js";
const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
    eventProvider.attachEvent(LANG_CHANGE, listener);
};
const detachLanguageChange = (listener) => {
    eventProvider.detachEvent(LANG_CHANGE, listener);
};
const fireLanguageChange = (lang) => {
    return eventProvider.fireEventAsync(LANG_CHANGE, lang);
};
export { attachLanguageChange, detachLanguageChange, fireLanguageChange, };
//# sourceMappingURL=languageChange.js.map