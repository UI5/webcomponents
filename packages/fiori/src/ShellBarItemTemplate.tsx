import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type ShellBarItem from "./ShellBarItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";

export default function ShellBarItemTemplate(this: ShellBarItem) {
	return (
		this.isOverflowing ? (
			<ListItemStandard
				key={this.id}
				data-count={this.count}
				icon={this.icon}
				type="Active"
				tooltip={this.tooltip}
			>
				<slot></slot>
			</ListItemStandard>
		) : (
			<Button
				key={this.id}
				id={this.id}
				icon={this.icon}
				tooltip={this.tooltip}
				data-ui5-notifications-count={this.count}
			>
				{this.count && (
					<ButtonBadge slot="badge" design="OverlayText" text={this.count} />
				)}
			</Button>
		)
	);
}
