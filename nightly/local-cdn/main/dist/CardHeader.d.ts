import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card-header` is a component, meant to be used as a header of the `ui5-card` component.
 * It displays valuable information, that can be defined with several properties, such as: `titleText`, `subtitleText`, `additionalText`
 * and two slots: `avatar` and `action`.
 *
 * ### Keyboard handling
 * In case you enable `interactive` property, you can press the `ui5-card-header` by Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CardHeader";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @csspart root - Used to style the root DOM element of the CardHeader
 * @csspart title - Used to style the title of the CardHeader
 * @csspart subtitle - Used to style the subtitle of the CardHeader
 * @csspart additional-text - Used to style the additional text of the CardHeader
 */
declare class CardHeader extends UI5Element {
    eventDetails: {
        click: void;
    };
    /**
     * Defines the title text.
     * @default undefined
     * @public
    */
    titleText?: string;
    /**
     * Defines the subtitle text.
     * @default undefined
     * @public
    */
    subtitleText?: string;
    /**
     * Defines the additional text.
     * @default undefined
     * @public
    */
    additionalText?: string;
    /**
     * Defines if the component would be interactive,
     * e.g gets hover effect and `click` event is fired, when pressed.
     * @default false
     * @public
    */
    interactive: boolean;
    /**
     * Define the `aria-level` attribute of the component
     *
     * **Note: ** If the interactive property is set, `aria-level` attribute is not rendered at all.
     * @private
     * @default 3
    */
    _ariaLevel: number;
    _headerActive: boolean;
    /**
     * Defines an avatar image, displayed in the left most part of the header.
     * @public
    */
    avatar: Slot<HTMLElement>;
    /**
     * Defines an action, displayed in the right most part of the header.
     * @public
    */
    action: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    onEnterDOM(): void;
    get _root(): HTMLElement;
    get ariaRoleDescription(): string;
    get ariaRoleFocusableElement(): "button" | "group";
    get ariaCardAvatarLabel(): string;
    get ariaLabelledBy(): string | undefined;
    get hasAvatar(): boolean;
    get hasAction(): boolean;
    _actionsFocusin(): void;
    _actionsFocusout(): void;
    _click(e: MouseEvent): void;
    _keydown(e: KeyboardEvent): void;
    _keyup(e: KeyboardEvent): void;
}
export default CardHeader;
