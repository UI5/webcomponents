import type AvatarBadge from "./AvatarBadge.js";
import Icon from "./Icon.js";

export default function AvatarBadgeTemplate(this: AvatarBadge) {
	return (
		<>
			{this.icon && (
				<Icon
					name={this.icon}
					class="ui5-avatar-badge-icon"
					mode="Decorative"
				></Icon>
			)}
		</>
	);
}
