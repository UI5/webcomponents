import type Breadcrumbs from "./Breadcrumbs.js";
import BreadcrumbsPopoverTemplate from "./BreadcrumbsPopoverTemplate.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import Icon from "./Icon.js";
import Link from "./Link.js";
import Label from "./Label.js";

export default function BreadcrumbsTemplate(this: Breadcrumbs) {
	return (
		<>
			<nav class="ui5-breadcrumbs-root" aria-label={this._accessibleNameText}>
				<ol
					onFocusIn={this._onfocusin}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}>

					<li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" hidden={this._isOverflowEmpty}>
						<Link
							wrappingType="None"
							accessibleRole="Button"
							accessibleName={this._dropdownArrowAccessibleNameText}
							accessibilityAttributes={this.linkAccessibilityAttributes}
							onClick={this._openRespPopover}
						>
							<Icon name={slimArrowDown} title={this._dropdownArrowAccessibleNameText}/>
						</Link>
					</li>

					{this._linksData.map(linkData =>
						<li id={`${linkData._id}-link-wrapper`} class="ui5-breadcrumbs-link-wrapper">
							<Link
								id={`${linkData._id}-link`}
								href={linkData.href}
								target={linkData.target}
								design={linkData._linkDesign}
								accessibleName={linkData._accessibleNameText}
								accessibilityAttributes={linkData.accessibilityAttributes}
								data-ui5-stable={linkData.stableDomRef}
								wrappingType="None"
								onClick={this._onLinkPress}
							>
								{linkData.innerText}
							</Link>

							{linkData._needsSeparator &&
							<span class="ui5-breadcrumbs-separator" aria-hidden="true"></span>
							}
						</li>
					)}

					{!this._endsWithCurrentLinkItem && this._endsWithCurrentLocation &&
					<li class="ui5-breadcrumbs-current-location" onClick={this._onLabelPress}>
						<span
							id={`${this._id}-labelWrapper`}
							aria-current="page"
							aria-label={this._currentLocationAccName}
						>
							<Label wrappingType="None">
								{this._currentLocationText}
							</Label>
						</span>
					</li>
					}
				</ol>
			</nav>

			{ BreadcrumbsPopoverTemplate.call(this) }
		</>
	);
}
