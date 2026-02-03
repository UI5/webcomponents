import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type ShellBarItem from "./ShellBarItem.js";

export default function ShellBarItemTemplate(this: ShellBarItem) {
	if (this.inOverflow) {
		return (
			<ListItemStandard
				icon={this.icon ? `sap-icon://${this.icon}` : ""}
				type="Active"
				data-count={this.count}
				accessibilityAttributes={this.accessibilityAttributes}
			>
				{this.text}
			</ListItemStandard>
		);
	}

	return (
		<Button
			class="ui5-shellbar-action-button"
			icon={this.icon}
			design="Transparent"
			accessibleName={this.text}
			accessibilityAttributes={this.accessibilityAttributes}
			onClick={this.fireClickEvent}
		>
			{this.count && (
				<ButtonBadge slot="badge" design="OverlayText" text={this.count} />
			)}
		</Button>
	);
}
