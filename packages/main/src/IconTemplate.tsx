import type Icon from "./Icon.js";

export default function IconTemplate(this: Icon) {
	return (
		<svg
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
			{ this.hasIconTooltip &&
                <title id={`${this._id}-tooltip`} > {this.effectiveAccessibleName} </title>
			}

			<g role="presentation">
				{ content.call(this) }
			</g>
		</svg>
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
