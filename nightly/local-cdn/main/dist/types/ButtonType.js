/**
 * Determines if the button has special form-related functionality.
 * @public
 */
var ButtonType;
(function (ButtonType) {
    /**
     * The button does not do anything special when inside a form
     * @public
     */
    ButtonType["Button"] = "Button";
    /**
     * The button acts as a submit button (submits a form)
     * @public
     */
    ButtonType["Submit"] = "Submit";
    /**
     * The button acts as a reset button (resets a form)
     * @public
     */
    ButtonType["Reset"] = "Reset";
})(ButtonType || (ButtonType = {}));
export default ButtonType;
//# sourceMappingURL=ButtonType.js.map