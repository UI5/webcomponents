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

			// Verify popover is visible and positioned correctly
			cy.get("[ui5-popover]").then($popover => {
				const rect = $popover[0].getBoundingClientRect();
				expect(rect.left).to.be.at.least(0);
				expect(rect.top).to.be.at.least(0);
			});

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

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(300);

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

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
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

			let initialWidth: number;
			let initialHeight: number;
			cy.get("[ui5-popover]").then($popover => {
				initialWidth = $popover[0].getBoundingClientRect().width;
				initialHeight = $popover[0].getBoundingClientRect().height;
			});

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
});
