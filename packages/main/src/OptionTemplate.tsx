import Icon from "./Icon.js";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type Option from "./Option.js";

export default function OptionTemplate(this: Option) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option", title: this.tooltip });
}

function listItemContent(this: Option) {
	return (
		<div part="content" id={`${this._id}-content`} class="ui5-li-content">
			{this.displayIconBegin &&
				<Icon part="icon" name={this.icon} class="ui5-li-icon" mode="Decorative" />
			}
			<div class="ui5-li-text-wrapper">
				<span part="title" class="ui5-li-title"><slot></slot></span>
				{this.additionalText &&
					<span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>
				}
			</div>
		</div>
	);
}
