import animate, { duration } from "./animate.js";

const scroll = (element: HTMLElement, dx: number, dy: number) => {
	let scrollLeft: number;
	let scrollTop: number;

	return animate({
		beforeStart: () => {
			scrollLeft = element.scrollLeft;
			scrollTop = element.scrollTop;
		},
		duration: duration(),
		element,
		advance: progress => {
			element.scrollLeft = scrollLeft + (progress * dx); // easing - linear
			element.scrollTop = scrollTop + (progress * dy); // easing - linear
		},
	});
};

export default scroll;
