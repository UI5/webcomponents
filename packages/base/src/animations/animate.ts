import { getAnimationMode } from "../config/AnimationMode.js";
import AnimationQueue from "./AnimationQueue.js";

type AnimateOptions = {
	beforeStart?: () => void,
	duration: number,
	element: HTMLElement,
	advance: (p: number) => void,
};

const animate = (options: AnimateOptions) => {
	let start: number | null = null;
	let stopped = false;
	let animationFrame: number;
	let stop: () => void;
	let advanceAnimation: (timestamp: number) => void;

	const promise = new Promise<void>((resolve, reject) => {
		advanceAnimation = timestamp => {
			start = start || timestamp;

			const timeElapsed = timestamp - start;
			const remaining = options.duration - timeElapsed;

			if (timeElapsed <= options.duration) {
				const currentAdvance = 1 - remaining / options.duration; // easing formula (currently linear)
				options.advance(currentAdvance);
				if (!stopped) {
					animationFrame = requestAnimationFrame(advanceAnimation);
				}
			} else {
				options.advance(1);
				resolve();
			}
		};

		stop = () => {
			stopped = true;
			cancelAnimationFrame(animationFrame);
			reject(new Error("animation stopped"));
		};
	}).catch((reason: Error) => reason);

	AnimationQueue.push(options.element, () => {
		if (typeof options.beforeStart === "function") {
			options.beforeStart();
		}

		requestAnimationFrame(advanceAnimation);

		return new Promise(resolve => {
			promise.then(() => resolve());
		});
	});

	return {
		promise: () => promise,
		stop: () => stop,
	};
};

const duration = () => {
	return getAnimationMode() === "none" ? 0 : 400;
};

export { duration };
export type { AnimateOptions };
export default animate;
