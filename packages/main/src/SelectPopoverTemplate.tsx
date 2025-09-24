import type Select from "./Select.js";
import List from "./List.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import Title from "./Title.js";

export default function SelectPopoverTemplate(this: Select) {
	return (
		<>
			{this.options.length > 0 &&
				<ResponsivePopover
					id={this.responsivePopoverId}
					class={{
						"ui5-select-popover": true,
						...this.classes.popover
					}}
					part="popover"
					style={this.styles.responsivePopover}
					placement="Bottom"
					horizontalAlign="Start"
					hideArrow={true}
					preventInitialFocus={true}
					onOpen={this._afterOpen}
					onBeforeOpen={this._beforeOpen}
					onClose={this._afterClose}
					onKeyDown={this._onkeydown}
					accessibleName={this._isPhone ? this._headerTitleText : undefined}
				>
					{this._isPhone &&
						<div slot="header" class="ui5-responsive-popover-header">
							<div class="row">
								<Title>{this._headerTitleText}</Title>
								<Button
									class="ui5-responsive-popover-close-btn"
									icon={decline}
									design="Transparent"
									onClick={this._toggleRespPopover} />
							</div>

							{this.hasValueStateText &&
								<div class={{
									"row": true,
									"ui5-select-value-state-dialog-header": true,
									...this.classes.popoverValueState
								}}>
									{this._isPickerOpen && valueStateMessage.call(this)}
								</div>
							}
						</div>
					}

					{!this._isPhone && this.hasValueStateText &&
						<div
							class={this.classes.popoverValueState}
							style={this.styles.responsivePopoverHeader}>
							<Icon
								class="ui5-input-value-state-message-icon"
								name={this._valueStateMessageInputIcon} />
							{this._isPickerOpen && valueStateMessage.call(this)}
						</div>
					}

					<List
						separators="None"
						onMouseDown={this._itemMousedown}
						onItemClick={this._handleItemPress}
						accessibleRole="ListBox"
					>
						<slot></slot>
					</List>
				</ResponsivePopover>
			}

			{this.shouldOpenValueStateMessagePopover &&
				<Popover
					part="popover"
					class="ui5-valuestatemessage-popover"
					preventInitialFocus={true}
					preventFocusRestore={true}
					hideArrow={true}
					placement="Bottom"
					horizontalAlign="Start"
				>
					<div
						class={this.classes.popoverValueState}
						style={this.styles.popoverHeader}>
						<Icon
							class="ui5-input-value-state-message-icon"
							name={this._valueStateMessageInputIcon} />
						{valueStateMessage.call(this)}
					</div>
				</Popover>
			}
		</>
	);
}

function valueStateMessage(this: Select) {
	return (
		<>
			{this.shouldDisplayDefaultValueStateMessage
				? this.valueStateText
				: <slot onClick={this._applyFocus} name="valueStateMessage"></slot>
			}
		</>
	);
}
