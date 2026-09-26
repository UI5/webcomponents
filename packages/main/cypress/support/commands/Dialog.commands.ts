import type Dialog from "../../../src/Dialog.js";

// A ui5-dialog opens its shadow root as a native modal <dialog>, not a popover,
// so open/closed state is asserted on that <dialog> (:modal + visibility)
// rather than on the display:contents host.
Cypress.Commands.add("ui5DialogOpened", { prevSubject: true }, (subject: JQuery<Dialog>) => {
	cy.wrap(subject).should($dialog => {
		expect($dialog).to.have.attr("open");
	});
	cy.wrap(subject)
		.shadow()
		.find(".ui5-popup-root")
		.should($root => {
			expect($root).to.have.attr("open");
			expect($root.is(":modal")).to.be.true;
			expect($root.width()).to.not.equal(0);
			expect($root.height()).to.not.equal(0);
		});
});

Cypress.Commands.add("ui5DialogClosed", { prevSubject: true }, (subject: JQuery<Dialog>) => {
	cy.wrap(subject).should($dialog => {
		expect($dialog).to.not.have.attr("open");
	});
	cy.wrap(subject)
		.shadow()
		.find(".ui5-popup-root")
		.should($root => {
			expect($root).to.not.have.attr("open");
			expect($root).to.not.be.visible;
		});
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DialogOpened(
				this: Chainable<JQuery<Dialog>>
			): Chainable<void>;
			ui5DialogClosed(
				this: Chainable<JQuery<Dialog>>
			): Chainable<void>;
		}
	}
}
