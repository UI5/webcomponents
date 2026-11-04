import Icon from "./Icon.js";
import type Tag from "./Tag.js";

export default function TagTemplate(this: Tag) {
	return (
		<>
			{
				this.interactive ?
					<button
						class="ui5-tag-root"
						data-ui5-tooltip={this._title}
						aria-roledescription={this._roleDescription}
						aria-description={this._interactiveAriaDescription}
						onClick={this._onclick}
						part="root"
					>
						{ content.call(this) }
					</button>
					:
					<div class="ui5-tag-root" data-ui5-tooltip={this._title} aria-description={this._title} part="root">
						{ content.call(this) }
					</div>
			}
		</>
	);
}

function content(this: Tag) {
	return (
		<>
			<slot name="icon"></slot>
			{this._semanticIconName &&
				<Icon class="ui5-tag-semantic-icon" name={this._semanticIconName} />
			}
			<span class="ui5-hidden-text">{this.tagDescription}</span>
			{this.hasText &&
				<span class="ui5-tag-text"><slot></slot></span>
			}
		</>
	);
}
