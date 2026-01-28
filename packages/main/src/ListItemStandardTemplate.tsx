import Icon from "./Icon.js";
import type ListItemStandard from "./ListItemStandard.js";
import ListItemTemplate from "./ListItemTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";
import WrappingType from "./types/WrappingType.js";

const predefinedHooks: Partial<ListItemHooks> = {
	imageBegin,
	iconBegin,
	iconEnd,
	listItemContent
};

export default function ListItemStandardTemplate(this: ListItemStandard, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return ListItemTemplate.call(this, currentHooks);
}

function listItemContent(this: ListItemStandard) {
	return <>
		<div class="ui5-li-text-wrapper">
			{renderTitle.call(this)}
			{renderDescription.call(this)}

			{!this.typeActive && <span class="ui5-hidden-text">{this.type}</span>}
		</div>

		{!this.description && renderAdditionalText.call(this)}
	</>;
}

function renderTitle(this: ListItemStandard) {
	if (this.wrappingType === WrappingType.Normal) {
		return this.expandableTextTemplate?.call(this, {
			className: "ui5-li-title",
			text: this._textContent,
			maxCharacters: this._maxCharacters,
			part: "title",
		});
	}

	return (
		<span part="title" class="ui5-li-title">
			{this.text ? this.text : <slot></slot>}
		</span>
	);
}

function renderDescription(this: ListItemStandard) {
	if (!this.description) {
		return null;
	}

	if (this.wrappingType === WrappingType.Normal) {
		return (
			<div class="ui5-li-description-info-wrapper">
				{this.expandableTextTemplate?.call(this, {
					className: "ui5-li-desc",
					text: this.description,
					maxCharacters: this._maxCharacters,
					part: "description",
				})}
				{renderAdditionalText.call(this)}
			</div>
		);
	}

	return (
		<div class="ui5-li-description-info-wrapper">
			<span part="description" class="ui5-li-desc">{this.description}</span>
			{renderAdditionalText.call(this)}
		</div>
	);
}

function renderAdditionalText(this: ListItemStandard) {
	if (!this.additionalText) {
		return null;
	}
	return <span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>;
}

function imageBegin(this: ListItemStandard) {
	if (this.hasImage) {
		return <div class="ui5-li-image">
			<slot name="image"></slot>
		</div>;
	}
}

function iconBegin(this: ListItemStandard) {
	if (this.displayIconBegin) {
		return <Icon
			part="icon"
			name={this.icon}
			class="ui5-li-icon"
			mode="Decorative" />;
	}
}

function iconEnd(this: ListItemStandard) {
	if (this.displayIconEnd) {
		return <Icon
			part="icon"
			name={this.icon}
			class="ui5-li-icon"
			mode="Decorative" />;
	}
}
