var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import { isDown, isUp, isDownAlt, isUpAlt, isPageUp, isPageDown, isPageUpShift, isPageDownShift, isPageUpShiftCtrl, isPageDownShiftCtrl, isSpace, isEnter, isKeyA, isKeyP, isNumber, isColon, } from "@ui5/webcomponents-base/dist/Keys.js";
import TimePickerInternals from "./TimePickerInternals.js";
// Template
import TimeSelectionClocksTemplate from "./TimeSelectionClocksTemplate.js";
// Styles
import TimeSelectionClocksCss from "./generated/themes/TimeSelectionClocks.css.js";
/**
 * Fired when the picker is being closed.
 */
let TimeSelectionClocks = class TimeSelectionClocks extends TimePickerInternals {
    constructor() {
        super(...arguments);
        /**
         * Flag for pressed Space key
         */
        this._spacePressed = false;
        /**
         * Flag for focused state of Clocks component
         */
        this._focused = false;
        /**
         * Flag for focused state of AM/PM segmented button
         */
        this._amPmFocused = false;
        /**
         * Flag for skipping the animation when switching between clocks.
         */
        this._skipAnimation = false;
    }
    onBeforeRendering() {
        this._createComponents();
    }
    /**
     * Returns ToggleSpinButton component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _buttonComponent(indexOrName) {
        const index = typeof indexOrName === "string" ? this._indexFromName(indexOrName) : indexOrName;
        const entity = this._entities[index].entity;
        return entity ? this.shadowRoot?.querySelector(`#${this._id}_button_${entity}`) : undefined;
    }
    /**
     * Returns TimePickerClock component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _clockComponent(indexOrName) {
        const index = typeof indexOrName === "string" ? this._indexFromName(indexOrName) : indexOrName;
        const entity = this._entities[index].entity;
        return entity ? this.shadowRoot?.querySelector(`#${this._id}_clock_${entity}`) : undefined;
    }
    /**
     * TimePickerClocks focusin event handler. Focuses the active button and switches to active clock.
     * @param evt Event object
     */
    _clocksFocusIn(evt) {
        const target = evt.target;
        if (target.id === this._id) {
            this._switchClock(this._activeIndex);
        }
    }
    /**
     * ToggleSpinButton focusin event handler. Switches to clock which button is being focused.
     * @param evt Event object
     */
    _buttonFocusIn(evt) {
        const target = evt.target;
        const newName = this._getNameFromId(target.id);
        const newIndex = this._getIndexFromId(target.id);
        if (this._activeIndex !== newIndex && newName) {
            this._switchTo(newName);
        }
    }
    /**
     * AM/PM segmented button focusin event handler.
     */
    _amPmFocusIn() {
        this._amPmFocused = true;
    }
    /**
     * AM/PM segmented button focusout event handler.
     */
    _amPmFocusOut() {
        this._amPmFocused = false;
    }
    /**
     * keyup event handler.
     * @param evt Event object
     */
    _onkeyup(evt) {
        if (isSpace(evt)) {
            this._spacePressed = false;
        }
    }
    /**
     * keydown event handler.
     * @param evt Event object
     */
    _onkeydown(evt) {
        let clock;
        const toggleSpinButtonTarget = evt.target && evt.target.tagName.toLowerCase().indexOf("segmented") === -1;
        if (isEnter(evt)) {
            // Accept the time and close the popover
            this.fireDecoratorEvent("close-picker");
        }
        else if (isSpace(evt) && toggleSpinButtonTarget && !this._spacePressed) {
            evt.preventDefault();
            this._spacePressed = true;
            this._keyboardBuffer = "";
            this._resetCooldown(true);
            this._switchNextClock(true, true);
        }
        else if ((isUp(evt) || isDown(evt)) && !isUpAlt(evt) && !isDownAlt(evt)) {
            // Arrows up/down increase/decrease currently active clock
            clock = this._clockComponent(this._activeIndex);
            clock && !clock.disabled && !this._amPmFocused && clock._modifyValue(isUp(evt));
            evt.preventDefault();
        }
        else if (isPageUp(evt) || isPageDown(evt)) {
            // PageUp/PageDown increase/decrease hours clock
            clock = this._clockComponent("hours");
            if (clock && !clock.disabled) {
                this._switchTo("hours", true);
                clock._modifyValue(isPageUp(evt));
            }
            evt.preventDefault();
        }
        else if (isPageUpShift(evt) || isPageDownShift(evt)) {
            // Shift+PageUp/Shift+PageDown increase/decrease minutes clock
            clock = this._clockComponent("minutes");
            if (clock && !clock.disabled) {
                this._switchTo("minutes", true);
                clock._modifyValue(isPageUpShift(evt));
            }
            evt.preventDefault();
        }
        else if (isPageUpShiftCtrl(evt) || isPageDownShiftCtrl(evt)) {
            // Ctrl+Shift+PageUp/Ctrl+Shift+PageDown increase/decrease seconds clock
            clock = this._clockComponent("seconds");
            if (clock && !clock.disabled) {
                this._switchTo("seconds", true);
                clock._modifyValue(isPageUpShiftCtrl(evt));
            }
            evt.preventDefault();
        }
        else if (isKeyA(evt) || isKeyP(evt)) {
            // A/P selects AM/PM segmented button item
            const buttonAmPm = this._buttonAmPm();
            if (buttonAmPm) {
                buttonAmPm.items[0].selected = isKeyA(evt);
                buttonAmPm.items[1].selected = isKeyP(evt);
                const period = isKeyA(evt) ? buttonAmPm.items[0].textContent : buttonAmPm.items[1].textContent;
                period && this._calculatePeriodChange(period);
            }
            evt.preventDefault();
        }
        else if (isColon(evt)) {
            // Colon (:) - Switch to next clock
            this._keyboardBuffer = "";
            this._exactMatch = undefined;
            this._resetCooldown(true);
            this._switchNextClock(true, true);
        }
        else if (isNumber(evt) && this._entities[this._activeIndex]) {
            // Direct number entry
            this._exactMatch = undefined;
            this._resetCooldown(true);
            this._numbersInput(evt);
        }
    }
    /**
     * Handles direct numbers entry.
     * @param evt Event object
     */
    _numbersInput(evt) {
        const char = evt.key;
        const bufferStr = this._keyboardBuffer + char;
        const bufferNum = parseInt(bufferStr);
        const entity = this._entities[this._activeIndex];
        let activeClock = this._clockComponent(this._activeIndex);
        if (!entity || !entity.attributes) {
            return;
        }
        if (bufferNum > entity.attributes.max) {
            // value accumulated in the buffer (old entry + new entry) is greater than the clock maximum value,
            // so assign old entry to the current clock and then switch to the next clock, and add new entry as an old value
            activeClock && activeClock._setSelectedValue(parseInt(this._keyboardBuffer));
            this._switchNextClock(false, true);
            this._keyboardBuffer = char;
            activeClock = this._clockComponent(this._activeIndex);
            activeClock && activeClock._setSelectedValue(parseInt(char));
            this._resetCooldown(true);
        }
        else {
            // value is less than clock's max value, so add new entry to the buffer
            this._keyboardBuffer = bufferStr;
            activeClock && activeClock._setSelectedValue(parseInt(this._keyboardBuffer));
            if (this._keyboardBuffer.length === 2 || parseInt(`${this._keyboardBuffer}0`) > entity.attributes.max) {
                // if buffer length is 2, or buffer value + one more (any) number is greater than clock's max value
                // there is no place for more entry - just set buffer as a value, and switch to the next clock
                this._resetCooldown(this._keyboardBuffer.length !== 2);
                this._keyboardBuffer = "";
                this._switchNextClock(false, true);
            }
        }
    }
    /**
     * Focuses the first available button.
     */
    _focusFirstButton() {
        this._activeIndex = 0;
        this._buttonComponent(0).focus();
    }
    /**
     * Sets the exact match value. Must be overriden.
     */
    _setExactMatch() {
        const clock = this._clockComponent(this._activeIndex);
        clock && this._exactMatch !== undefined && clock._setSelectedValue(this._exactMatch);
    }
    /**
     * Creates clock and button components according to the display format pattern.
     */
    _createComponents() {
        const time = {
            hours: parseInt(this._hours),
            minutes: parseInt(this._minutes),
            seconds: parseInt(this._seconds),
        };
        this._entities = [];
        this._periods = [];
        this._componentMap = {
            hours: -1,
            minutes: -1,
            seconds: -1,
        };
        if (this._hasHoursComponent) {
            // add Hours clock
            this._componentMap.hours = this._entities.length;
            this._entities.push({
                "label": this.hoursLabel,
                "entity": "hours",
                "itemMin": 1,
                "itemMax": this._hoursConfiguration.isTwelveHoursFormat ? 12 : 24,
                "value": time.hours,
                "stringValue": this._hours,
                "textValue": `${time.hours} ${this.hoursLabel}`,
                "displayStep": this._hoursConfiguration.isTwelveHoursFormat ? 1 : 2,
                "lastItemReplacement": this._hoursConfiguration.isTwelveHoursFormat ? -1 : 0,
                "hideFractions": !this._hoursConfiguration.isTwelveHoursFormat,
                "prependZero": this._zeroPaddedHours,
                "hasSeparator": this._entities.length > 0,
                "active": false,
                "skipAnimation": false,
                "attributes": {
                    "min": this._hoursConfiguration.minHour,
                    "max": this._hoursConfiguration.maxHour,
                    "step": 1,
                },
            });
        }
        if (this._hasMinutesComponent) {
            // add Minutes clock
            this._componentMap.minutes = this._entities.length;
            this._entities.push({
                "label": this.minutesLabel,
                "entity": "minutes",
                "itemMin": 1,
                "itemMax": 60,
                "value": time.minutes,
                "stringValue": this._minutes,
                "textValue": `${time.minutes} ${this.minutesLabel}`,
                "displayStep": 5,
                "lastItemReplacement": 0,
                "hideFractions": false,
                "prependZero": false,
                "hasSeparator": this._entities.length > 0,
                "active": false,
                "skipAnimation": false,
                "attributes": {
                    "min": 0,
                    "max": 59,
                    "step": 1,
                },
            });
        }
        if (this._hasSecondsComponent) {
            // add Seconds clock
            this._componentMap.seconds = this._entities.length;
            this._entities.push({
                "label": this.secondsLabel,
                "entity": "seconds",
                "itemMin": 1,
                "itemMax": 60,
                "value": time.seconds,
                "stringValue": this._seconds,
                "textValue": `${time.seconds} ${this.secondsLabel}`,
                "displayStep": 5,
                "lastItemReplacement": 0,
                "hideFractions": false,
                "prependZero": false,
                "hasSeparator": this._entities.length > 0,
                "active": false,
                "skipAnimation": false,
                "attributes": {
                    "min": 0,
                    "max": 59,
                    "step": 1,
                },
            });
        }
        this._entities[this._activeIndex].active = true;
        this._entities[this._activeIndex].skipAnimation = this._skipAnimation;
        this._createPeriodComponent();
    }
    /**
     * Switches to the specific clock by name.
     * @param clockName the name of the clock
     * @param skipAnimation whether to skip transition animation while displaying the next clock
     */
    _switchTo(clockName, skipAnimation = false) {
        const key = this._componentKey(clockName);
        if (this._componentMap[key] !== undefined) {
            this._switchClock(this._componentMap[key], skipAnimation);
        }
    }
    /**
     * Switches to the specific clock by its index in _clocks property.
     * @param clockIndex the index of the clock
     * @param skipAnimation whether to skip transition animation while displaying the next clock
     */
    _switchClock(clockIndex, skipAnimation = false) {
        if (this._activeIndex === clockIndex || !this._entities.length || clockIndex >= this._entities.length) {
            return;
        }
        const currentClockComponent = this._clockComponent(this._activeIndex);
        const newClockComponent = this._clockComponent(clockIndex);
        if (this._skipAnimation && clockIndex !== 0 && this._activeIndex === 0 && currentClockComponent) {
            currentClockComponent._skipAnimation = false;
            this._skipAnimation = skipAnimation;
        }
        if (newClockComponent && skipAnimation) {
            newClockComponent._skipAnimation = true;
            this._activateClock(clockIndex);
        }
        else {
            currentClockComponent?._firstNumberElement?.addEventListener("animationend", () => this._activateClock(clockIndex), { once: true });
            currentClockComponent?._clockWrapper?.classList.add("ui5-tp-clock-transition");
        }
    }
    /**
     * Makes specific clock active.
     * @param clockIndex the index of the clock to be activated
     */
    _activateClock(clockIndex) {
        const newButton = this._buttonComponent(clockIndex);
        this._entities[this._activeIndex].active = false;
        this._activeIndex = clockIndex;
        this._entities[this._activeIndex].active = true;
        newButton && newButton.focus();
    }
    /**
     * Switches to the next available clock.
     * @param wrapAround whether to switch to the first clock if there are no next clock
     * @param skipAnimation whether to skip transition animation while displaying the next clock
     */
    _switchNextClock(wrapAround = false, skipAnimation = false) {
        let activeIndex = this._activeIndex;
        const startActiveIndex = activeIndex;
        const activeClock = this._clockComponent(activeIndex);
        do {
            activeIndex++;
            if (activeIndex >= this._entities.length) {
                activeIndex = wrapAround ? 0 : this._entities.length - 1;
            }
            // false-positive finding of no-unmodified-loop-condition rule
            // eslint-disable-next-line no-unmodified-loop-condition
        } while (activeClock && activeClock.disabled && activeIndex !== startActiveIndex && (wrapAround || activeIndex < this._entities.length - 1));
        const newClock = this._clockComponent(activeIndex);
        if (activeIndex !== startActiveIndex && newClock && !newClock.disabled) {
            this._switchClock(activeIndex, skipAnimation);
        }
    }
    /**
     * Clock 'change' event handler.
     * @param evt Event object
     */
    _clockChange(evt) {
        const index = this._getIndexFromId(evt.target.id);
        const stringValue = evt.detail.stringValue;
        const value = evt.detail.value;
        const button = this._buttonComponent(index);
        if (!button) {
            return;
        }
        this._entities[index].stringValue = stringValue;
        this._entities[index].value = value;
        this._entities = JSON.parse(JSON.stringify(this._entities));
        switch (index) {
            case this._componentMap.hours:
                this._hoursChange(value);
                break;
            case this._componentMap.minutes:
                this._minutesChange(value);
                break;
            case this._componentMap.seconds:
                this._secondsChange(value);
                break;
        }
        if (evt.detail.finalChange) {
            if (this._activeIndex < this._entities.length - 1) {
                this._switchNextClock();
            }
            else {
                button.focus();
            }
        }
    }
};
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimeSelectionClocks.prototype, "_spacePressed", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimeSelectionClocks.prototype, "_focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimeSelectionClocks.prototype, "_amPmFocused", void 0);
__decorate([
    property({ type: Boolean })
], TimeSelectionClocks.prototype, "_skipAnimation", void 0);
TimeSelectionClocks = __decorate([
    event("close-picker", {
        bubbles: true,
    })
    /**
     * @class
     *
     * ### Overview
     *
     * `ui5-time-selection-clocks` is component that contains all the `ui5-time-picker-clock` components
     * necessary for the `ui5-time-picker` as well as all necessary `ui5-toggle-spin-button` components
     * used for switching between different clocks.
     * `ui5-time-picker-clock` components and `ui5-toggle-spin-button` depend on the time format set to
     * `ui5-time-picker` component.
     *
     * This component should not be used separately.
     * @constructor
     * @extends TimePickerInternals
     * @since 1.15.0
     * @private
     */
    ,
    customElement({
        tag: "ui5-time-selection-clocks",
        styles: TimeSelectionClocksCss,
        template: TimeSelectionClocksTemplate,
    })
], TimeSelectionClocks);
TimeSelectionClocks.define();
export default TimeSelectionClocks;
//# sourceMappingURL=TimeSelectionClocks.js.map