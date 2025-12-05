import Icon from "@ui5/webcomponents/dist/Icon.js";
import type SearchItem from "./SearchItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import TagDesign from "@ui5/webcomponents/dist/types/TagDesign.js";

export default function SearchFieldTemplate(this: SearchItem) {
	return (
		<li
			part="native-li"
			class="ui5-li-root ui5-li--focusable"
			aria-selected={this.selected}
			role="option"
			data-sap-focus-ref
			draggable={this.movable}
			tabindex={this._effectiveTabIndex}
			onFocusIn={this._onfocusin}
			onFocusOut={this._onfocusout}
			onKeyUp={this._onkeyup}
			onKeyDown={this._onkeydown}
			onClick={this._onclick}
		>
			<div part="content" class="ui5-search-item-content">
				<div class="ui5-search-item-begin-content">
					{this.image.length > 0 && !this.icon &&
						<slot name="image"></slot>
					}

					{this.icon &&
						<Icon class="ui5-search-item-icon" name={this.icon}></Icon>
					}

					{this.scopeName &&
						<Tag design={TagDesign.Set2} colorScheme="10">
							{this.scopeName}
						</Tag>
					}

					<div class="ui5-search-item-titles-container">
						<span part="title" class="ui5-search-item-text" dangerouslySetInnerHTML={{ __html: this._markupText }}></span>

						<span part="subtitle" class="ui5-search-item-description">{this.description}</span>
					</div>

					<div class="ui5-search-item-actions-container">
						{this.hasActions &&
							<div class="ui5-search-item-actions">
								<slot name="actions"></slot>
							</div>
						}

						{this.deletable &&
							<Button class="ui5-search-item-selected-delete"
								accessibleName={this._deleteButtonAriaLabel}
								design={ButtonDesign.Transparent}
								icon={decline}
								onClick={this._onDeleteButtonClick}
								tooltip={this._deleteButtonTooltip}
								onKeyDown={this._onDeleteButtonKeyDown}></Button>
						}
					</div>
				</div>
			</div>
		</li >
	);
}
