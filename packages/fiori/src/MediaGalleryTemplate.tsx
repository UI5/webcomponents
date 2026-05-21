import type MediaGallery from "./MediaGallery.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import Button from "@ui5/webcomponents/dist/Button.js";

export default function MediaGalleryTemplate(this: MediaGallery) {
	return (
		<div class="ui5-media-gallery-root">
			<div class="ui5-media-gallery-display-wrapper">
				<div class="ui5-media-gallery-display"
					onClick={this._onDisplayAreaClick}>
					{this._isPhonePlatform
						? <Carousel
							onNavigate={this._onCarouselNavigate}
							hideNavigationArrows={true}
						>
							{this._selectableItems.map(item =>
								<slot name={item._individualSlot}></slot>
							)}
						</Carousel>
						: <MediaGalleryItem
							_interactive={this.interactiveDisplayArea}
							_square={this._shouldHaveSquareDisplay}
							tabIndex={this._mainItemTabIndex}
						></MediaGalleryItem>
					}
				</div>
			</div>

			{this._showThumbnails && <div class="ui5-media-gallery-thumbnails-wrapper">
				<ul role="listbox">
					{this._visibleItems.map(item =>
						<li id={item.id}
							class="ui5-media-gallery-thumbnail"
							role="option"
							aria-selected={item.selected}
							onClick={this._onThumbnailClick}
						>
							<slot name={item._individualSlot}></slot>
						</li>
					)}
					{this._showOverflowBtn && <li class="ui5-media-gallery-overflow">
						<Button onClick={this._onOverflowBtnClick}>
							+{this._overflowSize}
						</Button>
					</li>}
				</ul>
			</div>}
		</div>
	);
}
