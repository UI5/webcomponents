import BusyIndicator from "../../src/BusyIndicator.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";
import BusyIndicatorSize from "../../src/types/BusyIndicatorSize.js";

describe("Rendering", () => {
	it("Rendering without content", () => {
		cy.mount(<BusyIndicator id="busyInd" active></BusyIndicator>);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area:not(.ui5-busy-indicator-busy-area-over-content)")
			.should("exist");

	});

	it("Rendering with content", () => {
		cy.mount(
			<BusyIndicator id="busyInd" active>
				<span>content</span>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area.ui5-busy-indicator-busy-area-over-content")
			.should("exist");
	});
});

describe("Text Placement and Display", () => {
	it("should render text with Top placement", () => {
		cy.mount(
			<BusyIndicator active text="Loading..." textPlacement="Top">
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("exist")
			.and("contain.text", "Loading...");

		// Verify the text appears before the circles (top placement)
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.children()
			.first()
			.should("have.class", "ui5-busy-indicator-text");
	});

	it("should render text with Bottom placement (default)", () => {
		cy.mount(
			<BusyIndicator active text="Loading..." textPlacement="Bottom">
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("exist")
			.and("contain.text", "Loading...");

		// Verify the text appears after the circles (bottom placement)
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.children()
			.last()
			.should("have.class", "ui5-busy-indicator-text");
	});
});

describe("BusyIndicator general interaction", () => {
	it("tests event propagation", () => {
		const onClickStub = cy.stub().as("clickStub");
		cy.mount(
			<BusyIndicator>
				<Button onClick={onClickStub} />
			</BusyIndicator>
		);

		cy.get("[ui5-button]").realClick();
		cy.get("[ui5-button]").should("have.focus");

		cy.realPress("Space");

		cy.get("@clickStub").should("have.been.called");
	});

	it("tests event propagation when busy indicator is active", () => {
		cy.mount(
			<BusyIndicator active={true} delay={0}>
				<Button onClick={cy.stub().as("clickStub")} />
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-button]").realClick();
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.focus");

		cy.realPress("Space");

		cy.get("@clickStub").should("not.have.been.called");
	});

	it("test activation", () => {
		cy.mount(
			<BusyIndicator>
				<span id="fetch-list"></span>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");

		cy.get("[ui5-busy-indicator]")
			.invoke("attr", "active", "");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-busy-indicator]")
			.invoke("removeAttr", "active");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");
	});

	it("tests focus handling", () => {
		cy.mount(<BusyIndicator active id="indicator1" />);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-busy-indicator]").realClick();

		cy.get("[ui5-busy-indicator]").should("have.focus");
	});

	it("tests internal focused element attributes", () => {
		cy.mount(<BusyIndicator active id="indicator1" />);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "role", "progressbar")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-valuemin", "0")
			.and("have.attr", "aria-valuemax", "100")
			.and("have.attr", "aria-valuetext", "Busy");
	});

	it("tests content is not reachable with keyboard when active in both directions", () => {
		cy.mount(
			<div>
				<Button id="beforeIndicatorWithBtn">focus stop before</Button>
				<BusyIndicator id="indicatorWithBtn" active>
					<Button id="helloBtn">Hello World</Button>
				</BusyIndicator>
				<Button id="afterIndicatorWithBtn" >focus stop after</Button>
			</div>
		);

		cy.get("#beforeIndicatorWithBtn").realClick();
		cy.get("#beforeIndicatorWithBtn").should("have.focus");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.realPress("Tab");

		cy.get("[ui5-busy-indicator]").should("have.focus");

		cy.realPress("Tab");

		cy.get("#helloBtn").should("not.have.focus");
		cy.get("#afterIndicatorWithBtn").should("have.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-busy-indicator]").should("have.focus");
		cy.get("#helloBtn").should("not.have.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#beforeIndicatorWithBtn").should("have.focus");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", () => {
		cy.mount(
			<Dialog id="dialog-inactive-indicator">
				<div slot="header">Dialog with focus issue</div>
				<div>
					<div>Buttons are wrapped in busy indicator, which is inactive.</div>
					<BusyIndicator>
						<Button id="dialog-inactive-indicator-focused-button">button 1</Button>
						<Button>button 2</Button>
					</BusyIndicator>
				</div>
			</Dialog>
		);

		cy.get("#dialog-inactive-indicator").invoke("attr", "open", true);
		cy.get<Dialog>("[ui5-dialog]").ui5DialogOpened();

		cy.get("#dialog-inactive-indicator-focused-button").should("have.focus");
	});

	it("delayed indicator in dialog - shouldn't attempt to focus before the indicator is visible", () => {
		cy.mount(
			<Dialog id="dialog-delayed-indicator">
				<BusyIndicator id="dialog-delayed-indicator-indicator" delay={5000} >
					<span>Will become busy after 5 seconds</span>
				</BusyIndicator>
				<Button id="dialog-delayed-indicator-focus-stop">focus stop</Button>
			</Dialog>
		);

		cy.get("[ui5-busy-indicator]").invoke("attr", "active", true);

		cy.get("[ui5-dialog]").invoke("attr", "open", true);

		cy.get("[ui5-button]").should("have.focus");
	});

	it("Height of the root element depends on the height of the Busy Indicator - issue 6668", () => {
		cy.mount(
			<div style="display: flex;">
				<div>
					<BusyIndicator active style="height: 100%;">
						<div style="background-color: orange; width: 200px; height: 100%;">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
							quasi, minus ullam aut eaque dolorem eos rem itaque unde, veritatis
							consequuntur numquam! Repellat sunt, dignissimos fugit voluptate
							animi repudiandae placeat?
						</div>
					</BusyIndicator>
				</div>
				<div>
					<BusyIndicator id="busy-indicator-height" active style="height: 100%;">
						<div style="background-color: orange; width: 200px; height: 100%;">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</div>
					</BusyIndicator>
				</div>
			</div>
		);

		cy.get("#busy-indicator-height")
			.shadow()
			.find(".ui5-busy-indicator-root")
			.should("have.css", "height", "144px");
	});
});

describe("Delay and Timeout Behavior", () => {
	it("should clear timeout when component becomes inactive", () => {
		cy.mount(
			<BusyIndicator delay={1200}>
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]").invoke("attr", "active", "");
		
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");

		cy.get<BusyIndicator>("[ui5-busy-indicator]").should(($el) => {
			const timeoutId = $el[0]._busyTimeoutId;
			expect(timeoutId).to.exist;
		}).then(($el) => {
			cy.wrap($el[0]._busyTimeoutId).as("timeoutId");
		});

		cy.spy(window, "clearTimeout");
		cy.get("[ui5-busy-indicator]").invoke("removeAttr", "active");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");

		cy.get("@timeoutId")
			.should((timeoutId)	=> {
				expect(clearTimeout).to.have.been.calledWith(timeoutId);
			});

		cy.get("[ui5-busy-indicator]")
			.invoke("prop", "_isBusy")
			.should("eq", false);
	});

	it("should clear pending timeout and trigger cleanup when deactivated before becoming busy", () => {
		cy.mount(
			<BusyIndicator delay={1000}>
				<div>Content</div>
			</BusyIndicator>
		);
	
		cy.get("[ui5-busy-indicator]").invoke("attr", "active", "");
	
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");
	
		cy.get<BusyIndicator>("[ui5-busy-indicator]").should(($el) => {
			const timeoutId = $el[0]._busyTimeoutId;
			expect(timeoutId).to.exist;
		}).then(($el) => {
			cy.wrap($el[0]._busyTimeoutId).as("timeoutId");
		});
	
		const clearTimeoutSpy = cy.spy(window, "clearTimeout");
	
		cy.get("[ui5-busy-indicator]").invoke("removeAttr", "active");
	
		cy.get("@timeoutId").should((timeoutId) => {
			expect(clearTimeoutSpy).to.have.been.calledWith(timeoutId);
		});
	
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");
	
		cy.get("[ui5-busy-indicator]")
			.invoke("prop", "_isBusy")
			.should("eq", false);
	
		cy.get("[ui5-busy-indicator]").then(($el) => {
			const element = $el[0] as any;
	
			element.active = true;
			element.onBeforeRendering();
	
			expect(element._isBusy).to.be.false;
			expect(element._busyTimeoutId).to.exist;
	
			element.active = false;
			element.onBeforeRendering();
	
			expect(element._busyTimeoutId).to.be.undefined;
			expect(element._isBusy).to.be.false;
		});
	});

	it("should handle zero delay", () => {
		cy.mount(
			<BusyIndicator active delay={0}>
				<div>Content</div>
			</BusyIndicator>
		);

		// Should become busy immediately
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");
	});
});

describe("Different Sizes", () => {
	Object.values(BusyIndicatorSize).forEach(size => {
		it(`should render with size ${size}`, () => {
			cy.mount(
				<BusyIndicator active size={size}>
					<div>Content</div>
				</BusyIndicator>
			);

			cy.get("[ui5-busy-indicator]")
				.shadow()
				.find(".ui5-busy-indicator-busy-area")
				.should("exist");
		});
	});
});

describe("Desktop-specific Behavior", () => {
	it("should set desktop attribute on desktop devices", () => {
		// This test depends on the isDesktop() function
		cy.mount(
			<BusyIndicator active>
				<div>Content</div>
			</BusyIndicator>
		);

		// On most test environments, this should be true
		cy.get("[ui5-busy-indicator]")
			.should("have.attr", "desktop");
	});
});

describe("Complex Keyboard Navigation", () => {
	it("should prevent events when busy and not when inactive", () => {
		const onClickStub = cy.stub().as("clickStub");
		
		cy.mount(
			<div>
				<Button id="beforeBtn">Before</Button>
				<BusyIndicator delay={0}>
					<Button id="innerBtn" onClick={onClickStub}>Inside</Button>
				</BusyIndicator>
				<Button id="afterBtn">After</Button>
			</div>
		);

		// Test when not busy - should allow interaction
		cy.get("#innerBtn").realClick();
		cy.get("@clickStub").should("have.been.called");

		// Reset stub
		cy.get<sinon.SinonStub>("@clickStub").then((stub) => {
			stub.resetHistory();
		});

		// Activate busy indicator
		cy.get("[ui5-busy-indicator]").invoke("attr", "active", "");

		// Since delay is 0, it should become busy immediately
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		// Try to interact with inner button - should be prevented
		cy.get("#innerBtn").realClick();
		cy.get("@clickStub").should("not.have.been.called");
	});

	it("should handle Shift+Tab focus redirection", () => {
		cy.mount(
			<div>
				<Button id="beforeBtn">Before</Button>
				<BusyIndicator active delay={0}>
					<Button id="innerBtn">Inside</Button>
				</BusyIndicator>
				<Button id="afterBtn">After</Button>
			</div>
		);

		// Focus the after button using realClick instead of focus()
		cy.get("#afterBtn").realClick();

		// Use Shift+Tab to go backwards
		cy.realPress(["Shift", "Tab"]);

		// Should focus the busy indicator's busy area
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.focus");
	});

	it("should handle key events other than Tab", () => {
		cy.mount(
			<BusyIndicator active delay={0}>
				<Button id="innerBtn">Inside</Button>
			</BusyIndicator>
		);

		// Focus the busy area
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.focus();

		// Try pressing other keys - should be prevented but not cause errors
		cy.realPress("Enter");
		cy.realPress("Space");
		cy.realPress("Escape");
		cy.realPress("ArrowDown");

		// Busy indicator should still be focused and working
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.focus");
	});
});

describe("Component Lifecycle", () => {
	it("should properly clean up on DOM exit", () => {
		// Spy on clearTimeout to verify it's called during onExitDOM
		cy.window().then((win) => {
			cy.spy(win, 'clearTimeout').as('clearTimeoutSpy');
		});

		cy.mount(
			<div id="container">
				<BusyIndicator active delay={2000}>
					<div>Content</div>
				</BusyIndicator>
			</div>
		);

		// Verify the component has a pending timeout
		cy.get("[ui5-busy-indicator]").then(($el) => {
			const element = $el[0] as any;
			expect(element._busyTimeoutId).to.exist;
		});

		// Remove the component before timeout fires - this triggers onExitDOM
		cy.get("#container").then(($container) => {
			$container.empty();
		});

		// Verify clearTimeout was called (onExitDOM logic)
		cy.get('@clearTimeoutSpy').should('have.been.called');
	});
});

describe("Edge Cases", () => {
	it("should handle rapid active/inactive toggles", () => {
		cy.mount(
			<BusyIndicator delay={1000}>
				<div>Content</div>
			</BusyIndicator>
		);

		// Rapidly toggle active state
		for (let i = 0; i < 5; i++) {
			cy.get("[ui5-busy-indicator]").invoke("attr", "active", "");
			cy.get("[ui5-busy-indicator]").invoke("removeAttr", "active");
		}

		// Final state should be inactive
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");
	});

	it("should handle text changes dynamically", () => {
		cy.mount(
			<BusyIndicator active text="Initial">
				<div>Content</div>
			</BusyIndicator>
		);

		// Initial text
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("contain.text", "Initial");

		// Change text
		cy.get("[ui5-busy-indicator]").invoke("attr", "text", "Updated");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("contain.text", "Updated");

		// Remove text
		cy.get("[ui5-busy-indicator]").invoke("removeAttr", "text");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("not.exist");
	});
});

describe("Accessibility", () => {
	it("should have proper ARIA attributes", () => {
		cy.mount(
			<BusyIndicator active text="Loading data...">
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "role", "progressbar")
			.and("have.attr", "aria-valuemin", "0")
			.and("have.attr", "aria-valuemax", "100")
			.and("have.attr", "aria-valuetext", "Busy")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "data-sap-focus-ref");
	});

	it("should have proper title attribute", () => {
		cy.mount(
			<BusyIndicator active>
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "title")
			.and("not.be.empty");
	});

	it("should generate correct labelId when text is present", () => {
		cy.mount(
			<BusyIndicator active text="Processing...">
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "aria-labelledby");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-text")
			.should("have.attr", "id");

		// Verify they match each other
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.invoke("attr", "aria-labelledby")
			.then((labelledBy) => {
				cy.get("[ui5-busy-indicator]")
					.shadow()
					.find(".ui5-busy-indicator-text")
					.should("have.attr", "id", labelledBy);
			});
	});

	it("should not have labelId when no text is present", () => {
		cy.mount(
			<BusyIndicator active>
				<div>Content</div>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.have.attr", "aria-labelledby");
	});
});
