// Popover is intentionally imported dynamically inside onOpenUI5InitMethod
// to reproduce the problematic import order:
//   1. OpenUI5 initializes and places an OpenUI5-wrapped web component in DOM
//   2. After a delay, a separate script loads OpenUI5Support + native web components
//   3. OpenUI5Support.init() patches Popup
//   4. Popover and Button are registered
// Without the fix, opening an OpenUI5 Dialog on top of a WebC Popover would
// not move the dialog to the top of the top layer.

function onOpenUI5InitMethod(win: any) {
	// Step 1: place the OpenUI5-wrapped web component (triggers OpenUI5's own WC runtime)
	(win as any).sap.ui.require(
		["sap/f/gen/ui5/webcomponents/dist/Button"],
		(WrappedButton: any) => {
			new WrappedButton({
				text: `Web Component via OpenUI5 ${(win as any).sap.ui.getVersionInfo().version}`,
			}).placeAt("content");
		}
	);

	// Step 2: after a delay, load the native web components (simulates a separate app script)
	setTimeout(async () => {
		const OpenUI5Support = (await import("@ui5/webcomponents-base/dist/features/OpenUI5Support.js")).default;

		await (OpenUI5Support as any).init();

		await import("../../src/Popover.js");
		await import("../../src/Button.js");

		const btnPopup = document.getElementById("btnPopup");
		const popup = document.getElementById("popup") as any;

		btnPopup?.addEventListener("click", () => {
			popup.opener = btnPopup;
			popup.open = true;
		});

		document.getElementById("nestedOpener")?.addEventListener("click", () => {
			(win as any).sap.ui.require(["sap/m/Dialog", "sap/m/Text"], (Dialog: any, Text: any) => {
				new Dialog("openUI5Dialog", {
					content: new Text({ text: "Observe the backdrop" }),
					afterClose: function () {
						this.destroy();
					}
				}).open();
				popup.open = false;
			});
		});

		(win as any).openUI5InitDone = true;
	}, 1000);
}

function mountFixtures() {
	cy.mount(
		<>
			<div id="content"></div>
			{/* @ts-ignore */}
			<ui5-button id="btnPopup">Open Popover web component</ui5-button>
			{/* @ts-ignore */}
			<ui5-popover id="popup" header-text="Popover">
				<div>2. Click the button</div>
				{/* @ts-ignore */}
				<ui5-button id="nestedOpener">Open Dialog OpenUI5</ui5-button>
				{/* @ts-ignore */}
			</ui5-popover>
		</>
	);

	cy.window().then((win) => {
		if (!(win as any).sap?.ui) {
			(win as any).onOpenUI5Init = function () {
				onOpenUI5InitMethod(win);
			};
		} else {
			onOpenUI5InitMethod(win);
		}
	});

	cy.document().then((doc) => {
		const ui5Script = doc.createElement("script");
		ui5Script.src = "https://ui5.sap.com/resources/sap-ui-core.js";
		ui5Script.id = "sap-ui-bootstrap";
		ui5Script.setAttribute("data-sap-ui-libs", "sap.m, sap.f");
		ui5Script.setAttribute("data-sap-ui-oninit", "onOpenUI5Init");
		doc.head.appendChild(ui5Script);
	});
}

function cleanupFixtures() {
	cy.window().then((win) => {
		delete (win as any).openUI5InitDone;
		const sap = (win as any).sap;
		if (sap?.ui?.require) {
			sap.ui.require(["sap/ui/core/Element"], (Element: any) => {
				const el = Element.getElementById("openUI5Dialog");
				if (el) {
					el.destroy();
				}
			});
		}
	});

	cy.document().then((doc) => {
		const ui5Script = doc.head.querySelector("[data-sap-ui-oninit]") as HTMLScriptElement;
		if (ui5Script) {
			ui5Script.remove();
		}
	});
}

describe("WebC Popover + OpenUI5 Dialog integration", () => {
	beforeEach(() => { mountFixtures(); });
	afterEach(() => { cleanupFixtures(); });

	it("Opening OpenUI5 Dialog from inside WebC Popover moves the dialog to the top of the top layer", () => {
		// Wait for OpenUI5 to initialize, OpenUI5Support to patch Popup, and Popover to be registered
		cy.window({ timeout: 15000 }).should((win) => {
			expect((win as any).openUI5InitDone).to.be.true;
		});

		cy.get("#btnPopup")
			.should("be.visible")
			.realClick();

		cy.get("#popup").should("be.visible");

		cy.get("#nestedOpener")
			.should("be.visible")
			.realClick();

		// The popover should close
		cy.get("#popup")
			.should("not.be.visible");

		// The OpenUI5 Dialog should be visible
		cy.get("#openUI5Dialog")
			.should("be.visible");

		// The dialog DOM element should be promoted to the native top layer
		cy.get("#openUI5Dialog").then(($dialog) => {
			expect($dialog[0].matches(":popover-open")).to.be.true;
		});

		cy.get("#sap-ui-blocklayer-popup").then(($blockLayer) => {
			expect($blockLayer[0].matches(":popover-open")).to.exist;
		});
	});
});
