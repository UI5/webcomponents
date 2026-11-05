import Dialog from "../../src/Dialog.js";
import Button from "../../src/Button.js";
import Popover from "../../src/Popover.js";

describe("Popup inert background", () => {
	// --- core behavior (from PR #14197) ---

	it("marks background elements inert while open and restores on close", () => {
		cy.mount(
			<>
				<button id="before"></button>
				<Dialog id="dialogId">
					<Button id="inside">Inside</Button>
				</Dialog>
				<button id="after"></button>
			</>
		);

		cy.get("#before").should("not.have.attr", "inert");
		cy.get("#after").should("not.have.attr", "inert");

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#before").should("have.attr", "inert");
		cy.get("#after").should("have.attr", "inert");
		cy.get("#before").should("have.attr", "data-ui5-dialog-old-no-inert");
		cy.get("#dialogId").should("not.have.attr", "inert");

		cy.get("#dialogId").invoke("prop", "open", false);

		cy.get("#before").should("not.have.attr", "inert");
		cy.get("#after").should("not.have.attr", "inert");
		cy.get("#before").should("not.have.attr", "data-ui5-dialog-old-no-inert");
	});

	it("prevents focus reaching background elements while open", () => {
		cy.mount(
			<>
				<button id="before"></button>
				<Dialog id="dialogId">
					<Button id="inside">Inside</Button>
				</Dialog>
			</>
		);

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#before").then($el => $el[0].focus());
		cy.get("#before").should("not.be.focused");
	});

	it("does not clear author-set inert on close", () => {
		cy.mount(
			<>
				<button id="before" inert></button>
				<Dialog id="dialogId">
					<Button id="inside">Inside</Button>
				</Dialog>
			</>
		);

		cy.get("#before").should("have.attr", "inert");

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		cy.get("#before").should("not.have.attr", "data-ui5-dialog-old-no-inert");

		cy.get("#dialogId").invoke("prop", "open", false);

		cy.get("#before").should("have.attr", "inert");
	});

	it("does not inert an already-open dialog when a second dialog opens", () => {
		cy.mount(
			<>
				<Dialog id="dialog1"><Button id="inside1">Inside 1</Button></Dialog>
				<Dialog id="dialog2"><Button id="inside2">Inside 2</Button></Dialog>
			</>
		);

		cy.get("#dialog1").invoke("prop", "open", true);
		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get("#dialog2").invoke("prop", "open", true);
		cy.get<Dialog>("#dialog2").ui5DialogOpened();

		cy.get("#dialog1").should("not.have.attr", "inert");
		cy.get("#dialog2").should("not.have.attr", "inert");

		cy.get("#dialog2").invoke("prop", "open", false);
		cy.get("#dialog1").should("not.have.attr", "inert");
	});

	it("does not inherit inert from an inerted ancestor when opened (nested dialog)", () => {
		cy.mount(
			<>
				<div id="wrapper1">
					<Dialog id="dialog1"><Button id="inside1">Inside 1</Button></Dialog>
				</div>
				<div id="wrapper2">
					<button id="background2"></button>
					<Dialog id="dialog2"><Button id="inside2">Inside 2</Button></Dialog>
				</div>
			</>
		);

		cy.get("#dialog1").invoke("prop", "open", true);
		cy.get<Dialog>("#dialog1").ui5DialogOpened();
		cy.get("#wrapper2").should("have.attr", "inert");

		cy.get("#dialog2").invoke("prop", "open", true);
		cy.get<Dialog>("#dialog2").ui5DialogOpened();

		cy.get("#wrapper2").should("not.have.attr", "inert");
		cy.get("#background2").should("have.attr", "inert");
		cy.get("#wrapper1").should("have.attr", "inert");

		cy.get("#inside2").realClick();
		cy.get("#inside2").should("be.focused");

		cy.get("#dialog2").invoke("prop", "open", false);
		cy.get("#wrapper2").should("have.attr", "inert");
		cy.get("#wrapper1").should("not.have.attr", "inert");

		cy.get("#dialog1").invoke("prop", "open", false);
		cy.get("#wrapper2").should("not.have.attr", "inert");
	});

	it("does not inert a popover opened from within the dialog", () => {
		cy.mount(
			<>
				<div id="wrapper1">
					<Dialog id="dialogId"><Button id="inside">Inside</Button></Dialog>
				</div>
				<div id="wrapper2">
					<button id="background2"></button>
					<Popover id="popoverId" opener="inside">
						<Button id="insidePopover">Inside Popover</Button>
					</Popover>
				</div>
			</>
		);

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();
		cy.get("#wrapper2").should("have.attr", "inert");

		cy.get("#popoverId").invoke("prop", "open", true);
		cy.get("#popoverId").should("have.attr", "open");

		cy.get("#wrapper2").should("not.have.attr", "inert");
		cy.get("#popoverId").should("not.have.attr", "inert");
		cy.get("#background2").should("have.attr", "inert");

		cy.get("#popoverId").invoke("prop", "open", false);
		cy.get("#wrapper2").should("have.attr", "inert");
		cy.get("#background2").should("not.have.attr", "inert");
	});

	// --- additions from our centralized PoC ---

	it("does not inert the background for a non-modal popover", () => {
		cy.mount(
			<>
				<button id="opener">opener</button>
				<button id="bg">background</button>
				<Popover id="pop" opener="opener">content</Popover>
			</>
		);

		cy.get("#pop").invoke("prop", "open", true);
		cy.get("#pop").should("have.attr", "open");
		cy.get("#bg").should("not.have.attr", "inert");
	});

	it("inerts background elements added while the modal is open", () => {
		cy.mount(
			<>
				<div id="container"></div>
				<Dialog id="dialogId"><Button id="inside">Inside</Button></Dialog>
			</>
		);

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		// new background sibling added at the mount-root level after open
		cy.get("#dialogId").then($dlg => {
			const added = document.createElement("button");
			added.id = "lateBg";
			$dlg[0].parentElement!.appendChild(added);
		});

		cy.get("#lateBg").should("have.attr", "inert");

		cy.get("#dialogId").invoke("prop", "open", false);
		cy.get("#lateBg").should("not.have.attr", "inert");
	});

	it("leaves no residual inert after the last of several dialogs closes", () => {
		cy.mount(
			<>
				<button id="bg"></button>
				<Dialog id="d1"><Button id="in1">1</Button></Dialog>
				<Dialog id="d2"><Button id="in2">2</Button></Dialog>
			</>
		);

		cy.get("#d1").invoke("prop", "open", true);
		cy.get<Dialog>("#d1").ui5DialogOpened();
		cy.get("#d2").invoke("prop", "open", true);
		cy.get<Dialog>("#d2").ui5DialogOpened();

		cy.get("#d2").invoke("prop", "open", false);
		cy.get("#d1").invoke("prop", "open", false);

		// backstop sweep: once nothing is open, no element keeps a popup-set inert marker
		cy.get("#bg").should("not.have.attr", "inert");
		cy.document().then(doc => {
			expect(doc.querySelectorAll("[data-ui5-dialog-old-no-inert]")).to.have.length(0);
		});
	});

	it("does not inert a background container that hosts an open popover", () => {
		cy.mount(
			<>
				<div id="host">
					<Button id="popOpener">opener</Button>
					<Popover id="bgPop" opener="popOpener"><Button id="inPop">x</Button></Popover>
				</div>
				<Dialog id="dialogId"><Button id="inside">Inside</Button></Dialog>
			</>
		);

		// a non-modal popover is open in the background before the dialog opens
		cy.get("#bgPop").invoke("prop", "open", true);
		cy.get("#bgPop").should("have.attr", "open");

		cy.get("#dialogId").invoke("prop", "open", true);
		cy.get<Dialog>("#dialogId").ui5DialogOpened();

		// the container hosting the open popover stays interactive (behavioral check, no hard-coded ids)
		cy.get("#host").should("not.have.attr", "inert");
		cy.get("#bgPop").should("not.have.attr", "inert");
	});

	// --- registry-driven modal-on-modal isolation (shadow chrome muting) ---

	it("inerts the parent dialog's shadow chrome when a nested dialog opens", () => {
		cy.mount(
			<>
				<button id="bg"></button>
				<Dialog id="outer" headerText="Outer">
					<Button id="outerBtn">Outer button</Button>
					<Dialog id="inner" headerText="Inner">
						<Button id="innerBtn">Inner button</Button>
					</Dialog>
				</Dialog>
			</>
		);

		cy.get("#outer").invoke("prop", "open", true);
		cy.get<Dialog>("#outer").ui5DialogOpened();

		// outer dialog's shadow chrome is live
		cy.get("#outer").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");

		cy.get("#inner").invoke("prop", "open", true);
		cy.get<Dialog>("#inner").ui5DialogOpened();

		// outer's shadow chrome is now inerted
		cy.get("#outer").shadow().find(".ui5-popup-header-root").should("have.attr", "inert");
		cy.get("#outer").shadow().find("[root-element]").should("have.attr", "role", "none");

		// inner is unaffected
		cy.get("#inner").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");
		cy.get("#inner").shadow().find("[root-element]").invoke("attr", "role").should("not.eq", "none");

		// close inner → outer's chrome is restored
		cy.get("#inner").invoke("prop", "open", false);

		cy.get("#outer").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");
		cy.get("#outer").shadow().find("[root-element]").invoke("attr", "role").should("not.eq", "none");
	});

	it("inerts shadow chrome of sibling dialogs when a second modal opens (deep stack)", () => {
		cy.mount(
			<>
				<button id="bg"></button>
				<Dialog id="d1" headerText="D1">
					<Button id="in1">In D1</Button>
				</Dialog>
				<Dialog id="d2" headerText="D2">
					<Button id="in2">In D2</Button>
				</Dialog>
			</>
		);

		cy.get("#d1").invoke("prop", "open", true);
		cy.get<Dialog>("#d1").ui5DialogOpened();

		cy.get("#d1").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");

		cy.get("#d2").invoke("prop", "open", true);
		cy.get<Dialog>("#d2").ui5DialogOpened();

		// d1 is below the top modal → shadow chrome is inerted
		cy.get("#d1").shadow().find(".ui5-popup-header-root").should("have.attr", "inert");
		cy.get("#d1").shadow().find("[root-element]").should("have.attr", "role", "none");

		// d2 is the top modal → shadow chrome is active
		cy.get("#d2").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");

		// close d2 → d1's chrome is restored
		cy.get("#d2").invoke("prop", "open", false);
		cy.get("#d1").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");
		cy.get("#d1").shadow().find("[root-element]").invoke("attr", "role").should("not.eq", "none");
	});

	it("does not mute a non-modal popover above the top modal dialog", () => {
		cy.mount(
			<>
				<Dialog id="d1" headerText="D1">
					<Button id="in1">In D1</Button>
				</Dialog>
				<Popover id="p1" opener="in1" headerText="P1">
					<Button id="inP1">In P1</Button>
				</Popover>
			</>
		);

		cy.get("#d1").invoke("prop", "open", true);
		cy.get<Dialog>("#d1").ui5DialogOpened();

		cy.get("#p1").invoke("prop", "open", true);
		cy.get("#p1").should("have.attr", "open");

		// p1 is above d1 in the stack (non-modal) → not muted
		cy.get("#p1").shadow().find("[root-element]").invoke("attr", "role").should("not.eq", "none");
		cy.get("#d1").shadow().find(".ui5-popup-header-root").should("not.have.attr", "inert");
	});
});
