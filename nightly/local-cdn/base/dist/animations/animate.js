import AnimationQueue from "./AnimationQueue.js";
const animate = (options) => {
    let start = null;
    let stopped = false;
    let animationFrame;
    let stop;
    let advanceAnimation;
    const promise = new Promise((resolve, reject) => {
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
            }
            else {
                options.advance(1);
                resolve();
            }
        };
        stop = () => {
            stopped = true;
            cancelAnimationFrame(animationFrame);
            reject(new Error("animation stopped"));
        };
    }).catch((reason) => reason);
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
const duration = 400;
export { duration };
export default animate;
//# sourceMappingURL=animate.js.map