import type ShellBarItem from "../ShellBarItem.js";
import type { ShellBarActionId, ShellBarActionItem } from "../ShellBar.js";
interface ShellBarHidableItem {
    id: string;
    selector: string;
    hideOrder: number;
    keepHidden: boolean;
    showInOverflow?: boolean;
}
interface ShellBarOverflowParams {
    actions: readonly ShellBarActionItem[];
    content: readonly HTMLElement[];
    customItems: readonly ShellBarItem[];
    overflowOuter: HTMLElement;
    overflowInner: HTMLElement;
    hiddenItemsIds: readonly string[];
    showSearchField: boolean;
    setVisible: (selector: string, visible: boolean) => void;
}
interface ShellBarOverflowResult {
    hiddenItemsIds: string[];
    showOverflowButton: boolean;
}
type ShellBarOverflowItem = {
    type: "action";
    id: ShellBarActionId;
    data: ShellBarActionItem;
    order: number;
} | {
    type: "item";
    id: string;
    data: ShellBarItem;
    order: number;
};
declare class ShellBarOverflow {
    private readonly CLOSED_SEARCH_STRATEGY;
    private readonly OPEN_SEARCH_STRATEGY;
    updateOverflow(params: ShellBarOverflowParams): ShellBarOverflowResult;
    isOverflowing(overflowOuter: HTMLElement, overflowInner: HTMLElement): boolean;
    private getOverflowStrategy;
    private buildHidableItems;
    private buildContent;
    private buildActions;
    getOverflowItems(params: {
        actions: readonly ShellBarActionItem[];
        customItems: readonly ShellBarItem[];
        hiddenItemsIds: readonly string[];
    }): ReadonlyArray<ShellBarOverflowItem>;
}
export default ShellBarOverflow;
export type { ShellBarHidableItem, ShellBarOverflowParams, ShellBarOverflowResult, ShellBarOverflowItem, };
