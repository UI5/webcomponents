/**
 * Different Avatar modes.
 * @public
 * @since 2.20.0
 */
var AvatarMode;
(function (AvatarMode) {
    /**
     * Image mode (by default).
     * Configures the component to internally render role="img".
     * @public
     */
    AvatarMode["Image"] = "Image";
    /**
     * Decorative mode.
     * Configures the component to internally render role="presentation" and aria-hidden="true",
     * making it purely decorative without semantic content or interactivity.
     * @public
     */
    AvatarMode["Decorative"] = "Decorative";
    /**
     * Interactive mode.
     * Configures the component to internally render role="button".
     * This mode also supports focus and enables keyboard interaction.
     * @public
     */
    AvatarMode["Interactive"] = "Interactive";
})(AvatarMode || (AvatarMode = {}));
export default AvatarMode;
//# sourceMappingURL=AvatarMode.js.map