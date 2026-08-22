// Allows filtering of multiple types at once
// const isInstanceOfAOrB = createMultiInstanceChecker<A | B>(["isAItem", "isBItem"])
// const filteredItems = items.filter(isInstanceOfAOrB)
//
// Alternatively, use "createInstanceChecker" and filter separately:
// const isInstanceOfA = createInstanceChecker<A>("isAItem");
// const isInstanceOfB = createInstanceChecker<A>("isBItem")
// const filteredItems = [...items.filter(isInstanceOfA), ...items.filter(isInstanceOfB)];
export const createMultiInstanceChecker = (props) => {
    return (object) => {
        if (!object) {
            return false;
        }
        const propsArray = Array.isArray(props) ? props : [props];
        return propsArray.some(prop => prop in object && object[prop] === true);
    };
};
export default createMultiInstanceChecker;
//# sourceMappingURL=createMultiInstanceChecker.js.map