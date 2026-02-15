import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import verticalGripIcon from "@ui5/webcomponents-icons/dist/vertical-grip.js";
import slimdArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import slimdArrowLefttIcon from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
export default function FlexibleColumnLayoutTemplate() {
    const hasAnimation = getAnimationMode() !== AnimationMode.None;
    return (_jsxs("div", { class: "ui5-fcl-root", children: [_jsxs("div", { role: this._accAttributes.columns.start.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--start": true,
                    "ui5-fcl-column--hidden": isColumnHidden(this.startColumnVisible, this.isStartColumnCollapsing),
                }, "aria-hidden": this._accAttributes.columns.start.ariaHidden, "aria-labelledby": `${this._id}-startColumnText`, children: [_jsx("span", { id: `${this._id}-startColumnText`, class: "ui5-hidden-text", children: this.accStartColumnText }), _jsx("slot", { name: "startColumn", "aria-hidden": this._accAttributes.columns.start.ariaHidden })] }), _jsxs("div", { role: this.accStartSeparatorRole, title: this.accStartSeparatorText, class: "ui5-fcl-separator ui5-fcl-separator-start", style: { display: this.showStartSeparator ? "flex" : "none" }, tabindex: this.startSeparatorTabIndex, "aria-valuenow": this.startSeparatorValue, onMouseDown: this.onSeparatorPress, onTouchStart: this.onSeparatorPress, onKeyDown: this._onSeparatorKeydown, onKeyUp: this._onSeparatorKeyUp, children: [this.showStartSeparatorArrow && arrowStart.call(this), gripStart.call(this)] }), _jsxs("div", { role: this._accAttributes.columns.middle.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--middle": true,
                    "ui5-fcl-column--hidden": isColumnHidden(this.midColumnVisible, this.isMidColumnCollapsing),
                }, "aria-hidden": this._accAttributes.columns.middle.ariaHidden, "aria-labelledby": `${this._id}-midColumnText`, children: [_jsx("span", { id: `${this._id}-midColumnText`, class: "ui5-hidden-text", children: this.accMiddleColumnText }), _jsx("slot", { name: "midColumn", "aria-hidden": this._accAttributes.columns.middle.ariaHidden })] }), _jsx("div", { role: this.accEndSeparatorRole, title: this.accEndSeparatorText, class: "ui5-fcl-separator ui5-fcl-separator-end", style: { display: this.showEndSeparator ? "flex" : "none" }, tabindex: this.endSeparatorTabIndex, "aria-valuenow": this.endSeparatorValue, onMouseDown: this.onSeparatorPress, onTouchStart: this.onSeparatorPress, onKeyDown: this._onSeparatorKeydown, onKeyUp: this._onSeparatorKeyUp, children: gripEnd.call(this) }), _jsxs("div", { role: this._accAttributes.columns.end.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--end": true,
                    "ui5-fcl-column--hidden": isColumnHidden(this.endColumnVisible, this.isEndColumnCollapsing),
                }, "aria-hidden": this._accAttributes.columns.end.ariaHidden, "aria-labelledby": `${this._id}-endColumnText`, children: [_jsx("span", { id: `${this._id}-endColumnText`, class: "ui5-hidden-text", children: this.accEndColumnText }), _jsx("slot", { name: "endColumn", "aria-hidden": this._accAttributes.columns.end.ariaHidden })] })] }));
}
function arrowStart() {
    return (_jsx(Button, { icon: this.startArrowDirection === "backward" ? slimdArrowLefttIcon : slimdArrowRightIcon, design: "Transparent", onClick: this.switchLayoutOnArrowPress, onKeyDown: this._onArrowKeydown, class: "ui5-fcl-arrow ui5-fcl-arrow--start" }));
}
function gripStart() {
    return (_jsx("div", { class: "ui5-fcl-grip ui5-fcl-grip--start", style: { display: this.showStartSeparatorGrip ? "flex" : "none" }, children: _jsx(Icon, { name: verticalGripIcon, class: "ui5-fcl-grip-icon" }) }));
}
function gripEnd() {
    return (_jsx("div", { class: "ui5-fcl-grip ui5-fcl-grip--end", style: { display: this.showEndSeparatorGrip ? "flex" : "none" }, children: _jsx(Icon, { name: verticalGripIcon, class: "ui5-fcl-grip-icon" }) }));
}
function isColumnHidden(isColumnVisible, isColumnCollapseInProgress) {
    return !isColumnVisible && !isColumnCollapseInProgress;
}
//# sourceMappingURL=FlexibleColumnLayoutTemplate.js.map