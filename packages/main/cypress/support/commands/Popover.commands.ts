import type Popover from "../../../src/Popover.js";
import { isPopupOpen } from "./utils/popup-open.js";

Cypress.Commands.add("ui5PopoverOpened", { prevSubject: true }, (subject: JQuery<Popover>) => {
	isPopupOpen(() => cy.wrap(subject))
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5PopoverOpened(
				this: Chainable<JQuery<Popover>>
			): Chainable<void>;
		}
	}
}