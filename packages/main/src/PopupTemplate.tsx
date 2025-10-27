import type { JsxTemplate } from "@ui5/webcomponents-base";
import type Popup from "./Popup.js";
import PopubBlockLayerTemplate from "./PopupBlockLayerTemplate.js";

export default function PopupTemplate(this: Popup, hooks?: {
	beforeContent?: JsxTemplate
	afterContent?: JsxTemplate
}) {
	return (<>
		{PopubBlockLayerTemplate.call(this)}
		<section
			root-element
			style={this.styles.root}
			class={this.classes.root}
			role={this._role}
			aria-describedby={this.ariaDescribedByIds}
			aria-modal={this._ariaModal}
			aria-label={this._ariaLabel}
			aria-labelledby={this._ariaLabelledBy}
			onKeyDown={this._onkeydown}
			onFocusOut={this._onfocusout}
			onMouseUp={this._onmouseup}
			onMouseDown={this._onmousedown}
		>

			<span class="first-fe" data-ui5-focus-trap role="none" tabIndex={0} onFocusIn={this.forwardToLast}></span>

			{(hooks?.beforeContent || beforeContent).call(this)}

			<div style={this.styles.content} class={this.classes.content} onScroll={this._scroll} part="content">
				<slot></slot>
			</div>

			{this.ariaDescriptionText &&
						<span id="accessibleDescription" class="ui5-hidden-text">{this.ariaDescriptionText}</span>
			}

			{(hooks?.afterContent || afterContent).call(this)}

			<span class="last-fe" data-ui5-focus-trap role="none" tabIndex={0} onFocusIn={this.forwardToFirst}></span>

		</section>

	</>);
}

export function beforeContent(this: Popup) { }
export function afterContent(this: Popup) { }
