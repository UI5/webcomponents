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
			role="region"
			aria-label={this.ariaLabelTxt}
			aria-roledescription={this._roleDescription}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onMouseOut={this._onmouseout}
			onMouseOver={this._onmouseover}
			onTouchStart={this._ontouchstart}
			onMouseDown={this._onmousedown}
		>
			<div class={this.classes.viewport} part="content">
				<div role="list" aria-label={this._ariaListLabel} class={this.classes.content} style={{ transform: `translate3d(${this._isRTL ? "" : "-"}${this._currentSlideIndex * (this._itemWidth || 0)}px, 0, 0` }}>
					{this.items.map((itemInfo, i) =>
						<div
							data-sap-focus-ref={this._focusedItemIndex === i ? true : undefined}
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
	return <Icon name={slimArrowLeft}
		tabindex={-1}
		data-ui5-arrow-back
		title={this.previousPageText	}
		mode="Decorative"
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasPrev
		}}
		onClick={this._navButtonClick}
	/>;
}

function arrowForward(this: Carousel) {
	return <Icon name={slimArrowRight}
		tabindex={-1}
		data-ui5-arrow-forward
		title={this.nextPageText}
		mode="Decorative"
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasNext
		}}
		onClick={this._navButtonClick}
	/>;
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
