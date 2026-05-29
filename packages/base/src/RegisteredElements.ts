const Definitions = new Set<string>();

const addRegisteredTag = (tag: string) => {
	Definitions.add(tag);
};

const isTagRegistered = (tag: string) => {
	return Definitions.has(tag);
};

const hasRegisteredTags = () => {
	return Definitions.size > 0;
};

const getAllRegisteredTags = () => {
	return [...Definitions.values()];
};

export {
	addRegisteredTag,
	isTagRegistered,
	hasRegisteredTags,
	getAllRegisteredTags,
};
