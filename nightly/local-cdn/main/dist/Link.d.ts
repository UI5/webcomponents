import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import LinkDesign from "./types/LinkDesign.js";
import type WrappingType from "./types/WrappingType.js";
import type LinkAccessibleRole from "./types/LinkAccessibleRole.js";
import type InteractiveAreaSize from "./types/InteractiveAreaSize.js";
type LinkClickEventDetail = {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
};
type LinkAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "current">;
/**
 * @class
 *
 * ### Overview
 * The `ui5-link` is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 * ### Usage
 *
 * You can set the `ui5-link` to be enabled or disabled.
 *
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * `Subtle` or the more important ones as `Emphasized`,
 * by using the `design` property.
 *
 * If the `href` property is set, the link behaves as the HTML
 * anchor tag (`<a></a>`) and opens the specified URL in the given target frame (`target` property).
 * To specify where the linked content is opened, you can use the `target` property.
 *
 * ### Responsive behavior
 *
 * If there is not enough space, the text of the `ui5-link` becomes truncated.
 * If the `wrappingType` property is set to `"Normal"`, the text is displayed
 * on several lines instead of being truncated.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Link";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart icon - Used to style the provided icon within the link
 * @csspart endIcon - Used to style the provided endIcon within the link
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
declare class Link extends UI5Element implements ITabbable {
    eventDetails: {
        click: LinkClickEventDetail;
    };
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** When disabled, the click event cannot be triggered by the user.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the tooltip of the component.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    tooltip?: string;
    /**
     * Defines the component href.
     *
     * **Note:** Standard hyperlink behavior is supported.
     * @default undefined
     * @public
     */
    href?: string;
    /**
     * Defines the component target.
     *
     * **Notes:**
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **This property must only be used when the `href` property is set.**
     * @default undefined
     * @public
     */
    target?: string;
    /**
     * Defines the component design.
     *
     * **Note:** Avaialble options are `Default`, `Subtle`, and `Emphasized`.
     * @default "Default"
     * @public
     */
    design: `${LinkDesign}`;
    /**
     * Defines the target area size of the link:
     * - **InteractiveAreaSize.Normal**: The default target area size.
     * - **InteractiveAreaSize.Large**: The target area size is enlarged to 24px in height.
     *
     * **Note:**The property is designed to make links easier to activate and helps meet the WCAG 2.2 Target Size requirement. It is applicable only for the SAP Horizon themes.
     * **Note:**To improve <code>ui5-link</code>'s reliability and usability, it is recommended to use the <code>InteractiveAreaSize.Large</code> value in scenarios where the <code>ui5-link</code> component is placed inside another interactive component, such as a list item or a table cell.
     * Setting the <code>interactiveAreaSize</code> property to <code>InteractiveAreaSize.Large</code> increases the <code>ui5-link</code>'s invisible touch area. As a result, the user's intended one-time selection command is more likely to activate the desired <code>ui5-link</code>, with minimal chance of unintentionally activating the underlying component.
     *
     * @public
     * @since 2.8.0
     * @default "Normal"
     */
    interactiveAreaSize: `${InteractiveAreaSize}`;
    /**
     * Defines how the text of a component will be displayed when there is not enough space.
     *
     * **Note:** By default the text will wrap. If "None" is set - the text will truncate.
     * @default "Normal"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.2.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the input
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    /**
     * Defines the ARIA role of the component.
     *
     * **Note:** Use the <code>LinkAccessibleRole.Button</code> role in cases when navigation is not expected to occur and the href property is not defined.
     * @default "Link"
     * @public
     * @since 1.9.0
     */
    accessibleRole: `${LinkAccessibleRole}`;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
     * Accepts the following string values: `true` or `false`.
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * @public
     * @since 1.1.0
     * @default {}
     */
    accessibilityAttributes: LinkAccessibilityAttributes;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescription?: string;
    /**
     * Defines the icon, displayed as graphical element within the component before the link's text.
     * The SAP-icons font provides numerous options.
     *
     * **Note:** Usage of icon-only link is not supported, the link must always have a text.
     *
     * **Note:** We recommend using аn icon in the beginning or the end only, and with text.
     *
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @since 2.0.0
     * @public
     */
    icon?: string;
    /**
     * Defines the icon, displayed as graphical element within the component after the link's text.
     * The SAP-icons font provides numerous options.
     *
     * **Note:** Usage of icon-only link is not supported, the link must always have a text.
     *
     * **Note:** We recommend using аn icon in the beginning or the end only, and with text.
     *
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @since 2.0.0
     * @public
     */
    endIcon?: string;
    _rel: string | undefined;
    forcedTabIndex?: string;
    _dummyAnchor: HTMLAnchorElement;
    static i18nBundle: I18nBundle;
    constructor();
    onEnterDOM(): void;
    onBeforeRendering(): void;
    _isCrossOrigin(href: string): boolean;
    get effectiveTabIndex(): number;
    get ariaLabelText(): string | undefined;
    get hasLinkType(): boolean;
    static typeTextMappings(): Record<string, I18nText>;
    get linkTypeText(): string;
    get parsedRef(): string | undefined;
    get effectiveAccRole(): "button" | "link";
    get ariaDescriptionText(): string | undefined;
    get _hasPopup(): import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
    _onclick(e: MouseEvent | KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
}
export default Link;
export type { LinkClickEventDetail, LinkAccessibilityAttributes, };
