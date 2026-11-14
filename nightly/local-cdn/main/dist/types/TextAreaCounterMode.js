/**
 * Determines when the character counter of `ui5-textarea` is displayed.
 * @public
 * @since 2.28.0
 */
var TextAreaCounterMode;
(function (TextAreaCounterMode) {
    /**
     * The character counter is never shown. The `maxlength` property acts as a hard cap
     * and the user is not allowed to enter more characters than allowed.
     * @public
     */
    TextAreaCounterMode["None"] = "None";
    /**
     * The character counter is always visible below the component. Characters exceeding
     * the `maxlength` value are selected on paste and the counter displays their number.
     * @public
     */
    TextAreaCounterMode["Always"] = "Always";
    /**
     * The character counter is shown only when the component is focused, when the character
     * limit is exceeded, or when `valueState` is `Critical` or `Negative`. Space for the
     * counter is always reserved to prevent layout shifts.
     * @public
     */
    TextAreaCounterMode["Auto"] = "Auto";
})(TextAreaCounterMode || (TextAreaCounterMode = {}));
export default TextAreaCounterMode;
//# sourceMappingURL=TextAreaCounterMode.js.map