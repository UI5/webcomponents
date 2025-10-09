import Button from "@ui5/webcomponents/dist/Button.js";
import type ShellBarItem from "./ShellBarItem.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";

export default function ShellBarItemTemplate(this: ShellBarItem) {
	return this.isOverflowing ? (
		<ListItemStandard
			// key={index}
			// data-count={icon.count}
			// data-ui5-external-action-item-id={icon.refItemid}
			// data-ui5-stable={icon.stableDomRef}
			icon={this.icon ? this.icon : ""}
			type="Active"
			// onui5-_press={icon.press}
			onui5-_press={this.fireClickEvent}
			// tooltip={icon.tooltip}
			// accessibilityAttributes={this.accInfo.search.accessibilityAttributes}
		>
			{this.text}
		</ListItemStandard>
	) : (
		<Button
			// key={item.id}
			// id={item.id}
			// class={`${item.classes} ui5-shellbar-items-for-arrow-nav`}
			icon={this.icon}
			// tooltip={item.tooltip}
			// data-ui5-notifications-count={this.notificationsCount}
			// data-ui5-external-action-item-id={item.refItemid}
			// data-ui5-stable={item.icon && !this.isIconHidden(item.icon) ? item.stableDomRef : undefined}
			accessibilityAttributes={this.accessibilityAttributes}
			// new attributes
			onClick={this.fireClickEvent}
		>
			{this.count && (
				<ButtonBadge slot="badge" design="OverlayText" text={this.count} />
			)}
		</Button>
	);
}
