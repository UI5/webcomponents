const defaultOpenUI5Key = "handledByControl";

const isEventMarked = (event: any, key: string = defaultOpenUI5Key) => {
	return !!event[`_sapui_${key}`];
};

export default isEventMarked;
