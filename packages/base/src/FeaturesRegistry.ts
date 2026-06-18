const features = new Map<string, any>();

const registerFeature = (name: string, feature: object) => {
	features.set(name, feature);
};

const getFeature = <T>(name: string): T => {
	return features.get(name) as T;
};

const getRegisteredFeatures = (): Array<string> => {
	return [...features.keys()];
};

export {
	registerFeature,
	getFeature,
	getRegisteredFeatures,
};
