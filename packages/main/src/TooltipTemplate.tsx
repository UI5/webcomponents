import type Tooltip from "./Tooltip.js";
import Popover from "./Popover.js";

export default function TooltipTemplate(this: Tooltip) {
	return (
		<>
			<Popover
				class="ui5-tooltip-popover"
				opener={this.opener}
				placement={this.placement}
				open={this._open}
				onClose={this._onPopoverClose}
			>
				<span class="ui5-tooltip-text">{this.text}</span>
			</Popover>
			{this.text &&
				<span id={this._anchorId} role="tooltip" class="ui5-tooltip-aria-text">
					{this.text}
				</span>
			}
		</>
	);
}
