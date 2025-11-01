interface ShellBarV2EventBusInterface {
	emit(eventName: string, detail: any): void;
	on(eventName: string, callback: (detail: any) => void): void;
	off(eventName: string, callback: (detail: any) => void): void;
}

interface ShellBarV2EventBusConstructorParams {
	host: HTMLElement;
}

class ShellBarV2EventBus implements ShellBarV2EventBusInterface {
	private host: HTMLElement;

	constructor({
		host,
	}: ShellBarV2EventBusConstructorParams) {
		this.host = host;
	}

	emit(eventName: string, detail: any): void {
		this.host.dispatchEvent(new CustomEvent(eventName, { detail }));
	}

	on(eventName: string, callback: (detail: any) => void): void {
		this.host.addEventListener(eventName, callback);
	}

	off(eventName: string, callback: (detail: any) => void): void {
		this.host.removeEventListener(eventName, callback);
	}
}

export default ShellBarV2EventBus;
export type {
	ShellBarV2EventBusInterface,
	ShellBarV2EventBusConstructorParams,
};
