/**
 * Different input types.
 * @public
 */
var InputType;
(function (InputType) {
    /**
     * Defines a one-line text input field:
     * @public
     */
    InputType["Text"] = "Text";
    /**
     * Used for input fields that must contain an e-mail address.
     * @public
     */
    InputType["Email"] = "Email";
    /**
     * Defines a numeric input field.
     * @public
     */
    InputType["Number"] = "Number";
    /**
     * Defines a password field.
     * @public
     */
    InputType["Password"] = "Password";
    /**
     * Used for input fields that should contain a telephone number.
     * @public
     */
    InputType["Tel"] = "Tel";
    /**
     * Used for input fields that should contain a URL address.
     * @public
     */
    InputType["URL"] = "URL";
    /**
     * Used for input fields that should contain a search term.
     * @since 2.0.0
     * @public
     */
    InputType["Search"] = "Search";
})(InputType || (InputType = {}));
export default InputType;
//# sourceMappingURL=InputType.js.map