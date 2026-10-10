// createInstanceChecker<A>("isAItem")
function createChecker(prop) {
    return (object) => {
        return object !== undefined && object !== null && prop in object && object[prop] === true;
    };
}
export default createChecker;
//# sourceMappingURL=createInstanceChecker.js.map