import type Bar from "./Bar.js";

export default function BarTemplate(this: Bar) {
	return (
		<div
			class="ui5-bar-root"
			aria-label={this.accInfo.label}
			role={this.accInfo.role}
			part="bar"
		>
			<div class="ui5-bar-content-container ui5-bar-startcontent-container" part="startContent">
				<slot name="startContent"></slot>
			</div>
			<div class="ui5-bar-content-container ui5-bar-midcontent-container" part="midContent">
				<slot></slot>
			</div>
			<div class="ui5-bar-content-container ui5-bar-endcontent-container" part="endContent">
				<slot name="endContent"></slot>
			</div>
		</div>);
}
