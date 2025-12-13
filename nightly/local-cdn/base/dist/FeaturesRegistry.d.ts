declare const registerFeature: (name: string, feature: object) => void;
declare const getFeature: <T>(name: string) => T;
export { registerFeature, getFeature, };
