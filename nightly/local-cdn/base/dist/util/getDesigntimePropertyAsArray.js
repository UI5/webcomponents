const designTimePropertyAsArray = (value) => {
    const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
    return m && m[2] ? m[2].split(/,/) : null;
};
export default designTimePropertyAsArray;
//# sourceMappingURL=getDesigntimePropertyAsArray.js.map