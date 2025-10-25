const defaultOpenUI5Key = "handledByControl";
const isEventMarked = (event, key = defaultOpenUI5Key) => {
    return !!event[`_sapui_${key}`];
};
export default isEventMarked;
//# sourceMappingURL=isEventMarked.js.map