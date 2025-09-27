const getClassCopy = (klass, constructorCallback) => {
    return class classCopy extends klass {
        constructor() {
            super();
            constructorCallback && constructorCallback();
        }
    };
};
export default getClassCopy;
//# sourceMappingURL=getClassCopy.js.map