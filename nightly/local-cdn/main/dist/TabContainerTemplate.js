import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import DropIndicator from "./DropIndicator.js";
import Button from "./Button.js";
import TabContainerPopoverTemplate from "./TabContainerPopoverTemplate.js";
function contentArea() {
    return (_jsx("div", { class: {
            "ui5-tc__content": true,
            "ui5-tc__content--collapsed": this._contentCollapsed,
        }, part: "content", children: _jsx("div", { class: "ui5-tc__contentItem", id: "ui5-tc-content", hidden: this._selectedTab?.effectiveHidden, role: "tabpanel", "aria-labelledby": this._selectedTab?._id, children: this.items.map(item => _jsx("slot", { name: item._effectiveSlotName })) }) }));
}
const defaultPartials = {
    contentArea,
};
export default function TabContainerTemplate(injectedPartials) {
    const partials = {
        ...defaultPartials,
        ...injectedPartials,
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-tc-root": true,
                    "ui5-tc--textOnly": this.textOnly,
                    "ui5-tc--withAdditionalText": this.withAdditionalText,
                    "ui5-tc--standardTabLayout": this.standardTabLayout,
                    "ui5-tc--noTabSelected": !this._selectedTab,
                }, children: [this.tabsAtTheBottom && partials.contentArea.call(this), _jsxs("div", { class: "ui5-tc__header", id: `${this._id}-header`, onFocusIn: this._onHeaderFocusin, onDragStart: this._onDragStart, onDragEnter: this._onHeaderDragEnter, onDragOver: this._onHeaderDragOver, onDrop: this._onHeaderDrop, onDragLeave: this._onHeaderDragLeave, part: "tabstrip", children: [_jsx("div", { class: "ui5-tc__overflow ui5-tc__overflow--start", onClick: this._onOverflowClick, onKeyDown: this._onOverflowKeyDown, hidden: true, children: this.startOverflowButton.length ?
                                    _jsx("slot", { name: "startOverflowButton" })
                                    : // else
                                        _jsx(Button, { endIcon: this.overflowMenuIcon, "data-ui5-stable": "overflow-start", tooltip: this.overflowMenuTitle, accessibilityAttributes: this.overflowBtnAccessibilityAttributes, children: this._startOverflowText }) }), _jsx("div", { id: `${this._id}-tabStrip`, class: "ui5-tc__tabStrip", role: "tablist", "aria-describedby": this.tablistAriaDescribedById, onClick: this._onTabStripClick, onKeyDown: this._onTabStripKeyDown, onKeyUp: this._onTabStripKeyUp, children: this.items.map(item => item.stripPresentation) }), _jsx("div", { class: "ui5-tc__overflow ui5-tc__overflow--end", onClick: this._onOverflowClick, onKeyDown: this._onOverflowKeyDown, hidden: true, children: this.overflowButton.length ?
                                    _jsx("slot", { name: "overflowButton" })
                                    :
                                        _jsx(Button, { endIcon: this.overflowMenuIcon, "data-ui5-stable": "overflow-end", tooltip: this.overflowMenuTitle, accessibilityAttributes: this.overflowBtnAccessibilityAttributes, children: this._endOverflowText }) }), _jsx(DropIndicator, { orientation: "Vertical", ownerReference: this })] }), !this.tabsAtTheBottom && partials.contentArea.call(this), this.hasItems &&
                        _jsx("span", { id: `${this._id}-invisibleText`, class: "ui5-hidden-text", children: this.accInvisibleText })] }), TabContainerPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=TabContainerTemplate.js.map