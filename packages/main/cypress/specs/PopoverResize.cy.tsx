import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";

describe("Popover Resize Functionality", () => {
	beforeEach(() => {
		cy.viewport(1200, 800);
	});

	describe("Resizable Property", () => {
		it("should render resize handle when resizable is true", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Resizable Popover</Button>
					<Popover id="popover" opener="btnOpen" resizable open={true}>
						<div style={{ padding: "20px" }}>Resizable content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("exist")
				.and("be.visible");
		});

		it("should not render resize handle when resizable is false", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Non-Resizable Popover</Button>
					<Popover id="popover" opener="btnOpen" resizable={false} open={true}>
						<div style={{ padding: "20px" }}>Non-resizable content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("not.exist");
		});

		it("should toggle resize handle when resizable property changes", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Popover</Button>
					<Popover id="popover" opener="btnOpen" resizable={false} open={true}>
						<div style={{ padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("not.exist");

			cy.get("[ui5-popover]").invoke("prop", "resizable", true);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("exist")
				.and("be.visible");
		});
	});

	describe("Resize Handle Placement", () => {
		it("should position resize handle at bottom-right when popover is to the right of opener", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");
		});

		it("should position resize handle at top-left when popover is to the left of opener", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "100px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-left");
		});

		it("should position resize handle at top-right when popover is above opener", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-right");
		});

		it("should position resize handle at bottom-right when popover is below opener", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");
		});
	});

	describe("Resize Handle Placement in RTL", () => {
		it("should position resize handle correctly in RTL for right placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("exist");
		});

		it("should position resize handle correctly in RTL for left placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", right: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.should("exist");
		});
	});

	describe("Resize Interaction", () => {
		it("should resize popover width when dragging from right edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Resizable content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(500, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});
		});

		it("should resize popover height when dragging from bottom edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Resizable content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(300, 400)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newHeight = $popover[0].getBoundingClientRect().height;
				expect(newHeight).to.not.equal(initialHeight);
			});
		});

		it("should respect minimum width during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "400px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ minWidth: "150px" }}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(100, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const width = $popover[0].getBoundingClientRect().width;
				expect(width).to.be.at.least(150);
			});
		});

		it("should respect viewport margins during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(2000, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.right).to.be.lessThan(window.innerWidth - 10);
			});
		});

		it("should maintain resized size when popover is repositioned", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(600, 400)
				.realMouseUp();

			let resizedWidth: number;
			let resizedHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				resizedWidth = rect.width;
				resizedHeight = rect.height;
			});

			// Trigger a reposition by resizing the window
			cy.viewport(1300, 900);

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				// The size should be maintained (with some tolerance for rounding)
				expect(Math.abs(rect.width - resizedWidth)).to.be.lessThan(5);
				expect(Math.abs(rect.height - resizedHeight)).to.be.lessThan(5);
			});
		});
	});

	describe("Resize State Reset", () => {
		it("should reset size when popover is closed and reopened", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);
			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(600, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const resizedWidth = $popover[0].getBoundingClientRect().width;
				expect(resizedWidth).to.not.equal(initialWidth);
			});

			cy.get("[ui5-popover]").invoke("prop", "open", false);
			cy.get("[ui5-popover]").should("not.be.visible");

			cy.get("[ui5-popover]").invoke("prop", "open", true);
			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]").then($popover => {
				const reopenedWidth = $popover[0].getBoundingClientRect().width;
				expect(Math.abs(reopenedWidth - initialWidth)).to.be.lessThan(5);
			});
		});
	});

	describe("Resize with Different Placements", () => {
		it("should resize correctly with Top placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialSize: { width: number; height: number };
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				initialSize = { width: rect.width, height: rect.height };
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(500, 200)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.not.equal(initialSize.width);
			});
		});

		it.only("should resize correctly with Bottom placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(400, 500)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newHeight = $popover[0].getBoundingClientRect().height;
				expect(newHeight).to.not.equal(initialHeight);
			});
		});

		it("should resize correctly with Start placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(400, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});
		});

		it("should resize correctly with End placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(500, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});
		});
	});

	describe("Resize with Modal Popover", () => {
		it("should resize modal popover correctly", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable modal open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Modal resizable content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(550, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});
		});
	});

	describe("Resize with Header and Footer", () => {
		it("should resize popover with header and footer correctly", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						headerText="Resizable Popover"
						open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content with header and footer
						</div>
						<div slot="footer">
							<Button design="Emphasized">OK</Button>
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialSize: { width: number; height: number };
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				initialSize = { width: rect.width, height: rect.height };
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(600, 450)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.not.equal(initialSize.width);
				expect(rect.height).to.not.equal(initialSize.height);
			});
		});
	});

	describe("Resize Handle Click Detection", () => {
		it("should detect clicks on resize handle to prevent popover close", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "topLeft" });

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
		});
	});

	describe("Resize with Arrow", () => {
		it("should resize popover with arrow correctly", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content with arrow
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-arrow")
				.should("be.visible");

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(550, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-arrow")
				.should("be.visible");
		});

		it("should resize popover without arrow correctly", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable hideArrow open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content without arrow
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-arrow")
				.should("not.be.visible");

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(550, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				expect(newWidth).to.not.equal(initialWidth);
			});
		});
	});
});
