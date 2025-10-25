import animate, { duration } from "./animate.js";
const slideDown = (element) => {
    let computedStyles, paddingTop, paddingBottom, marginTop, marginBottom, height;
    let storedOverflow, storedPaddingTop, storedPaddingBottom, storedMarginTop, storedMarginBottom, storedHeight;
    const animation = animate({
        beforeStart: () => {
            // Show the element to measure its properties
            element.style.display = "block";
            // Get Computed styles
            computedStyles = getComputedStyle(element);
            paddingTop = parseFloat(computedStyles.paddingTop);
            paddingBottom = parseFloat(computedStyles.paddingBottom);
            marginTop = parseFloat(computedStyles.marginTop);
            marginBottom = parseFloat(computedStyles.marginBottom);
            height = parseFloat(computedStyles.height);
            // Store inline styles
            storedOverflow = element.style.overflow;
            storedPaddingTop = element.style.paddingTop;
            storedPaddingBottom = element.style.paddingBottom;
            storedMarginTop = element.style.marginTop;
            storedMarginBottom = element.style.marginBottom;
            storedHeight = element.style.height;
            element.style.overflow = "hidden";
            element.style.paddingTop = "0";
            element.style.paddingBottom = "0";
            element.style.marginTop = "0";
            element.style.marginBottom = "0";
            element.style.height = "0";
        },
        duration,
        element,
        advance: progress => {
            // WORKAROUND
            element.style.display = "block";
            // END OF WORKAROUND
            element.style.paddingTop = `${(paddingTop * progress)}px`;
            element.style.paddingBottom = `${(paddingBottom * progress)}px`;
            element.style.marginTop = `${(marginTop * progress)}px`;
            element.style.marginBottom = `${(marginBottom * progress)}px`;
            element.style.height = `${(height * progress)}px`;
        },
    });
    animation.promise().then(() => {
        element.style.overflow = storedOverflow;
        element.style.paddingTop = storedPaddingTop;
        element.style.paddingBottom = storedPaddingBottom;
        element.style.marginTop = storedMarginTop;
        element.style.marginBottom = storedMarginBottom;
        element.style.height = storedHeight;
    });
    return animation;
};
export default slideDown;
//# sourceMappingURL=slideDown.js.map