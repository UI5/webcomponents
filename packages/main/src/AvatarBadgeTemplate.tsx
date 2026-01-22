import type AvatarBadge from "./AvatarBadge.js";
import Icon from "./Icon.js";

export default function AvatarBadgeTemplate(this: AvatarBadge) {
	return (
		<>
			{!this.invalid && (
				<Icon
					name={this.icon}
					class="ui5-avatar-badge-icon"
					mode="Decorative"
				></Icon>
			)}
		</>
	);
}
