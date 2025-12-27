const escapeReg = /[[\]{}()*+?.\\^$|]/g;
const escapeRegExp = (str) => {
    return str.replace(escapeReg, "\\$&");
};
const StartsWithPerTerm = (value, items, propName) => {
    const reg = new RegExp(`(^|\\s)${escapeRegExp(value.toLowerCase())}.*`, "g");
    return items.filter(item => {
        const text = item[propName];
        reg.lastIndex = 0;
        return reg.test(text.toLowerCase());
    });
};
const StartsWith = (value, items, propName) => items.filter(item => (item[propName] || "").toLowerCase().startsWith(value.toLowerCase()));
const Contains = (value, items, propName) => items.filter(item => (item[propName] || "").toLowerCase().includes(value.toLowerCase()));
const None = (_, items) => items;
export { StartsWithPerTerm, StartsWith, Contains, None, };
//# sourceMappingURL=Filters.js.map