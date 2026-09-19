function throttle(func, delay) {
    let lastArgs = null; // used to ensure an explicit last call after the delay
    let throttleTimeout = null;
    return function throttled(...args) {
        if (throttleTimeout) {
            lastArgs = args;
            return;
        }
        func(...args);
        throttleTimeout = setTimeout(() => {
            if (lastArgs) {
                func(...lastArgs);
                lastArgs = null;
            }
            throttleTimeout = null;
        }, delay);
    };
}
export default throttle;
//# sourceMappingURL=throttle.js.map