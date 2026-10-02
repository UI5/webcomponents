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
		it("should position resize handle at top-left when popover is to the left of opener", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", right: "100px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-left");
		});

		it("should position resize handle at bottom-right when popover is to the right of opener", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");
		});

		it("should position resize handle at top-left when popover is above opener", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-left");
		});

		it("should position resize handle at bottom-left when popover is below opener", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>Content</div>
					</Popover>
				</div>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-left");
		});
	});

	describe("Resize Interaction", () => {
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
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialSize.width);
				expect(rect.height).be.lessThan(initialSize.height);
			});
		});

		it("should resize correctly with Bottom placement", () => {
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

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
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
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-50, -50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
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
			let initialHeight: number;

			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
			});
		});

		it("should respect minimum width/height during resize", () => {
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
						style={{ minWidth: "150px", minHeight: "150px" }}>
						<div>
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
				.realMouseMove(-150, -150)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const width = $popover[0].getBoundingClientRect().width;
				const height = $popover[0].getBoundingClientRect().height;

				expect(width).to.be.at.least(149);
				expect(height).to.be.at.least(149);
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
				.realMouseMove(780, 570)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
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
				.realMouseMove(50, 50)
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

	describe("Resize Interaction in RTL", () => {
		it("should resize correctly with Top placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</div>
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
				.realMouseMove(-50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialSize.width);
				expect(rect.height).be.lessThan(initialSize.height);
			});
		});

		it("should resize correctly with Bottom placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</div>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
			});
		});

		it("should resize correctly with Start placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", left: "400px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</div>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
			});
		});

		it("should resize correctly with End placement", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="btnOpen" style={{ position: "absolute", right: "400px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</div>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			let initialWidth: number;
			let initialHeight: number;

			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-50, -50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
			});
		});
	});

	describe("Resize State Reset", () => {
		it("should reset size when popover is closed and reopened", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "200px" }}>
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
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const resizedWidth = $popover[0].getBoundingClientRect().width;
				expect(resizedWidth).be.greaterThan(initialWidth);
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
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
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
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialSize.width);
				expect(rect.height).be.greaterThan(initialSize.height);
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
				.realMouseDown({ position: "center" });

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
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
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
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const newWidth = $popover[0].getBoundingClientRect().width;
				const newHeight = $popover[0].getBoundingClientRect().height;

				expect(newWidth).be.greaterThan(initialWidth);
				expect(newHeight).be.greaterThan(initialHeight);
			});
		});
	});

	describe("Opener at Viewport Edges", () => {
		it("should position and resize popover correctly when opener is at top-left edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "10px", top: "10px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify correct resize handle placement class
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
			});
		});

		it("should position and resize popover correctly when opener is at top-right edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "10px", top: "10px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.right).to.be.at.most(window.innerWidth);
				expect(rect.top).to.be.at.least(0);
			});

			// Verify correct resize handle placement class
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-left");

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing - try to expand but respect viewport bounds
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(30, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
			});
		});

		it("should position and resize popover correctly when opener is at bottom-left edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "10px", bottom: "10px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.left).to.be.at.least(0);
				expect(rect.bottom).to.be.at.most(window.innerHeight);
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify correct resize handle placement class
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-right");

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			// Test resizing
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 30)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				// Ensure it stays within viewport
				expect(rect.left).to.be.at.least(0);
				expect(rect.top).to.be.at.least(0);
				expect(rect.right).to.be.lessThan(window.innerWidth);
			});
		});

		it("should position and resize popover correctly when opener is at bottom-right edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "10px", bottom: "10px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "150px", padding: "20px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.right).to.be.at.most(window.innerWidth);
				expect(rect.bottom).to.be.at.most(window.innerHeight);
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify correct resize handle placement class
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-top-left");

			// Test resizing - should respect viewport boundaries
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(20, 20)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				// Ensure it stays within viewport
				expect(rect.left).to.be.at.least(0);
				expect(rect.top).to.be.at.least(0);
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
			});
		});

		it("should position and resize popover correctly when opener is at left edge (middle)", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "10px", top: "400px" }}>
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

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.left).to.be.at.least(0);
			});

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.right).to.be.lessThan(window.innerWidth);
			});
		});

		it("should position and resize popover correctly when opener is at right edge (middle)", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "10px", top: "400px" }}>
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

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.right).to.be.at.most(window.innerWidth);
			});

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-50, -50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.left).to.be.at.least(0);
			});
		});
	});

	describe("Opener Bigger Than Popover", () => {
		it("should position and resize popover correctly when opener is wider than popover", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "200px", width: "400px", height: "60px" }}>
						Large Opener Button
					</Button>
					<Popover id="popover" horizontalAlign="Start" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "150px", height: "100px", padding: "20px" }}>
							Small Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is visible
			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($button => {
					const buttonRect = $button[0].getBoundingClientRect();
					// Popover should be narrower than opener
					expect(popoverRect.width).to.be.lessThan(buttonRect.width);
				});
			});

			// Verify correct resize handle placement class (popover is narrower, so handle should be based on horizontal alignment)
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing - expand to match or exceed opener width
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(100, 50)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
			});
		});

		it("should position and resize popover correctly when opener is taller than popover", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "100px", width: "100px", height: "300px" }}>
						Tall Opener
					</Button>
					<Popover id="popover" opener="btnOpen" verticalAlign="Top" placement="End" resizable open={true}>
						<div style={{ width: "150px", height: "100px", padding: "20px" }}>
							Small Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is visible
			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($button => {
					const buttonRect = $button[0].getBoundingClientRect();
					// Popover should be shorter than opener
					expect(popoverRect.height).to.be.lessThan(buttonRect.height);
				});
			});

			// Verify correct resize handle placement class (popover is shorter, so handle should be at top)
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing - expand to match or exceed opener height
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(50, 100)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
			});
		});

		it("should position and resize popover correctly when opener is much larger in both dimensions", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "100px", top: "100px", width: "500px", height: "400px" }}>
						Very Large Opener
					</Button>
					<Popover id="popover" opener="btnOpen" horizontalAlign="Start" placement="Bottom" resizable open={true}>
						<div style={{ width: "100px", height: "80px", padding: "10px" }}>
							Tiny Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is much smaller than opener
			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($button => {
					const buttonRect = $button[0].getBoundingClientRect();
					expect(popoverRect.width).to.be.lessThan(buttonRect.width);
					expect(popoverRect.height).to.be.lessThan(buttonRect.height);
				});
			});

			// Verify correct resize handle placement class (popover is much smaller, so handle at bottom-left based on center positions)
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-right");

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing - expand significantly
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(150, 100)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
			});
		});

		it("should handle resizing when opener is larger and positioned at viewport edge", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "10px", top: "10px", width: "400px", height: "200px" }}>
						Large Opener at Edge
					</Button>
					<Popover id="popover" opener="btnOpen" horizontalAlign="End" placement="Bottom" resizable open={true}>
						<div style={{ width: "120px", height: "100px", padding: "15px" }}>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			// Verify popover is smaller than opener
			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($button => {
					const buttonRect = $button[0].getBoundingClientRect();
					expect(popoverRect.width).to.be.lessThan(buttonRect.width);
					expect(popoverRect.height).to.be.lessThan(buttonRect.height);
				});
			});

			// Verify correct resize handle placement class (smaller popover at edge, handle at bottom-left)
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-left");

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			// Test resizing with viewport constraints
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-100, 80)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).be.greaterThan(initialWidth);
				expect(rect.height).be.greaterThan(initialHeight);
				// Ensure it stays within viewport
				expect(rect.left).to.be.at.least(0);
				expect(rect.top).to.be.at.least(0);
				expect(rect.right).to.be.lessThan(window.innerWidth);
				expect(rect.bottom).to.be.lessThan(window.innerHeight);
			});
		});
	});

	describe("Resize with Max Width and Max Height Constraints", () => {
		it("should respect inline max-width during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ maxWidth: "300px" }}>
						<div style={{ width: "150px", height: "100px", padding: "20px" }}>
							Content with max-width constraint
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(200, 0)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const width = $popover[0].getBoundingClientRect().width;
				expect(width).to.be.at.most(300);
			});
		});

		it("should respect inline max-height during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ maxHeight: "250px" }}>
						<div style={{ width: "150px", height: "100px", padding: "20px" }}>
							Content with max-height constraint
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(0, 200)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const height = $popover[0].getBoundingClientRect().height;
				expect(height).to.be.at.most(250);
			});
		});

		it("should respect both inline max-width and max-height during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "200px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ maxWidth: "300px", maxHeight: "250px" }}>
						<div style={{ width: "150px", height: "100px", padding: "20px" }}>
							Content with both constraints
						</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(200, 200)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.be.at.most(300);
				expect(rect.height).to.be.at.most(250);
			});
		});

		it("should respect all min/max inline constraints during resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ minWidth: "100px", maxWidth: "200px", minHeight: "100px", maxHeight: "200px" }}>
						<div style={{ padding: "10px" }}>
							Content with all constraints
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
				.realMouseMove(300, 300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.be.at.most(200);
				expect(rect.height).to.be.at.most(200);
			});

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-resize-handle")
				.realMouseDown({ position: "center" })
				.realMouseMove(-300, -300)
				.realMouseUp();

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.be.at.least(99);
				expect(rect.height).to.be.at.least(99);
			});
		});
	});

	describe("Keyboard Resize", () => {
		it("should render focusable keyboard resize handle when resizable", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open</Button>
					<Popover id="popover" opener="btnOpen" resizable open={true}>
						<div style={{ padding: "20px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.should("exist")
				.and("have.attr", "tabindex", "0")
				.and("have.attr", "role", "img");
		});

		it("should increase width with Shift+Right on End (right) placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress(["Shift", "ArrowRight"]);

			cy.get("[ui5-popover]").then($popover => {
				expect($popover[0].getBoundingClientRect().width).to.be.greaterThan(initialWidth);
			});
		});

		it("should increase width with Shift+Left on Start (left) placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", right: "200px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress(["Shift", "ArrowLeft"]);

			cy.get("[ui5-popover]").then($popover => {
				expect($popover[0].getBoundingClientRect().width).to.be.greaterThan(initialWidth);
			});
		});

		it("should increase height with Shift+Down on Bottom placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress(["Shift", "ArrowDown"]);

			cy.get("[ui5-popover]").then($popover => {
				expect($popover[0].getBoundingClientRect().height).to.be.greaterThan(initialHeight);
			});
		});

		it("should increase height with Shift+Up on Top placement", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress(["Shift", "ArrowUp"]);

			cy.get("[ui5-popover]").then($popover => {
				expect($popover[0].getBoundingClientRect().height).to.be.greaterThan(initialHeight);
			});
		});

		it("should not shrink below minimum width", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						resizable
						open={true}
						style={{ minWidth: "150px" }}>
						<div style={{ width: "160px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			// Press Shift+Left many times to try to go below min width
			for (let i = 0; i < 20; i++) {
				handle.realPress(["Shift", "ArrowLeft"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				expect($popover[0].getBoundingClientRect().width).to.be.at.least(149);
			});
		});

		it("should preserve arrow position after keyboard resize", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress(["Shift", "ArrowRight"])
				.realPress(["Shift", "ArrowDown"]);

			// Arrow should still have valid style after resize
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popover-arrow")
				.should("exist");
		});

		it("should keep right edge anchored when resizing with BottomLeft handle (Bottom + End alignment)", () => {
			// horizontalAlign="End" → PopoverActualHorizontalAlign.Right → BottomLeft handle.
			// Growing from the left: Shift+Left grows (left edge extends), right edge stays fixed.
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "400px", top: "100px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="Bottom"
						horizontalAlign="End"
						resizable
						open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialRight: number;
			let initialWidth: number;
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				initialRight = rect.right;
				initialWidth = rect.width;
			});

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			handle.realPress(["Shift", "ArrowLeft"]);
			handle.realPress(["Shift", "ArrowLeft"]);
			handle.realPress(["Shift", "ArrowLeft"]);

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				// Right edge must stay anchored (within 2px rounding tolerance)
				expect(rect.right).to.be.closeTo(initialRight, 2);
				// Width grew by 3 × STEP_SIZE (16px each) — update 48 if STEP_SIZE in PopoverResize.ts changes
				expect(rect.width).to.be.closeTo(initialWidth + 48, 2);
			});
		});

		it("should keep bottom edge anchored when resizing with TopRight handle (Right + vertical-align Bottom)", () => {
			// verticalAlign="Bottom" → TopRight handle (popover bottom aligns with opener bottom).
			// Growing from the top: Shift+Up grows (top edge extends), bottom edge stays fixed.
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "400px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="End"
						verticalAlign="Bottom"
						resizable
						open={true}>
						<div style={{ width: "120px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialBottom: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				initialBottom = rect.bottom;
				initialHeight = rect.height;
			});

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			handle.realPress(["Shift", "ArrowUp"]);
			handle.realPress(["Shift", "ArrowUp"]);
			handle.realPress(["Shift", "ArrowUp"]);

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				// Bottom edge must stay anchored (within 2px rounding tolerance)
				expect(rect.bottom).to.be.closeTo(initialBottom, 2);
				// Height grew by 3 × STEP_SIZE (16px each) — update 48 if STEP_SIZE in PopoverResize.ts changes
				expect(rect.height).to.be.closeTo(initialHeight + 48, 2);
			});
		});

		it("keyboard resize handle should accept focus", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler:focus")
				.should("exist");
		});

		describe("RTL", () => {
			it("should grow the popover width with Shift+Left in RTL (End placement, BottomRight handle)", () => {
				cy.mount(
					<div dir="rtl">
						<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
							Open
						</Button>
						<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
							<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
						</Popover>
					</div>
				);

				cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(200);

				let initialWidth: number;
				cy.get("[ui5-popover]").then($popover => {
					initialWidth = $popover[0].getBoundingClientRect().width;
				});

				const handle = cy.get("[ui5-popover]")
					.shadow()
					.find(".ui5-popup-drag-resize-handler")
					.focus();

				// In RTL with End placement the right (logical start) edge is free.
				// Shift+Left grows toward the right (logical start direction).
				handle.realPress(["Shift", "ArrowLeft"]);
				handle.realPress(["Shift", "ArrowLeft"]);
				handle.realPress(["Shift", "ArrowLeft"]);

				cy.get("[ui5-popover]").then($popover => {
					const rect = $popover[0].getBoundingClientRect();
					expect(rect.width).to.be.greaterThan(initialWidth);
				});
			});

			it("should stop RTL shrink before the right edge crosses the opener's right edge (End placement, BottomRight handle)", () => {
				cy.mount(
					<div dir="rtl">
						<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
							Open
						</Button>
						<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
							<div style={{ width: "300px", height: "100px", padding: "10px" }}>Content</div>
						</Popover>
					</div>
				);

				cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(200);

				const handle = cy.get("[ui5-popover]")
					.shadow()
					.find(".ui5-popup-drag-resize-handler")
					.focus();

				// Shift+Right shrinks the popover in RTL End placement.
				for (let i = 0; i < 15; i++) {
					handle.realPress(["Shift", "ArrowRight"]);
				}

				cy.get("[ui5-popover]").then($popover => {
					const popoverRect = $popover[0].getBoundingClientRect();
					cy.get("#btnOpen").then($btn => {
						const btnRect = $btn[0].getBoundingClientRect();
						// Opener's right edge must remain within the popover's horizontal extent.
						expect(popoverRect.right).to.be.at.least(btnRect.right - 2);
					});
				});
			});
		});

		it("should not resize when non-Shift arrow keys are pressed on the keyboard handle", () => {
			cy.mount(
				<>
					<Button id="btnOpen" style={{ position: "absolute", left: "300px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus()
				.realPress("ArrowDown")
				.realPress("ArrowUp")
				.realPress("ArrowLeft")
				.realPress("ArrowRight");

			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.width).to.equal(initialWidth);
				expect(rect.height).to.equal(initialHeight);
			});
		});
	});

	describe("Keyboard Resize — Opener Anchor Constraint", () => {
		it("should stop the popover from leaving the opener when shrinking with Shift+Down (Start placement)", () => {
			// Start (left) placement, Center vAlign: the top edge is the free edge.
			// Pressing Shift+Down many times must not push the top edge below the opener's top edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "400px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's top edge must remain within the popover's vertical extent.
					expect(popoverRect.top).to.be.at.most(btnRect.top + 2);
				});
			});
		});

		it("should stop the popover from leaving the opener when shrinking with Shift+Up (End placement)", () => {
			// End (right) placement, Center vAlign: the bottom edge is the free edge.
			// Pressing Shift+Up many times must not push the bottom edge above the opener's bottom edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "300px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowUp"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's bottom edge must remain within the popover's vertical extent.
					expect(popoverRect.bottom).to.be.at.least(btnRect.bottom - 2);
				});
			});
		});

		it("should keep the bottom edge stable (no drift) through many Shift+Down presses (Start placement)", () => {
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "400px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialBottom: number;
			cy.get("[ui5-popover]").then($popover => {
				initialBottom = $popover[0].getBoundingClientRect().bottom;
			});

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 20; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				// Anchored bottom edge must not drift from its initial position.
				expect($popover[0].getBoundingClientRect().bottom).to.be.closeTo(initialBottom, 2);
			});
		});

		it("should keep the top edge stable (no drift) through many Shift+Up presses (End placement)", () => {
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "300px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="End" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialTop: number;
			cy.get("[ui5-popover]").then($popover => {
				initialTop = $popover[0].getBoundingClientRect().top;
			});

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 20; i++) {
				handle.realPress(["Shift", "ArrowUp"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				// Anchored top edge must not drift from its initial position.
				expect($popover[0].getBoundingClientRect().top).to.be.closeTo(initialTop, 2);
			});
		});

		it("should enforce opener constraint after growing then shrinking past initial size (Start placement)", () => {
			// The anchor is captured on the first keypress. Growing first and then shrinking
			// past the initial size must still respect the opener-center constraint.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "400px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			// Grow 5 steps (top edge moves up, bottom stays).
			for (let i = 0; i < 5; i++) {
				handle.realPress(["Shift", "ArrowUp"]);
			}

			// Shrink 20 steps — goes well past the original size.
			for (let i = 0; i < 20; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's top edge must remain within the popover's vertical extent.
					expect(popoverRect.top).to.be.at.most(btnRect.top + 2);
				});
			});
		});

		it("should reset the anchor constraint when the popover is closed and reopened", () => {
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "400px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", true);
			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			// Shrink until the anchor constraint stops further reduction.
			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			// Close and reopen — reset() clears the stored anchor.
			cy.get("[ui5-popover]").invoke("prop", "open", false);
			cy.get("[ui5-popover]").should("not.be.visible");

			cy.get("[ui5-popover]").invoke("prop", "open", true);
			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

			// Size must be back to its initial natural size.
			cy.get("[ui5-popover]").then($popover => {
				const height = $popover[0].getBoundingClientRect().height;
				expect(Math.abs(height - initialHeight)).to.be.lessThan(5);
			});
		});

		it("should stop horizontal shrink before the right edge crosses the opener's right edge (Bottom placement, BottomRight handle)", () => {
			// Bottom placement + Center hAlign → BottomRight handle.
			// Shift+Left shrinks from the right; constraint keeps right ≥ opener's right edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "300px", top: "200px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Bottom" resizable open={true}>
						<div style={{ width: "300px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowLeft"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's right edge must remain within the popover's horizontal extent.
					expect(popoverRect.right).to.be.at.least(btnRect.right - 2);
				});
			});
		});

		it("should stop horizontal shrink before the right edge crosses the opener's right edge (Top placement, TopRight handle)", () => {
			// Top placement + Center hAlign → TopRight handle.
			// Shift+Left shrinks from the right; constraint keeps right ≥ opener's right edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "300px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowLeft"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's right edge must remain within the popover's horizontal extent.
					expect(popoverRect.right).to.be.at.least(btnRect.right - 2);
				});
			});
		});

		it("should stop horizontal shrink before the left edge crosses the opener's left edge (Bottom placement, BottomLeft handle)", () => {
			// A narrow button placed far to the right with End alignment gives a BottomLeft handle
			// because the popover's right aligns to the opener's right, but the popover is wide
			// enough that its center falls to the LEFT of the opener center.
			// Shift+Right shrinks from the left; constraint keeps left ≤ opener's left edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "500px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="Bottom"
						horizontalAlign="End"
						resizable
						open={true}>
						<div style={{ width: "300px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			// Confirm BottomLeft handle placement (popover center is left of opener center).
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-left");

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowRight"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Left edge must not drift right past the opener's left edge.
					expect(popoverRect.left).to.be.at.most(btnRect.left + 2);
				});
			});
		});

		it("should stop horizontal shrink before the left edge crosses the opener's left edge (Start placement, TopLeft handle)", () => {
			// Start placement + Center vAlign → TopLeft handle (popover to the left of the opener).
			// Shift+Right shrinks from the left; constraint keeps left ≤ opener's left edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "500px", top: "300px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "300px", height: "100px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowRight"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Left edge must not drift right past the opener's left edge.
					expect(popoverRect.left).to.be.at.most(btnRect.left + 2);
				});
			});
		});

		it("should stop vertical shrink before the top edge crosses the opener's top edge (Top placement, TopRight handle)", () => {
			// Top placement + Center hAlign → TopRight handle (popover above the opener).
			// Shift+Down shrinks from the top; constraint keeps top ≤ opener's top edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "300px", bottom: "100px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Top" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's top edge must remain within the popover's vertical extent.
					expect(popoverRect.top).to.be.at.most(btnRect.top + 2);
				});
			});
		});

		it("should stop vertical shrink before the bottom edge crosses the opener's bottom edge (Bottom+End placement, BottomLeft handle)", () => {
			// Bottom placement + End hAlign with wide content → BottomLeft handle.
			// Shift+Up shrinks from the bottom; constraint keeps bottom ≥ opener's bottom edge.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "500px", top: "200px" }}>
						Open
					</Button>
					<Popover
						id="popover"
						opener="btnOpen"
						placement="Bottom"
						horizontalAlign="End"
						resizable
						open={true}>
						<div style={{ width: "300px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			// Confirm BottomLeft handle placement.
			cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-root")
				.should("have.class", "ui5-popover-resize-handle-bottom-left");

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			for (let i = 0; i < 15; i++) {
				handle.realPress(["Shift", "ArrowUp"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					// Opener's bottom edge must remain within the popover's vertical extent.
					expect(popoverRect.bottom).to.be.at.least(btnRect.bottom - 2);
				});
			});
		});

		it("should not flip the handle from TopLeft to BottomLeft as the top edge drifts down", () => {
			// Root cause regression test: without freezing the handle on first keypress, the
			// popoverCY drifts below openerCY as the top moves down, flipping the handle from
			// TopLeft → BottomLeft which reverses the direction and causes runaway movement.
			cy.mount(
				<>
					<Button
						id="btnOpen"
						style={{ position: "absolute", left: "400px", top: "350px" }}>
						Open
					</Button>
					<Popover id="popover" opener="btnOpen" placement="Start" resizable open={true}>
						<div style={{ width: "200px", height: "200px", padding: "10px" }}>Content</div>
					</Popover>
				</>
			);

			cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			const handle = cy.get("[ui5-popover]")
				.shadow()
				.find(".ui5-popup-drag-resize-handler")
				.focus();

			// Press many times — with the bug, the position would oscillate and eventually
			// the popover would drift far below the opener. With the fix, it stays stable.
			for (let i = 0; i < 30; i++) {
				handle.realPress(["Shift", "ArrowDown"]);
			}

			cy.get("[ui5-popover]").then($popover => {
				const popoverRect = $popover[0].getBoundingClientRect();
				cy.get("#btnOpen").then($btn => {
					const btnRect = $btn[0].getBoundingClientRect();
					const openerBottom = btnRect.bottom;
					// The popover must still overlap the opener (top has not drifted below opener bottom).
					expect(popoverRect.top).to.be.at.most(openerBottom);
				});
			});
		});
	});
});
