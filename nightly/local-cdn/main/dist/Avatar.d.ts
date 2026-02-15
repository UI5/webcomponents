import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { IAvatarGroupItem } from "./AvatarGroup.js";
import type Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import type AvatarShape from "./types/AvatarShape.js";
import type AvatarColorScheme from "./types/AvatarColorScheme.js";
import "@ui5/webcomponents-icons/dist/employee.js";
type AvatarAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;
/**
 * @class
 * ### Overview
 *
 * An image-like component that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `interactive` property is set to true.
 * - [Shift] - If [Space] is pressed, pressing [Shift] releases the component without triggering the click event.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Avatar.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @implements {IAvatarGroupItem}
 * @public
 */
declare class Avatar extends UI5Element implements ITabbable, IAvatarGroupItem {
    eventDetails: {
        click: void;
    };
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines if the avatar is interactive (focusable and pressable).
     *
     * **Note:** This property won't have effect if the `disabled`
     * property is set to `true`.
     * @default false
     * @public
     */
    interactive: boolean;
    /**
     * Defines the name of the UI5 Icon, that will be displayed.
     *
     * **Note:** If `image` slot is provided, the property will be ignored.
     *
     * **Note:** You should import the desired icon first, then use its name as "icon".
     *
     * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
     *
     * `<ui5-avatar icon="employee">`
     *
     * **Note:** If no icon or an empty one is provided, by default the "employee" icon should be displayed.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the name of the fallback icon, which should be displayed in the following cases:
     *
     * 	- If the initials are not valid (more than 3 letters, unsupported languages or empty initials).
     * 	- If there are three initials and they do not fit in the shape (e.g. WWW for some of the sizes).
     * 	- If the image src is wrong.
     *
     * **Note:** If not set, a default fallback icon "employee" is displayed.
     *
     * **Note:** You should import the desired icon first, then use its name as "fallback-icon".
     *
     * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
     *
     * `<ui5-avatar fallback-icon="alert">`
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default "employee"
     * @public
     */
    fallbackIcon: string;
    /**
     * Defines the displayed initials.
     *
     * Up to three Latin letters can be displayed as initials.
     * @default undefined
     * @public
     */
    initials?: string;
    /**
     * Defines the shape of the component.
     * @default "Circle"
     * @public
     */
    shape: `${AvatarShape}`;
    /**
     * Defines predefined size of the component.
     * @default "S"
     * @public
     */
    size: `${AvatarSize}`;
    /**
     * Defines the background color of the desired image.
     * If `colorScheme` is set to `Auto`, the avatar will be displayed with the `Accent6` color.
     *
     * @default "Auto"
     * @public
     */
    colorScheme: `${AvatarColorScheme}`;
    /**
     * @private
     */
    _colorScheme: `${AvatarColorScheme}`;
    /**
     * Defines the text alternative of the component.
     * If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     * @since 1.0.0-rc.7
     */
    accessibleName?: string;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following field is supported:
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * @public
     * @since 2.0.0
     * @default {}
     */
    accessibilityAttributes: AvatarAccessibilityAttributes;
    forcedTabIndex?: string;
    /**
     * @private
     */
    _hasImage: boolean;
    /**
     * @private
     */
    _imageLoadError: boolean;
    /**
     * Receives the desired `<img>` tag
     *
     * **Note:** If you experience flickering of the provided image, you can hide the component until it is defined with the following CSS:<br/>
     * `ui5-avatar:not(:defined) {`<br/>
     * &nbsp;&nbsp;&nbsp;&nbsp;`visibility: hidden;`<br/>
     * `}`
     * @public
     * @since 1.0.0-rc.15
     */
    image: DefaultSlot<HTMLElement>;
    /**
     * Defines the optional badge that will be used for visual affordance.
     *
     * **Note:** While the slot allows for custom badges, to achieve
     * the Fiori design, use the `ui5-avatar-badge` component.
     * @public
     * @since 1.7.0
     */
    badge: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    _handleResizeBound: ResizeObserverCallback;
    _onImageLoadBound: (e: Event) => void;
    _onImageErrorBound: (e: Event) => void;
    constructor();
    onBeforeRendering(): void;
    get tabindex(): number | undefined;
    /**
     * Returns the effective avatar size.
     * @default "S"
     * @private
     */
    get effectiveSize(): AvatarSize;
    /**
     * Returns the effective background color.
     * @default "Auto"
     * @private
     */
    get effectiveBackgroundColor(): AvatarColorScheme;
    get _role(): "button" | "img";
    get _ariaHasPopup(): import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
    get _interactive(): boolean;
    get validInitials(): string | null | undefined;
    get accessibleNameText(): string;
    get hasImage(): boolean;
    get imageEl(): HTMLImageElement | null;
    get initialsContainer(): HTMLObjectElement | null;
    get fallBackIconDomRef(): Icon | null;
    onAfterRendering(): Promise<void>;
    onEnterDOM(): void;
    onExitDOM(): void;
    handleResize(): void;
    _checkInitials(): void;
    showFallbackIcon(): void;
    showInitials(): void;
    _onclick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _fireClick(): void;
    _getAriaHasPopup(): import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
    _attachImageEventHandlers(): void;
    _checkExistingImageState(): void;
    _detachImageEventHandlers(): void;
    _onImageLoad(e: Event): void;
    _onImageError(e: Event): void;
    get accessibilityInfo(): {
        role: AriaRole;
        type: string;
        description: string;
        disabled: boolean;
    };
}
export default Avatar;
export type { AvatarAccessibilityAttributes, };
