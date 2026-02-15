/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
let debounceInterval = null;
const debounce = (fn, delay) => {
    debounceInterval && clearTimeout(debounceInterval);
    debounceInterval = setTimeout(() => {
        debounceInterval = null;
        fn();
    }, delay);
};
export default debounce;
//# sourceMappingURL=debounce.js.map