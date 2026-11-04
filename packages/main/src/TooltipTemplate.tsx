import type Tooltip from "./Tooltip.js";
import Popover from "./Popover.js";

export default function TooltipTemplate(this: Tooltip) {
	return (
		<Popover
			class="ui5-tooltip-popover"
			opener={this.opener}
			placement={this.placement}
			horizontalAlign={this.horizontalAlign}
			open={this._open}
			onClose={this._onPopoverClose}
		>
			<span class="ui5-tooltip-text">{this.text}</span>
		</Popover>
	);
}
