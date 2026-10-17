/**
 * Enumeration for different mode behaviors of the InvisibleMessage.
 *
 * @public
 */
declare const InvisibleMessageMode: {
    /**
     * Indicates that updates to the region should be presented at the next graceful opportunity,
     * such as at the end of reading the current sentence, or when the user pauses typing.
     * @public
     */
    readonly Polite: "Polite";
    /**
     * Indicates that updates to the region have the highest priority and should be presented to the user immediately.
     * @public
     */
    readonly Assertive: "Assertive";
};
type InvisibleMessageMode = typeof InvisibleMessageMode[keyof typeof InvisibleMessageMode];
export default InvisibleMessageMode;
