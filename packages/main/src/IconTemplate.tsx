import type Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";

export default function IconTemplate(this: Icon) {
	if (this.hasFontIcon) {
		return (
			<>
				<span
					id={`${this._id}-root`}
					class="ui5-icon-root"
					part="root"
					tabindex={this._tabIndex}
					role={this.effectiveAccessibleRole}
					aria-label={this.effectiveAccessibleName}
					aria-hidden={this.effectiveAriaHidden}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
				>
					<slot name="fontIcon"></slot>
				</span>
				{ this.hasIconTooltip &&
					<Tooltip text={this.effectiveAccessibleName} opener={`${this._id}-root`} />
				}
			</>
		);
	}

	return (
		<>
			<svg
				id={`${this._id}-root`}
				class="ui5-icon-root"
				part="root"
				tabindex={this._tabIndex}
				dir={this._dir}
				viewBox={this.viewBox}
				role={this.effectiveAccessibleRole}
				focusable="false"
				preserveAspectRatio="xMidYMid meet"
				aria-label={this.effectiveAccessibleName}
				aria-hidden={this.effectiveAriaHidden}
				xmlns="http://www.w3.org/2000/svg"
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
			>
				<g role="presentation">
					{ content.call(this) }
				</g>
			</svg>
			{ this.hasIconTooltip &&
				<Tooltip text={this.effectiveAccessibleName} opener={`${this._id}-root`} />
			}
		</>
	);
}

function content(this: Icon) {
	if (this.customTemplate) {
		return this.customTemplate;
	}

	if (this.customTemplateAsString) {
		return <g dangerouslySetInnerHTML={{ __html: this.customTemplateAsString }}></g>;
	}

	return this.pathData.map(path => (
		<path d={path}></path>
	));
}
