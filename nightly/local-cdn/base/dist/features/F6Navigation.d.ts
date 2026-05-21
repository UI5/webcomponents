declare class F6Navigation {
    keydownHandler: (event: KeyboardEvent) => void;
    selectedGroup: HTMLElement | null;
    groups: Array<HTMLElement>;
    constructor();
    attachEventListeners(): void;
    removeEventListeners(): void;
    groupElementToFocus(nextElement: HTMLElement): Promise<HTMLElement | undefined>;
    findNextFocusableGroupElement(currentIndex: number): Promise<HTMLElement | undefined>;
    findPreviousFocusableGroupElement(currentIndex: number): Promise<HTMLElement | undefined>;
    _keydownHandler(event: KeyboardEvent): Promise<void>;
    updateGroups(): void;
    findContainer(): HTMLElement;
    setSelectedGroup(root?: DocumentOrShadowRoot): void;
    deepActive(root: DocumentOrShadowRoot): Element | null;
    destroy(): void;
    get _ui5RuntimeIndex(): number;
    static init(): void;
    static destroy(): void;
}
export default F6Navigation;
