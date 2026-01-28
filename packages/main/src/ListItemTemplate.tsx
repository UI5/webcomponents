import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type ListItem from "./ListItem.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import editIcon from "@ui5/webcomponents-icons/dist/edit.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";

export type ListItemHooks = {
	listItemPreContent: JsxTemplate
	listItemContent: JsxTemplate
	imageBegin: JsxTemplate
	iconBegin: JsxTemplate
	iconEnd: JsxTemplate
	selectionElement: JsxTemplate
}

const predefinedHooks: ListItemHooks = {
	listItemPreContent,
	listItemContent,
	imageBegin,
	iconBegin,
	iconEnd,
	selectionElement,
};

export default function ListItemTemplate(this: ListItem, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return <li
		part="native-li"
		data-sap-focus-ref
		tabindex={this._effectiveTabIndex}
		class={this.classes.main}
		onFocusIn={this._onfocusin}
		onFocusOut={this._onfocusout}
		onKeyUp={this._onkeyup}
		onKeyDown={this._onkeydown}
		onMouseUp={this._onmouseup}
		onMouseDown={this._onmousedown}
		onTouchStart={this._onmousedown}
		onTouchEnd={this._ontouchend}
		onClick={this._onclick}
		draggable={this.movable}
		onDragStart={this._ondragstart}
		onDragEnd={this._ondragend}
		role={this._accInfo.role}
		title={this._accInfo.tooltip}
		aria-expanded={this._accInfo.ariaExpanded}
		aria-level={this._accInfo.ariaLevel}
		aria-haspopup={this._accInfo.ariaHaspopup}
		aria-posinset={this._accInfo.posinset}
		aria-setsize={this._accInfo.setsize}
		aria-describedby={`${this._id}-invisibleText-describedby`}
		aria-labelledby={this._accessibleNameRef}
		aria-disabled={this._ariaDisabled}
		aria-selected={this._accInfo.ariaSelected}
		aria-checked={this._accInfo.ariaChecked}
		aria-owns={this._accInfo.ariaOwns}
		aria-keyshortcuts={this._accInfo.ariaKeyShortcuts}
	>
		{currentHooks.listItemPreContent.call(this)}

		{this.placeSelectionElementBefore && selectionElement.call(this)}

		{this._hasHighlightColor && <div class="ui5-li-highlight"></div>}

		<div part="content" id={`${this._id}-content`} class="ui5-li-content">
			{currentHooks.imageBegin.call(this)}
			{currentHooks.iconBegin.call(this)}
			{currentHooks.listItemContent.call(this)}
		</div>

		{currentHooks.iconEnd.call(this)}

		{this.typeDetail && (
			<div class="ui5-li-detailbtn">
				<Button
					part="detail-button"
					design="Transparent"
					onClick={this.onDetailClick}
					icon={editIcon}
				/>
			</div>
		)}

		{this.typeNavigation && (
			<Icon name={slimArrowRightIcon} />
		)}

		{this.navigated && (
			<div class="ui5-li-navigated"></div>
		)}

		{this.placeSelectionElementAfter && (currentHooks.selectionElement.call(this))}

		<span
			id={`${this._id}-invisibleText`}
			class="ui5-hidden-text">
			{this.ariaLabelledByText}
		</span>
		<span
			id={`${this._id}-invisibleText-describedby`}
			class="ui5-hidden-text">
			{this._accInfo.ariaSelectedText}
		</span>

	</li >;
}

function listItemPreContent(this: ListItem) { }
function listItemContent(this: ListItem) { }
function imageBegin(this: ListItem) { }
function iconBegin(this: ListItem) { }
function iconEnd(this: ListItem) { }
function selectionElement(this: ListItem) {
	switch (true) {
	case this.modeSingleSelect:
		return (
			<RadioButton
				part="radio"
				disabled={this.isInactive}
				accessibleName={this._accInfo.ariaLabelRadioButton}
				tabindex={-1}
				id={`${this._id}-singleSelectionElement`}
				class="ui5-li-singlesel-radiobtn"
				checked={this.selected}
				onChange={this.onSingleSelectionComponentPress}
			/>
		);
	case this.modeMultiple:
		return (
			<CheckBox
				part="checkbox"
				disabled={this.isInactive}
				indeterminate={this.indeterminate}
				tabindex={-1}
				id={`${this._id}-multiSelectionElement`}
				class="ui5-li-multisel-cb"
				checked={this.selected}
				accessibleName={this._accInfo.ariaLabel}
				onChange={this.onMultiSelectionComponentPress}
			/>
		);
	case this.modeDelete:
		return (
			<div class="ui5-li-deletebtn">
				{
					this.hasDeleteButtonSlot ?
						(
							<slot name="deleteButton"></slot>
						) : (
							<Button
								part="delete-button"
								tabindex={-1}
								data-sap-no-tab-ref
								id={`${this._id}-deleteSelectionElement`}
								design="Transparent"
								icon={declineIcon}
								onClick={this.onDelete}
								tooltip={this.deleteText}
							/>
						)
				}
			</div >
		);
	}
}
