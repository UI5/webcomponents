import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type TitleLevel from "./types/TitleLevel.js";
import type Button from "./Button.js";
import type PanelAccessibleRole from "./types/PanelAccessibleRole.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-panel` component is a container which has a header and a
 * content area and is used
 * for grouping and displaying information. It can be collapsed to save space on the screen.
 *
 * ### Guidelines:
 *
 * - Nesting two or more panels is not recommended.
 * - Do not stack too many panels on one page.
 *
 * ### Structure
 * The panel's header area consists of a title bar with a header text or custom header.
 *
 * The header is clickable and can be used to toggle between the expanded and collapsed state. It includes an icon which rotates depending on the state.
 *
 * The custom header can be set through the `header` slot and it may contain arbitraray content, such as: title, buttons or any other HTML elements.
 *
 * The content area can contain an arbitrary set of controls.
 *
 * **Note:** The custom header is not clickable out of the box, but in this case the icon is interactive and allows to show/hide the content area.
 *
 * ### Responsive Behavior
 *
 * - If the width of the panel is set to 100% (default), the panel and its children are
 * resized responsively,
 * depending on its parent container.
 * - If the panel has a fixed height, it will take up the space even if the panel is
 * collapsed.
 * - When the panel is expandable (the `fixed` property is set to `false`),
 * an arrow icon (pointing to the right) appears in front of the header.
 * - When the animation is activated, expand/collapse uses a smooth animation to open or
 * close the content area.
 * - When the panel expands/collapses, the arrow icon rotates 90 degrees
 * clockwise/counter-clockwise.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Panel.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the content of the component. The content is visible only when the component is expanded.
 * @csspart header - Used to style the wrapper of the header.
 * @csspart content - Used to style the wrapper of the content.
 */
declare class Panel extends UI5Element {
    eventDetails: {
        toggle: void;
    };
    /**
     * This property is used to set the header text of the component.
     * The text is visible in both expanded and collapsed states.
     *
     * **Note:** This property is overridden by the `header` slot.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Determines whether the component is in a fixed state that is not
     * expandable/collapsible by user interaction.
     * @default false
     * @public
     */
    fixed: boolean;
    /**
     * Indicates whether the component is collapsed and only the header is displayed.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Indicates whether the transition between the expanded and the collapsed state of the component is animated. By default the animation is enabled.
     * @default false
     * @public
     * @since 1.0.0-rc.16
     */
    noAnimation: boolean;
    /**
     * Sets the accessible ARIA role of the component.
     * Depending on the usage, you can change the role from the default `Form`
     * to `Region` or `Complementary`.
     * @default "Form"
     * @public
     */
    accessibleRole: `${PanelAccessibleRole}`;
    /**
     * Defines the "aria-level" of component heading,
     * set by the `headerText`.
     * @default "H2"
     * @public
    */
    headerLevel: `${TitleLevel}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Indicates whether the Panel header is sticky or not.
     * If stickyHeader is set to true, then whenever you scroll the content or
     * the application, the header of the panel will be always visible and
     * a solid color will be used for its design.
     * @default false
     * @public
     * @since 1.16.0-rc.1
     */
    stickyHeader: boolean;
    /**
     * When set to `true`, the `accessibleName` property will be
     * applied not only on the panel root itself, but on its toggle button too.
     * **Note:** This property only has effect if `accessibleName` is set and a header slot is provided.
     * @default false
     * @private
      */
    useAccessibleNameForToggleButton: boolean;
    /**
     * @private
     */
    _hasHeader: boolean;
    _contentExpanded: boolean;
    _animationRunning: boolean;
    _pendingToggle: boolean;
    /**
     * Defines the component header area.
     *
     * **Note:** When a header is provided, the `headerText` property is ignored.
     * @public
     */
    header: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    shouldToggle(element: HTMLElement): boolean;
    get shouldNotAnimate(): boolean;
    _headerClick(e: MouseEvent): void;
    _toggleButtonClick(e: UI5CustomEvent<Button, "click">): void;
    _headerKeyDown(e: KeyboardEvent): void;
    _headerKeyUp(e: KeyboardEvent): void;
    _toggleOpen(): void;
    _headerOnTarget(target: HTMLElement): boolean;
    get toggleButtonTitle(): string;
    get expanded(): boolean;
    get accRole(): Lowercase<PanelAccessibleRole>;
    get effectiveAccessibleName(): string | undefined;
    get accInfo(): {
        button: {
            accessibilityAttributes: {
                expanded: boolean;
            };
            title: string;
            ariaLabelButton: string | undefined;
        };
        ariaExpanded: boolean | undefined;
        ariaControls: string | undefined;
        ariaLabelledby: string | undefined;
        role: "button" | undefined;
    };
    get ariaLabelledbyReference(): string | undefined;
    get fixedPanelAriaLabelledbyReference(): string | undefined;
    get headerAriaLevel(): number;
    get headerTabIndex(): 0 | -1;
    get headingWrapperAriaLevel(): number | undefined;
    get headingWrapperRole(): "heading" | undefined;
    get nonFixedInternalHeader(): boolean;
    get hasHeaderOrHeaderText(): string | true | undefined;
    get nonFocusableButton(): boolean;
}
export default Panel;
