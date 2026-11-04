import type AvatarBadge from "./AvatarBadge.js";
import Icon from "./Icon.js";

export default function AvatarBadgeTemplate(this: AvatarBadge) {
	return (
		<>
			{!this.invalid && (
				<Icon
					name={this.icon}
					class="ui5-avatar-badge-icon"
					accessibleName={this.effectiveTooltip}
					data-ui5-tooltip={this.effectiveTooltip}
					mode="Image"
				></Icon>
			)}
		</>
	);
}
