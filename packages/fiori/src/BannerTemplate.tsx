import type Banner from "./Banner.js";

export default function BannerTemplate(this: Banner) {
	return (
		<div
			class={{
				"ui5-banner-root": true,
				"ui5-banner--has-bg-image": !!this.backgroundImage,
			}}
			part="canvas"
			style={this._backgroundImageStyle}
		>
			<div class="ui5-banner-content" part="content">
				<div class="ui5-banner-header">
					<div class="ui5-banner-header-text">
						{this.dateText &&
							<div class="ui5-banner-date">
								{this.dateText}
							</div>
						}

						{this.salutationText &&
							<div class="ui5-banner-salutation">
								{this.salutationText}
							</div>
						}
					</div>

					<div class="ui5-banner-header-actions">
						<slot name="headerActions"></slot>
					</div>
				</div>

				{this._hasContent &&
					<div class={{
						"ui5-banner-blocks": true,
						[`ui5-banner-layout-${this.layout}`]: true,
					}}>
						{this._hasStartContent &&
							<div class="ui5-banner-block ui5-banner-block-start">
								<slot name="startContent"></slot>
							</div>
						}

						{this._hasEndContent &&
							<div class="ui5-banner-block ui5-banner-block-end">
								<slot name="endContent"></slot>
							</div>
						}

						<slot></slot>
					</div>
				}
			</div>
		</div>
	);
}
