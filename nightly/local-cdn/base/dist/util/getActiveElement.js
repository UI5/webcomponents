const getActiveElement = () => {
    let element = document.activeElement;
    while (element && element.shadowRoot && element.shadowRoot.activeElement) {
        element = element.shadowRoot.activeElement;
    }
    return element;
};
export default getActiveElement;
//# sourceMappingURL=getActiveElement.js.map