export interface CompositionComponent {
    getInputEl: () => HTMLInputElement | null;
    updateCompositionState: (isComposing: boolean) => void;
}
export default class InputComposition {
    _component: CompositionComponent;
    constructor(component: CompositionComponent);
    _onComposition: () => void;
    _onCompositionEnd: () => void;
    addEventListeners(): void;
    removeEventListeners(): void;
}
