import type Calendar from "./Calendar.js";
import Icon from "./Icon.js";

import slimArowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function CalendarTemplate(this: Calendar) {
	return (
		<div class="ui5-calheader-root">
			<div
				data-ui5-cal-header-btn-prev
				class={{
					"ui5-calheader-arrowbtn": true,
					"ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
				}}
				part="calendar-header-arrow-button"
				role="button"
				onMouseDown={this.onPrevButtonClick}
				tabindex={this._previousButtonDisabled ? -1 : 0}
				title={this.accInfo.tooltipPrevButton}
				aria-label={this.accInfo.ariaLabelPrevButton}
				aria-description={this.accInfo.ariaLabelPrevButton}
				aria-keyshortcuts={this.accInfo.keyShortcutPrevButton}
			>
				<Icon class="ui5-calheader-arrowicon" name={slimArowLeft}/>
			</div>

			<div class="ui5-calheader-midcontainer">
				<div
					data-ui5-cal-header-btn-month
					class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
					part="calendar-header-middle-button"
					hidden={this._isHeaderMonthButtonHidden}
					tabindex={0}
					role="button"
					aria-label={this.accInfo.ariaLabelMonthButton}
					aria-description={this.accInfo.ariaLabelMonthButton}
					title={this.accInfo.tooltipMonthButton}
					aria-keyshortcuts={this.accInfo.keyShortcutMonthButton}
					onClick={this.onHeaderMonthButtonPress}
					onKeyDown={this.onMonthButtonKeyDown}
					onKeyUp={this.onMonthButtonKeyUp}
				>
					<span>{this._headerMonthButtonText}</span>
					{this.hasSecondaryCalendarType &&
						<span class="ui5-calheader-btn-sectext">{this.secondMonthButtonText}</span>
					}
				</div>

				<div
					data-ui5-cal-header-btn-year
					class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
					part="calendar-header-middle-button"
					hidden={this._isHeaderYearButtonHidden}
					tabindex={0}
					role="button"
					aria-label={this.accInfo.ariaLabelYearButton}
					aria-description={this.accInfo.ariaLabelYearButton}
					onClick={this.onHeaderYearButtonPress}
					onKeyDown={this.onYearButtonKeyDown}
					onKeyUp={this.onYearButtonKeyUp}
					title={this.accInfo.tooltipYearButton}
					aria-keyshortcuts={this.accInfo.keyShortcutYearButton}
				>
					<span>{this._headerYearButtonText}</span>
					{this.hasSecondaryCalendarType &&
						<span class="ui5-calheader-btn-sectext">{this._headerYearButtonTextSecType}</span>
					}
				</div>
				<div
					data-ui5-cal-header-btn-year-range
					class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
					part="calendar-header-middle-button"
					hidden={this._isHeaderYearRangeButtonHidden}
					tabindex={0}
					role="button"
					aria-label={this.accInfo.ariaLabelYearRangeButton}
					aria-description={this.accInfo.ariaLabelYearRangeButton}
					title={this.accInfo.tooltipYearRangeButton}
					aria-keyshortcuts={this.accInfo.keyShortcutYearRangeButton}
					onClick={this.onHeaderYearRangeButtonPress}
					onKeyDown={this.onYearRangeButtonKeyDown}
					onKeyUp={this.onYearRangeButtonKeyUp}
				>
					<span>{this._headerYearRangeButtonText}</span>
					{this.hasSecondaryCalendarType &&
						<span class="ui5-calheader-btn-sectext">{this._headerYearRangeButtonTextSecType}</span>
					}
				</div>
			</div>

			<div
				data-ui5-cal-header-btn-next
				class={{
					"ui5-calheader-arrowbtn": true,
					"ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
				}}
				part="calendar-header-arrow-button"
				role="button"
				onMouseDown={this.onNextButtonClick}
				tabindex={this._nextButtonDisabled ? -1 : 0}
				title={this.accInfo.tooltipNextButton}
				aria-label={this.accInfo.ariaLabelNextButton}
				aria-description={this.accInfo.ariaLabelNextButton}
				aria-keyshortcuts={this.accInfo.keyShortcutNextButton}
			>
				<Icon class="ui5-calheader-arrowicon" name={slimArowRight}/>
			</div>
		</div>);
}
