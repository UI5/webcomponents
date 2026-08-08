import animate, { duration } from "./animate.js";
const scroll = (element, dx, dy) => {
    let scrollLeft;
    let scrollTop;
    return animate({
        beforeStart: () => {
            scrollLeft = element.scrollLeft;
            scrollTop = element.scrollTop;
        },
        duration,
        element,
        advance: progress => {
            element.scrollLeft = scrollLeft + (progress * dx); // easing - linear
            element.scrollTop = scrollTop + (progress * dy); // easing - linear
        },
    });
};
export default scroll;
//# sourceMappingURL=scroll.js.map