import I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import type { AccessibilityInfo } from "@ui5/webcomponents-base";
import {
	ACC_STATE_EMPTY,
	ACC_STATE_REQUIRED,
	ACC_STATE_DISABLED,
	ACC_STATE_READONLY,
	ACC_STATE_SINGLE_CONTROL,
	ACC_STATE_MULTIPLE_CONTROLS,
} from "./generated/i18n/i18n-defaults.js";

let i18nBundle: I18nBundle;
let invisibleText: HTMLElement;

const getBundle = (): I18nBundle => {
	i18nBundle ??= new I18nBundle("@ui5/webcomponents-base");
	return i18nBundle;
};

const checkVisibility = (element: HTMLElement): boolean => {
	return element.checkVisibility() || getComputedStyle(element).display === "contents";
};

const applyCustomAnnouncement = (element: HTMLElement, text: string | string[] = []) => {
	if (!invisibleText || !invisibleText.isConnected) {
		invisibleText = document.createElement("span");
		invisibleText.id = "ui5-invisible-text";
		invisibleText.hidden = true;
		document.body.appendChild(invisibleText);
	}

	const ariaLabelledByElements = [...((element as any).ariaLabelledByElements || [])];
	const invisibleTextIndex = ariaLabelledByElements.indexOf(invisibleText);
	text = Array.isArray(text) ? text.filter(Boolean).join(" . ").trim() : text.trim();
	invisibleText.textContent = text;

	if (text && invisibleTextIndex === -1) {
		ariaLabelledByElements.unshift(invisibleText);
		(element as any).ariaLabelledByElements = ariaLabelledByElements;
	} else if (!text && invisibleTextIndex > -1) {
		ariaLabelledByElements.splice(invisibleTextIndex, 1);
		(element as any).ariaLabelledByElements = ariaLabelledByElements.length ? ariaLabelledByElements : null;
	}
};

type CustomAnnouncementOptions = {
	lessDetails?: boolean;
};

const getCustomAnnouncement = (element: Node, options: CustomAnnouncementOptions = {}, _isRootElement: boolean = true): string => {
	if (!element) {
		return "";
	}

	if (element.nodeType === Node.TEXT_NODE) {
		return (element as Text).data.trim();
	}

	if (!(element instanceof HTMLElement)) {
		return "";
	}

	if (element.hasAttribute("data-ui5-acc-text")) {
		return element.getAttribute("data-ui5-acc-text") || "";
	}

	if (element.ariaHidden === "true" || !checkVisibility(element)) {
		return _isRootElement ? getBundle().getText(ACC_STATE_EMPTY) : "";
	}

	let childNodes = [] as Array<Node>;
	const descriptions = [] as Array<string>;
	const accessibilityInfo = (element as any).accessibilityInfo as AccessibilityInfo | undefined;
	const { lessDetails } = options;

	if (accessibilityInfo) {
		const {
			type, description, required, disabled, readonly, children,
		} = accessibilityInfo;

		childNodes = children || [];
		type && descriptions.push(type);
		description && descriptions.push(description);

		if (!lessDetails) {
			required && descriptions.push(getBundle().getText(ACC_STATE_REQUIRED));
			disabled && descriptions.push(getBundle().getText(ACC_STATE_DISABLED));
			readonly && descriptions.push(getBundle().getText(ACC_STATE_READONLY));
		}
	} else if (element.localName === "slot") {
		childNodes = (element as HTMLSlotElement).assignedNodes({ flatten: true });
	} else {
		childNodes = element.shadowRoot ? [...element.shadowRoot.childNodes] : [...element.childNodes];
	}

	childNodes.forEach(child => {
		const childDescription = getCustomAnnouncement(child, options, false);
		childDescription && descriptions.push(childDescription);
	});

	if (_isRootElement) {
		const hasDescription = descriptions.length > 0;
		if (!hasDescription || !lessDetails) {
			const tabbables = getTabbableElements(element);
			const bundleKey = [
				hasDescription ? "" : ACC_STATE_EMPTY,
				ACC_STATE_SINGLE_CONTROL,
				ACC_STATE_MULTIPLE_CONTROLS,
			][Math.min(tabbables.length, 2)];
			if (bundleKey) {
				hasDescription && descriptions.push(".");
				descriptions.push(getBundle().getText(bundleKey));
			}
		}
	}

	return descriptions.join(" ").trim();
};

export {
	getCustomAnnouncement,
	applyCustomAnnouncement,
};
