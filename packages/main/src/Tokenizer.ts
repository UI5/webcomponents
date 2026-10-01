import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isSpace,
	isSpaceCtrl,
	isSpaceShift,
	isLeftCtrl,
	isRightCtrl,
	isUpCtrl,
	isDownCtrl,
	isUpShift,
	isDownShift,
	isLeftShift,
	isRightShift,
	isLeftShiftCtrl,
	isRightShiftCtrl,
	isEnd,
	isHome,
	isHomeShift,
	isEndShift,
	isHomeCtrl,
	isEndCtrl,
	isRight,
	isLeft,
	isUp,
	isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import Title from "./Title.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import StandardListItem from "./StandardListItem.js";
import type Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import TokenizerPopoverTemplate from "./generated/templates/TokenizerPopoverTemplate.lit.js";
import {
	MULTIINPUT_SHOW_MORE_TOKENS,
	TOKENIZER_ARIA_LABEL,
	TOKENIZER_POPOVER_REMOVE,
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
	TOKENIZER_SHOW_ALL_ITEMS,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import TokenizerPopoverCss from "./generated/themes/TokenizerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

// reuse suggestions focus styling for NMore popup
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

type TokenizerTokenDeleteEventDetail = {
	ref: Token;
}

enum ClipboardDataOperation {
	cut = "cut",
	copy = "copy",
}
/**
 * @class
 *
 * ### Overview
 *
 * A container for tokens.
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-tokenizer",
	languageAware: true,
	renderer: litRender,
	template: TokenizerTemplate,
	styles: TokenizerCss,
	staticAreaStyles: [
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SuggestionsCss,
		TokenizerPopoverCss,
	],
	staticAreaTemplate: TokenizerPopoverTemplate,
	dependencies: [
		ResponsivePopover,
		List,
		StandardListItem,
		Title,
		Button,
		Icon,
	],
})

@event("token-delete", {
	detail: {
		ref: { type: HTMLElement },
	},
})

@event("show-more-items-press", {
	detail: {
		ref: { type: HTMLElement },
	},
})

@event("before-more-popover-open")
class Tokenizer extends UI5Element {
	@property({ type: Boolean })
	showMore!: boolean;

	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Prevent opening of n-more Popover when label is clicked
	 * @private
	 */
	@property({ type: Boolean })
	preventPopoverOpen!: boolean;

	/**
	 * Indicates if the tokenizer should show all tokens or n more label instead
	 * @private
	 */
	@property({ type: Boolean })
	expanded!: boolean;

	@property({ type: Object })
	morePopoverOpener!: HTMLElement;

	@property({ validator: Integer })
	popoverMinWidth?: number;

	/**
	 * Indicates the value state of the related input component.
	 * @default "None"
	 * @private
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	@property({ validator: Integer, defaultValue: 0 })
	_nMoreCount!: number;

	@property({ validator: Integer })
	_tokensCount!: number;

	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	tokens!: Array<Token>;

	@slot()
	valueStateMessage!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_resizeHandler: ResizeObserverCallback;
	_itemNav: ItemNavigation;
	_scrollEnablement: ScrollEnablement;
	_expandedScrollWidth?: number;
	_isOpen: boolean;
	_lastNMoreWidth = 0;

	_handleResize() {
		this._nMoreCount = this.overflownTokens.length;
	}

	constructor() {
		super();

		this._resizeHandler = this._handleResize.bind(this);

		this._itemNav = new ItemNavigation(this, {
			currentIndex: -1,
			getItemsCallback: this._getVisibleTokens.bind(this),
		});

		this._scrollEnablement = new ScrollEnablement(this);
		this._isOpen = false;
	}

	onBeforeRendering() {
		this._tokensCount = this._getTokens().length;

		this._tokens.forEach(token => {
			token.singleToken = this._tokens.length === 1;
		});

		if (!this._tokens.length) {
			this.closeMorePopover();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this.contentDom, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.contentDom, this._resizeHandler);
	}

	async _openMorePopoverAndFireEvent() {
		if (!this.preventPopoverOpen) {
			await this.openMorePopover();
		}

		this.fireEvent("show-more-items-press");
	}

	async openMorePopover() {
		(await this.getPopover()).showAt(this.morePopoverOpener instanceof HTMLElement ? this.morePopoverOpener : this);
		this._isOpen = true;
	}

	_getTokens() {
		return this.getSlottedNodes<Token>("tokens");
	}

	get _tokens() {
		return this.getSlottedNodes<Token>("tokens");
	}

	_onmousedown(e: MouseEvent) {
		if ((e.target as HTMLElement).hasAttribute("ui5-token")) {
			const target = e.target as Token;
			if (!target.toBeDeleted) {
				this._itemNav.setCurrentItem(target);
			}
		}
	}

	onTokenSelect() {
		const tokens = this._getTokens();

		if (tokens.length === 1 && tokens[0].isTruncatable) {
			if (tokens[0].selected) {
				this.openMorePopover();
			} else {
				this.closeMorePopover();
			}
		}
	}

	_getVisibleTokens() {
		if (this.disabled) {
			return [];
		}

		return this._tokens.filter((token, index) => {
			return index < (this._tokens.length - this._nMoreCount);
		});
	}

	async onAfterRendering() {
		this._nMoreCount = this.overflownTokens.length;

		if (!this._getTokens().length) {
			const popover = await this.getPopover();
			popover.close();
		}

		this._scrollEnablement.scrollContainer = (this.expanded || !this.narrowContentDom) ? this.expandedContentDom! : this.narrowContentDom;

		if (this.expanded) {
			this._expandedScrollWidth = this.expandedContentDom!.scrollWidth;
			this.scrollToEnd();
		}

		if (!this.expanded) {
			this.scrollToStart();
		}
	}

	_delete(e: CustomEvent<TokenDeleteEventDetail>) {
		const target = e.target as Token;
		if (!e.detail) { // if there are no details, the event is triggered by a click
			this._tokenClickDelete(e, target);

			if (this._getTokens().length) {
				this.closeMorePopover();
			}
			return;
		}

		if (this._selectedTokens.length) {
			this._selectedTokens.forEach(token => this.deleteToken(token, e.detail.backSpace));
		} else {
			this.deleteToken(target, e.detail.backSpace);
		}
	}

	_tokenClickDelete(e: CustomEvent<TokenDeleteEventDetail>, token: Token) {
		const tokens = this._getVisibleTokens();
		const target = e.target as Token;
		const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(target); // The index of the token that just got deleted
		const nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1; // The index of the next token that needs to be focused next due to the deletion
		const nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined

		this._handleCurrentItemAfterDeletion(nextToken);

		this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token || target });
	}

	_handleCurrentItemAfterDeletion(nextToken: Token) {
		if (nextToken && !isPhone()) {
			this._itemNav.setCurrentItem(nextToken); // update the item navigation with the new token or undefined, if the last was deleted

			setTimeout(() => {
				nextToken.focus();
			}, 0);
		}
	}

	/**
	 * Removes a token from the Tokenizer.
	 * This method should only be used by ui5-multi-combobox and ui5-multi-input
	 * @protected
	 * @param token Token to be focused.
	 * @param forwardFocusToPrevious Indicates whether the focus will be forwarded to previous or next token after deletion.
	 */
	deleteToken(token: Token, forwardFocusToPrevious?: boolean) {
		const tokens = this._getVisibleTokens();
		const deletedTokenIndex = tokens.indexOf(token);
		let nextTokenIndex = (deletedTokenIndex === tokens.length - 1) ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		const notSelectedTokens = tokens.filter(t => !t.selected);

		if (forwardFocusToPrevious) { // on backspace key select the previous item (unless deleting the first)
			nextTokenIndex = deletedTokenIndex === 0 ? deletedTokenIndex + 1 : deletedTokenIndex - 1;
		} else { // on delete key or mouse click on the "x" select the next item (unless deleting the last)
			nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		}

		let nextToken = tokens[nextTokenIndex];

		if (notSelectedTokens.length > 1) {
			while (nextToken && nextToken.selected) {
				nextToken = forwardFocusToPrevious ? tokens[--nextTokenIndex] : tokens[++nextTokenIndex];
			}
		} else {
			nextToken = notSelectedTokens[0];
		}

		this._handleCurrentItemAfterDeletion(nextToken);

		this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
	}

	async itemDelete(e: CustomEvent) {
		const token = e.detail.item.tokenRef;

		// delay the token deletion in order to close the popover before removing token of the DOM
		if (this._getTokens().length === 1 && this._getTokens()[0].isTruncatable) {
			const morePopover = await this.getPopover();

			morePopover.addEventListener("ui5-after-close", () => {
				this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
			}, {
				once: true,
			});

			morePopover.close();
		} else {
			this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
		}
	}

	handleBeforeClose() {
		if (isPhone()) {
			this._getTokens().forEach(token => {
				token.selected = false;
			});
		}
	}

	handleBeforeOpen() {
		this.fireEvent("before-more-popover-open");
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpaceShift(e)) {
			e.preventDefault();
		}

		if (isSpace(e) || isSpaceCtrl(e)) {
			e.preventDefault();

			return this._handleTokenSelection(e, false);
		}

		if (isHomeShift(e)) {
			this._handleHomeShift(e);
		}

		if (isEndShift(e)) {
			this._handleEndShift(e);
		}

		this._handleItemNavigation(e, this._tokens);
	}

	_handleItemNavigation(e: KeyboardEvent, tokens: Array<Token>) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		const target = e.target as Token;

		if (isLeftCtrl(e) || isRightCtrl(e) || isDownCtrl(e) || isUpCtrl(e)) {
			return this._handleArrowCtrl(e, target, tokens, isRightCtrl(e) || isDownCtrl(e));
		}

		if (isLeftShift(e) || isRightShift(e) || isUpShift(e) || isDownShift(e) || isLeftShiftCtrl(e) || isRightShiftCtrl(e)) {
			e.preventDefault();
			return this._handleArrowShift(target, tokens, (isRightShift(e) || isRightShiftCtrl(e) || isDownShift(e)));
		}

		if (isHome(e) || isEnd(e) || isHomeCtrl(e) || isEndCtrl(e)) {
			e.preventDefault();
			return this._handleHome(tokens, isEnd(e) || isEndCtrl(e));
		}

		if (isCtrl && e.key.toLowerCase() === "a") {
			e.preventDefault();

			return this._toggleTokenSelection(tokens);
		}

		if (isLeft(e) || isRight(e) || isUp(e) || isDown(e)) {
			const nextTokenIdx = this._calcNextTokenIndex(this._tokens.find(token => token.focused)!, tokens, (isRight(e) || isDown(e)));
			this._scrollToToken(tokens[nextTokenIdx]);
		}
	}

	_handleHome(tokens: Array<Token>, endKeyPressed: boolean) {
		if (!tokens || !tokens.length) {
			return -1;
		}

		const index = endKeyPressed ? tokens.length - 1 : 0;

		tokens[index].focus();
		this._itemNav.setCurrentItem(tokens[index]);
	}

	_handleHomeShift(e: KeyboardEvent) {
		const tokens = this.tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);

		tokens.filter((token, index) => index <= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		tokens[0].focus();
		this._itemNav.setCurrentItem(tokens[0]);
	}

	_handleEndShift(e: KeyboardEvent) {
		const tokens = this.tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);

		tokens.filter((token, index) => index >= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		tokens[tokens.length - 1].focus();
		this._itemNav.setCurrentItem(tokens[tokens.length - 1]);
	}

	_calcNextTokenIndex(focusedToken: IToken, tokens: Array<IToken>, backwards: boolean) {
		if (!tokens.length) {
			return -1;
		}
		const focusedTokenIndex = tokens.indexOf(focusedToken);
		let nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);

		if (nextIndex >= tokens.length) {
			nextIndex = tokens.length - 1;
		}
		if (nextIndex < 0) {
			nextIndex = 0;
		}

		return nextIndex;
	}

	_handleArrowCtrl(e: KeyboardEvent, focusedToken: IToken, tokens: Array<IToken>, backwards: boolean) {
		const nextIndex = this._calcNextTokenIndex(focusedToken, tokens, backwards);

		e.preventDefault();

		if (nextIndex === -1) {
			return;
		}

		setTimeout(() => {
			tokens[nextIndex].focus();
		}, 0);

		this._scrollToToken(tokens[nextIndex]);
		this._itemNav.setCurrentItem(tokens[nextIndex]);
	}

	_handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean) {
		const focusedTokenIndex = tokens.indexOf(focusedToken);
		const nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);

		if (nextIndex === -1 || nextIndex === tokens.length) {
			return;
		}

		focusedToken.selected = true;
		tokens[nextIndex].selected = true;
		setTimeout(() => {
			tokens[nextIndex].focus();
		}, 0);

		this._scrollToToken(tokens[nextIndex]);
		this._itemNav.setCurrentItem(tokens[nextIndex]);
	}

	_click(e: MouseEvent) {
		this._handleTokenSelection(e);
	}

	_toggleTokenSelection(tokens: Array<Token>) {
		if (!tokens || !tokens.length) {
			return;
		}

		const tokensAreSelected = tokens.every(token => token.selected);
		tokens.forEach(token => { token.selected = !tokensAreSelected; });
	}

	_handleTokenSelection(e: KeyboardEvent | MouseEvent, deselectAll = true) {
		const target = e.target as Token;
		if (target.hasAttribute("ui5-token")) {
			const deselectTokens = deselectAll ? this._tokens : [];

			deselectTokens.forEach(token => {
				if (token !== target) {
					token.selected = false;
				}
			});
		}
	}

	_fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>) {
		const tokensTexts = tokens.filter(token => token.selected).map(token => token.text).join("\r\n");

		/* fill clipboard with tokens' texts so parent can handle creation */
		const cutToClipboard = (e: ClipboardEvent) => {
			if (e.clipboardData) {
				e.clipboardData.setData("text/plain", tokensTexts);
			}

			e.preventDefault();
		};

		document.addEventListener(shortcutName, cutToClipboard);
		document.execCommand(shortcutName);
		document.removeEventListener(shortcutName, cutToClipboard);
	}

	/**
	 * Scrolls the container of the tokens to its beginning.
	 * This method is used by MultiInput and MultiComboBox.
	 * @private
	 */
	scrollToStart() {
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(0, 0);
		}
	}

	/**
	 * Scrolls the container of the tokens to its end when expanded.
	 * This method is used by MultiInput and MultiComboBox.
	 * @private
	 */
	scrollToEnd() {
		const expandedTokenizerScrollWidth = this.expandedContentDom && (this.effectiveDir !== "rtl" ? this.expandedContentDom.scrollWidth : -this.expandedContentDom.scrollWidth);
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(expandedTokenizerScrollWidth!, 0, 5, 10);
		}
	}

	/**
	 * Scrolls token to the visible area of the container.
	 * Adds 4 pixels to the scroll position to ensure padding and border visibility on both ends
	 * @private
	 */
	_scrollToToken(token: IToken) {
		if (!this.expandedContentDom) {
			return;
		}

		const tokenRect = token.getBoundingClientRect();
		const tokenContainerRect = this.expandedContentDom.getBoundingClientRect();

		if (tokenRect.left < tokenContainerRect.left) {
			this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft - (tokenContainerRect.left - tokenRect.left + 5), 0);
		} else if (tokenRect.right > tokenContainerRect.right) {
			this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft + (tokenRect.right - tokenContainerRect.right + 5), 0);
		}
	}

	async closeMorePopover() {
		(await this.getPopover()).close(false, false, true);
		this._isOpen = false;
	}

	get _nMoreText() {
		if (!this._nMoreCount) {
			return;
		}

		if (this._getVisibleTokens().length) {
			return Tokenizer.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, this._nMoreCount);
		}

		return Tokenizer.i18nBundle.getText(TOKENIZER_SHOW_ALL_ITEMS, this._nMoreCount);
	}

	get showNMore() {
		return !this.expanded && this.showMore && !!this.overflownTokens.length;
	}

	get contentDom() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer--content")!;
	}

	get moreLink() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer-more-text");
	}

	get expandedContentDom() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer-expanded--content");
	}

	get narrowContentDom() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer-nmore--content");
	}

	get tokenizerLabel() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
	}

	get morePopoverTitle() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_POPOVER_REMOVE);
	}

	get overflownTokens() {
		if (!this.contentDom) {
			return [];
		}

		const tokensArray = this._getTokens();

		tokensArray.forEach(token => {
			token.overflows = false;
		});

		const parentRect = this.getBoundingClientRect();
		const parentEnd = Number(parentRect.right.toFixed(2));
		const parentStart = Number(parentRect.left.toFixed(2));

		let nMoreWidth = 0;
		const nMoreElement = this.moreLink;
		if (nMoreElement) {
			nMoreWidth = nMoreElement.getBoundingClientRect().width;
			this._lastNMoreWidth = Math.max(nMoreWidth, this._lastNMoreWidth);
			nMoreWidth = this._lastNMoreWidth;
		}

		let firstOverflowIndex = -1;

		tokensArray.forEach((token, index) => {
			const tokenRect = token.getBoundingClientRect();
			const tokenEnd = Number(tokenRect.right.toFixed(2));
			const tokenStart = Number(tokenRect.left.toFixed(2));

			const isLastToken = index === tokensArray.length - 1;
			const effectiveParentEnd = isLastToken ? parentEnd : Number((parentRect.right - nMoreWidth).toFixed(2));

			const tokenOverflows = !this.expanded && ((tokenStart < parentStart) || (tokenEnd > effectiveParentEnd));

			if (tokenOverflows && firstOverflowIndex === -1) {
				firstOverflowIndex = index;
			}

			token.overflows = firstOverflowIndex !== -1 && index >= firstOverflowIndex;
		});

		return tokensArray.filter(token => token.overflows);
	}

	get noValueStatePopover() {
		return this.valueState === ValueState.None || this.valueState === ValueState.Success;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	 get _valueStateMessageIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get _isPhone() {
		return isPhone();
	}

	get _selectedTokens() {
		return this._getTokens().filter(token => token.selected);
	}

	get classes(): ClassMap {
		return {
			wrapper: {
				"ui5-tokenizer-root": true,
				"ui5-tokenizer-nmore--wrapper": this.showMore,
				"ui5-tokenizer-no-padding": !this._getTokens().length,
			},
			content: {
				"ui5-tokenizer--content": true,
				"ui5-tokenizer-expanded--content": !this.showNMore,
				"ui5-tokenizer-nmore--content": this.showNMore,
			},
			popover: {
				"ui5-popover-with-value-state-header-phone": this._isPhone && !this.noValueStatePopover,
				"ui5-popover-with-value-state-header": !this._isPhone && !this.noValueStatePopover,
			},
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popover: {
				"min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : "",
			},
			popoverValueStateMessage: {
				"width": this.popoverMinWidth && !isPhone() ? `${this.popoverMinWidth}px` : "100%",
				"min-height": "2rem",
			},
			popoverHeader: {
				"min-height": "2rem",
			},
			popoverHeaderTitle: {
				"justify-content": "left",
			},
		};
	}

	_tokensCountText() {
		const iTokenCount = this._getTokens().length;

		if (iTokenCount === 0) {
			return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_TOKEN);
		}

		if (iTokenCount === 1) {
			return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_ONE_TOKEN);
		}

		return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
	}

	/**
	 * @protected
	 */
	_focusLastToken() {
		if (this.tokens.length === 0) {
			return;
		}

		const lastToken = this.tokens[this.tokens.length - 1];
		lastToken.focus();
		this._itemNav.setCurrentItem(lastToken);
	}

	static async onDefine() {
		Tokenizer.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	async getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}
}

Tokenizer.define();

export default Tokenizer;
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail };
