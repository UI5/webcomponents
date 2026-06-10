import resizeCorner from "@ui5/webcomponents-icons/dist/resize-corner.js";
import type Dialog from "./Dialog.js";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";
import Icon from "./Icon.js";

export default function DialogTemplate(this: Dialog) {
	return PopupTemplate.call(this, {
		beforeContent,
		afterContent,
	});
}

function beforeContent(this: Dialog) {
	return (<>
		{!!this._displayHeader &&
			<div
				class="ui5-popup-header-root"
				id="ui5-popup-header"
				role="region"
				aria-label={this._headerAriaLabel}
				aria-describedby={this.effectiveAriaDescribedBy}
				aria-roledescription={this.ariaRoleDescriptionHeaderText}
				tabIndex={this._headerTabIndex}
				onKeyDown={this._onDragOrResizeKeyDown}
				onMouseDown={this._onDragMouseDown}
				part="header"
				// state={this.state}
			>
				{this.hasValueState &&
					<Icon class="ui5-dialog-value-state-icon" name={this._dialogStateIcon}></Icon>
				}
				{this.header.length ?
					<slot name="header"></slot>
					:
					<Title level="H1" id="ui5-popup-header-text" class="ui5-popup-header-text">{this.headerText}</Title>
				}

				{this.resizable ?
					this.draggable ?
						<span id={`${this._id}-descr`} aria-hidden="true" class="ui5-hidden-text">{this.ariaDescribedByHeaderTextDraggableAndResizable}</span>
						:
						<span id={`${this._id}-descr`} aria-hidden="true" class="ui5-hidden-text">{this.ariaDescribedByHeaderTextResizable}</span>
					:
					this.draggable &&
						<span id={`${this._id}-descr`} aria-hidden="true" class="ui5-hidden-text">{this.ariaDescribedByHeaderTextDraggable}</span>
				}
			</div>
		}
	</>);
}

function afterContent(this: Dialog) {
	return (<>
		{!!this.footer.length &&
			<div
				class="ui5-popup-footer-root"
				role="region"
				aria-label={this._footerAriaLabel}
				part="footer"
			>
				<slot name="footer"></slot>
			</div>
		}
		{this._showResizeHandle &&
			<div
				class="ui5-popup-resize-handle"
				onMouseDown={this._onResizeMouseDown}
			>
				<Icon name={resizeCorner}></Icon>
			</div>
		}
	</>);
}
