import Icon from "./Icon.js";
import resizeCorner from "@ui5/webcomponents-icons/dist/resize-corner.js";
import type Popover from "./Popover.js";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";

export default function PopoverTemplate(this: Popover) {
	return PopupTemplate.call(this, {
		beforeContent,
		afterContent,
	});
}

function beforeContent(this: Popover) {
	return (<>
		<span class="ui5-popover-arrow" style={this.styles.arrow}></span>

		{this._displayHeader &&
			<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">
				{this.header.length ?
					<slot name="header"></slot>
					:
					<Title level="H1" class="ui5-popup-header-text">{this.headerText}</Title>
				}
			</header>
		}
	</>);
}

function afterContent(this: Popover) {
	return (<>
		{this._displayFooter && !!this.footer.length &&
			<footer class="ui5-popup-footer-root" part="footer">
				<slot name="footer"></slot>
			</footer>
		}

		{this._showResizeHandle &&
			<div class="ui5-popover-resize-handle"
				 onMouseDown={this._onResizeMouseDown}
			>
				<Icon name={resizeCorner} />
			</div>
		}
	</>);
}
