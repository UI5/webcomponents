export interface CompositionComponent {
	getInputEl: () => HTMLInputElement | null;
	updateCompositionState: (isComposing: boolean) => void;
}

export default class InputComposition {
	_component: CompositionComponent;

	constructor(component: CompositionComponent) {
		this._component = component;
	}

	_onComposition = () => {
		this._component.updateCompositionState(true);
	};

	_onCompositionEnd = () => {
		this._component.updateCompositionState(false);
	};

	addEventListeners() {
		const el = this._component.getInputEl();
		if (!el) {
			return;
		}
		el.addEventListener("compositionstart", this._onComposition);
		el.addEventListener("compositionupdate", this._onComposition);
		el.addEventListener("compositionend", this._onCompositionEnd);
	}

	removeEventListeners() {
		const el = this._component.getInputEl();
		if (!el) {
			return;
		}
		el.removeEventListener("compositionstart", this._onComposition);
		el.removeEventListener("compositionupdate", this._onComposition);
		el.removeEventListener("compositionend", this._onCompositionEnd);
	}
}
