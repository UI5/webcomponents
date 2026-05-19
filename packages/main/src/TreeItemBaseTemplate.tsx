import type TreeItemBase from "./TreeItemBase.js";
import ListItemTemplate from "./ListItemTemplate.js";
import Icon from "./Icon.js";
import navigationDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemPreContent,
	listItemContent,
	imageBegin,
	iconBegin,
};

export default function TreeItemBaseTemplate(this: TreeItemBase, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return <div>
		{
			ListItemTemplate.call(this, currentHooks)
		}

		{listItemPostContent.call(this)}
	</div>;
}

function listItemPreContent(this: TreeItemBase) {
	return (
		<div class="ui5-li-tree-toggle-box" style={this.styles.preContent}>
			{this.showToggleButton &&
				<Icon
					part="toggle-icon"
					class="ui5-li-tree-toggle-icon"
					name={this.expanded ? navigationDownArrow : navigationRightArrow}
					showTooltip={true}
					accessibleName={this.iconAccessibleName}
					// @ts-expect-error
					onClick={this._toggleClick}
				/>
			}
		</div >);
}

function listItemPostContent(this: TreeItemBase) {
	if (this.expanded) {
		return (
			<ul
				role="group"
				id={`${this._id}-subtree`}
				class="ui5-tree-li-subtree">
				<slot></slot>
			</ul>);
	}
}

function listItemContent() { }
function imageBegin(this: TreeItemBase) {
	if (this.hasImage) {
		return <div class="ui5-tree-item-image">
			<slot name="image"></slot>
		</div>;
	}
}
function iconBegin(this: TreeItemBase) {
	return this.icon ? <Icon part="icon" name={this.icon} class="ui5-li-icon" /> : <></>;
}
