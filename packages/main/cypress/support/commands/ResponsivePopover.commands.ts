import type ResponsivePopover from "../../../src/ResponsivePopover.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { isPopupOpen, isPopupClosed } from "./utils/popup-open.js";

Cypress.Commands.add("ui5ResponsivePopoverOpened", { prevSubject: true }, (subject: JQuery<ResponsivePopover>) => {
	console.log("ui5ResponsivePopoverOpened called");
	if (isPhone()) {
		isPopupOpen(() =>
			cy.wrap(subject)
				.shadow()
				.find("[ui5-dialog]")
		);
	} else {
		isPopupOpen(() => cy.wrap(subject));
	}
});

Cypress.Commands.add("ui5ResponsivePopoverClosed", { prevSubject: true }, (subject: JQuery<ResponsivePopover>) => {
	console.log("ui5ResponsivePopoverClosed called");
	if (isPhone()) {
		isPopupClosed(() =>
			cy.wrap(subject)
				.shadow()
				.find("[ui5-dialog]")
		);
	} else {
		isPopupClosed(() => cy.wrap(subject));
	}
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5ResponsivePopoverOpened(
				this: Chainable<JQuery<ResponsivePopover>>
			): Chainable<void>;
			ui5ResponsivePopoverClosed(
				this: Chainable<JQuery<ResponsivePopover>>
			): Chainable<void>;
		}
	}
}