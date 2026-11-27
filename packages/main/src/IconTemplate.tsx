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
					data-ui5-has-tooltip={this.hasIconTooltip ? `${this._id}-tooltip` : undefined}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
				>
					<slot name="fontIcon"></slot>
				</span>
				{ this.hasIconTooltip &&
					// Review (double-announcement): the icon's accessible name is
					// already `effectiveAccessibleName` (aria-label), which equals the
					// tooltip text, so no `aria-describedby` here — it would repeat the
					// name. Tooltip is visual only; `data-ui5-has-tooltip` drives it.
					<Tooltip id={`${this._id}-tooltip`}>{this.effectiveAccessibleName}</Tooltip>
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
				data-ui5-has-tooltip={this.hasIconTooltip ? `${this._id}-tooltip` : undefined}
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
				// Review (double-announcement): see the font-icon branch above — the
				// accessible name already equals the tooltip text, so no
				// `aria-describedby`.
				<Tooltip id={`${this._id}-tooltip`}>{this.effectiveAccessibleName}</Tooltip>
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
