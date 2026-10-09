import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import type ProductSwitch from "./ProductSwitch.js";

export default function ProductSwitchTemplate(this: ProductSwitch) {
	const content = (
		<div
			role="menu"
			class="ui5-product-switch-root"
			aria-label={this._ariaLabelText}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onClick={this.handleProductSwitchItemClick}
		>
			<slot></slot>
		</div>
	);

	// Only wrap in BusyIndicator while loading, so the default layout keeps
	// `.ui5-product-switch-root` a direct child of the host - preserving the
	// `justify-content: inherit` / `align-items: inherit` cascade from the host.
	return this.loading
		? <BusyIndicator active={true} class="ui5-product-switch-busy-indicator">{content}</BusyIndicator>
		: content;
}
