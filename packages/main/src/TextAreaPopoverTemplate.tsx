import Icon from "./Icon.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import type TextArea from "./TextArea.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

const IconPerValueState = {
	Negative: error,
	Critical: alert,
	Positive: sysEnter2,
	Information: information,
};

export default function TextAreaPopoverTemplate(this: TextArea) {
	return (
		<>
			{this.displayValueStateMessagePopover &&
			<Popover
				preventFocusRestore={true}
				hideArrow={true}
				preventInitialFocus={true}
				class="ui5-valuestatemessage-popover"
				style={{ "max-width": `${this._width!}px` }}
				placement="Bottom"
				horizontalAlign={PopoverHorizontalAlign.Start}
			>
				<div slot="header" class={{
					"ui5-valuestatemessage-root": true,
					...this.classes.valueStateMsg,
				}}>
					<Icon class="ui5-input-value-state-message-icon" name={valueStateIcon.call(this)} />
					{valueStateMessage.call(this)}
				</div>
			</Popover>
			}
		</>
	);
}

function valueStateMessage(this: TextArea) {
	return this.hasCustomValueState ? <slot name="valueStateMessage"></slot> : this.valueStateDefaultText;
}

function valueStateIcon(this: TextArea) {
	return this.valueState !== ValueState.None ? IconPerValueState[this.valueState] : "";
}
