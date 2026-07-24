type ConfigurationResetCallback = () => void;
declare const attachConfigurationReset: (listener: ConfigurationResetCallback) => void;
declare const resetConfiguration: () => void;
export { attachConfigurationReset, resetConfiguration, };
