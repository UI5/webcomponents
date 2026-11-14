const features = new Map();
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};
const getRegisteredFeatures = () => {
    return [...features.keys()];
};
export { registerFeature, getFeature, getRegisteredFeatures, };
//# sourceMappingURL=FeaturesRegistry.js.map