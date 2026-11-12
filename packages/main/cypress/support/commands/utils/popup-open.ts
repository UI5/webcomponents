const nativeDialogRoot = (el: HTMLElement): HTMLDialogElement | null =>
	el.shadowRoot?.querySelector<HTMLDialogElement>("dialog.ui5-popup-root") ?? null;

const isPopupOpen = <T extends HTMLElement>(getPopup: () => Cypress.Chainable<JQuery<T>>) => {
	return getPopup()
		.should($popup => {
			expect($popup).to.have.attr("open");

			// A popup whose root is a native modal <dialog> (Dialog, and
			// ResponsivePopover on phone) opens via showModal(), so it is ":modal"
			// rather than ":popover-open", and the visible box is the shadow <dialog>
			// (the host itself is "display: contents").
			const dialog = nativeDialogRoot($popup[0]);
			if (dialog) {
				expect(dialog.matches(":modal")).to.be.true;
				const rect = dialog.getBoundingClientRect();
				expect(rect.width).to.not.equal(0);
				expect(rect.height).to.not.equal(0);
			} else {
				expect($popup.is(":popover-open")).to.be.true;
				expect($popup.width()).to.not.equal(0);
				expect($popup.height()).to.not.equal(0);
			}
		});
};

const isPopupClosed = <T extends HTMLElement>(getPopup: () => Cypress.Chainable<JQuery<T>>) => {
	return getPopup()
		.should($popup => {
			expect($popup).to.not.have.attr("open");

			const dialog = nativeDialogRoot($popup[0]);
			if (dialog) {
				expect(dialog.matches(":modal")).to.be.false;
			} else {
				expect($popup.is(":popover-open")).to.be.false;
				expect($popup).not.be.visible;
			}
		});
};

export {
	isPopupOpen,
	isPopupClosed
}
