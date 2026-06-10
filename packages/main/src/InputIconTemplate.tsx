import type InputIcon from "./InputIcon.js";

export default function InputIconTemplate(this: InputIcon) {
	return (
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
			aria-label={this.accessibleName}
			aria-pressed={this._pressed}
			aria-disabled={this.disabled}
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
			{this.pathData.length > 0 && (
				<svg
					class="ui5-input-icon-svg"
					part="svg"
					viewBox={this.viewBox}
					xmlns="http://www.w3.org/2000/svg"
					focusable="false"
					aria-hidden="true"
				>
					{this.hasIconTooltip && (
						<title>{this.accessibleName}</title>
					)}
					<g role="presentation">
						{this.pathData.map((path: string) => <path d={path}></path>)}
					</g>
				</svg>
			)}
		</div>
	);
}
