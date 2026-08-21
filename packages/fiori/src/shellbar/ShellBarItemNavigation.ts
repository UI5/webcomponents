import {
	isEnd,
	isHome,
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

interface ShellBarItemNavigationConstructorParams {
	getDomRef: () => HTMLElement | null;
}

class ShellBarItemNavigation {
	private params: ShellBarItemNavigationConstructorParams;

	constructor(params: ShellBarItemNavigationConstructorParams) {
		this.params = params;
	}

	handleKeyDown(e: KeyboardEvent): void {
		if (!this.shouldHandle(e)) {
			return;
		}

		const domRef = this.params.getDomRef();
		if (!domRef) {
			return;
		}

		const activeElement = getActiveElement();
		if (!activeElement) {
			return;
		}

		if (this.shouldChildHandleNavigation(activeElement as HTMLElement, e)) {
			return;
		}

		const items = this.getTabbableItems(domRef);
		const currentIndex = items.findIndex(el => el === activeElement);

		if (currentIndex !== -1) {
			e.preventDefault();
			this.navigateToItem(items, currentIndex, e);
		}
	}

	private shouldHandle(e: KeyboardEvent): boolean {
		return isLeft(e) || isRight(e) || isHome(e) || isEnd(e);
	}

	private shouldChildHandleNavigation(element: HTMLElement, e: KeyboardEvent): boolean {
		if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
			return this.shouldInputHandleNavigation(element as HTMLInputElement | HTMLTextAreaElement, e);
		}
		return false;
	}

	private shouldInputHandleNavigation(input: HTMLInputElement | HTMLTextAreaElement, e: KeyboardEvent): boolean {
		const cursorPos = input.selectionStart || 0;
		const textLength = input.value.length;

		if (isLeft(e) && cursorPos > 0) {
			return true;
		}

		if (isRight(e) && cursorPos < textLength) {
			return true;
		}

		return false;
	}

	private getTabbableItems(domRef: HTMLElement): HTMLElement[] {
		return getTabbableElements(domRef).filter(el => this.isVisible(el));
	}

	private isVisible(element: HTMLElement): boolean {
		const style = getComputedStyle(element);
		return style.display !== "none"
			&& style.visibility !== "hidden"
			&& element.offsetWidth > 0
			&& element.offsetHeight > 0;
	}

	private navigateToItem(items: HTMLElement[], currentIndex: number, e: KeyboardEvent): void {
		if (isLeft(e)) {
			this.focusPrevious(items, currentIndex);
		} else if (isRight(e)) {
			this.focusNext(items, currentIndex);
		} else if (isHome(e)) {
			items[0]?.focus();
		} else if (isEnd(e)) {
			items[items.length - 1]?.focus();
		}
	}

	private focusPrevious(items: HTMLElement[], currentIndex: number): void {
		if (currentIndex > 0) {
			items[currentIndex - 1].focus();
		}
	}

	private focusNext(items: HTMLElement[], currentIndex: number): void {
		if (currentIndex < items.length - 1) {
			items[currentIndex + 1].focus();
		}
	}
}

export default ShellBarItemNavigation;
export type {
	ShellBarItemNavigationConstructorParams,
};
