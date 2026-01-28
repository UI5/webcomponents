import type Dialog from "../../../src/Dialog.js";
import { isPopupOpen } from "./utils/popup-open.js";

Cypress.Commands.add("ui5DialogOpened", { prevSubject: true }, (subject: JQuery<Dialog>) => {
	isPopupOpen(() =>
		cy.wrap(subject)
	);
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DialogOpened(
				this: Chainable<JQuery<Dialog>>
			): Chainable<void>;
		}
	}
}