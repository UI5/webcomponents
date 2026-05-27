import { mount } from '@ui5/cypress-ct-ui5-webc';
import { renderFinished } from '@ui5/webcomponents-base/dist/Render.js';
import "cypress-real-events";
import '@cypress/code-coverage/support';

Cypress.Commands.add('waitRenderFinished', () => {
	return cy.wrap(renderFinished(), { log: false });
});

Cypress.Commands.add('mount', args => {
	cy.then(() => mount(args)).then(() => {
		cy.waitRenderFinished();
	});
});

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.waitRenderFinished();

	cy.get(element)
		.should($el => {
			const el = $el[0];
			const isCustom = el.tagName.includes("-");
			const isUI5Element = el.isUI5Element;
			const isVisible = !Cypress.dom.isHidden(el);
			const domRef = typeof el.getDomRef === "function" && el.getDomRef();

			if (isCustom && isUI5Element) {
				expect(domRef, "DOM Reference exists").to.exist;
				expect(isVisible, "Be visible").to.be.true;
			}
		})
		.then(() => originalFn(element, ...args));
};

const realEventCommands = [
	"realClick",
	"realHover",
	"realTouch",
	"realSwipe",
	"realMouseDown",
	"realMouseUp",
	"realMouseMove"
];

const realEventCommandsRest = [
	"realPress",
	"realType",
];

realEventCommands.forEach(cmd => {
	Cypress.Commands.overwrite(cmd as any, realEventCmdCallback);
});

realEventCommandsRest.forEach(cmd => {
	Cypress.Commands.overwrite(cmd as any, (originalFn, element, ...args) => {
		return cy.waitRenderFinished().then(() => {
			return originalFn(element, ...args);
		});
	});
});

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
			waitRenderFinished: () => Chainable<any>;
		}
	}
}
