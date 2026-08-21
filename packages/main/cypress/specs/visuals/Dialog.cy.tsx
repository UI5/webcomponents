import Dialog from "../../../src/Dialog.js";
import Button from "../../../src/Button.js";
import Bar from "../../../src/Bar.js";
import Title from "../../../src/Title.js";

const openDialog = (id: string) => {
	cy.get(`[ui5-dialog]#${id}`).invoke("prop", "open", true);
	cy.get(`[ui5-dialog]#${id}`).ui5DialogOpened();
};

describe("Dialog visual", () => {
	it("basic state — open with header text and content", () => {
		cy.mount(
			<Dialog id="dialog1" headerText="Confirmation">
				<p>Are you sure you want to proceed?</p>
				<Button slot="footer" design="Emphasized">Confirm</Button>
				<Button slot="footer">Cancel</Button>
			</Dialog>
		);
		openDialog("dialog1");
		cy.screenshot();
	});

	it("with custom header slot", () => {
		cy.mount(
			<Dialog id="dialog2">
				<Bar slot="header">
					<Title slot="startContent" level="H5">Custom Header</Title>
				</Bar>
				<p>Dialog content goes here.</p>
				<Button slot="footer" design="Emphasized">OK</Button>
			</Dialog>
		);
		openDialog("dialog2");
		cy.screenshot();
	});

	it("state — Negative", () => {
		cy.mount(
			<Dialog id="dialog3" headerText="Error" state="Negative">
				<p>Something went wrong.</p>
				<Button slot="footer" design="Emphasized">Close</Button>
			</Dialog>
		);
		openDialog("dialog3");
		cy.screenshot();
	});

	it("state — Critical", () => {
		cy.mount(
			<Dialog id="dialog4" headerText="Warning" state="Critical">
				<p>This action may have consequences.</p>
				<Button slot="footer">OK</Button>
			</Dialog>
		);
		openDialog("dialog4");
		cy.screenshot();
	});

	it("state — Positive", () => {
		cy.mount(
			<Dialog id="dialog5" headerText="Success" state="Positive">
				<p>Operation completed successfully.</p>
				<Button slot="footer">Close</Button>
			</Dialog>
		);
		openDialog("dialog5");
		cy.screenshot();
	});

	it("state — Information", () => {
		cy.mount(
			<Dialog id="dialog6" headerText="Information" state="Information">
				<p>Please read the following information.</p>
				<Button slot="footer">Got It</Button>
			</Dialog>
		);
		openDialog("dialog6");
		cy.screenshot();
	});

	it("stretch mode", () => {
		cy.mount(
			<Dialog id="dialog7" headerText="Stretched Dialog" stretch>
				<p>This dialog stretches to fill the viewport.</p>
				<Button slot="footer" design="Emphasized">Close</Button>
			</Dialog>
		);
		openDialog("dialog7");
		cy.screenshot();
	});

	it("draggable", () => {
		cy.mount(
			<Dialog id="dialog8" headerText="Draggable Dialog" draggable>
				<p>This dialog can be dragged.</p>
				<Button slot="footer">Close</Button>
			</Dialog>
		);
		openDialog("dialog8");
		cy.screenshot();
	});

	it("resizable", () => {
		cy.mount(
			<Dialog id="dialog9" headerText="Resizable Dialog" resizable>
				<p>This dialog can be resized.</p>
				<Button slot="footer">Close</Button>
			</Dialog>
		);
		openDialog("dialog9");
		cy.screenshot();
	});
});
