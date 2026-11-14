/**
 * Enumeration for different mode behaviors of the InvisibleMessage.
 *
 * @public
 */
const InvisibleMessageMode = {
    /**
     * Indicates that updates to the region should be presented at the next graceful opportunity,
     * such as at the end of reading the current sentence, or when the user pauses typing.
     * @public
     */
    Polite: "Polite",
    /**
     * Indicates that updates to the region have the highest priority and should be presented to the user immediately.
     * @public
     */
    Assertive: "Assertive",
};
export default InvisibleMessageMode;
//# sourceMappingURL=InvisibleMessageMode.js.map