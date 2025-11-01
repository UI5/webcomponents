interface ShellBarV2DomAdapterInterface {
	getWidth(): number;
	querySelector<T extends Element>(selector: string): T | null;
}

interface ShellBarV2DomAdapterConstructorParams {
	host: HTMLElement;
	shadowRoot: ShadowRoot;
}

class ShellBarV2DomAdapter implements ShellBarV2DomAdapterInterface {
	private host: HTMLElement;
	private shadowRoot: ShadowRoot;

	constructor({
		host, shadowRoot,
	}: ShellBarV2DomAdapterConstructorParams) {
		this.host = host;
		this.shadowRoot = shadowRoot;
	}

	getWidth(): number {
		return this.host.getBoundingClientRect().width;
	}

	querySelector<T extends Element>(selector: string): T | null {
		return this.shadowRoot.querySelector<T>(selector);
	}
}

export default ShellBarV2DomAdapter;
export type {
	ShellBarV2DomAdapterInterface,
	ShellBarV2DomAdapterConstructorParams,
};
