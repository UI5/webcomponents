import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import DynamicPageHeader from "./DynamicPageHeader.js";
import DynamicPageTitle from "./DynamicPageTitle.js";
import type DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * A layout component, representing a web page, consisting of a title, header with dynamic behavior, a content area, and an optional floating footer.
 *
 * The component consist of several components:
 *
 * - `DynamicPageTitle` - a component, holding the title of the page, the navigation actions and the content. The displayed content changes based on the current mode of the `DynamicPageHeader`.
 * - `DynamicPageHeader` - a generic container, which can contain a single layout component and any other HTML elements. The header works in two modes - expanded and snapped and its behavior can be adjusted with the help of different properties.
 * - `Content area` - a generic container, which can have a single UI5 layout.
 * - `Footer` - positioned at the bottom with a small offset and used for additional actions, the footer floats above the content.
 *
 * ### Usage
 *
 * Use the `DynamicPage` if you need to have a title, that is always visible
 * and a header, that has configurable Expanding/Snapping functionality.
 * If you don't need the Expanding/Snapping functionality it is better to use the
 * `ui5-page` as a lighter component.
 *
 * The app can add to the `default` slot of the ui5-dynamic-page either content that is designed to fit its container (e.g. has 100% height),
 * or content with own height that may overflow its container. In the second case the `DynamicPage` will show a scrollbar that allows the user
 * scroll through the content.
 *
 * ## Notes:
 *
 * - Snapping of the `DynamicPageTitle` is not supported in the following case:
 *  - When the `DynamicPage` has a scroll bar, the component usually scrolls to the snapping point - the point, where the `DynamicPageHeader` is scrolled out completely. However, when there is a scroll bar, but not enough content to reach the snapping point, the snapping is not possible using scrolling.
 *
 * ### Responsive Behavior
 *
 * Dynamic page web component implements the responsive paddings design.
 *
 * ### Keyboard Handling
 *
 *
 * ### Basic Navigation
 *
 * - [SPACE, ENTER, RETURN] - If focus is on a button inside DynamicPageTitle its action is being triggered, once activated.
 * If focus is on the snap header button (arrow button), or on the header itself, once activated, it triggers the associated action (such as snap/expand the header).
 * If focus is on pin button (the button with pin icon on the bottom of the header), once activated, it triggers the associated action (pinning of the header).
 *
 * ### Fast Navigation
 * - This component provides a build in fast navigation group which can be used via `F6 / Shift + F6` or ` Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up`.
 * In order to use this functionality, you need to import the following module:
 *
 * - `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicPage.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart fit-content - Used to style the fit content container of the component.
 * @csspart footer - Used to style the footer of the component
 */
declare class DynamicPage extends UI5Element {
    eventDetails: {
        "pin-button-toggle": void;
        "title-toggle": void;
    };
    /**
     * Defines if the pin button is hidden.
     *
     * @default false
     * @public
     */
    hidePinButton: boolean;
    /**
     * Defines if the header is pinned.
     *
     * @default false
     * @public
     */
    headerPinned: boolean;
    /**
     * Defines if the footer is shown.
     *
     * @default false
     * @public
     */
    showFooter: boolean;
    /**
     * Defines the content of the Dynamic Page.
     *
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines the title HTML Element.
     *
     * @public
     */
    titleArea: Slot<DynamicPageTitle>;
    /**
     * Defines the header HTML Element.
     *
     * @public
     */
    headerArea: Slot<DynamicPageHeader>;
    /**
     * Defines the footer HTML Element.
     *
     * @public
     */
    footerArea: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    skipSnapOnScroll: boolean;
    showHeaderInStickArea: boolean;
    isToggled: boolean;
    _headerSnapped: boolean;
    scrollContainer?: HTMLElement;
    headerActions?: DynamicPageHeaderActions;
    constructor();
    onBeforeRendering(): void;
    get endAreaHeight(): number;
    get topAreaHeight(): number;
    get dynamicPageTitle(): DynamicPageTitle | null;
    get dynamicPageHeader(): DynamicPageHeader | null;
    get footerWrapper(): Element | null | undefined;
    get actionsInTitle(): boolean;
    get headerInTitle(): boolean;
    get headerInContent(): boolean;
    get _headerLabel(): string;
    get _headerExpanded(): boolean;
    get headerTabIndex(): 0 | -1;
    get headerAriaHidden(): boolean;
    get hasHeading(): boolean;
    get headerSnapped(): boolean;
    get hasSnappedTitleOnMobile(): number | false | undefined;
    get headerAriaLabel(): string | undefined;
    /**
     * Defines if the header is snapped.
     *
     * @default false
     * @public
     */
    set headerSnapped(snapped: boolean);
    snapOnScroll(): void;
    snapTitleByScroll(): void;
    onExpandClick(): Promise<void>;
    onPinClick(): Promise<void>;
    onToggleTitle(): Promise<void>;
    _toggleHeader(): Promise<void>;
    onExpandHoverIn(): void;
    onExpandHoverOut(): void;
    onContentFocusIn(e: FocusEvent): void;
    onContentFocusOut(): void;
    setScrollPadding(padding: {
        start: number;
        end: number;
    }): void;
}
export default DynamicPage;
