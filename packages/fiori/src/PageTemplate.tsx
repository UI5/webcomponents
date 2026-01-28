import type Page from "./Page.js";

export default function PageTemplate(this: Page) {
	return (
		<div class="ui5-page-root">
			<header
				id="ui5-page-header"
				class="ui5-page-header-root"
			>
				<slot name="header"></slot>
			</header>

			<section
				part="content"
				class="ui5-page-content-root" style={{
					"padding-bottom": this.footer.length && this._contentPaddingBottom,
					"scroll-padding-bottom": this.footer.length && this._contentPaddingBottom,
					"margin-bottom": this.footer.length && this._contentBottom,
					"bottom": this.footer.length && this._contentBottom,
					"top": this._contentTop,
				}}>
				<slot></slot>
			</section>

			<footer class="ui5-page-footer-root">
				<slot name="footer"></slot>
			</footer>
		</div>
	);
}
