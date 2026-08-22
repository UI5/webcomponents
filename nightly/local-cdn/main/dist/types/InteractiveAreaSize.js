/**
 * Defines the area size around the component that the user can select.
 *
 * @public
 * @since 2.8.0
 */
var InteractiveAreaSize;
(function (InteractiveAreaSize) {
    /**
     * The default target area size (the area taken by the component itself without any extra invisible touch area).
     * @public
     */
    InteractiveAreaSize["Normal"] = "Normal";
    /**
     * Enlarged target area size (up to 24px in height) provides users with an enhanced dedicated space to interact with the component.
     * @public
     */
    InteractiveAreaSize["Large"] = "Large";
})(InteractiveAreaSize || (InteractiveAreaSize = {}));
export default InteractiveAreaSize;
//# sourceMappingURL=InteractiveAreaSize.js.map