import animate, { duration } from "./animate.js";
const slideUp = (element) => {
    // Get Computed styles
    let computedStyles, paddingTop, paddingBottom, marginTop, marginBottom, height;
    // Store inline styles
    let storedOverflow, storedPaddingTop, storedPaddingBottom, storedMarginTop, storedMarginBottom, storedHeight;
    const animation = animate({
        beforeStart: () => {
            // Get Computed styles
            const el = element;
            computedStyles = getComputedStyle(el);
            paddingTop = parseFloat(computedStyles.paddingTop);
            paddingBottom = parseFloat(computedStyles.paddingBottom);
            marginTop = parseFloat(computedStyles.marginTop);
            marginBottom = parseFloat(computedStyles.marginBottom);
            height = parseFloat(computedStyles.height);
            // Store inline styles
            storedOverflow = el.style.overflow;
            storedPaddingTop = el.style.paddingTop;
            storedPaddingBottom = el.style.paddingBottom;
            storedMarginTop = el.style.marginTop;
            storedMarginBottom = el.style.marginBottom;
            storedHeight = el.style.height;
            el.style.overflow = "hidden";
        },
        duration,
        element,
        advance: progress => {
            element.style.paddingTop = `${paddingTop - (paddingTop * progress)}px`;
            element.style.paddingBottom = `${paddingBottom - (paddingBottom * progress)}px`;
            element.style.marginTop = `${marginTop - (marginTop * progress)}px`;
            element.style.marginBottom = `${marginBottom - (marginBottom * progress)}px`;
            element.style.height = `${height - (height * progress)}px`;
        },
    });
    animation.promise().then(reason => {
        if (!(reason instanceof Error)) {
            element.style.overflow = storedOverflow;
            element.style.paddingTop = storedPaddingTop;
            element.style.paddingBottom = storedPaddingBottom;
            element.style.marginTop = storedMarginTop;
            element.style.marginBottom = storedMarginBottom;
            element.style.height = storedHeight;
            element.style.display = "none";
        }
    });
    return animation;
};
export default slideUp;
//# sourceMappingURL=slideUp.js.map