import EventProvider from "../EventProvider.js";
const eventProvider = new EventProvider();
const CONFIGURATION_RESET = "configurationReset";
const attachConfigurationReset = (listener) => {
    eventProvider.attachEvent(CONFIGURATION_RESET, listener);
};
const resetConfiguration = () => {
    eventProvider.fireEvent(CONFIGURATION_RESET, undefined);
};
export { attachConfigurationReset, resetConfiguration, };
//# sourceMappingURL=ConfigurationReset.js.map