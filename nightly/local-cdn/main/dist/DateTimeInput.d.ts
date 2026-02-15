import Input from "./Input.js";
/**
 * Extention of the UI5 Input, so we do not modify Input's private properties within the datetime components.
 * Intended to be used for the DateTime components.
 *
 * @class
 * @private
 */
declare class DateTimeInput extends Input {
    _shouldOpenValueStatePopover: boolean;
    /**
     * Prevents the value state message popover from appearing when a responsive popover (like time selection) is open
     * since the responsive popover already includes the necessary information in its header.
     *
     * @protected
     * @override
     */
    get hasValueStateMessage(): boolean;
    get _isMobileDevice(): boolean;
    /**
     * Override to handle nested slot structure from DatePicker -> DateTimeInput slot forwarding.
     * Assumes DateTimeInput always has slot-within-slot structure for valueStateMessage.
     * @override
     */
    get ariaValueStateHiddenText(): string | undefined;
}
export default DateTimeInput;
