const isPopupOpen = (getPopup: () => Cypress.Chainable<JQuery<HTMLElement>>) => {
	return getPopup()
		.should($popup => {
			expect($popup).to.have.attr("open");
			expect($popup.is(":popover-open")).to.be.true;
			expect($popup.width()).to.not.equal(0);
			expect($popup.height()).to.not.equal(0);
		});
};

const isPopupClosed = (getPopup: () => Cypress.Chainable<JQuery<HTMLElement>>) => {
	return getPopup()
		.should($popup => {
			expect($popup).to.not.have.attr("open");
			expect($popup.is(":popover-open")).to.be.false;
			expect($popup).not.be.visible;
		});
};

export {
	isPopupOpen,
	isPopupClosed
}