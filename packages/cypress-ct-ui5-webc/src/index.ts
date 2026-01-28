/// <reference types="cypress" />
import { setupHooks, getContainerEl } from "@cypress/mount-utils";
import { render } from '@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js';
import type { JSX } from '@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js';

type Options = Record<string, any>;

function cleanup() {
	render(null, getContainerEl());
}

export function mount(component: JSX.Element, options: Options = {}) {
	const container = getContainerEl();

	// Mount JSX Element
	render(null, container);
	render(component, container);

	cy.wrap(container)
		.find("*")
		.should($el => {
			const shadowrootsExist = [...$el].every(el => {
				if (el.tagName.includes("-") && el.shadowRoot) {
					if ("getDomRef" in el) {
						// @ts-expect-error
						return el.getDomRef();
					}

					return el.shadowRoot.hasChildNodes();
				}

				return true;
			})

			expect(shadowrootsExist, "Custom elements with shadow DOM have content in their shadow DOM").to.be.true;
		})

	return cy.wrap(container);
}

setupHooks(cleanup);