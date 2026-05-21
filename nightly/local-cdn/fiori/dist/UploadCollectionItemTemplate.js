import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "@ui5/webcomponents/dist/Input.js";
import ListItemTemplate from "@ui5/webcomponents/dist/ListItemTemplate.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ProgressIndicator from "@ui5/webcomponents/dist/ProgressIndicator.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import refreshIcon from "@ui5/webcomponents-icons/dist/refresh.js";
import stopIcon from "@ui5/webcomponents-icons/dist/stop.js";
import editIcon from "@ui5/webcomponents-icons/dist/edit.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
const predefinedHooks = {
    listItemContent,
};
export default function UploadCollectionItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return ListItemTemplate.call(this, currentHooks);
}
function listItemContent() {
    return _jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-uci-thumbnail-and-content-container", children: [_jsx("div", { class: "ui5-uci-thumbnail", children: _jsx("slot", { name: "thumbnail" }) }), _jsxs("div", { class: "ui5-uci-content-and-progress", children: [_jsxs("div", { class: "ui5-uci-content", children: [this._editing ? (_jsxs("div", { class: "ui5-uci-edit-container", children: [_jsx(Input, { id: "ui5-uci-edit-input", "data-sap-focus-ref": true, onFocusIn: this._onInputFocusin, onKeyDown: this._onInputKeyDown }), _jsx("span", { class: "ui5-uci-file-extension", children: this._fileExtension })] })) : (this.fileNameClickable ? (_jsx(Link, { class: "ui5-uci-file-name", onClick: this._onFileNameClick, wrappingType: "None", children: this.fileName })) : (_jsx("span", { class: "ui5-uci-file-name ui5-uci-file-name-text", children: this.fileName }))), _jsx("div", { class: "ui5-uci-description", children: _jsx("slot", {}) })] }), this._showProgressIndicator && (_jsxs("div", { class: "ui5-uci-progress-box", children: [_jsx(ProgressIndicator, { class: "ui5-uci-progress-indicator", hideValue: true, value: this.progress, valueState: this.valueStateName }), _jsxs("div", { class: "ui5-uci-progress-labels", children: [_jsx(Label, { showColon: true, wrappingType: "None", children: this._progressText }), _jsxs(Label, { children: [this.progress, "%"] })] })] }))] })] }), _jsx("div", { class: "ui5-uci-buttons", children: this._editing ? (_jsxs(_Fragment, { children: [_jsx(Button, { design: "Transparent", class: "ui5-uci-edit-rename-btn", onClick: this._onRename, onKeyUp: this._onRenameKeyup, children: this._renameBtnText }), _jsx(Button, { design: "Transparent", id: "ui5-uci-edit-cancel", onClick: this._onRenameCancel, onKeyUp: this._onRenameCancelKeyup, children: this._cancelRenameBtnText })] })) : (_jsxs(_Fragment, { children: [this._showRetry && (_jsx(Button, { icon: refreshIcon, design: "Transparent", tooltip: this._retryButtonTooltip, onClick: this._onRetry, onKeyUp: this._onRetryKeyup })), this._showTerminate && (_jsx(Button, { icon: stopIcon, design: "Transparent", tooltip: this._terminateButtonTooltip, onClick: this._onTerminate, onKeyUp: this._onTerminateKeyup })), this.showEditButton && (_jsx(Button, { id: `${this._id}-editing-button`, design: "Transparent", tooltip: this._editButtonTooltip, icon: editIcon, onClick: this.onDetailClick, onKeyUp: this._onDetailKeyup, class: "ui5-li-detailbtn ui5-uci-edit" })), !this.hideDeleteButton && (this.hasDeleteButtonSlot ? (_jsx("slot", { name: "deleteButton" })) : (_jsx(Button, { class: "ui5-upload-collection-deletebtn", id: `${this._id}-deleteSelectionElement`, design: "Transparent", icon: declineIcon, disabled: this.disableDeleteButton, onClick: this._onDelete, tooltip: this.deleteText })))] })) })] });
}
//# sourceMappingURL=UploadCollectionItemTemplate.js.map