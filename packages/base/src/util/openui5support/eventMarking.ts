const defaultKey = "handledByControl";

const isMarked = (event: any, key: string = defaultKey) => {
	return !!event[`_sapui_${key}`];
};

export default isMarked;
