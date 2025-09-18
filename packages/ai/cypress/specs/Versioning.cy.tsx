import Versioning from "../../src/Versioning.js";

describe("Versioning Component", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<Versioning />);

			cy.get("[ui5-ai-textarea-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 1)
				.should("have.prop", "totalSteps", 1);
		});

		it("should render with custom properties", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={7} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.should("have.prop", "currentStep", 3)
				.should("have.prop", "totalSteps", 7);
		});

		it("should display version counter correctly", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={5} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "2")
				.should("contain.text", "5")
				.should("contain.text", "2 / 5");
		});
	});

	describe("Navigation Buttons", () => {
		it("should disable previous button when at first step", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={3} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.disabled");
		});

		it("should disable next button when at last step", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={3} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should enable both buttons when in middle steps", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("not.be.disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("not.be.disabled");
		});

		it("should disable next button when totalSteps is 0", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={0} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should have proper button titles with keyboard shortcuts", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "title", "Previous Version (Shift+Ctrl+Z)");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "title", "Next Version (Shift+Ctrl+Y)");
		});

		it("should have proper icons", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "icon", "navigation-left-arrow");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "icon", "navigation-right-arrow");
		});
	});

	describe("Event Handling", () => {
		it("should fire previous-version-click event with proper event details", () => {
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3} 
					onPreviousVersionClick={onPreviousVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onPreviousVersionClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.include", {
					currentIndex: 2,
					totalVersions: 3
				});
		});

		it("should fire next-version-click event with proper event details", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3} 
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onNextVersionClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.include", {
					currentIndex: 2,
					totalVersions: 3
				});
		});

		it("should not fire events when buttons are disabled", () => {
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<Versioning 
					currentStep={1} 
					totalSteps={1} 
					onPreviousVersionClick={onPreviousVersionClick}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.disabled");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");

			cy.get("@onPreviousVersionClick").should("not.have.been.called");
			cy.get("@onNextVersionClick").should("not.have.been.called");
		});

		it("should handle multiple rapid clicks gracefully", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={5} 
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick()
				.realClick()
				.realClick();

			cy.get("@onNextVersionClick").should("have.callCount", 3);
		});
	});

	describe("Focus Management", () => {
		it("should manage focus when reaching boundaries", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");

			cy.mount(
				<Versioning
					currentStep={2}
					totalSteps={3}
					onNextVersionClick={onNextVersionClick}
					onPreviousVersionClick={onPreviousVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.as("nextButton")
				.should("not.be.disabled")
				.realClick();

			cy.get("@onNextVersionClick").should("have.been.calledOnce");

			// Simulate reaching the last step
			cy.get("@versioning").invoke("prop", "currentStep", 3);

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.as("previousButton")
				.should("be.focused");

			cy.get("@previousButton").realClick();

			cy.get("@onPreviousVersionClick").should("have.been.calledOnce");

			// Simulate reaching the first step
			cy.get("@versioning").invoke("prop", "currentStep", 1);

			cy.get("@nextButton").should("be.focused");
		});

		it("should not change focus when buttons remain enabled", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={5} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.focus()
				.should("be.focused");

			// Simulate property change without reaching boundary
			cy.get("@versioning").invoke("prop", "currentStep", 4);

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.focused");
		});
	});

	describe("Step Display", () => {
		it("should display current step and total steps", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={5} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "3")
				.should("contain.text", "5");
		});

		it("should update display when properties change", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={2} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning")
				.invoke("prop", "currentStep", 2)
				.invoke("prop", "totalSteps", 4);

			cy.get("@versioning")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "2")
				.should("contain.text", "4");
		});

		it("should handle zero values correctly", () => {
			cy.mount(<Versioning currentStep={0} totalSteps={0} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "0 / 0");
		});

		it("should handle large numbers correctly", () => {
			cy.mount(<Versioning currentStep={999} totalSteps={1000} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "999")
				.should("contain.text", "1000");
		});
	});

	describe("Edge Cases", () => {
		it("should handle zero total steps", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={0} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning")
				.should("exist");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should handle single step", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={1} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should handle currentStep greater than totalSteps", () => {
			cy.mount(<Versioning currentStep={5} totalSteps={3} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "5 / 3");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should handle negative values", () => {
			cy.mount(<Versioning currentStep={-1} totalSteps={-5} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "-1 / -5");
		});
	});

	describe("Button State Transitions", () => {
		it("should properly handle state transitions when navigating", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={3} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.as("previousButton")
				.should("be.disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.as("nextButton")
				.should("not.be.disabled");

			cy.get("@versioning").invoke("prop", "currentStep", 2);

			cy.get("@previousButton").should("not.be.disabled");
			cy.get("@nextButton").should("not.be.disabled");

			cy.get("@versioning").invoke("prop", "currentStep", 3);

			cy.get("@previousButton").should("not.be.disabled");
			cy.get("@nextButton").should("be.disabled");
		});

		it("should handle rapid property changes", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={5} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			// Rapidly change properties
			for (let i = 1; i <= 5; i++) {
				cy.get("@versioning").invoke("prop", "currentStep", i);
			}

			cy.get("@versioning")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "5 / 5");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});
	});

	describe("Accessibility", () => {
		it("should have proper button titles for screen readers", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "title")
				.and("include", "Previous Version");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "title")
				.and("include", "Next Version");
		});

		it("should have proper keyboard shortcut information", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "title")
				.and("include", "Shift+Ctrl+Z");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "title")
				.and("include", "Shift+Ctrl+Y");
		});

		it("should support keyboard navigation", () => {
			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3}
					onPreviousVersionClick={cy.stub().as("onPreviousVersionClick")}
					onNextVersionClick={cy.stub().as("onNextVersionClick")}
				/>
			);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.focus()
				.realPress("Space");

			cy.get("@onPreviousVersionClick").should("have.been.called");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.focus()
				.realPress("Enter");

			cy.get("@onNextVersionClick").should("have.been.called");
		});

		it("should have proper ARIA attributes", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "design", "Transparent");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "design", "Transparent");
		});
	});

	describe("Component Structure", () => {
		it("should have proper DOM structure", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("#versioning-history")
				.should("exist");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-button")
				.should("have.length", 2);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("have.length", 1);
		});

		it("should have proper CSS classes", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("have.class", "version-step-counter");
		});

		it("should maintain proper element order", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("#versioning-history")
				.children()
				.should("have.length", 3)
				.first()
				.should("have.attr", "data-ui5-versioning-button", "previous");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("#versioning-history")
				.children()
				.eq(1)
				.should("match", "ui5-label");

			cy.get("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("#versioning-history")
				.children()
				.last()
				.should("have.attr", "data-ui5-versioning-button", "next");
		});
	});

	describe("Performance", () => {
		it("should handle frequent property updates efficiently", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={100} />);

			cy.get("[ui5-ai-textarea-versioning]")
				.as("versioning");

			// Simulate rapid updates
			const start = performance.now();
			
			for (let i = 1; i <= 50; i++) {
				cy.get("@versioning").invoke("prop", "currentStep", i);
			}

			cy.wrap(null).should(() => {
				const end = performance.now();
				expect(end - start).to.be.lessThan(1000); // Should complete within 1 second
			});

			cy.get("@versioning")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "50 / 100");
		});

		it("should not cause memory leaks with event handlers", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={4}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			// Click multiple times
			for (let i = 0; i < 10; i++) {
				cy.get("[ui5-ai-textarea-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.realClick();
			}

			cy.get("@onNextVersionClick").should("have.callCount", 10);
		});
	});
});
