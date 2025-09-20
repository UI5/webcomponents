const features = new Map();
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};
export { registerFeature, getFeature, };
//# sourceMappingURL=FeaturesRegistry.js.map