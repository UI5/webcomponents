import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { calculateLayout } from "./TokenizerOverflowLayout.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getFocusedElement } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
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
	isDeleteShift,
	isInsertCtrl,
	isEnd,
	isHome,
	isHomeShift,
	isEndShift,
	isPageUpShift,
	isPageDownShift,
	isHomeCtrl,
	isEndCtrl,
	isRight,
	isLeft,
	isUp,
	isDown,
	isEscape,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type List from "./List.js";
import type { ListItemDeleteEventDetail } from "./List.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import type Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
import TokenizerTemplate from "./TokenizerTemplate.js";
import type Button from "./Button.js";
import {
	MULTIINPUT_SHOW_MORE_TOKENS,
	TOKENIZER_ARIA_LABEL,
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
	TOKENIZER_SHOW_ALL_ITEMS,
	TOKENIZER_CLEAR_ALL,
	TOKENIZER_DIALOG_OK_BUTTON,
	TOKENIZER_DIALOG_CANCEL_BUTTON,
	TOKENIZER_TOKEN_DELETED_SINGULAR,
	TOKENIZER_TOKEN_DELETED_PLURAL,
	INPUT_SUGGESTIONS_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import TokenizerPopoverCss from "./generated/themes/TokenizerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

// reuse suggestions focus styling for NMore popup
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import type ListItem from "./ListItem.js";

type TokenCountMapType = { [x: number]: I18nText };

type TokenizerTokenDeleteEventDetail = {
	tokens: Token[];
}

type TokenizerSelectionChangeEventDetail = {
	tokens: Token[];
}

type TokenizerDialogButtonPressDetail = {
	confirm: boolean;
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
 * A `ui5-tokenizer` is an invisible container for `ui5-token`s that supports keyboard navigation and token selection.
 *
 * The `ui5-tokenizer` consists of two parts:
 * - Tokens - displays the available tokens.
 * - N-more indicator - contains the number of the remaining tokens that cannot be displayed due to the limited space.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-tokenizer` provides advanced keyboard handling.
 * When a token is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Left] or [Right] / [Up] or [Down] - Navigates left and right through the tokens.
 * - [Home] - Navigates to the first token.
 * - [End] - Navigates to the last token.
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
 *
 * - [Space] - Selects a token.
 * - [Backspace] / [Delete] - Deletes a token.
 * **Note:** The deletion of a token is handled by the application with the use of the `token-delete` event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tokenizer.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
@customElement({
	tag: "ui5-tokenizer",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: TokenizerTemplate,
	styles: [
		TokenizerCss,
		ResponsivePopoverCommonCss,
		SuggestionsCss,
		TokenizerPopoverCss,
	],
})

/**
 * Fired when tokens are being deleted (delete icon, delete or backspace is pressed)
 * @param {Array} tokens An array containing the deleted tokens.
 * @public
 */
@event("token-delete", {
	bubbles: true,
})

/**
 * Fired when token selection is changed by user interaction
 *
 * @param {Array<Token>} tokens An array of the selected items.
 * @public
 */
@event("selection-change", {
	bubbles: true,
})

/**
 * Fired when nMore link is pressed.
 * @private
 */
@event("show-more-items-press", {
	bubbles: true,
})

/**
 * Fired before nMore Popover is opened.
 * @private
 */
@event("before-more-popover-open", {
	bubbles: true,
})

class Tokenizer extends UI5Element implements IFormInputElement {
	eventDetails!: {
		"token-delete": TokenizerTokenDeleteEventDetail,
		"selection-change": TokenizerSelectionChangeEventDetail,
		"show-more-items-press": void,
		"before-more-popover-open": void,
	};

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines whether tokens are displayed on multiple lines.
	 *
	 * **Note:** The `multiLine` property is in an experimental state and is a subject to change.
	 * @default false
	 * @since 2.5.0
	 * @public
	 */
	@property({ type: Boolean })
	multiLine = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * **Note:** When the component is used inside a form element,
	 * the value is sent as the first element in the form data, even if it's empty.
	 * @default undefined
	 * @public
	 */
	@property({ type: String })
	declare name?: string;

	/**
	 * Defines whether "Clear All" button is present. Ensure `multiLine` is enabled, otherwise `showClearAll` will have no effect.
	 *
	 * **Note:** The `showClearAll` property is in an experimental state and is a subject to change.
	 * @default false
	 * @since 2.5.0
	 * @public
	 */
	@property({ type: Boolean })
	showClearAll = false;

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Indicates if the tokenizer should show all tokens or n more label instead
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	expanded = false;

	/**
	 * Indicates if the nMore popover is open
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	open = false

	/**
	 * Defines the ID or DOM Reference of the element that the menu is shown at
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the tokenizer.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @private
	 * @default undefined
	 */
	@property({
		converter: DOMReferenceConverter,
	})
	opener?: HTMLElement | string | null;

	/**
	 * Sets the min-width of the nMore Popover.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @private
	 */
	@property({ type: Number })
	popoverMinWidth?: number;

	/**
	 * Sets the title of the nMore Popover on mobile.
	 * **Note:** Used inside MultiInput component.
	 * @private
	 */
	@property()
	popoverTitle?: string;

	/**
	 * Prevents tokens to be part of the tab chain.
	 * **Note:** Used inside MultiInput, MultiComboBox and FileUploader components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	preventInitialFocus = false;

	/**
	 * Prevent opening of n-more Popover when label is clicked
	 * **Note:** Used inside MultiComboBox component.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	preventPopoverOpen = false;

	/**
	 * Hides the popover arrow.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	hidePopoverArrow = false;

	@property({ type: Number })
	_nMoreCount = 0;

	@property({ type: Number })
	_tokensCount = 0;

	/**
	 * Defines the tokens to be displayed.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: ["text"],
			slots: false,
		},
	})
	tokens!: DefaultSlot<Token>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	_resizeHandler: ResizeObserverCallback;
	_itemNav: ItemNavigation;
	_scrollEnablement: ScrollEnablement | undefined;
	_expandedScrollWidth?: number;
	_tokenDeleting = false;
	_preventCollapse = false;
	_skipTabIndex = false;
	_previousToken: Token | null = null;
	_focusedElementBeforeOpen?: HTMLElement | null;
	_deletedDialogItems!: Token[];
	_lastFocusedToken: Token | null = null;
	_isFocusSetInternally: boolean = false;
	/** Scroll to end when tokenizer is expanded */
	_scrollToEndOnExpand = false;

	// ─── Measurement caches ────────────────────────────────────────────────────
	// Keyed by token._id → measured pixel width (content-box, no margins).
	// Invalidated when tokens are added/removed or a token's text changes.
	_tokenWidthCache = new Map<string, number>();
	// Keyed by hidden-token count → measured pixel width of the "+N more" span.
	// Invalidated when the locale changes (languageAware fires a re-render).
	_nMoreWidthCache = new Map<number, number>();
	// Cached gap and padding values.  Re-read whenever the cache is fully cleared.
	_cachedGap = 0;
	_cachedPaddingStart = 0;
	// Token identity/text snapshots from the last measurement pass.
	// Used to detect additions, removals, and text changes.
	_cachedTokenIds: string[] = [];
	_cachedTokenTexts: string[] = [];

	_handleResize() {
		// Container width changed; token widths are still valid but n-more widths may
		// shift slightly with a new layout pass, so clear only the n-more cache to be
		// safe.  Token widths are not affected by the container width.
		this._nMoreWidthCache.clear();
		this._computeAndApplyLayout();
	}

	get formFormattedValue(): FormData | null {
		const tokens = this.tokens || [];

		if (this.name && tokens.length) {
			const formData = new FormData();
			const name = this.name;

			tokens.forEach(token => {
				formData.append(name, token.text || "");
			});

			return formData;
		}

		return null;
	}

	constructor() {
		super();

		this._resizeHandler = this._handleResize.bind(this);

		this._itemNav = new ItemNavigation(this, {
			currentIndex: -1,
			getItemsCallback: this._getVisibleTokens.bind(this),
		});

		this._deletedDialogItems = [];
	}

	handleClearAll() {
		this._announceTokenDeletion(this._tokens.length);
		this.fireDecoratorEvent("token-delete", { tokens: this._tokens });
	}

	/**
	 * Announces the number of deleted tokens to screen readers.
	 * @private
	 * @param count The number of tokens being deleted
	 */
	_announceTokenDeletion(count: number) {
		const text = count === 1
			? Tokenizer.i18nBundle.getText(TOKENIZER_TOKEN_DELETED_SINGULAR)
			: Tokenizer.i18nBundle.getText(TOKENIZER_TOKEN_DELETED_PLURAL, count);

		announce(text, InvisibleMessageMode.Assertive);
	}

	onBeforeRendering() {
		if (!this.multiLine) {
			this._scrollEnablement = new ScrollEnablement(this);
		}

		const tokensLength = this._tokens.length;
		this._tokensCount = tokensLength;

		this._tokens.forEach(token => {
			token.singleToken = (tokensLength === 1) || this.multiLine;
			token.readonly = this.readonly;
			// Clear lastVisibleToken when expanding
			if (this.expanded && token.lastVisibleToken) {
				token.lastVisibleToken = false;
			}
		});
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._resizeHandler);
		this._tokenWidthCache.clear();
		this._nMoreWidthCache.clear();
		this._cachedTokenIds = [];
		this._cachedTokenTexts = [];
		this._cachedGap = 0;
		this._cachedPaddingStart = 0;
	}

	_handleNMoreClick() {
		if (this.disabled) {
			return;
		}

		this.expanded = true;

		if (!this.preventPopoverOpen) {
			this.open = true;
		}

		this._tokens.forEach(token => {
			token.forcedTabIndex = "-1";
		});

		this._skipTabIndex = true;

		this.fireDecoratorEvent("show-more-items-press");
	}

	_onmousedown(e: MouseEvent) {
		if ((e.target as HTMLElement).hasAttribute("ui5-token")) {
			const target = e.target as Token;

			if (this.open) {
				this._preventCollapse = true;
			}

			if (!target.toBeDeleted) {
				this._addTokenToNavigation(target);
				this._scrollToToken(target);
			}
		}
	}

	onTokenSelect(e: CustomEvent) {
		const tokens = this._tokens;
		const firstToken = tokens[0];
		const targetToken = e.target as Token;

		if (tokens.length === 1 && firstToken.isTruncatable) {
			this.open = firstToken.selected;
		}

		if (this.multiLine && targetToken.isTruncatable) {
			this.opener = targetToken;
			this.open = targetToken.selected;
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

	onAfterRendering() {
		const tokensArray = this._tokens;
		const firstToken = tokensArray[0];

		// Detect changes that require remeasuring token widths:
		// additions, removals, or text changes (invalidateOnChildChange covers text).
		const currentIds = tokensArray.map(t => t._id);
		const currentTexts = tokensArray.map(t => t.text ?? "");
		const tokenSetChanged = currentIds.length !== this._cachedTokenIds.length
			|| currentIds.some((id, i) => id !== this._cachedTokenIds[i]);

		if (tokenSetChanged) {
			this._tokenWidthCache.clear();
			this._nMoreWidthCache.clear();
			this._cachedTokenIds = currentIds;
			this._cachedTokenTexts = currentTexts;
		} else {
			// Same token set — check for individual text changes and drop only
			// the affected cache entries so they get re-measured.
			currentTexts.forEach((text, i) => {
				if (text !== this._cachedTokenTexts[i]) {
					this._tokenWidthCache.delete(tokensArray[i]._id);
				}
			});
			this._cachedTokenTexts = currentTexts;
		}

		this._computeAndApplyLayout();

		if (firstToken && !this.disabled && !this.preventInitialFocus && !this._skipTabIndex && !this._isFocusSetInternally) {
			firstToken.forcedTabIndex = "0";
		}

		if (this._scrollEnablement) {
			this._scrollEnablement.scrollContainer = this.contentDom;
		}

		if (this.expanded) {
			this._expandedScrollWidth = this.contentDom.scrollWidth;
		}

		this._scrollToEndIfNeeded();

		const hasTokenToBeDeleted = this._tokens.some(token => token.toBeDeleted);
		if (!hasTokenToBeDeleted) {
			this._tokenDeleting = false;
		}

		renderFinished().then(() => {
			this._updateLastVisibleTokenAttribute();
		});
	}

	// ─── Layout computation ───────────────────────────────────────────────────

	/**
	 * Orchestrates measurement and layout calculation.
	 *
	 * In collapsed (non-expanded) mode, reads token widths from the cache or
	 * from the live DOM, measures n-more button widths via the hidden measurement
	 * span, calls the pure calculateLayout function, and applies the result by
	 * setting token.overflows and _nMoreCount.
	 *
	 * In expanded mode all tokens are shown; the method is a no-op.
	 */
	_computeAndApplyLayout() {
		if (!this.contentDom) {
			return;
		}

		// When expanded or multi-line, all tokens must be visible so the user can
		// scroll through them.  Make sure any previously-hidden tokens are shown,
		// clear the n-more count, and skip the overflow calculation.
		if (this.expanded || this.multiLine) {
			this._tokens.forEach(t => {
				if (t.overflows) {
					t.overflows = false;
				}
			});
			if (this._nMoreCount !== 0) {
				this._nMoreCount = 0;
			}
			return;
		}

		const tokensArray = this._tokens;

		if (tokensArray.length === 0) {
			this._nMoreCount = 0;
			return;
		}

		// ── Step 1: identify uncached tokens and temporarily un-hide them ──────
		// Tokens with overflows=true have display:none; getBoundingClientRect
		// would return zero width for them.  Only reset the ones we actually need
		// to measure (no cache hit) to minimise token re-renders.
		const uncachedTokens = tokensArray.filter(t => !this._tokenWidthCache.has(t._id));
		uncachedTokens.forEach(t => {
			if (t.overflows) {
				t.overflows = false;
			}
		});

		// ── Step 2: batch-read token widths ────────────────────────────────────
		if (uncachedTokens.length > 0) {
			const rects = uncachedTokens.map(t => t.getBoundingClientRect());

			// Derive gap from actual rendered positions of the first two adjacent
			// tokens.  This avoids relying on getComputedStyle which can return 0
			// when theme CSS variables haven't resolved on the first call.
			if (this._cachedGap === 0 && uncachedTokens.length >= 2) {
				const i0 = tokensArray.indexOf(uncachedTokens[0]);
				const i1 = tokensArray.indexOf(uncachedTokens[1]);
				if (i1 === i0 + 1 && rects[0].width > 0 && rects[1].width > 0) {
					const dir = getComputedStyle(this.contentDom).direction;
					const gap = dir === "rtl"
						? rects[0].left - rects[1].right
						: rects[1].left - rects[0].right;
					this._cachedGap = Math.max(0, gap);
				}
			}

			uncachedTokens.forEach((t, i) => {
				// Only cache non-zero widths.  A zero width means the element hasn't
				// rendered yet (e.g. shadow stylesheet not applied); keeping it uncached
				// forces a re-measurement on the next call.
				if (rects[i].width > 0) {
					this._tokenWidthCache.set(t._id, rects[i].width);
				}
			});
		}

		// If we still have uncached tokens (all zero-width), defer until next
		// resize/render cycle — do not poison the state with wrong measurements.
		const allCached = tokensArray.every(t => this._tokenWidthCache.has(t._id));
		if (!allCached) {
			return;
		}

		const tokenWidths = tokensArray.map(t => this._tokenWidthCache.get(t._id)!);

		// ── Step 3: read padding (re-read only when cache is fresh) ────────────
		if (this._cachedPaddingStart === 0) {
			this._cachedPaddingStart = parseFloat(getComputedStyle(this.contentDom).paddingInlineStart) || 0;
		}

		// Use the HOST element width as the container width.  Using contentDom
		// width is incorrect when the n-more button is already rendered: flexbox
		// narrows the content div, causing the formula to double-count the n-more
		// width and conclude that fewer tokens fit than actually do.
		const containerWidth = this.getBoundingClientRect().width;

		// ── Step 4: n-more button widths via hidden measurement span ────────────
		const measureSpan = this._measureSpan;
		const getNMoreWidth = (hidden: number): number => {
			if (this._nMoreWidthCache.has(hidden)) {
				return this._nMoreWidthCache.get(hidden)!;
			}
			if (!measureSpan) {
				return 0;
			}
			measureSpan.textContent = this._getNMoreTextForCount(hidden, tokensArray.length);
			// margin-inline-start on .ui5-tokenizer-more-text provides the gap
			// between the last visible token and the button; include it so the
			// formula accounts for the total space the button occupies.
			const cs = getComputedStyle(measureSpan);
			const margin = parseFloat(cs.marginInlineStart) || this._cachedGap;
			const w = measureSpan.getBoundingClientRect().width + margin;
			this._nMoreWidthCache.set(hidden, w);
			return w;
		};

		// ── Step 5: pure layout calculation ────────────────────────────────────
		const layout = calculateLayout(
			containerWidth,
			tokenWidths,
			this._cachedGap,
			this._cachedPaddingStart,
			getNMoreWidth,
		);

		// ── Step 6: apply overflow flags (guard no-op writes) ──────────────────
		tokensArray.forEach((t, i) => {
			const shouldOverflow = i >= layout.visibleCount;
			if (t.overflows !== shouldOverflow) {
				t.overflows = shouldOverflow;
			}
		});

		// ── Step 7: update _nMoreCount only if changed ──────────────────────────
		if (layout.hiddenCount !== this._nMoreCount) {
			this._nMoreCount = layout.hiddenCount;
		}
	}

	/**
	 * Returns the text that would appear in the "+N more" / "N Items" button
	 * for a given number of hidden tokens, without touching the live DOM.
	 */
	_getNMoreTextForCount(hiddenCount: number, totalCount: number): string {
		const hasVisible = hiddenCount < totalCount;
		if (hasVisible) {
			return Tokenizer.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, hiddenCount);
		}
		return Tokenizer.i18nBundle.getText(TOKENIZER_SHOW_ALL_ITEMS, hiddenCount);
	}

	get _measureSpan(): HTMLElement | null {
		return this.shadowRoot?.querySelector<HTMLElement>(".ui5-tokenizer--measure-nmore") ?? null;
	}

	// ─────────────────────────────────────────────────────────────────────────

	/**
	 * Updates the lastVisibleToken property on tokens.
	 * When collapsed with overflow, marks the last visible token for proper spacing to the n-more indicator.
	 * @private
	 */
	_updateLastVisibleTokenAttribute() {
		const tokensArray = this._tokens;
		const hasOverflow = this._nMoreCount > 0;
		const visibleTokens = tokensArray.filter(token => !token.overflows);
		const lastVisibleToken = visibleTokens.length > 0 ? visibleTokens[visibleTokens.length - 1] : undefined;

		tokensArray.forEach(token => {
			token.lastVisibleToken = (!this.expanded && hasOverflow && token === lastVisibleToken);
		});
	}

	/**
	 * Scrolls the container to the end to ensure very long tokens are visible at their end.
	 * Otherwise, tokens may appear visually cut off.
	 * @protected
	 */
	_scrollToEndIfNeeded() {
		// if scroll to end is prevented, skip scroll to the end
		if (!this._scrollToEndOnExpand) {
			return;
		}

		if (this.tokens.length || this.expanded) {
			this.scrollToEnd();
		}
	}

	_delete(e: CustomEvent<TokenDeleteEventDetail>) {
		const target = e.target as Token;

		if (!e.detail) { // if there are no details, the event is triggered by a click
			this._tokenClickDelete(e, target);
			this.open = false;

			return;
		}

		this.deleteToken(target, e.detail.backSpace);
	}

	_tokenClickDelete(e: CustomEvent<TokenDeleteEventDetail>, token: Token) {
		const tokens = this._tokens;
		const target = e.target as Token;
		const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(target); // The index of the token that just got deleted
		const nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1; // The index of the next token that needs to be focused next due to the deletion
		const nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined
		const tokensToDelete = [token];

		this._announceTokenDeletion(tokensToDelete.length);
		this._handleCurrentItemAfterDeletion(nextToken);

		this._tokenDeleting = true;
		this.fireDecoratorEvent("token-delete", { tokens: tokensToDelete });
	}

	_handleCurrentItemAfterDeletion(nextToken: Token) {
		if (nextToken && !isPhone()) {
			setTimeout(() => {
				nextToken.focus();
				this._itemNav.setCurrentItem(nextToken);
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
		const tokens = this._tokens;
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
				nextTokenIndex = forwardFocusToPrevious ? --nextTokenIndex : ++nextTokenIndex;

				if (nextTokenIndex < 0) {
					nextToken = notSelectedTokens[0];
				}

				if (nextTokenIndex > notSelectedTokens.length) {
					nextToken = notSelectedTokens[notSelectedTokens.length - 1];
				}
			}
		} else {
			nextToken = notSelectedTokens[0];
		}

		const tokensToDelete = this._selectedTokens.length ? this._selectedTokens : [token];
		this._announceTokenDeletion(tokensToDelete.length);

		this._handleCurrentItemAfterDeletion(nextToken);

		this._tokenDeleting = true;

		this.fireDecoratorEvent("token-delete", { tokens: tokensToDelete });
	}

	async itemDelete(e: CustomEvent<ListItemDeleteEventDetail>) {
		const token = this.getTokenByRefId(e.detail.item.getAttribute("data-ui5-token-ref-id")!);

		const tokensArray = this._tokens;
		const tokensToDelete = [token];

		// delay the token deletion in order to close the popover before removing token of the DOM
		if (tokensArray.length === 1) {
			const morePopover = this.getPopover();

			morePopover.addEventListener("ui5-close", () => {
				this._announceTokenDeletion(tokensToDelete.length);
				this.fireDecoratorEvent("token-delete", { tokens: tokensToDelete });
			}, {
				once: true,
			});
			this.open = false;
		} else {
			if (isPhone()) {
				this._deletedDialogItems.push(token);
			} else {
				this._announceTokenDeletion(tokensToDelete.length);
				this.fireDecoratorEvent("token-delete", { tokens: tokensToDelete });
			}
			const currentListItem = e.detail.item as ListItem;
			const nextListItem = currentListItem.nextElementSibling as ListItem;
			const previousListItem = currentListItem.previousElementSibling as ListItem;
			const focusItem = nextListItem || previousListItem;

			if (focusItem) {
				await renderFinished();
				focusItem.focus();
			}
		}
	}

	handleBeforeClose() {
		if (!this._tokenDeleting && !this._preventCollapse) {
			this._preventCollapse = false;
			this.expanded = false;
		}
	}

	handleBeforeOpen() {
		const list = this._getList();
		const firstListItem = list.querySelectorAll("[ui5-li]")[0] as ListItem;

		list._itemNavigation.setCurrentItem(firstListItem);

		this.fireDecoratorEvent("before-more-popover-open");
	}

	handleAfterClose() {
		this.open = false;
		// Don't reset _preventCollapse if we're in the middle of deleting a token
		if (!this._tokenDeleting) {
			this._preventCollapse = false;
		}
		this._focusedElementBeforeOpen = null;
	}

	handleDialogButtonPress(e: UI5CustomEvent<Button, "click">) {
		const isOkButton = (e.target as HTMLElement).hasAttribute("data-ui5-tokenizer-dialog-ok-button");
		const confirm = !!isOkButton;

		if (confirm && this._deletedDialogItems.length) {
			this._announceTokenDeletion(this._deletedDialogItems.length);
			this.fireDecoratorEvent("token-delete", { tokens: this._deletedDialogItems });
		}

		this.open = false;
	}

	_onkeydown(e: KeyboardEvent) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		if (isEscape(e)) {
			return this._deselectAllTokens();
		}

		if ((isCtrl && ["c", "x"].includes(e.key.toLowerCase())) || isDeleteShift(e) || isInsertCtrl(e)) {
			e.preventDefault();

			const isCut = e.key.toLowerCase() === "x" || isDeleteShift(e);
			const selectedTokens = this._tokens.filter(token => token.selected);
			const focusedToken = this._tokens.find(token => token.focused);
			let tokensToCopy = selectedTokens;
			if (!tokensToCopy.length && focusedToken) {
				tokensToCopy = [focusedToken];
			}

			if (isCut && !this.readonly && tokensToCopy.length) {
				const cutResult = this._fillClipboard(ClipboardDataOperation.cut, tokensToCopy);

				this.deleteToken(tokensToCopy[0]);

				return cutResult;
			}

			return this._fillClipboard(ClipboardDataOperation.copy, tokensToCopy);
		}

		if (isCtrl && e.key.toLowerCase() === "i" && this._tokens.length > 0) {
			e.preventDefault();

			this._preventCollapse = true;
			this._focusedElementBeforeOpen = getFocusedElement();

			this.open = true;
		}

		if (isSpaceShift(e)) {
			e.preventDefault();
		}

		if (isSpace(e) || isSpaceCtrl(e)) {
			e.preventDefault();

			return this._handleTokenSelection(e, false);
		}

		if (isHomeShift(e) || isPageUpShift(e)) {
			this._handleHomeShift(e);
		}

		if (isEndShift(e) || isPageDownShift(e)) {
			this._handleEndShift(e);
		}

		this._handleItemNavigation(e, this._tokens);
	}

	_onPopoverListKeydown(e: KeyboardEvent) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		if ((isCtrl && e.key.toLowerCase() === "i") || isEscape(e)) {
			e.preventDefault();
			this.open = false;

			this._preventCollapse = true;
			this._focusedElementBeforeOpen && this._focusedElementBeforeOpen.focus();

			if (!this._focusedElementBeforeOpen) {
				this._focusLastToken();
			}
		}

		if (e.key.toLowerCase() === "f7") {
			e.preventDefault();

			const eventTarget = e.target as ListItem;
			const activeElement = getActiveElement();

			if (activeElement?.part.value === "native-li") {
				eventTarget.shadowRoot!.querySelector<HTMLElement>("[part=delete-button]")!.focus();
			} else {
				eventTarget.focus();
			}
		}
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
			e.preventDefault();
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
	}

	_handleHomeShift(e: KeyboardEvent) {
		const tokens = this._tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);
		const previousSelectedTokens = [...this._selectedTokens];

		tokens.filter((token, index) => index <= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});
		}

		tokens[0].focus();
	}

	_handleEndShift(e: KeyboardEvent) {
		const tokens = this._tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);
		const previousSelectedTokens = [...this._selectedTokens];

		tokens.filter((token, index) => index >= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});
		}

		tokens[tokens.length - 1].focus();
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
	}

	_handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean) {
		const focusedTokenIndex = tokens.indexOf(focusedToken);
		const nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);
		const previousSelectedTokens = [...this._selectedTokens];

		if (nextIndex === -1 || nextIndex === tokens.length) {
			return;
		}

		focusedToken.selected = true;
		tokens[nextIndex].selected = true;

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});
		}

		tokens[nextIndex].focus();

		this._scrollToToken(tokens[nextIndex]);
	}

	_click(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey) {
			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});
			return;
		}

		const targetToken = e.target as Token;

		if (!e.shiftKey) {
			this._previousToken = targetToken;
		}

		let focusedToken = targetToken;

		if (this._previousToken) {
			focusedToken = this._previousToken;
		} else {
			this._previousToken = focusedToken;
		}

		if (e.shiftKey) {
			const tokensArray = this._tokens;
			const lastClickedIndex = tokensArray.indexOf(targetToken);
			const firstSelectedTokenIndex = tokensArray.indexOf(focusedToken);
			const start = Math.min(lastClickedIndex, firstSelectedTokenIndex);
			const end = Math.max(lastClickedIndex, firstSelectedTokenIndex);

			if (lastClickedIndex !== -1) {
				tokensArray.forEach((token, i) => {
					token.selected = i >= start && i <= end;
				});
			}

			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});

			return;
		}

		this._handleTokenSelection(e);
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as Token;
		this._lastFocusedToken = target;

		if (target && target.toBeDeleted) {
			this._tokenDeleting = true;

			return;
		}

		this.open = false;
		this.expanded = true;
		this._addTokenToNavigation(e.target as Token);
	}

	_addTokenToNavigation(token: Token) {
		this._scrollToEndOnExpand = false;
		this._itemNav.setCurrentItem(token);
	}

	_onfocusout(e: FocusEvent) {
		const relatedTarget = e.relatedTarget as HTMLElement;
		const tokenLosingFocus = e.target as Token;

		// If the token losing focus is being deleted, prevent collapse
		if (tokenLosingFocus?.toBeDeleted) {
			this._preventCollapse = true;
		}

		this._tokens.forEach(token => {
			token.forcedTabIndex = "-1";
		});

		this._itemNav._currentIndex = -1;
		this._skipTabIndex = true;

		if (!this.contains(relatedTarget) && !this.preventInitialFocus) {
			this._tokens[0].forcedTabIndex = "0";
			this._isFocusSetInternally = false;
			this._skipTabIndex = false;
		}

		const hasTokenToBeDeleted = this._tokens.some(token => token.toBeDeleted);

		if (!this._tokenDeleting && !this._preventCollapse && !hasTokenToBeDeleted) {
			this._preventCollapse = false;
			this.expanded = false;
		}
	}

	/**
 	 * Determines the DOM element to focus when the Tokenizer receives focus.
 	 * If the last-focused token is not overflown, focus is restored to it.
 	 * Otherwise, the focus defaults to the first visible token.
 	 */
	getFocusDomRef(): HTMLElement | undefined {
		if (this._lastFocusedToken && !this._lastFocusedToken.overflows) {
			this._itemNav._currentIndex = this.tokens.indexOf(this._lastFocusedToken);
			this._isFocusSetInternally = true;
			this.tokens[0].forcedTabIndex = "-1";
		} else {
			this._itemNav._currentIndex = 0;
		}
		return this._itemNav._getCurrentItem();
	}

	_toggleTokenSelection(tokens: Array<Token>) {
		if (!tokens || !tokens.length) {
			return;
		}

		const tokensAreSelected = tokens.every(token => token.selected);
		tokens.forEach(token => { token.selected = !tokensAreSelected; });

		this.fireDecoratorEvent("selection-change", {
			tokens: this._selectedTokens,
		});
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

			this.fireDecoratorEvent("selection-change", {
				tokens: this._selectedTokens,
			});
		}
	}

	_deselectAllTokens() {
		const hadSelection = this._selectedTokens.length > 0;
		this._tokens.forEach(token => { token.selected = false; });

		if (hadSelection) {
			this.fireDecoratorEvent("selection-change", {
				tokens: [],
			});
		}
	}

	get hasTokens() {
		return this._tokens.length > 0;
	}

	get showEffectiveClearAll() {
		return this.showClearAll && this.hasTokens && this.multiLine && !this.readonly;
	}

	_fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>) {
		const tokensTexts = tokens.map(token => token.text).join("\r\n");

		// Async clipboard API (works in secure contexts - HTTPS/localhost)
		if (navigator.clipboard?.writeText && window.isSecureContext) {
			navigator.clipboard.writeText(tokensTexts)?.catch(() => {
				// Silent fallback - user can retry
			});
			return;
		}

		// Fallback for HTTP: use ClipboardEvent with execCommand
		// execCommand is deprecated but it is kept for compatibility reasons, as
		// there is no other way to write to clipboard in non-secure contexts
		const fillClipboardHandler = (e: ClipboardEvent) => {
			if (e.clipboardData) {
				e.clipboardData.setData("text/plain", tokensTexts);
			}
			e.preventDefault();
		};

		document.addEventListener(shortcutName, fillClipboardHandler);
		document.execCommand(shortcutName);
		document.removeEventListener(shortcutName, fillClipboardHandler);
	}

	/**
	 * Scrolls the container of the tokens to its beginning.
	 * This method is used by MultiInput and MultiComboBox.
	 * @protected
	 */
	scrollToStart() {
		if (this._scrollEnablement?.scrollContainer) {
			this._scrollEnablement?.scrollTo(0, 0);
		}
	}

	/**
	 * Scrolls the container of the tokens to its end when expanded.
	 * This method is used by MultiInput and MultiComboBox.
	 * @protected
	 */
	scrollToEnd() {
		const expandedTokenizerScrollWidth = this.contentDom && (this.effectiveDir !== "rtl" ? this.contentDom.scrollWidth : -this.contentDom.scrollWidth);
		if (this._scrollEnablement?.scrollContainer) {
			this._scrollEnablement?.scrollTo(expandedTokenizerScrollWidth, 0, 5, 10);
		}
	}

	/**
	 * Scrolls token to the visible area of the container.
	 * Adds 5 pixels to the scroll position to ensure padding and border visibility on both ends
	 * For the last token, if its width is more than the needed space, scroll to the end without offset
	 * @protected
	 */
	_scrollToToken(token: IToken) {
		if (!this.contentDom) {
			return;
		}

		const tokenRect = token.getBoundingClientRect();
		const tokenContainerRect = this.contentDom.getBoundingClientRect();
		const oneSideBorderAndPaddingOffset = 5;

		const isLastToken = this._tokens.indexOf(token as Token) === this._tokens.length - 1;
		if (isLastToken) {
			this.scrollToEnd();
			return;
		}

		if (tokenRect.left < tokenContainerRect.left) {
			this._scrollEnablement?.scrollTo(this.contentDom.scrollLeft - (tokenContainerRect.left - tokenRect.left + oneSideBorderAndPaddingOffset), 0);
		} else if (tokenRect.right > tokenContainerRect.right) {
			this._scrollEnablement?.scrollTo(this.contentDom.scrollLeft + (tokenRect.right - tokenContainerRect.right + oneSideBorderAndPaddingOffset), 0);
		}
	}

	_getList() {
		return this.getPopover().querySelector<List>("[ui5-list]")!;
	}

	get _tokens() {
		return this.getSlottedNodes<Token>("tokens");
	}

	get morePopoverOpener(): HTMLElement | string | null {
		// return this.opener ? this : this.opener;
		if (this.opener) {
			return this.opener;
		}
		return this;
	}

	get _nMoreText() {
		if (!this._nMoreCount) {
			return;
		}
		return this._getNMoreTextForCount(this._nMoreCount, this._tokens.length);
	}

	get _clearAllText() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_CLEAR_ALL);
	}

	get showNMore() {
		return !this.expanded && this._nMoreCount > 0;
	}

	get contentDom() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer--content")!;
	}

	get moreLink() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer-more-text");
	}

	get tokenizerLabel() {
		const effectiveLabelText = getEffectiveAriaLabelText(this);
		return effectiveLabelText || Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
	}

	get _okButtonText() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_DIALOG_OK_BUTTON);
	}

	get _cancelButtonText() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_DIALOG_CANCEL_BUTTON);
	}

	get tokenizerAriaDescription() {
		return getEffectiveAriaLabelText(this) ? Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL) : undefined;
	}

	get _ariaDisabled() {
		return this.disabled || undefined;
	}

	get _ariaReadonly() {
		return this.readonly || undefined;
	}

	get morePopoverTitle() {
		return this.popoverTitle || getEffectiveAriaLabelText(this) || Tokenizer.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	/**
	 * Returns the tokens that are currently hidden due to overflow.
	 * This is a read-only derived view; overflow state is managed by _computeAndApplyLayout.
	 */
	get overflownTokens() {
		return this._tokens.filter(t => t.overflows);
	}

	get _isPhone() {
		return isPhone();
	}

	get _selectedTokens() {
		return this._tokens.filter(token => token.selected);
	}

	get _nMoreListMode() {
		if (this.readonly || this.disabled) {
			return ListSelectionMode.None;
		}

		return ListSelectionMode.Delete;
	}

	get styles() {
		return {
			popover: {
				"min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : `${this.getBoundingClientRect().width}px`,
			},
		};
	}

	/**
	 * @protected
	 */
	_focusLastToken() {
		const tokens = this._tokens;
		if (tokens.length === 0) {
			return;
		}

		const lastToken = tokens[tokens.length - 1];
		lastToken.focus();
	}

	getPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	getTokenByRefId(refId: string) {
		return this._tokens.find(token => token._id === refId)!;
	}
}

const getTokensCountText = (iTokenCount: number) => {
	const tokenCountMap: TokenCountMapType = {
		0: TOKENIZER_ARIA_CONTAIN_TOKEN,
		1: TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	};

	if (iTokenCount in tokenCountMap) {
		return Tokenizer.i18nBundle.getText(tokenCountMap[iTokenCount]);
	}

	return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
};

Tokenizer.define();

export default Tokenizer;
export { getTokensCountText };
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail, TokenizerSelectionChangeEventDetail, TokenizerDialogButtonPressDetail };
