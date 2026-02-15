import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import IllustrationMessageDesign from "./types/IllustrationMessageDesign.js";
import "./illustrations/BeforeSearch.js";
/**
 * @class
 *
 * ### Overview
 * An IllustratedMessage is a recommended combination of a solution-oriented message, an engaging
 * illustration, and conversational tone to better communicate an empty or a success state than just show
 * a message alone.
 *
 * Each illustration has default internationalised title and subtitle texts. Also they can be managed with
 * `titleText` and `subtitleText` properties.
 *
 * To display the desired illustration, use the `name` property, where you can find the list of all available illustrations.
 *
 * **Note:** By default the “BeforeSearch” illustration is loaded. To use other illustrations, make sure you import them in addition, for example:
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"`
 *
 * **Note:** Illustrations starting with the “Tnt” prefix are part of another illustration set. For example to use the “TntSuccess” illustration, add the following import::
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Success.js"`
 *
 * ### Structure
 * The IllustratedMessage consists of the following elements, which are displayed below each other in the following order:
 *
 * - Illustration
 * - Title
 * - Subtitle
 * - Actions
 *
 * ### Usage
 * `ui5-illustrated-message` is meant to be used inside container component, for example a `ui5-card`,
 * a `ui5-dialog` or a `ui5-page`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";`
 * @csspart subtitle - Used to style the subtitle wrapper of the `ui5-illustrated-message`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
declare class IllustratedMessage extends UI5Element {
    /**
    * Defines the illustration name that will be displayed in the component.
    *
    * Example:
    *
    * `name='BeforeSearch'`, `name='UnableToUpload'`, etc..
    *
    * **Note:** To use the TNT illustrations,
    * you need to set the `tnt` or `Tnt` prefix in front of the icon's name.
    *
    * Example:
    *
    * `name='tnt/Avatar'` or `name='TntAvatar'`.
    *
    * **Note:** By default the `BeforeSearch` illustration is loaded.
    * When using an illustration type, other than the default, it should be loaded in addition:
    *
    * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";`
    *
    * For TNT illustrations:
    *
    * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/SessionExpired.js";`
    * @default "BeforeSearch"
    * @public
    */
    name: string;
    /**
    * Determines which illustration breakpoint variant is used.
    *
    * As `IllustratedMessage` adapts itself around the `Illustration`, the other
    * elements of the component are displayed differently on the different breakpoints/illustration designs.
    * @default "Auto"
    * @public
    * @since 2.0.0
    */
    design: `${IllustrationMessageDesign}`;
    /**
    * Defines the subtitle of the component.
    *
    * **Note:** Using this property, the default subtitle text of illustration will be overwritten.
    *
    * **Note:** Using `subtitle` slot, the default of this property will be overwritten.
    * @default undefined
    * @public
    */
    subtitleText?: string;
    /**
    * Defines the title of the component.
    *
    * **Note:** Using this property, the default title text of illustration will be overwritten.
    * @default undefined
    * @public
    */
    titleText?: string;
    /**
    * Receives id(or many ids) of the elements that label the component.
    * @default undefined
    * @public
    * @since 1.7.0
    */
    accessibleNameRef?: string;
    /**
    * Illustration breakpoint variant for the <code>Dot</code> design.
    *
    * @private
    * @since 1.24.0
    */
    dotSvg?: string;
    /**
    * Illustration breakpoint variant for the <code>Spot</code> design.
    *
    * @private
    * @since 1.9.0
    */
    spotSvg?: string;
    /**
    * Illustration breakpoint variant for the `Scene` design.
    * @private
    * @since 1.9.0
    */
    sceneSvg?: string;
    /**
    * Illustration breakpoint variant for the `Dialog` design.
    * @private
    * @since 1.9.0
    */
    dialogSvg?: string;
    /**
    * Template function for the Dot design (safe variant).
    * @private
    * @since 2.16.0
    */
    dotTemplate?: object;
    /**
    * Template function for the Spot design (safe variant).
    * @private
    * @since 2.16.0
    */
    spotTemplate?: object;
    /**
    * Template function for the Scene design (safe variant).
    * @private
    * @since 2.16.0
    */
    sceneTemplate?: object;
    /**
    * Template function for the Dialog design (safe variant).
    * @private
    * @since 2.16.0
    */
    dialogTemplate?: object;
    /**
    * Determinates what is the current media of the component based on its width.
    * @private
    */
    media?: string;
    /**
    * Defines whether the illustration is decorative.
    *
    * When set to `true`, the attributes `role="presentation"` and `aria-hidden="true"` are applied to the SVG element.
    * @default false
    * @public
    * @since 2.10.0
    */
    decorative: boolean;
    /**
    * Defines the title of the component.
    *
    * **Note:** Using this slot, the default title text of illustration and the value of `title` property will be overwritten.
    * @public
    * @since 1.7.0
    */
    title: Slot<HTMLElement> & string;
    /**
    * Defines the subtitle of the component.
    *
    * **Note:** Using this slot, the default subtitle text of illustration and the value of `subtitleText` property will be overwritten.
    * @public
    * @since 1.0.0-rc.16
    */
    subtitle: Slot<HTMLElement>;
    /**
    * Defines the component actions.
    *
    * **Note:** Not displayed when the `design` property is set to `Base`.
    * @public
    */
    actions: DefaultSlot<IButton>;
    illustrationTitle?: string;
    illustrationSubtitle?: string;
    static i18nBundle: I18nBundle;
    _lastKnownOffsetWidthForMedia: Record<string, number>;
    _lastKnownOffsetHeightForMedia: Record<string, number>;
    _lastKnownMedia: string;
    _handleResize: ResizeObserverCallback;
    constructor();
    static get BREAKPOINTS(): {
        DIALOG: number;
        SPOT: number;
        DOT: number;
        BASE: number;
    };
    static get BREAKPOINTS_HEIGHT(): {
        DIALOG: number;
        SPOT: number;
        DOT: number;
        BASE: number;
    };
    static get MEDIA(): {
        BASE: string;
        DOT: string;
        SPOT: string;
        DIALOG: string;
        SCENE: string;
    };
    onBeforeRendering(): Promise<void>;
    onEnterDOM(): void;
    onExitDOM(): void;
    handleResize(): void;
    _applyMedia(heightChange?: boolean): void;
    _setSVGAccAttrs(): void;
    _adjustHeightToFitContainer(): void;
    onAfterRendering(): void;
    /**
     * Modifies the IM styles in accordance to the `size` property's value.
     * Note: The resize handler has no effect when size is different than "Auto".
     * @private
     * @since 1.5.0
     */
    _handleCustomSize(): void;
    get ariaLabelText(): string | undefined;
    get effectiveIllustration(): string | object | undefined;
    get hasFormattedSubtitle(): boolean;
    get hasFormattedTitle(): boolean;
    get effectiveTitleText(): string | undefined;
    get effectiveSubitleText(): string | undefined;
    get hasTitle(): boolean;
    get hasSubtitle(): boolean;
    get hasActions(): boolean;
    isValidIllustration(currentIllustration: string): boolean;
}
export default IllustratedMessage;
