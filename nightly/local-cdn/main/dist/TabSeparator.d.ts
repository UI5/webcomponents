import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { TabContainerStripInfo, TabContainerOverflowInfo, ITab } from "./TabContainer.js";
import TabSeparatorInStripTemplate from "./TabSeparatorInStripTemplate.js";
import TabSeparatorInOverflowTemplate from "./TabSeparatorInOverflowTemplate.js";
import type ListItemCustom from "./ListItemCustom.js";
interface TabSeparatorInStrip extends HTMLElement {
    realTabReference: TabSeparator;
}
interface TabSeparatorInOverflow extends ListItemCustom {
    realTabReference: TabSeparator;
}
/**
 * @class
 * The `ui5-tab-separator` represents a vertical line to separate tabs inside a `ui5-tabcontainer`.
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
 * @abstract
 * @public
 */
declare class TabSeparator extends UI5Element implements ITab {
    _forcedStyleInOverflow?: Record<string, any>;
    _getElementInStrip?: () => HTMLElement | undefined;
    static get stripTemplate(): typeof TabSeparatorInStripTemplate;
    static get overflowTemplate(): typeof TabSeparatorInOverflowTemplate;
    get isSeparator(): boolean;
    receiveStripInfo({ getElementInStrip }: TabContainerStripInfo): void;
    receiveOverflowInfo({ style }: TabContainerOverflowInfo): void;
    /**
     * Returns the DOM reference of the separator that is placed in the header.
     *
     * **Note:** Separators, placed in the `items` slot of other tabs are not shown in the header. Calling this method on such separators will return `undefined`.
     * @public
     */
    getDomRefInStrip(): HTMLElement | undefined;
    get stableDomRef(): string;
    get stripPresentation(): object;
    get overflowPresentation(): object;
    captureRef(ref: HTMLElement & {
        realTabReference?: UI5Element;
    } | null): void;
}
export default TabSeparator;
export type { TabSeparatorInStrip, TabSeparatorInOverflow, };
