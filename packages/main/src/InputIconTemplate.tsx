import type InputIcon from "./InputIcon.js";
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";

export default function InputIconTemplate(this: InputIcon) {
	return (
		<>
		<div
			id={`${this._id}-root`}
			class={{
				"ui5-input-icon-root": true,
				"inputIcon": true,
				"inputIcon--pressed": this._pressed,
				"inputIcon--focused": this._focused,
			}}
			role="button"
			tabindex={-1}
			aria-label={this.effectiveAriaLabel}
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
		{ this.effectiveTitle &&
			<Tooltip text={this.effectiveTitle} opener={`${this._id}-root`} />
		}
		</>
	);
}
