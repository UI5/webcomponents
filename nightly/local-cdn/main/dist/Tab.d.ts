import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import SemanticColor from "./types/SemanticColor.js";
import ListItemType from "./types/ListItemType.js";
import type { TabContainerStripInfo, TabContainerOverflowInfo, ITab } from "./TabContainer.js";
import type ListItemCustom from "./ListItemCustom.js";
import TabInStripTemplate from "./TabInStripTemplate.js";
import TabInOverflowTemplate from "./TabInOverflowTemplate.js";
interface TabInStrip extends HTMLElement {
    realTabReference: Tab;
}
interface TabInOverflow extends ListItemCustom {
    realTabReference: Tab;
}
/**
 * @class
 * The `ui5-tab` represents a selectable item inside a `ui5-tabcontainer`.
 * It defines both the item in the tab strip (top part of the `ui5-tabcontainer`) and the
 * content that is presented to the user once the tab is selected.
 * @abstract
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
 * @public
 */
declare class Tab extends UI5Element implements ITabbable, ITab {
    /**
     * The text to be displayed for the item.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Disabled tabs can't be selected.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Represents the "additionalText" text, which is displayed in the tab. In the cases when in the same time there are tabs with icons and tabs without icons, if a tab has no icon the "additionalText" is displayed larger.
     * @default undefined
     * @public
     */
    additionalText?: string;
    /**
     * Defines the icon source URI to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous built-in icons.
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the component's design color.
     *
     * The design is applied to:
     *
     * - the component icon
     * - the `text` when the component overflows
     * - the tab selection line
     *
     * Available designs are: `"Default"`, `"Neutral"`, `"Positive"`, `"Critical"` and `"Negative"`.
     *
     * **Note:** The design depends on the current theme.
     * @default "Default"
     * @public
     */
    design: `${SemanticColor}`;
    /**
     * Specifies if the component is selected.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines if the tab is movable.
     *
     * @default false
     * @public
     * @since 2.0.0
     */
    movable: boolean;
    _isTopLevelTab: boolean;
    _selectedTabReference?: Tab;
    /**
     * Holds the content associated with this tab.
     * @public
     */
    content: DefaultSlot<Node>;
    /**
     * Defines hierarchies with nested sub tabs.
     *
     * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
     * @public
     */
    items: Slot<ITab>;
    _isInline?: boolean;
    _forcedMixedMode?: boolean;
    _getElementInStrip?: () => HTMLElement | undefined;
    _getElementInOverflow?: () => HTMLElement | undefined;
    _forcedPosinset?: number;
    _forcedSetsize?: number;
    _forcedStyleInOverflow?: Record<string, any>;
    static i18nBundle: I18nBundle;
    set forcedTabIndex(val: string);
    get forcedTabIndex(): string;
    get displayText(): string | undefined;
    get isSeparator(): boolean;
    get stripPresentation(): object;
    get overflowPresentation(): object;
    get stableDomRef(): string;
    get requiresExpandButton(): boolean;
    get isSingleClickArea(): boolean;
    get isTwoClickArea(): boolean;
    get isOnSelectedTabPath(): boolean;
    get _effectiveSlotName(): string | undefined;
    get _defaultSlotName(): "" | "disabled-slot";
    get hasOwnContent(): boolean;
    get expandBtnAccessibilityAttributes(): Pick<AccessibilityAttributes, "hasPopup">;
    receiveStripInfo({ getElementInStrip, posinset, setsize, isInline, isTopLevelTab, mixedMode, }: TabContainerStripInfo): void;
    receiveOverflowInfo({ getElementInOverflow, style }: TabContainerOverflowInfo): void;
    /**
     * Returns the DOM reference of the tab that is placed in the header.
     *
     * **Note:** Tabs, placed in the `items` slot of other tabs are not shown in the header. Calling this method on such tabs will return `undefined`.
     *
     * **Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.
     * @public
     * @since 1.0.0-rc.16
     */
    getDomRefInStrip(): HTMLElement | undefined;
    getFocusDomRef(): HTMLElement | undefined;
    focus(focusOptions?: FocusOptions): Promise<void>;
    get isMixedModeTab(): boolean | undefined;
    get isTextOnlyTab(): boolean;
    get isIconTab(): boolean;
    get effectiveDisabled(): true | undefined;
    get effectiveSelected(): boolean;
    get effectiveHidden(): boolean;
    get tabs(): Array<Tab>;
    get ariaLabelledBy(): string;
    get stripClasses(): {
        itemClasses: string;
        additionalTextClasses: string;
    };
    get additionalTextClasses(): string;
    get expandButtonTitle(): string;
    get _roleDescription(): string | undefined;
    get _ariaHasPopup(): "menu" | undefined;
    get semanticIconName(): "alert" | "sys-enter-2" | "error" | null;
    get _designDescription(): string | null;
    get semanticIconClasses(): string;
    get overflowClasses(): string;
    get overflowState(): ListItemType.Inactive | ListItemType.Active;
    static get stripTemplate(): typeof TabInStripTemplate;
    static get overflowTemplate(): typeof TabInOverflowTemplate;
    _ondragstart(e: DragEvent): void;
    _ondragend(e: DragEvent): void;
    captureRef(ref: HTMLElement & {
        realTabReference?: UI5Element;
    } | null): void;
    captureButtonRef(ref: HTMLElement & {
        tab?: UI5Element;
    } | null): void;
}
export default Tab;
export type { TabInStrip, TabInOverflow, };
