import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ToolbarLabel from "./ToolbarLabel.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
export default function VersioningTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx(ToolbarButton, { design: "Transparent", icon: "navigation-left-arrow", tooltip: this._previousButtonTooltip, accessibleName: this._previousButtonAccessibleName, disabled: this.currentStep <= 1, onClick: this.handlePreviousVersionClick, "data-ui5-versioning-button": "previous" }), _jsx(ToolbarLabel, { text: `${this.currentStep} / ${this.totalSteps}`, class: "version-step-counter" }), _jsx(ToolbarButton, { design: "Transparent", icon: "navigation-right-arrow", tooltip: this._nextButtonTooltip, accessibleName: this._nextButtonAccessibleName, disabled: this.totalSteps <= 0 || this.currentStep >= this.totalSteps, onClick: this.handleNextVersionClick, "data-ui5-versioning-button": "next" })] }));
}
//# sourceMappingURL=VersioningTemplate.js.map