import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
class RadioButtonGroup {
    static hasGroup(groupName) {
        return this.groups.has(groupName);
    }
    static getGroup(groupName) {
        return this.groups.get(groupName);
    }
    static getCheckedRadioFromGroup(groupName) {
        return this.checkedRadios.get(groupName);
    }
    static removeGroup(groupName) {
        this.checkedRadios.delete(groupName);
        return this.groups.delete(groupName);
    }
    static addToGroup(radioBtn, groupName) {
        if (this.hasGroup(groupName)) {
            this.enforceSingleSelection(radioBtn, groupName);
            if (this.getGroup(groupName)) {
                this.getGroup(groupName).push(radioBtn);
            }
        }
        else {
            this.createGroup(radioBtn, groupName);
        }
        this.updateTabOrder(groupName);
    }
    static removeFromGroup(radioBtn, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        // Remove the radio button from the given group
        group.forEach((_radioBtn, idx, arr) => {
            if (radioBtn._id === _radioBtn._id) {
                return arr.splice(idx, 1);
            }
        });
        if (checkedRadio === radioBtn) {
            this.checkedRadios.set(groupName, null);
        }
        // Remove the group if it is empty
        if (!group.length) {
            this.removeGroup(groupName);
        }
        this.updateTabOrder(groupName);
    }
    static createGroup(radioBtn, groupName) {
        if (radioBtn.checked) {
            this.checkedRadios.set(groupName, radioBtn);
        }
        this.groups.set(groupName, [radioBtn]);
    }
    static selectNextItem(item, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const groupLength = group.length, currentItemPosition = group.indexOf(item);
        if (groupLength <= 1) {
            return;
        }
        const nextItemToFocus = this._nextFocusable(currentItemPosition, group);
        if (!nextItemToFocus) {
            return;
        }
        this.updateSelectionInGroup(nextItemToFocus, groupName);
    }
    static updateFormValidity(groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const hasRequired = group.some(r => r.required);
        const hasChecked = group.some(r => r.checked);
        group.forEach(r => {
            r._groupChecked = hasChecked;
            r._groupRequired = hasRequired;
        });
    }
    static updateTabOrder(groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const hasCheckedRadio = group.some(radioBtn => radioBtn.checked);
        group.filter(radioBtn => !radioBtn.disabled).forEach((radioBtn, idx) => {
            let activeElement = getActiveElement();
            if (activeElement?.classList.contains("ui5-radio-root")) {
                activeElement = activeElement.getRootNode();
                if (activeElement instanceof ShadowRoot) {
                    activeElement = activeElement.host;
                }
            }
            if (hasCheckedRadio) {
                if (activeElement?.hasAttribute("ui5-radio-button") && activeElement.readonly) {
                    radioBtn._tabIndex = activeElement === radioBtn && radioBtn.readonly ? 0 : -1;
                }
                else {
                    radioBtn._tabIndex = radioBtn.checked ? 0 : -1;
                }
            }
            else {
                radioBtn._tabIndex = idx === 0 ? 0 : -1;
            }
        });
    }
    static selectPreviousItem(item, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const groupLength = group.length, currentItemPosition = group.indexOf(item);
        if (groupLength <= 1) {
            return;
        }
        const previousItemToFocus = this._previousFocusable(currentItemPosition, group);
        if (!previousItemToFocus) {
            return;
        }
        this.updateSelectionInGroup(previousItemToFocus, groupName);
    }
    static selectItem(item, groupName) {
        this.updateSelectionInGroup(item, groupName);
        this.updateTabOrder(groupName);
        this.updateFormValidity(groupName);
    }
    static updateSelectionInGroup(radioBtnToSelect, groupName) {
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        if (checkedRadio && !radioBtnToSelect.readonly) {
            this._deselectRadio(checkedRadio);
            this.checkedRadios.set(groupName, radioBtnToSelect);
        }
        // the focusable radio buttons are the enabled and the read-only ones, but only the enabled are selectable
        if (radioBtnToSelect) {
            radioBtnToSelect.focus();
            if (!radioBtnToSelect.readonly) {
                this._selectRadio(radioBtnToSelect);
            }
            else {
                // Ensure updateTabOrder is called after focus
                setTimeout(() => {
                    this.updateTabOrder(groupName);
                }, 0);
            }
        }
    }
    static _deselectRadio(radioBtn) {
        if (radioBtn) {
            radioBtn.checked = false;
        }
    }
    static _selectRadio(radioBtn) {
        radioBtn.checked = true;
        radioBtn._checked = true;
        radioBtn.fireDecoratorEvent("change");
    }
    static _nextFocusable(pos, group) {
        if (!group) {
            return null;
        }
        const groupLength = group.length;
        let nextRadioToFocus = null;
        if (pos === groupLength - 1) {
            if (group[0].disabled) {
                return this._nextFocusable(1, group);
            }
            nextRadioToFocus = group[0];
        }
        else if (group[pos + 1].disabled) {
            return this._nextFocusable(pos + 1, group);
        }
        else {
            nextRadioToFocus = group[pos + 1];
        }
        return nextRadioToFocus;
    }
    static _previousFocusable(pos, group) {
        const groupLength = group.length;
        let previousRadioToFocus = null;
        if (pos === 0) {
            if (group[groupLength - 1].disabled) {
                return this._previousFocusable(groupLength - 1, group);
            }
            previousRadioToFocus = group[groupLength - 1];
        }
        else if (group[pos - 1].disabled) {
            return this._previousFocusable(pos - 1, group);
        }
        else {
            previousRadioToFocus = group[pos - 1];
        }
        return previousRadioToFocus;
    }
    static enforceSingleSelection(radioBtn, groupName) {
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        if (radioBtn.checked) {
            if (!checkedRadio) {
                this.checkedRadios.set(groupName, radioBtn);
            }
            else if (radioBtn !== checkedRadio) {
                this._deselectRadio(checkedRadio);
                this.checkedRadios.set(groupName, radioBtn);
            }
        }
        else if (radioBtn === checkedRadio) {
            this.checkedRadios.set(groupName, null);
        }
        this.updateTabOrder(groupName);
        this.updateFormValidity(groupName);
    }
    static get groups() {
        if (!this._groups) {
            this._groups = new Map();
        }
        return this._groups;
    }
    static get checkedRadios() {
        if (!this._checkedRadios) {
            this._checkedRadios = new Map();
        }
        return this._checkedRadios;
    }
}
export default RadioButtonGroup;
//# sourceMappingURL=RadioButtonGroup.js.map