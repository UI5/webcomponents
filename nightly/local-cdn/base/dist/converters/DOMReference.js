const DOMReferenceConverter = {
    toAttribute(propertyValue) {
        if (propertyValue instanceof HTMLElement) {
            return null;
        }
        return propertyValue;
    },
    fromAttribute(value) {
        return value;
    },
};
export default DOMReferenceConverter;
//# sourceMappingURL=DOMReference.js.map