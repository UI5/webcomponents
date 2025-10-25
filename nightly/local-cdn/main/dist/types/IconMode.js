/**
 * Different Icon modes.
 * @public
 * @since 2.0.0
 */
var IconMode;
(function (IconMode) {
    /**
     * Image mode (by default).
     * Configures the component to internally render role="img".
     * @public
     */
    IconMode["Image"] = "Image";
    /**
     * Decorative mode.
     * Configures the component to internally render role="presentation" and aria-hidden="true",
     * making it purely decorative without semantic content or interactivity.
     * @public
     */
    IconMode["Decorative"] = "Decorative";
    /**
     * Interactive mode.
     * Configures the component to internally render role="button".
     * This mode also supports focus and press handling to enhance interactivity.
     * @public
    */
    IconMode["Interactive"] = "Interactive";
})(IconMode || (IconMode = {}));
export default IconMode;
//# sourceMappingURL=IconMode.js.map