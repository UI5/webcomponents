import type DynamicDateRange from "./DynamicDateRange.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import Button from "./Button.js";
import Title from "./Title.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import ListItemType from "./types/ListItemType.js";

export default function DynamicDateRangePopoverTemplate(this: DynamicDateRange) {
	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			opener={this}
			open={this.open}
			allowTargetOverlap
			placement="Bottom"
			horizontalAlign="Start"
			hideArrow={true}
			_hideHeader={true}
			onClose={this.onPopoverClose}
			onBeforeOpen={this.onPopoverBeforeOpen}
			onKeyDown={this.onKeyDownPopover}
		>
			{this._hasCurrentOptionTemplate &&
				<div slot="header" class="ui5-ddr-header">
					<Button
						iconOnly={true}
						icon={slimArrowLeft}
						design="Transparent"
						onClick={this.onButtonBackClick}
						tooltip={this.tooltipNavigationIcon}>
					</Button>
					<Title>{this._currentOption?.text}</Title>
				</div>
			}
			{!this._hasCurrentOptionTemplate ? <div class="ui5-dynamic-date-range-options">
				<List
					class="ui5-dynamic-date-range-options-list"
					separators="None"
					selectionMode="Single"
					onItemClick={this._selectOption}
				>
					{this.optionsObjects.map(option => (
						<ListItemStandard
							selected={option.operator === this.value?.operator}
							iconEnd={true}
							icon={option.icon}
							wrappingType="Normal"
							type={option.template ? ListItemType.Navigation : ListItemType.Active}
						>
							{option.text}
						</ListItemStandard>
					))}
				</List>
			</div>
				:
				<div class="ui5-dynamic-date-range-option-container">
					{this._currentOption?.template?.call(this)}
					<div class="ui5-ddr-current-value">{this.currentValueText}</div>
				</div>
			}
			{this._hasCurrentOptionTemplate &&
				<div slot="footer">
					<Button
						design="Emphasized"
						onClick={this._submitValue}
					>Submit</Button>
					<Button
						design="Transparent"
						onClick={this._close}
					>Close</Button>
				</div>
			}
		</ResponsivePopover>
	);
}
