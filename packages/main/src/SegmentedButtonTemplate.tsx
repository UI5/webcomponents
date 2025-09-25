import type SegmentedButton from "./SegmentedButton.js";

export default function SegmentedButtonTemplate(this: SegmentedButton) {
	return (
		<ul
			role="listbox"
			class="ui5-segmented-button-root"
			onClick={this._onclick}
			onMouseDown={this._onmousedown}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onFocusIn={this._onfocusin}
			aria-multiselectable={this.selectionMode === "Multiple" ? "true" : "false"}
			aria-orientation="horizontal"
			aria-description={this.ariaDescriptionText}
			aria-label={this.ariaLabelText}
			aria-roledescription={this.ariaRoleDescription}
		>
			<slot></slot>
		</ul>
	);
}
