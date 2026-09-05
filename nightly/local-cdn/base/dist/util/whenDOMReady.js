const whenDOMReady = () => {
    return new Promise(resolve => {
        if (document.body) {
            resolve();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                resolve();
            });
        }
    });
};
export default whenDOMReady;
//# sourceMappingURL=whenDOMReady.js.map