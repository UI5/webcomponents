import type InputIcon from "./InputIcon.js";
import Icon from "./Icon.js";

export default function InputIconTemplate(this: InputIcon) {
	return (
		<div
			class="ui5-input-icon-wrapper"
			tabindex={0}
			role="button"
			aria-label={this.accessibleName}
		>
			{this.iconName ? (
				<Icon
					name={this.iconName}
					mode="Decorative"
				/>
			) : (
				<slot></slot>
			)}
		</div>
	);
}
