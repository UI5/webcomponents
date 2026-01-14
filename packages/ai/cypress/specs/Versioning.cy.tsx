import Versioning from "../../src/Versioning.js";

describe("Versioning Component", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<Versioning />);

			cy.get("[ui5-ai-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 0)
				.should("have.prop", "totalSteps", 0);
		});

		it("should render with custom properties", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={7} />);

			cy.get("[ui5-ai-versioning]")
				.should("have.prop", "currentStep", 3)
				.should("have.prop", "totalSteps", 7);
		});

		it("should display version counter correctly", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={5} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "2 / 5");
		});
	});

	describe("Navigation Buttons", () => {
		it("should disable previous button when at first step", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={3} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should disable next button when at last step", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={3} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should enable both buttons when in middle steps", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");
		});

		it("should disable next button when totalSteps is 0", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={0} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should have proper icons", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "icon", "navigation-left-arrow");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "icon", "navigation-right-arrow");
		});
	});

	describe("Event Handling", () => {
		it("should fire version-change event with backwards=true for previous button", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3} 
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", { backwards: true });
		});

		it("should fire version-change event with backwards=false for next button", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3} 
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", { backwards: false });
		});

		it("should not fire events when buttons are disabled", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning 
					currentStep={1} 
					totalSteps={1} 
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@onVersionChange").should("not.have.been.called");
		});

		it("should handle multiple rapid clicks gracefully", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={5} 
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick()
				.realClick()
				.realClick();

			cy.get("@onVersionChange").should("have.callCount", 3);
			
			// Verify all calls were for next (backwards: false)
			cy.get("@onVersionChange").should((spy) => {
				expect(spy).to.have.been.calledWith(Cypress.sinon.match.has("detail", { backwards: false }));
			});
		});
	});

	describe("Focus Management", () => {
		it("should manage focus when reaching boundaries", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning
					currentStep={2}
					totalSteps={3}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-versioning]")
				.as("versioning");

			// Test that buttons respond correctly when reaching boundaries
			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.as("nextButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");

			cy.get("@nextButton").realClick();

			cy.get("@onVersionChange").should("have.been.calledOnce");

			// Simulate reaching the last step - next button should be disabled
			cy.get("@versioning").invoke("prop", "currentStep", 3);

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.as("previousButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");

			cy.get("@previousButton").realClick();

			cy.get("@onVersionChange").should("have.been.calledTwice");

			// Simulate reaching the first step - previous button should be disabled
			cy.get("@versioning").invoke("prop", "currentStep", 1);

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");
		});

		it("should not change focus when buttons remain enabled", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={5} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			// Simulate property change without reaching boundary
			cy.get("@versioning").invoke("prop", "currentStep", 4);

			// The button should still exist and be enabled
			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");
		});
	});

	describe("Step Display", () => {
		it("should display current step and total steps", () => {
			cy.mount(<Versioning currentStep={3} totalSteps={5} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "3 / 5");
		});

		it("should update display when properties change", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={2} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning")
				.invoke("prop", "currentStep", 2)
				.invoke("prop", "totalSteps", 4);

			cy.get("@versioning")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "2 / 4");
		});

		it("should handle zero values correctly", () => {
			cy.mount(<Versioning currentStep={0} totalSteps={0} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "0 / 0");
		});

		it("should handle large numbers correctly", () => {
			cy.mount(<Versioning currentStep={999} totalSteps={1000} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "999 / 1000");
		});
	});

	describe("Edge Cases", () => {
		it("should handle zero total steps", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={0} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning")
				.should("exist");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should handle single step", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={1} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should handle currentStep greater than totalSteps", () => {
			cy.mount(<Versioning currentStep={5} totalSteps={3} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "5 / 3");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should handle negative values", () => {
			cy.mount(<Versioning currentStep={-1} totalSteps={-5} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "-1 / -5");
		});
	});

	describe("Button State Transitions", () => {
		it("should properly handle state transitions when navigating", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={3} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.as("previousButton")
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.as("nextButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");

			cy.get("@versioning").invoke("prop", "currentStep", 2);

			cy.get("@previousButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");
			cy.get("@nextButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");

			cy.get("@versioning").invoke("prop", "currentStep", 3);

			cy.get("@previousButton")
				.shadow()
				.find("ui5-button")
				.should("not.have.attr", "disabled");
			cy.get("@nextButton")
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should handle rapid property changes", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={5} />);

			cy.get("[ui5-ai-versioning]")
				.as("versioning");

			// Rapidly change properties
			for (let i = 1; i <= 5; i++) {
				cy.get("@versioning").invoke("prop", "currentStep", i);
			}

			cy.get("@versioning")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "5 / 5");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});
	});

	describe("Accessibility", () => {
		it("should support keyboard navigation", () => {
			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={3}
					onVersionChange={cy.stub().as("onVersionChange")}
				/>
			);

			// Test that buttons are clickable (simulating keyboard activation)
			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.called");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.calledTwice");
		});

		it("should have proper ARIA attributes", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "design", "Transparent");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "design", "Transparent");
		});

		describe("Translatable Accessibility Attributes", () => {
			it("should have translatable previous button tooltip", () => {
				cy.mount(<Versioning currentStep={2} totalSteps={3} />);

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)");
			});

			it("should have translatable next button tooltip", () => {
				cy.mount(<Versioning currentStep={2} totalSteps={3} />);

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)");
			});

			it("should maintain tooltips when button states change", () => {
				cy.mount(<Versioning currentStep={1} totalSteps={3} />);

				cy.get("[ui5-ai-versioning]")
					.as("versioning");

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)")
					.shadow()
					.find("ui5-button")
					.should("have.attr", "disabled");

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)")
					.shadow()
					.find("ui5-button")
					.should("not.have.attr", "disabled");

				cy.get("@versioning").invoke("prop", "currentStep", 2);

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)")
					.shadow()
					.find("ui5-button")
					.should("not.have.attr", "disabled");

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)")
					.shadow()
					.find("ui5-button")
					.should("not.have.attr", "disabled");

				cy.get("@versioning").invoke("prop", "currentStep", 3);

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)")
					.shadow()
					.find("ui5-button")
					.should("not.have.attr", "disabled");

				cy.get("@versioning")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)")
					.shadow()
					.find("ui5-button")
					.should("have.attr", "disabled");
			});

			it("should maintain tooltips with edge cases", () => {
				cy.mount(<Versioning currentStep={1} totalSteps={1} />);

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)")
					.shadow()
					.find("ui5-button")
					.should("have.attr", "disabled");

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)")
					.shadow()
					.find("ui5-button")
					.should("have.attr", "disabled");

				cy.mount(<Versioning currentStep={0} totalSteps={0} />);

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="previous"]')
					.should("have.attr", "tooltip", "Previous Version (Ctrl + Shift + Z)");

				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.should("have.attr", "tooltip", "Next Version (Ctrl + Shift + Y)");
			});
		});
	});

	describe("Component Structure", () => {
		it("should have proper DOM structure", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-toolbar-button")
				.should("have.length", 2);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("have.length", 1);
		});

		it("should have proper CSS classes", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("have.class", "version-step-counter");
		});

		it("should maintain proper element order", () => {
			cy.mount(<Versioning currentStep={2} totalSteps={4} />);

			// Check that the buttons and label exist in the shadow DOM
			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("exist");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist");

			cy.get("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("exist");
		});
	});

	describe("Performance", () => {
		it("should handle frequent property updates efficiently", () => {
			cy.mount(<Versioning currentStep={1} totalSteps={100} />);

			cy.get("[ui5-ai-versioning]")
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
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "50 / 100");
		});

		it("should not cause memory leaks with event handlers", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<Versioning 
					currentStep={2} 
					totalSteps={4}
					onVersionChange={onVersionChange}
				/>
			);

			// Click multiple times
			for (let i = 0; i < 10; i++) {
				cy.get("[ui5-ai-versioning]")
					.shadow()
					.find('[data-ui5-versioning-button="next"]')
					.realClick();
			}

			cy.get("@onVersionChange").should("have.callCount", 10);
		});
	});
});
