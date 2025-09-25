import type Carousel from "./Carousel.js";
import Icon from "./Icon.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function CarouselTemplate(this: Carousel) {
	return (
		<section
			class={{
				"ui5-carousel-root": true,
				[`ui5-carousel-background-${this._backgroundDesign}`]: true,
			}}
			role="list"
			aria-label={this.ariaLabelTxt}
			aria-roledescription={this._roleDescription}
			aria-activedescendant={this.ariaActiveDescendant}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onMouseOut={this._onmouseout}
			onMouseOver={this._onmouseover}
		>
			<div class={this.classes.viewport} part="content">
				<div class={this.classes.content} style={{ transform: `translate3d(${this._isRTL ? "" : "-"}${this._currentSlideIndex * (this._itemWidth || 0)}px, 0, 0` }}>
					{this.items.map(itemInfo =>
						<div
							data-sap-focus-ref
							id={itemInfo.id}
							class={{
								"ui5-carousel-item": true,
								"ui5-carousel-item--hidden": !itemInfo.visible,
							}}
							style={{ width: `${this._itemWidth || 0}px` }}
							part="item"
							role="listitem"
							aria-posinset={itemInfo.posinset}
							aria-setsize={itemInfo.setsize}
							aria-hidden={!itemInfo.visible}
							tabindex= {itemInfo.tabIndex}
						>
							<slot name={itemInfo.item._individualSlot} tabindex={itemInfo.tabIndex}></slot>
						</div>
					)}
				</div>
				{this.showArrows.content &&
					<div class="ui5-carousel-navigation-arrows">
						{arrowBack.call(this)}
						{arrowForward.call(this)}
					</div>
				}
			</div>

			{this.renderNavigation &&
				<div class={this.classes.navigation}>
					{this.showArrows.navigation && arrowBack.call(this)}
					<div class="ui5-carousel-navigation">
						{ !this.hidePageIndicator && navIndicator.call(this) }
					</div>
					{this.showArrows.navigation && arrowForward.call(this)}
				</div>
			}
		</section>
	);
}

function arrowBack(this: Carousel) {
	return <span
		role="presentation"
		aria-hidden="true"
		title={this.previousPageText}
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasPrev
		}}
		data-ui5-arrow-back
		onClick={e => this._navButtonClick(e as MouseEvent)}
	>
		<Icon name={slimArrowLeft}
			data-ui5-arrow-back
			inert
			tabindex={-1}
		/>
	</span>;
}

function arrowForward(this: Carousel) {
	return <span
		data-ui5-arrow-forward
		title={this.nextPageText}
		role="presentation"
		aria-hidden="true"
		onClick={e => this._navButtonClick(e as MouseEvent)}
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasNext
		}}
	>
		<Icon name={slimArrowRight}
			inert
			tabindex={-1}
		/>
	</span>;
}

function navIndicator(this: Carousel) {
	return this.isPageTypeDots ? this.dots.map(dot =>
		<div
			aria-label={dot.ariaLabel}
			role="presentation"
			aria-hidden="true"
			class={{
				"ui5-carousel-navigation-dot": true,
				"ui5-carousel-navigation-dot--active": dot.active
			}}
		></div>)
		:
		<div
			dir="auto"
			class="ui5-carousel-navigation-text"
		>{this._currentSlideIndex + 1}&nbsp;{this.ofText}&nbsp;{this.pagesCount}</div>;
}
