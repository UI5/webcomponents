import Button from "@ui5/webcomponents/dist/Button.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type ShellBarV2Item from "./ShellBarV2Item.js";

export default function ShellBarV2ItemTemplate(this: ShellBarV2Item) {
	if (this.inOverflow) {
		return (
			<ListItemStandard
				icon={this.icon ? `sap-icon://${this.icon}` : ""}
				type="Active"
				onClick={this._handleClick}
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
			onClick={this._handleClick}
			accessibleName={this.text}
			accessibilityAttributes={this.accessibilityAttributes}
		>
			{this.count && (
				<span class="ui5-shellbar-badge">{this.count}</span>
			)}
		</Button>
	);
}
