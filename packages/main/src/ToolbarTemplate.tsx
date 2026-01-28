import Button from "./Button.js";
import type Toolbar from "./Toolbar.js";
import Popover from "./Popover.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";

export default function ToolbarTemplate(this: Toolbar) {
	return (<>
		<div
			class={{
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
			}}
			role={this.accInfo.root.role}
			aria-label={this.accInfo.root.accessibleName}
		>
			{this.standardItems.map(item => {
				if ("styles" in item) {
					return (
						<div class="ui5-tb-item" id={item._individualSlot} style={item.styles as string}>
							<slot name={item._individualSlot}></slot>
						</div>
					);
				}
				return (
					<div class="ui5-tb-item" id={item._individualSlot}>
						<slot name={item._individualSlot}></slot>
					</div>
				);
			})}
			<Button
				aria-hidden={this.hideOverflowButton}
				icon={overflowIcon}
				design="Transparent"
				onClick={this.toggleOverflow}
				class={{
					"ui5-tb-item": true,
					"ui5-tb-overflow-btn": true,
					"ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
				}}
				tooltip={this.accInfo.overflowButton.tooltip}
				accessibleName={this.accInfo.overflowButton.accessibleName}
				accessibilityAttributes={this.accInfo.overflowButton.accessibilityAttributes}
			/>
		</div>

		<Popover
			class="ui5-overflow-popover"
			placement="Bottom"
			horizontalAlign="End"
			onClose={this.onOverflowPopoverClosed}
			onOpen={this.onOverflowPopoverOpened}
			accessibleName={this.accInfo.popover.accessibleName}
			hideArrow={true}
		>
			<div class={{
				"ui5-overflow-list": true
			}}>
				{this.overflowItems.map(item => {
					if (item.isSeparator) {
						return (
							<div class="ui5-tb-popover-item ui5-tb-separator ui5-tb-separator-in-overflow" id={item._individualSlot}>
								<slot name={item._individualSlot}></slot>
							</div>
						);
					}
					return (
						<div class="ui5-tb-popover-item" id={item._individualSlot}>
							<slot name={item._individualSlot}></slot>
						</div>
					);
				})}
			</div>
		</Popover>
	</>);
}
