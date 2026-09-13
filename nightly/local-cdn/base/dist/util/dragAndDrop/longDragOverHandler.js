let lastTarget = null;
let lastTargetDragOverStart = Date.now();
const LONG_DRAG_OVER_THRESHOLD = 300;
const longDragOverHandler = (targetsSelector) => {
    return (target, propertyKey, descriptor) => {
        const origHandler = descriptor.value;
        descriptor.value = function handleDragOver(e) {
            let isLongDragOver = false;
            if (e.target instanceof HTMLElement) {
                const currentTarget = e.target.closest(targetsSelector);
                if (currentTarget === lastTarget && Date.now() - lastTargetDragOverStart >= LONG_DRAG_OVER_THRESHOLD) {
                    isLongDragOver = true;
                }
                else if (currentTarget !== lastTarget) {
                    lastTarget = currentTarget;
                    lastTargetDragOverStart = Date.now();
                }
            }
            origHandler.apply(this, [e, isLongDragOver]);
        };
        return descriptor;
    };
};
export default longDragOverHandler;
//# sourceMappingURL=longDragOverHandler.js.map