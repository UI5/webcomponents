import type RadioButton from "./RadioButton.js";
declare class RadioButtonGroup {
    static _groups: Map<string, Array<RadioButton>>;
    static _checkedRadios: Map<string, RadioButton | null>;
    static hasGroup(groupName: string): boolean;
    static getGroup(groupName: string): RadioButton[] | undefined;
    static getCheckedRadioFromGroup(groupName: string): RadioButton | null | undefined;
    static removeGroup(groupName: string): boolean;
    static addToGroup(radioBtn: RadioButton, groupName: string): void;
    static removeFromGroup(radioBtn: RadioButton, groupName: string): void;
    static createGroup(radioBtn: RadioButton, groupName: string): void;
    static selectNextItem(item: RadioButton, groupName: string): void;
    static updateFormValidity(groupName: string): void;
    static updateTabOrder(groupName: string): void;
    static selectPreviousItem(item: RadioButton, groupName: string): void;
    static selectItem(item: RadioButton, groupName: string): void;
    static updateSelectionInGroup(radioBtnToSelect: RadioButton, groupName: string): void;
    static _deselectRadio(radioBtn: RadioButton): void;
    static _selectRadio(radioBtn: RadioButton): void;
    static _nextFocusable(pos: number, group: RadioButton[]): RadioButton | null;
    static _previousFocusable(pos: number, group: RadioButton[]): RadioButton | null;
    static enforceSingleSelection(radioBtn: RadioButton, groupName: string): void;
    static get groups(): Map<string, RadioButton[]>;
    static get checkedRadios(): Map<string, RadioButton | null>;
}
export default RadioButtonGroup;
