import type Banner from "./Banner.js";

export default function BannerTemplate(this: Banner) {
	return (
		<div
			class={{
				"ui5-banner-root": true,
				"ui5-banner--has-bg-image": !!this.backgroundImage,
			}}
			role="banner"
			part="canvas"
			style={this._backgroundImageStyle}
		>
			<div class={{
				"ui5-banner-content": true,
				[`ui5-banner-layout-${this.layout}`]: true,
			}} part="content">
				<div class="ui5-banner-header" part="header">
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

					{this._hasHeaderActions &&
						<div class="ui5-banner-header-actions">
							<slot name="headerActions"></slot>
						</div>
					}
				</div>

				{this._hasStartContent &&
					<div class="ui5-banner-block ui5-banner-block-start" part="startContent">
						<slot></slot>
					</div>
				}

				{this._hasEndContent &&
					<div class="ui5-banner-block ui5-banner-block-end" part="endContent">
						<slot name="endContent"></slot>
					</div>
				}
			</div>
		</div>
	);
}
