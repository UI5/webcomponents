const rtlAwareSet = new Set();
const markAsRtlAware = (klass) => {
    rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
    return rtlAwareSet.has(klass);
};
export { markAsRtlAware, isRtlAware, };
//# sourceMappingURL=RTLAwareRegistry.js.map