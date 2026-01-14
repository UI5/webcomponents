import type Menu from "./Menu.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";

export default function MenuTemplate(this: Menu) {
	return (
		<ResponsivePopover
			id={`${this._id}-menu-rp`}
			class="ui5-menu-rp"
			placement={this.placement}
			verticalAlign="Bottom"
			horizontalAlign={this.horizontalAlign}
			opener={this.opener}
			open={this.open}
			preventInitialFocus={true}
			hideArrow={true}
			allowTargetOverlap={true}
			accessibleName={this.accessibleNameText}
			onBeforeOpen={this._beforePopoverOpen}
			onOpen={this._afterPopoverOpen}
			onBeforeClose={this._beforePopoverClose}
			onClose={this._afterPopoverClose}
		>
			{this.isPhone &&
				<div slot="header" class="ui5-menu-dialog-header">
					<div class="ui5-menu-dialog-title">
						<h1>
							{this.headerText}
						</h1>
					</div>
				</div>
			}
			<div
				id={`${this._id}-menu-main`}
			>
				{this.items.length ?
					(<List
						id={`${this._id}- menu-list`}
						selectionMode="None"
						loading={this.loading}
						loadingDelay={this.loadingDelay}
						separators="None"
						accessibleRole="Menu"
						onItemClick={this._itemClick}
						onMouseOver={this._itemMouseOver}
						onKeyDown={this._itemKeyDown}
						// handles event from slotted children
						onui5-close-menu={this._close}
						onui5-exit-end-content={this._navigateOutOfEndContent}
					>
						<slot></slot>
					</List>)
					: this.loading && (<BusyIndicator
						id={`${this._id}-menu-busy-indicator`}
						delay={this.loadingDelay}
						class="ui5-menu-busy-indicator"
						active={true}
					/>
					)
				}
			</div>
			{this.isPhone &&
				<div slot="footer" class="ui5-menu-dialog-footer">
					<Button
						design="Transparent"
						onClick={this._close}
					>
						{this.labelCancel}
					</Button>
				</div>
			}
		</ResponsivePopover >
	);
}
