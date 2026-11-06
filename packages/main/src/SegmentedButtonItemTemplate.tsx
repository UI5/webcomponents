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
			<Tooltip text={this.tooltip || this.slotTextContent} opener={`${this._id}-root`} />
		}
		</>
	);
}
