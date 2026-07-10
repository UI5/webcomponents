import type InputIcon from "./InputIcon.js";
import Icon from "./Icon.js";

export default function InputIconTemplate(this: InputIcon) {
	return (
		<>
			{!this.readonly &&
				<div
					class={{
						"ui5-input-icon-root": true,
						"inputIcon": true,
						"inputIcon--pressed": this._pressed,
						"inputIcon--focused": this._focused,
						"inputIcon--disabled": this.disabled,
					}}
					role="button"
					tabindex={this.effectiveTabIndex}
					aria-label={this.effectiveAriaLabel}
					aria-disabled={this.disabled}
					title={this.effectiveTitle}
					onClick={this._onclick}
					onMouseDown={this._onmousedown}
					onMouseUp={this._onmouseup}
					onMouseLeave={this._onmouseleave}
					onFocus={this._onfocus}
					onBlur={this._onblur}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					part="root"
				>
					{this.name && (
						<Icon
							name={this.name}
							class="ui5-input-icon-inner"
							aria-hidden="true"
						/>
					)}
				</div>
			}
		</>
	);
}
