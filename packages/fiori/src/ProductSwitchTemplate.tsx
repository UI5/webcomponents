import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import type ProductSwitch from "./ProductSwitch.js";

export default function ProductSwitchTemplate(this: ProductSwitch) {
	return (
		<BusyIndicator
			active={this.loading}
			delay={this.loadingDelay}
			class="ui5-product-switch-busy-indicator"
		>
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
		</BusyIndicator>
	);
}
