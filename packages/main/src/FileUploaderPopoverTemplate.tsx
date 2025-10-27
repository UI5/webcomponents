import type FileUploader from "./FileUploader.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

export default function FileUploaderPopoverTemplate(this: FileUploader) {
	return (
		<Popover
			preventInitialFocus={true}
			preventFocusRestore={true}
			hideArrow={true}
			placement="Bottom"
			horizontalAlign="Start"
			class="ui5-valuestatemessage-popover"
		>
			<div slot="header"
				class={{
					"ui5-valuestatemessage-root": true,
					"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
					"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
					"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
					"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
				}}
				style={{ width: `${this._formWidth}px` }}
			>
				{
					this._valueStateMessageInputIcon &&
						<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageInputIcon}/>
				}

				{ valueStateMessage.call(this) }
			</div>
		</Popover>
	);
}

function valueStateMessage(this: FileUploader) {
	return (
		<>
			{
				this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : <slot name="valueStateMessage"></slot>
			}
		</>
	);
}
