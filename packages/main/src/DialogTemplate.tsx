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
			<header>
				<div
					class="ui5-popup-header-root"
					id="ui5-popup-header"
					role="group"
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
			</header>
		}
	</>);
}

function afterContent(this: Dialog) {
	return (<>
		<span class="ui5-hidden-text" aria-live="assertive">{this._liveText}</span>
		{!!this.footer.length &&
			<footer class="ui5-popup-footer-root" part="footer">
				<slot name="footer"></slot>
			</footer>
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
