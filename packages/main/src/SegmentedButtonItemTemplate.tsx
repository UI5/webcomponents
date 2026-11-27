import type SegmentedButtonItem from "./SegmentedButtonItem.js";
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";

export default function SegmentedButtonItemTemplate(this: SegmentedButtonItem) {
	return (
		<>
		<li
			id={`${this._id}-root`}
			role="option"
			class="ui5-segmented-button-item-root"
			aria-posinset={this.posInSet}
			aria-setsize={this.sizeOfSet}
			aria-selected={this.selected}
			aria-disabled={this.disabled}
			data-sap-focus-ref
			onClick={this._onclick}
			onKeyUp={this._onkeyup}
			tabindex={this.tabIndexValue ? parseInt(this.tabIndexValue) : undefined }
			aria-label={this.ariaLabelText}
			aria-description={this.ariaDescriptionText}
			data-ui5-has-tooltip={(this.tooltip || this.slotTextContent) ? `${this._id}-tooltip` : undefined}
		>
			{this.icon &&
				<Icon
					part="icon"
					class="ui5-segmented-button-item-icon"
					name={this.icon}
					showTooltip={this.showIconTooltip}
				/>
			}
			<span id={`${this._id}-content`} class="ui5-segmented-button-item-text">
				<bdi>
					<slot></slot>
				</bdi>
			</span>
		</li>
		{ (this.tooltip || this.slotTextContent) &&
			// Review (double-announcement): a custom `tooltip` is already announced
			// via `aria-description={this.ariaDescriptionText}` (guarded by
			// `ariaLabelText !== tooltip`), so no `aria-describedby` here. Tooltip is
			// visual only; `data-ui5-has-tooltip` drives the gesture.
			<Tooltip id={`${this._id}-tooltip`}>{this.tooltip || this.slotTextContent}</Tooltip>
		}
		</>
	);
}
