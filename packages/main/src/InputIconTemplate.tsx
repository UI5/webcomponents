import type InputIcon from "./InputIcon.js";

export default function InputIconTemplate(this: InputIcon) {
	return (
		<div
			class="ui5-input-icon-wrapper"
			tabindex={0}
			role="button"
			aria-label={this.effectiveAccessibleName}
		>
			<svg
				class="ui5-input-icon-svg"
				tabindex={-1}
				dir={this._dir}
				viewBox={this.viewBox}
				role="presentation"
				focusable="false"
				preserveAspectRatio="xMidYMid meet"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g role="presentation">
					{content.call(this)}
				</g>
			</svg>
		</div>
	);
}

function content(this: InputIcon) {
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
