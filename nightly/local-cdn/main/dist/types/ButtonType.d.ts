/**
 * Determines if the button has special form-related functionality.
 * @public
 */
declare enum ButtonType {
    /**
     * The button does not do anything special when inside a form
     * @public
     */
    Button = "Button",
    /**
     * The button acts as a submit button (submits a form)
     * @public
     */
    Submit = "Submit",
    /**
     * The button acts as a reset button (resets a form)
     * @public
     */
    Reset = "Reset"
}
export default ButtonType;
