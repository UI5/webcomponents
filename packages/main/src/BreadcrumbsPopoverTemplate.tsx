import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type Breadcrumbs from "./Breadcrumbs.js";
import Button from "./Button.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ResponsivePopover from "./ResponsivePopover.js";

export default function BreadcrumbsPopoverTemplate(this: Breadcrumbs) {
	const itemsToDisplay = isPhone()
		? this._mobilePopoverItems
		: this._overflowItemsData;

	return (
		<ResponsivePopover
			class="ui5-breadcrumbs-popover"
			hideArrow={true}
			_hideHeader={true}
			contentOnlyOnDesktop={true}
			placement="Bottom"
			horizontalAlign="Start"
			accessibleName={this._accessibleNamePopover}
			onKeyDown={this._onkeydown}
		>
			<List
				selectionMode="Single"
				separators="None"
				onSelectionChange={this._onOverflowListItemSelect}
			>
				{itemsToDisplay.map(item =>
					<ListItemStandard
						id={`${item._id}-li`}
						accessibleName={item.accessibleName}
						data-ui5-stable={item.stableDomRef}
					>
						{item.textContent}
					</ListItemStandard>
				)}
			</List>

			<div slot="footer" class="ui5-breadcrumbs-popover-footer">
				<Button
					design="Transparent"
					onClick={this._closeRespPopover}
				>{this._cancelButtonText}</Button>
			</div>
		</ResponsivePopover>
	);
}
