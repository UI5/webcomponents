import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Dialog from "../../src/Dialog.js";
import Label from "../../src/Label.js";
import Title from "../../src/Title.js";
import Button from "../../src/Button.js";
import Input from "../../src/Input.js";
import List from "../../src/List.js";
import ListItem from "../../src/ListItemStandard.js";
import "../../test/pages/styles/Dialog.css"
import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";

describe("Keyboard", () => {
	it("TAB navigation", () => {
		cy.mount(
			<>
				<button id="buttonId"></button>
				<Dialog id="dialogId">
					<Toolbar slot="footer">
						<ToolbarButton
							id="toolbarButtonId"
							design="Emphasized"
							text="Submit"
						></ToolbarButton>
					</Toolbar>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#toolbarButtonId")
			.should("be.focused");

		cy.realPress(["Tab"]);

		cy.get("#toolbarButtonId")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#toolbarButtonId")
			.should("be.focused");
	});

	it("F6 navigation", () => {
		cy.mount(
			<>
				<button data-sap-ui-fastnavgroup="true" id="test"></button>
				<Dialog open={true}>
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
				<button data-sap-ui-fastnavgroup="true"></button>
			</>
		);

		cy.get("#first")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#second")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#first")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#second")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#first")
			.should("be.focused");
	});
});

describe("Initial Focus", () => {
	it("Tokenizer focusing", () => {
		cy.mount(
			<>
				<Dialog id="dialogId" headerText="Tokens">
					<Tokenizer id="tokenizer">
						<Token text="Token 1" id="token1"/>
						<Token text="Token 2" id="token2"/>
					</Tokenizer>
				</Dialog>
			</>
		);

		cy.get("#token1")
			.shadow()
			.find(".ui5-token--wrapper")
			.should("have.attr", "tabindex", "0");

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#token1")
			.should("be.visible");

		cy.get("#token1")
			.should("be.focused");
	});
});

describe("Accessibility", () => {
	it("Dialog accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<Dialog id="dialog" accessibleDescriptionRef="lblDesc1 lblDesc3"></Dialog>
			</>
		);

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		// act - update accessible-description-ref
		cy.get("#dialog")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		// act - update accessible-description-ref
		cy.get("#dialog")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		// act - remove accessible-description-ref
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Dialog accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Dialog id="dialog" accessibleDescription="Some description added by accessibleDescription"></Dialog>
			</>
		);
		// assert
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - update accessible-description
		cy.get("#dialog")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	// both
	it("Dialog accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Dialog id="dialog" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription"></Dialog>
			</>
		);

		// assert - accessibleDescription is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert - accessibleDescriptionRef is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		// act - remove accessible-description-ref
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description-ref");

		// assert - accessibleDescription is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description");

		// assert - accessibleDescriptionRef is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});
});

describe("Events", () => {
	it("before-open", () => {
		cy.mount(
			<>
				<Dialog id="dialogId">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.should("not.be.visible");

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).addEventListener("before-open", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#dialogId")
			.should("not.be.visible");

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).removeEventListener("before-open", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", true);
			
		cy.get<Dialog>("#dialogId").ui5DialogOpened();;
	});

	it("before-close", () => {
		cy.mount(
			<>
				<Dialog id="dialogId">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).addEventListener("before-close", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", false);

		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).removeEventListener("before-close", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", false);

		cy.get("#dialogId")
			.should("not.be.visible");
	});
});

describe("Dialog general interaction", () => {
	it("tests dialog toggling", () => {


		cy.mount(
			<>
				<Dialog id="dialog" accessibleName="Resizable" stretch>
					<div slot="header">
						<Button id="header-button">focus stop</Button>
						<Title level="H1" id="tt">Resizable</Title>
					</div>
				</Dialog>
			</>
		);

		cy.get("#dialog")
			.should("not.be.visible");
		cy.get("#dialog")
			.invoke("prop", "open", true);
		cy.get<Dialog>("#dialog").ui5DialogOpened();
		cy.get("#dialog").invoke("prop", "open", false);
		cy.get("#dialog")
			.should("not.be.visible");
	});

	it("dialog ResizeHandler registration", () => {
		cy.spy(ResizeHandler, "register").as("registerResizeSpy");

		cy.mount(
			<>
				<Dialog id="dialog">
					<div>Content</div>
				</Dialog>
			</>
		);

		cy.get<Dialog>("#dialog")
			.should((dialog => {
				expect(dialog.get(0).getDomRef()).to.exist;
			}));

		cy.get("@registerResizeSpy")
			.should("not.be.called");

		cy.get("#dialog")
			.invoke("attr", "open", true);

		cy.get("@registerResizeSpy")
			.should("be.calledOnce");
	});


	it("dialog repositions after screen resize", () => {
		cy.mount(
			<>
				<Dialog id="dialog">
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		cy.viewport(1000, 800);

		// Open dialog
		cy.get("#dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#dialog").ui5DialogOpened();

		// Capture position before resize
		cy.get("#dialog")
			.then(dialog => {
				const topBeforeScreenResize = parseInt(dialog.css("top"));
				const leftBeforeScreenResize = parseInt(dialog.css("left"));

				cy.get("#dialog").invoke("attr", "open", false);
				// Resize viewport
				cy.viewport(2000, 2000);

				cy.get("#dialog").invoke("attr", "open", true);

				// Capture position after resize
				cy.get("#dialog")
					.should(dialogAfterResize => {
						const topAfterScreenResize = parseInt(dialogAfterResize.css("top"));
						const leftAfterScreenResize = parseInt(dialogAfterResize.css("left"));

						// Assert position changes
						expect(topBeforeScreenResize).not.to.equal(topAfterScreenResize);
						expect(leftBeforeScreenResize).not.to.equal(leftAfterScreenResize);
					});
			});
	});

	it("draggable and resizable dialog repositions after screen resize", () => {
		const dragDialog = (dialogSelector: string, x: number, y: number) => {
			cy.get(dialogSelector)
				.find("#header-slot")
				.realMouseDown()
				.realMouseMove(x, y)
				.realMouseUp();
		};

		cy.mount(
			<>
				<Dialog id="draggable-and-resizable-dialog" draggable resizable>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button id="draggable-and-resizable-close">Close</Button>
				</Dialog>
			</>
		);

		cy.viewport(1000, 800);

		// Open dialog
		cy.get("#draggable-and-resizable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#draggable-and-resizable-dialog").ui5DialogOpened();

		// Drag dialog
		dragDialog("#draggable-and-resizable-dialog", 150, 150);

		// Capture position before resize
		cy.get("#draggable-and-resizable-dialog")
			.then(dialog => {
				const topBeforeScreenResize = parseInt(dialog.css("top"));
				const leftBeforeScreenResize = parseInt(dialog.css("left"));

				cy.get("#draggable-and-resizable-dialog").invoke("attr", "open", false);
				// Resize viewport
				cy.viewport(2000, 2000);

				cy.get("#draggable-and-resizable-dialog").invoke("attr", "open", true);

				// Capture position after resize
				cy.get("#draggable-and-resizable-dialog")
					.should(dialogAfterResize => {
						const topAfterScreenResize = parseInt(dialogAfterResize.css("top"));
						const leftAfterScreenResize = parseInt(dialogAfterResize.css("left"));

						// Assert position changes
						expect(topBeforeScreenResize).not.to.equal(topAfterScreenResize);
						expect(leftBeforeScreenResize).not.to.equal(leftAfterScreenResize);
					});
			});
	});

	it("draggable - mouse support", () => {
		cy.mount(
			<>
				<Dialog id="draggable-dialog" draggable>
					<div id="header-slot" slot="header">Header</div>
					<Button id="draggable-close">Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#draggable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#draggable-dialog").ui5DialogOpened();

		// Capture position before dragging
		cy.get("#draggable-dialog")
			.then(dialog => {
				const topBeforeDragging = parseInt(dialog.css("top"));
				const leftBeforeDragging = parseInt(dialog.css("left"));

				// Drag dialog
				cy.get("#draggable-dialog")
					.find("#header-slot")
					.trigger("mousedown", { which: 1 })
					.trigger("mousemove", { clientX: 150, clientY: 150 })
					.trigger("mouseup");

				// Capture position after dragging
				cy.get("#draggable-dialog")
					.should(dialogAfterDragging => {
						const topAfterDragging = parseInt(dialogAfterDragging.css("top"));
						const leftAfterDragging = parseInt(dialogAfterDragging.css("left"));

						// Assert position changes
						expect(topBeforeDragging).not.to.equal(topAfterDragging);
						expect(leftBeforeDragging).not.to.equal(leftAfterDragging);
					});

					// Close dialog
					cy.get("#draggable-dialog").invoke("attr", "open", false);

					// Reopen dialog
					cy.get("#draggable-dialog").invoke("attr", "open", true);

					// Capture position after reopening
					cy.get("#draggable-dialog")
						.should(dialogAfterReopening => {
							const topAfterReopening = parseInt(dialogAfterReopening.css("top"));
							const leftAfterReopening = parseInt(dialogAfterReopening.css("left"));

							// Assert position resets
							expect(topBeforeDragging).to.equal(topAfterReopening);
							expect(leftBeforeDragging).to.equal(leftAfterReopening);
					});
			});
	});

	it("draggable - keyboard support", () => {
		cy.mount(
			<>
				<Dialog id="draggable-dialog" draggable>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#draggable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#draggable-dialog").ui5DialogOpened();

		// Capture initial position
		cy.get("#draggable-dialog")
			.then(dialog => {
				const initialTop = parseInt(dialog.css("top"));
				const initialLeft = parseInt(dialog.css("left"));

				// Act - Move dialog up using keyboard
				cy.get("#header-slot").realClick();

				cy.get("#header-slot").focused().realPress("{uparrow}");
				cy.get("#header-slot").focused().realPress("{uparrow}");

				// Assert - Top position changes, left remains the same

				cy.get("#draggable-dialog").then(dialog => {
					const leftAfterUp = parseInt(dialog.css("left"));
					const topAfterUp = parseInt(dialog.css("top"));
					cy.get("#draggable-dialog").should(() => {
						expect(topAfterUp).not.to.equal(initialTop);
					})
					cy.get("#draggable-dialog").should(() => {
						expect(leftAfterUp).to.equal(initialLeft);
					})

					// Act - Move dialog left using keyboard
					cy.get("#header-slot").realClick();

					cy.get("#header-slot").focused().realPress("{leftarrow}");
					cy.get("#header-slot").focused().realPress("{leftarrow}");

					// Assert - Left position changes, top remains the same
					cy.get("#draggable-dialog")
						.should(dialogAfterLeft => {
							const topAfterLeft = parseInt(dialogAfterLeft.css("top"));
							const leftAfterLeft = parseInt(dialogAfterLeft.css("left"));
							expect(topAfterLeft).to.equal(topAfterUp);
							expect(leftAfterLeft).not.to.equal(leftAfterUp);
						});
					});

				// Close dialog
				cy.get("#draggable-dialog").invoke("attr", "open", false);

				// Reopen dialog
				cy.get("#draggable-dialog").invoke("attr", "open", true);

				// Assert - Position resets to initial
				cy.get("#draggable-dialog")
					.should(dialogAfterReopen => {
						const leftAfterReopen = parseInt(dialogAfterReopen.css("left"));

						expect(leftAfterReopen).to.equal(initialLeft);
				});
			});
	});

	it("resizable - mouse support", () => {

		cy.mount(
			<>
				<Dialog id="resizable-dialog" resizable>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button id="resizable-close">Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#resizable-dialog").invoke("attr", "open", true);

		// Capture dimensions before resizing
		cy.get("#resizable-dialog").then(dialog => {
			const widthBeforeResizing = parseInt(dialog.css("width"));
			const heightBeforeResizing = parseInt(dialog.css("height"));
			const topBeforeResizing = parseInt(dialog.css("top"));
			const leftBeforeResizing = parseInt(dialog.css("left"));

			// Resize dialog
			cy.get("#resizable-dialog")
				.shadow()
				.find(".ui5-popup-resize-handle")
				.realMouseDown()
				.realMouseMove(150, 150)
				.realMouseUp();

			// Capture dimensions after resizing
			cy.get("#resizable-dialog").should(dialogAfterResizing => {
				const widthAfterResizing = parseInt(dialogAfterResizing.css("width"));
				const heightAfterResizing = parseInt(dialogAfterResizing.css("height"));
				const leftAfterResizing = parseInt(dialogAfterResizing.css("left"));

				// Assert dimensions change
				expect(widthBeforeResizing).not.to.equal(widthAfterResizing);
				expect(heightBeforeResizing).not.to.equal(heightAfterResizing);
				expect(leftBeforeResizing).to.equal(leftAfterResizing);
			});

			// Close dialog
			cy.get("#resizable-dialog").invoke("attr", "open", false);

			// Reopen dialog
			cy.get("#resizable-dialog").invoke("attr", "open", true);


			// Capture dimensions after reopening
			cy.get("#resizable-dialog").should(dialogAfterReopening => {
				const widthAfterReopening = parseInt(dialogAfterReopening.css("width"));
				const heightAfterReopening = parseInt(dialogAfterReopening.css("height"));
				const leftAfterReopening = parseInt(dialogAfterReopening.css("left"));

				// Assert dimensions reset to initial
				expect(widthBeforeResizing).to.equal(widthAfterReopening);
				expect(heightBeforeResizing).to.equal(heightAfterReopening);
				expect(leftBeforeResizing).to.equal(leftAfterReopening);
			});

		});
	});

	it("dialog remains anchored after resizing in RTL mode", () => {
		cy.mount(
			<>
				<div dir="rtl">
					<Dialog id="rtl-min-width-dialog" resizable>
						<div id="header-slot" slot="header">Header</div>
						<div>Content Content Content Content Content Content Content Content Content Content Content Content</div>
						<Button id="resizable-close">Close</Button>
					</Dialog>
				</div>
			</>
		);

		// Open dialog
		cy.get("#rtl-min-width-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#rtl-min-width-dialog").ui5DialogOpened();

		// Capture initial dimensions and position
		cy.get("#rtl-min-width-dialog").then(dialog => {
			const initialLeft = parseInt(dialog.css("left"));
			const initialWidth = parseInt(dialog.css("width"));
			const initialRightEdge = initialLeft + initialWidth;

			// First resize to reach minimum width
			cy.get("#rtl-min-width-dialog")
				.shadow()
				.find(".ui5-popup-resize-handle")
				.realMouseDown()
				.realMouseMove(800, 0) // Large movement to ensure we hit min width
				.realMouseUp();

			cy.get("#rtl-min-width-dialog").then(dialogAtMinWidth => {
				const leftAtMinWidth = parseInt(dialogAtMinWidth.css("left"));
				const widthAtMinWidth = parseInt(dialogAtMinWidth.css("width"));
				const rightEdgeAtMinWidth = leftAtMinWidth + widthAtMinWidth;

				expect(widthAtMinWidth).to.equal(320);
				expect(rightEdgeAtMinWidth).to.equal(initialRightEdge);

				cy.get("#rtl-min-width-dialog")
					.shadow()
					.find(".ui5-popup-resize-handle")
					.realMouseDown()
					.realMouseMove(150, 0) // Additional rightward movement beyond min width
					.realMouseUp();

				cy.get("#rtl-min-width-dialog").then(dialogAfterExtraResize => {
					const finalLeft = parseInt(dialogAfterExtraResize.css("left"));
					const finalWidth = parseInt(dialogAfterExtraResize.css("width"));
					const finalRightEdge = finalLeft + finalWidth;

					expect(finalLeft).to.equal(leftAtMinWidth, "Dialog left position should not change when at min width");
					expect(finalWidth).to.equal(widthAtMinWidth, "Dialog width should remain at min width");
					expect(finalRightEdge).to.equal(rightEdgeAtMinWidth, "Dialog right edge should remain fixed");
					expect(finalRightEdge).to.equal(initialRightEdge, "Dialog right edge should remain fixed from initial position");
				});
			});
		});
	});

	it("resizable - keyboard support", () => {
		cy.mount(
			<>
				<Dialog id="resizable-dialog" resizable>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#resizable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#resizable-dialog").ui5DialogOpened();

		// Capture initial dimensions
		cy.get("#resizable-dialog").then(dialog => {
			const initialWidth = parseInt(dialog.css("width"));
			const initialHeight = parseInt(dialog.css("height"));
			const initialTop = parseInt(dialog.css("top"));
			const initialLeft = parseInt(dialog.css("left"));

			// Act - Resize height using keyboard
			cy.get("#resizable-dialog").shadow().find(".ui5-popup-resize-handle").click();
			cy.get("#resizable-dialog").realPress(["Shift", "ArrowDown"]);

			// Assert - Height changes, width and position remain the same
			cy.get("#resizable-dialog").then(dialogAfterResizeHeight => {
				const widthAfterResizeHeight = parseInt(dialogAfterResizeHeight.css("width"));
				const heightAfterResizeHeight = parseInt(dialogAfterResizeHeight.css("height"));
				const leftAfterResizeHeight = parseInt(dialogAfterResizeHeight.css("left"));

				expect(widthAfterResizeHeight).to.equal(initialWidth);
				expect(heightAfterResizeHeight).not.to.equal(initialHeight);
				expect(leftAfterResizeHeight).to.equal(initialLeft);

				// Act - Resize width using keyboard
				cy.get("#resizable-dialog").shadow().find(".ui5-popup-resize-handle").click();
				cy.get("#resizable-dialog").realPress(["Shift", "ArrowRight"]);

				// Assert - Width changes, height and position remain the same
				cy.get("#resizable-dialog").then(dialogAfterResizeWidth => {
					const widthAfterResizeWidth = parseInt(dialogAfterResizeWidth.css("width"));
					const heightAfterResizeWidth = parseInt(dialogAfterResizeWidth.css("height"));
					const leftAfterResizeWidth = parseInt(dialogAfterResizeWidth.css("left"));

					expect(widthAfterResizeWidth).not.to.equal(widthAfterResizeHeight);
					expect(heightAfterResizeWidth).to.equal(heightAfterResizeHeight);
					expect(leftAfterResizeWidth).to.equal(leftAfterResizeHeight);

					// Close dialog
					cy.get("#resizable-dialog").invoke("attr", "open", false);

					// Reopen dialog
				cy.get("#resizable-dialog").invoke("attr", "open", true);

					// Assert - Dimensions reset to initial
					cy.get("#resizable-dialog").then(dialogAfterReopen => {
						const widthAfterReopen = parseInt(dialogAfterReopen.css("width"));
						const heightAfterReopen = parseInt(dialogAfterReopen.css("height"));
						const leftAfterReopen = parseInt(dialogAfterReopen.css("left"));

						expect(widthAfterReopen).to.equal(initialWidth);
						expect(heightAfterReopen).to.equal(initialHeight);
						expect(leftAfterReopen).to.equal(initialLeft);
					});
				});
			});
		});
	});

	it("RTL resizable - should not move dialog when resizing from the left with max-width is set", () => {
		cy.mount(
			<div dir="rtl">
				<Dialog id="resizable-dialog" resizable style={{maxWidth: "300px"}}>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button id="resizable-close">Close</Button>
				</Dialog>
			</div>
		);

		cy.get("#resizable-dialog").invoke("attr", "open", true);

		cy.get("#resizable-dialog").then(dialog => {
			const widthBeforeResizing = parseInt(dialog.css("width"));
			const heightBeforeResizing = parseInt(dialog.css("height"));
			const topBeforeResizing = parseInt(dialog.css("top"));
			const leftBeforeResizing = parseInt(dialog.css("left"));

			cy.get("#resizable-dialog")
				.shadow()
				.find(".ui5-popup-resize-handle") 
				.realMouseDown({ position: "left" }) 
				.realMouseMove(-100, 100) 
				.realMouseUp();

			cy.get("#resizable-dialog").should(dialogAfterResizing => {
				const widthAfterResizing = parseInt(dialogAfterResizing.css("width"));
				const heightAfterResizing = parseInt(dialogAfterResizing.css("height"));
				const topAfterResizing = parseInt(dialogAfterResizing.css("top"));
				const leftAfterResizing = parseInt(dialogAfterResizing.css("left"));

				expect(widthBeforeResizing).to.equal(widthAfterResizing);
				expect(heightBeforeResizing).not.to.equal(heightAfterResizing);
				expect(topBeforeResizing).to.equal(topAfterResizing);
				expect(leftBeforeResizing).not.to.equal(leftAfterResizing + 100); 
			});
		});
	});

	it("initial focus after dynamic dialog creation", () => {
		cy.mount(
			<>
				<Button id="dynamic-open" onClick={() => {
					const dialog = document.createElement("ui5-dialog");
					dialog.setAttribute("id", "dynamic-dialog");
					dialog.setAttribute("open", "true");

					const closeButton = document.createElement("ui5-button");
					closeButton.setAttribute("id", "dynamic-dialog-close-button");
					closeButton.textContent = "Close";
					closeButton.addEventListener("click", () => {
						dialog.remove();
					});

					dialog.appendChild(closeButton);
					document.body.appendChild(dialog);
				}}>Open Dynamic Dialog</Button>
			</>
		);

		// Open dynamic dialog
		cy.get("#dynamic-open").click();

		// Assert initial focus is on the close button
		cy.get("#dynamic-dialog-close-button").should("be.focused");

		// Close dialog
		cy.get("#dynamic-dialog-close-button").click();

		// Assert dialog is removed
		cy.get("#dynamic-dialog").should("not.exist");
	});

	it("tests that ENTER on list item that opens Dialog doesn't trigger click event inside the focused element of the Dialog", () => {
		const openDialog = () => {
			const dialog = document.getElementById("listContainerDialogId");
			if (dialog) {
				(dialog as Dialog).open = true;
			}
		};
		cy.mount(
			<>
				<List id="listContainerId" selectionMode="Single" onSelectionChange={openDialog}>
					<ListItem>Test1</ListItem>
					<ListItem id="listContainerItemId" onClick={openDialog}>Test2</ListItem>
					<ListItem>Test3</ListItem>
				</List>
				<Dialog id="listContainerDialogId">
					<Button id="dialogCloseButton" onClick={() => {
						const dialog = document.getElementById("listContainerDialogId");
						if (dialog) {
							(dialog as Dialog).open = false;
						}
					}}>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog by clicking the list item
		cy.get("#listContainerItemId").click();
		cy.get<Dialog>("#listContainerDialogId").ui5DialogOpened();

		// Close dialog using Escape key
		cy.get("#listContainerDialogId").realPress("Escape");
		cy.get("#listContainerDialogId").should("not.be.visible");

		// Navigate to list item and press Enter
		cy.get("#listContainerItemId").focused().realPress("ArrowDown");
		cy.get("#listContainerItemId").focused().realPress("Enter");
		cy.get<Dialog>("#listContainerDialogId").ui5DialogOpened();

		// Close dialog using Escape key again
		cy.get("#listContainerDialogId").realPress("Escape");
		cy.get("#listContainerDialogId").should("not.be.visible");
	});

	it("Test initial focus when content is provided before the header", () => {
		cy.mount(
			<>
				<Dialog id="dialog-focus">
					<Button id="fistButtonInDialog">First Button</Button>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-focus").invoke("attr", "open", true);


		// Assert initial focus is on the first button in the dialog
		cy.get("#fistButtonInDialog").should("be.focused");
	});

	it("Test focus circularity", () => {
		cy.mount(
			<>
				<Dialog id="focus-circ">
					<Button id="active-btn-1">Active Button 1</Button>
					<Button id="active-btn-2">Active Button 2</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#focus-circ").invoke("attr", "open", true);
		cy.get<Dialog>("#focus-circ").ui5DialogOpened();

		// Assert initial focus is on the first button
		cy.get("#active-btn-1").should("be.focused");

		// Tab to the second button
		cy.realPress("Tab");
		cy.get("#active-btn-2").should("be.focused");

		// Tab back to the first button
		cy.realPress("Tab");
		cy.get("#active-btn-1").should("be.focused");

		// Shift+Tab to the second button
		cy.realPress(["Shift", "Tab"]);
		cy.get("#active-btn-2").should("be.focused");

		// Shift+Tab back to the first button
		cy.realPress(["Shift", "Tab"]);
		cy.get("#active-btn-1").should("be.focused");

		// Shift+Tab to the second button again
		cy.realPress(["Shift", "Tab"]);
		cy.get("#active-btn-2").should("be.focused");

		// Close dialog
		cy.realPress("Escape");
		cy.get("#focus-circ").should("not.be.visible");
	});

	it("initial focus with autofocus", () => {
		cy.mount(
			<>
				<Dialog id="dialog-autofocus">
					<Button id="btnDialogAutofocusClose">Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-autofocus").invoke("attr", "open", true);

		// Assert initial focus is on the close button
		cy.get("#btnDialogAutofocusClose").should("be.focused");
	});
});

describe("Acc", () => {
	it("tests aria-labelledby and aria-label", () => {
		cy.mount(
			<>
				<Dialog id="dialog" headerText="Dialog">
					<Input></Input>
					<div slot="footer" class="dialogFooter">
						<Button>Close</Button>
					</div>
				</Dialog>
			</>
		);

		// Assert aria-labelledby exists and aria-label does not exist
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-labelledby")
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root").should("not.have.attr", "aria-label");

		// Set accessible-name property
		cy.get("#dialog").invoke("prop", "accessibleName", "text");

		// Assert aria-labelledby does not exist and aria-label exists
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-labelledby")
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root").should("have.attr", "aria-label");

		// Assert aria-describedby and aria-roledescription do not exist
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("not.have.attr", "aria-describedby")
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root").should("not.have.attr", "aria-roledescription");
	});

	it("tests aria-labelledby for slot header", () => {
		cy.mount(
			<>
				<Dialog id="draggable-dialog" draggable accessibleName="Draggable">
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#draggable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#draggable-dialog").ui5DialogOpened();

		// Assert aria-labelledby and aria attributes
		cy.get("#draggable-dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label", "Draggable");

		cy.get("#draggable-dialog")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-describedby");

		cy.get("#draggable-dialog")
			.shadow()
			.find(".ui5-hidden-text")
			.should("exist")
			.then(hiddenText => {
				const valueOfTheHiddenText = hiddenText.text();
				cy.wrap(valueOfTheHiddenText).should("equal", "Use Arrow keys to move");
			});

		cy.get("#draggable-dialog")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-roledescription", "Interactive Header");
	});

	it("tests aria-describedby for default header", () => {
		cy.mount(
			<>
				<Dialog id="resizable-dialog" resizable>
					<div id="header-slot" slot="header">Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#resizable-dialog").invoke("attr", "open", true);
		cy.get<Dialog>("#resizable-dialog").ui5DialogOpened();

		// Assert aria-describedby and aria-roledescription attributes
		cy.get("#resizable-dialog")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-describedby")
			.then($el => {
				cy.get("#resizable-dialog")
					.shadow()
					.find(".ui5-hidden-text")
					.should("exist")
					.then(hiddenText => {
						const valueOfTheHiddenText = hiddenText.text();
						cy.wrap(valueOfTheHiddenText).should("equal", "Use Shift+Arrow keys to resize");
					});
			});

		cy.get("#resizable-dialog")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-roledescription", "Interactive Header");

	});

	it("tests aria-describedby for slot header", () => {
		cy.mount(
			<>
				<Dialog id="resizable-dialog-custom-header" resizable>
					<div id="header-slot" slot="header">Custom Header</div>
					<div>Content</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#resizable-dialog-custom-header").invoke("attr", "open", true);
		cy.get<Dialog>("#resizable-dialog-custom-header").ui5DialogOpened();

		// Assert aria-describedby and aria-roledescription attributes
		cy.get("#resizable-dialog-custom-header")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-describedby")
			.then($el => {
				cy.get("#resizable-dialog-custom-header")
					.shadow()
					.find(".ui5-hidden-text")
					.should("exist")
					.then(hiddenText => {
						const valueOfTheHiddenText = hiddenText.text();
						cy.wrap(valueOfTheHiddenText).should("equal", "Use Shift+Arrow keys to resize");
					});
			});

		cy.get("#resizable-dialog-custom-header")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("have.attr", "aria-roledescription", "Interactive Header");
	});

	it("tests accessibleName-ref", () => {
		cy.mount(
			<>
				<Label id="label-acc-name-ref">Accessible Name Ref Label</Label>
				<Dialog id="dialog-acc-name-ref" accessibleNameRef="label-acc-name-ref"></Dialog>
			</>
		);

		// Assert aria-label matches the text of the label
		cy.get("#dialog-acc-name-ref")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label", "Accessible Name Ref Label");
	});

	it("tests role and aria-modal", () => {
		cy.mount(
			<>
				<Dialog id="dialog" accessibleName="Resizable" stretch></Dialog>
				<Dialog id="dialog-error-no-role"></Dialog>
				<Dialog id="dialog-no-state-alert-role" accessibleRole="AlertDialog"></Dialog>
				<Dialog id="dialog-none-role" accessibleRole="None"></Dialog>
				<Dialog id="dialog-success-state-alert-role" accessibleRole="AlertDialog"></Dialog>
			</>
		);

		// Assert role and aria-modal for dialog1
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog")
			.and("have.attr", "aria-modal", "true");

		// Assert role and aria-modal for dialog2
		cy.get("#dialog-error-no-role")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog")
			.and("have.attr", "aria-modal", "true");

		// Assert role and aria-modal for dialog3
		cy.get("#dialog-no-state-alert-role")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog")
			.and("have.attr", "aria-modal", "true");

		// Assert role and aria-modal for dialog4
		cy.get("#dialog-none-role")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role");
		cy.get("#dialog-none-role")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal");

		// Assert role and aria-modal for dialog5
		cy.get("#dialog-success-state-alert-role")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog")
			.and("have.attr", "aria-modal", "true");
	});

});

describe("Page scrolling", () => {
	it("tests that page scrolling is blocked and restored", () => {
		cy.mount(
			<>
				<Dialog id="scroll-dialog">
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#scroll-dialog").invoke("attr", "open", true);

		// Assert page scrolling is blocked
		cy.document().should(doc => {
			const pageOverflow = window.getComputedStyle(doc.documentElement).overflow;
			expect(pageOverflow).to.equal("hidden");
		});

		// Close dialog
		cy.get("#scroll-dialog").invoke("attr", "open", false);

		// Assert page scrolling is restored
		cy.document().should(doc => {
			const pageOverflow = window.getComputedStyle(doc.documentElement).overflow;
			expect(pageOverflow).to.equal("visible");
		});
	});

	it("tests that page scrolling position is preserved", () => {
		// scroll position might change slightly when the scrollbars hide and then appear again
		const SCROLLBAR_DELTA = 20;

		// Mount a page with scrolls and a button at the bottom-right
		cy.mount(
			<div style={{ width: "2000px", height: "2000px", position: "relative" }}>
				<Button
					id="btnOpenDialog"
					style={{ position: "absolute", bottom: "10px", right: "10px" }}>
					Scroll to</Button>
				<Dialog id="scroll-dialog">
					<Button>Close</Button>
				</Dialog>
			</div>
		);

		// Scroll to the button
		cy.get("#btnOpenDialog").scrollIntoView();

		// Capture scroll positions before interaction
		cy.document().then((doc) => {
			const scrollLeftBefore = doc.documentElement.scrollLeft;
			const scrollTopBefore = doc.documentElement.scrollTop;

			// Click the button to open the dialog
			cy.get("#scroll-dialog").invoke("attr", "open", true);

			// Assert scroll positions are preserved
			cy.document().should((docAfterClick) => {
				expect(docAfterClick.documentElement.scrollLeft).to.be.closeTo(scrollLeftBefore, SCROLLBAR_DELTA);
				expect(docAfterClick.documentElement.scrollTop).to.be.closeTo(scrollTopBefore, SCROLLBAR_DELTA);
			});

			// Close dialog using Escape key
			cy.realPress("Escape");

			// Assert scroll positions are preserved again
			cy.document().should((docAfterEscape) => {
				expect(docAfterEscape.documentElement.scrollLeft).to.be.closeTo(scrollLeftBefore, SCROLLBAR_DELTA);
				expect(docAfterEscape.documentElement.scrollTop).to.be.closeTo(scrollTopBefore, SCROLLBAR_DELTA);
			});
		});
	});


	it("test page scrolling is restored after close with ESC", () => {
		cy.mount(
			<>
				<Dialog id="scroll-dialog">
					<Button>Close</Button>
				</Dialog>
				<input type="checkbox" id="cbScrollable" />
			</>
		);


		// Capture scroll height before opening dialog
		cy.document().then(doc => {
			const scrollHeightBefore = doc.documentElement.scrollHeight;

			// Open dialog
			cy.get("#scroll-dialog").invoke("attr", "open", true);

			// Close dialog using Escape key
			cy.realPress("Escape");

			// Assert scroll height is restored
			cy.document().should(docAfterEscape => {
				expect(docAfterEscape.documentElement.scrollHeight).to.equal(scrollHeightBefore);
			});
		});
	});

	it("tests multiple dialogs page scrolling", () => {
		let preventClosing = true;

		cy.mount(
			<>
				<Dialog id="dialog1">
					<Button>OK</Button>
				</Dialog>
				<Dialog id="confirm-dialog" draggable>
					<Button id="confirmCloseButton" onClick={() => {
						const dialog1 = document.getElementById("dialog1");
						const confirmDialog = document.getElementById("confirm-dialog");
						if (dialog1 && confirmDialog) {
							preventClosing = false;
							(dialog1 as Dialog).open = false;
							(confirmDialog as Dialog).open = false;
						}
					}}>Close</Button>
				</Dialog>
			</>
		);

		// Capture initial scroll position
		cy.document().then(doc => {
			const initialScrollY = doc.documentElement.scrollTop;

			// Open dialogs
			cy.get("#dialog1").invoke("attr", "open", true);
			cy.get("#confirm-dialog").invoke("attr", "open", true);

			// Close dialogs using Escape key
			cy.realPress("Escape");

			// Assert scroll position remains unchanged
			cy.document().should(docAfter => {
				expect(docAfter.documentElement.scrollTop).to.equal(initialScrollY);
			});
		});
	});
});

describe("Responsive paddings", () => {
	before(() => {
		cy.viewport(1000, 400);
	});

	after(() => {
		cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"));
	});

	it("tests responsive paddings", () => {
		cy.mount(
			<>
				<Dialog id="dialog">
					<div slot="header">Dialog Header</div>
					<div slot="footer">
						<Button id="footerButton">Footer Button</Button>
					</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		cy.get("#dialog").invoke("attr", "open", true);

		const expectedPadding = "16px";
		cy.get("#dialog").shadow().find(".ui5-popup-content").should("have.css", "padding-left", expectedPadding);
		cy.get("#dialog").shadow().find(".ui5-popup-header-root").should("have.css", "padding-left", expectedPadding);
		cy.get("#dialog").shadow().find(".ui5-popup-footer-root").should("have.css", "padding-left", expectedPadding);
	});

	it("tests removing of responsive paddings for the content", () => {
		cy.mount(
			<>
				<Dialog id="dialogNoPaddings" class="noContentPaddingsDialog">
					<div slot="header">Dialog Header</div>
					<div slot="footer">
						<Button id="footerButtonNoPaddings">Footer Button</Button>
					</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		cy.get("#dialogNoPaddings").invoke("attr", "open", true);

		const expectedPadding = "16px";
		const expectedContentPadding = "0px";
		cy.get("#dialogNoPaddings").shadow().find(".ui5-popup-content").should("have.css", "padding-left", expectedContentPadding);
		cy.get("#dialogNoPaddings").shadow().find(".ui5-popup-header-root").should("have.css", "padding-left", expectedPadding);
		cy.get("#dialogNoPaddings").shadow().find(".ui5-popup-footer-root").should("have.css", "padding-left", expectedPadding);
	});

	it("tests media-range", () => {
		cy.mount(
			<>
				<Dialog id="dialog">
					<div slot="header">Dialog Header</div>
					<div slot="footer">
						<Button id="footerButton">Footer Button</Button>
					</div>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		cy.get("#dialog").invoke("attr", "open", true);
		cy.get("#dialog").should("have.attr", "media-range", "S");
	});
});

describe("Dialog States", () => {
	it("tests error state dialog accessibility role", () => {
		cy.mount(
			<>
				<Dialog id="dialog-error-state" accessibleRole="AlertDialog"></Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-error-state").invoke("attr", "open", true);

		// Assert role
		cy.get("#dialog-error-state")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog");
	});

	it("tests information state dialog accessibility role", () => {
		cy.mount(
			<>
				<Dialog id="dialog-info-state" accessibleRole="Dialog"></Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-info-state").invoke("attr", "open", true);

		// Assert role
		cy.get("#dialog-info-state")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog");
	});

	it("tests success state dialog accessibility role", () => {
		cy.mount(
			<>
				<Dialog id="dialog-success-state" accessibleRole="Dialog"></Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-success-state").invoke("attr", "open", true);

		// Assert role
		cy.get("#dialog-success-state")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog");

		// Close dialog
		cy.realPress("Escape");
	});

	it("tests warning state dialog accessibility role", () => {
		cy.mount(
			<>
				<Dialog id="dialog-warn-state" accessibleRole="AlertDialog"></Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialog-warn-state").invoke("attr", "open", true);

		// Assert role
		cy.get("#dialog-warn-state")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog");
	});
});

describe("Block layers", () => {
	it("test dialog overlay when dialog isn't open", () => {
		cy.mount(
			<>
				<Dialog id="dialog">
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Assert block layer is hidden when dialog isn't open
		cy.get("#dialog")
			.shadow()
			.find(".ui5-block-layer")
			.should("not.have.class", "ui5-block-layer--visible");
	});

	it("test dialog overlay when dialog is open", () => {
		cy.mount(
			<>
				<Dialog id="dialogOverDialog1">
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Open dialog
		cy.get("#dialogOverDialog1").invoke("attr", "open", true);

		// Assert block layer is visible when dialog is open
		cy.get("#dialogOverDialog1")
			.shadow()
			.find(".ui5-block-layer")
			.should("have.css", "display", "block");
	});
});

describe("Dialog initially open", () => {
	it("test :popover-open selector", () => {
		cy.mount(
			<>
				<Dialog id="dialogOpen" open>
					<Button>Close</Button>
				</Dialog>
			</>
		);

		// Assert dialog matches :popover-open selector
		cy.get("#dialogOpen").should("match", ":popover-open");
	});
});