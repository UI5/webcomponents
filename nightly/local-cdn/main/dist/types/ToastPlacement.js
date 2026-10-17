/**
 * Toast placement.
 * @public
 */
var ToastPlacement;
(function (ToastPlacement) {
    /**
     * Toast is placed at the `TopStart` position of its container.
     * @public
     */
    ToastPlacement["TopStart"] = "TopStart";
    /**
     * Toast is placed at the `TopCenter` position of its container.
     * @public
     */
    ToastPlacement["TopCenter"] = "TopCenter";
    /**
     * Toast is placed at the `TopEnd` position of its container.
     * @public
     */
    ToastPlacement["TopEnd"] = "TopEnd";
    /**
     * Toast is placed at the `MiddleStart` position of its container.
     * @public
     */
    ToastPlacement["MiddleStart"] = "MiddleStart";
    /**
     * Toast is placed at the `MiddleCenter` position of its container.
     * @public
     */
    ToastPlacement["MiddleCenter"] = "MiddleCenter";
    /**
     * Toast is placed at the `MiddleEnd` position of its container.
     * @public
     */
    ToastPlacement["MiddleEnd"] = "MiddleEnd";
    /**
     * Toast is placed at the `BottomStart` position of its container.
     * @public
     */
    ToastPlacement["BottomStart"] = "BottomStart";
    /**
     * Toast is placed at the `BottomCenter` position of its container.
     * Default placement (no selection)
     * @public
     */
    ToastPlacement["BottomCenter"] = "BottomCenter";
    /**
     * Toast is placed at the `BottomEnd` position of its container.
     * @public
     */
    ToastPlacement["BottomEnd"] = "BottomEnd";
})(ToastPlacement || (ToastPlacement = {}));
export default ToastPlacement;
//# sourceMappingURL=ToastPlacement.js.map