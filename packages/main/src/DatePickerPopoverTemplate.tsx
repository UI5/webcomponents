import type DatePicker from "./DatePicker.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import Icon from "./Icon.js";
import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

type TemplateHook = () => void;

export default function DatePickerPopoverTemplate(this: DatePicker, hooks?: { header?: TemplateHook, content?: TemplateHook, footer?: TemplateHook, initialFocus?: string }) {
	const header = hooks?.header || defaultHeader;
	const content = hooks?.content || defaultContent;
	const footer = hooks?.footer || defaultFooter;
	const initialFocus = hooks?.initialFocus;

	if (!this._shouldRenderPopover) {
		return;
	}

	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			class="ui5-date-picker-popover"
			opener={this}
			open={this.open}
			allowTargetOverlap
			placement="Bottom"
			horizontalAlign="Start"
			accessibleName={this.pickerAccessibleName}
			hideArrow={true}
			_hideHeader={this._shouldHideHeader}
			initialFocus={initialFocus}
			onKeyDown={this._onkeydown}
			onClose={this.onResponsivePopoverAfterClose}
			onOpen={this.onResponsivePopoverAfterOpen}
			onBeforeOpen={this.onResponsivePopoverBeforeOpen}
		>
			{ this.showHeader && header.call(this) }

			{ valueStateTextHeader.call(this) }

			{ content.call(this) }

			{ this.showFooter && footer.call(this) }
		</ResponsivePopover>
	);
}

function defaultHeader(this: DatePicker) {
	return (
		<div slot="header" class="ui5-responsive-popover-header">
			<div class="row">
				<span>{this._headerTitleText}</span>
				<Button
					class="ui5-responsive-popover-close-btn"
					icon={decline}
					design="Transparent"
					onClick={this._togglePicker}
				>
				</Button>
			</div>
		</div>
	);
}

function defaultContent(this: DatePicker) {
	return (
		<Calendar
			id={`${this._id}-calendar`}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this.secondaryCalendarType}
			formatPattern={this._formatPattern}
			selectionMode={this._calendarSelectionMode}
			minDate={this.minDate}
			maxDate={this.maxDate}
			calendarWeekNumbering={this.calendarWeekNumbering}
			onSelectionChange={this.onSelectedDatesChange}
			onShowMonthView={this.onHeaderShowMonthPress}
			onShowYearView={this.onHeaderShowYearPress}
			hideWeekNumbers={this.hideWeekNumbers}
			_currentPicker={this._calendarCurrentPicker}
			_pickersMode={this._calendarPickersMode}
		>
			{ this._calendarSelectedDates.map(date => <CalendarDate value={date}/>)}
		</Calendar>
	);
}

function valueStateMessage(this: DatePicker) {
	return (
		this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : <slot name="valueStateMessage"></slot>
	);
}

function valueStateTextHeader(this: DatePicker) {
	if (!this.hasValueStateText) {
		return;
	}

	return (
		<div
			slot={!isPhone() ? "header" : undefined}
			class={{
				"ui5-popover-header": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			}}
		>
			<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)}/>
			{ valueStateMessage.call(this) }
		</div>
	);
}

function valueStateMessageInputIcon(this: DatePicker) {
	const iconPerValueState = {
		Negative: error,
		Critical: alert,
		Positive: sysEnter2,
		Information: information,
	};

	return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}

function defaultFooter() {}
