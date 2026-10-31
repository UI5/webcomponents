declare const registerFeature: (name: string, feature: object) => void;
declare const getFeature: <T>(name: string) => T;
declare const getRegisteredFeatures: () => Array<string>;
export { registerFeature, getFeature, getRegisteredFeatures, };
