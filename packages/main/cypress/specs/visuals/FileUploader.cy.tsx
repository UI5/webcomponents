import FileUploader from "../../../src/FileUploader.js";
import Button from "../../../src/Button.js";
import Label from "../../../src/Label.js";

describe("FileUploader visual", () => {
	it("basic state", () => {
		cy.mount(
			<FileUploader placeholder="Choose files..." />
		);
		cy.screenshot();
	});

	it("with value — file name shown", () => {
		cy.mount(
			<FileUploader value="document.pdf" placeholder="Choose files..." />
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<FileUploader disabled placeholder="Choose files..." />
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<FileUploader valueState="Negative" placeholder="Choose files...">
				<span slot="valueStateMessage">Invalid file type.</span>
			</FileUploader>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<FileUploader valueState="Critical" placeholder="Choose files...">
				<span slot="valueStateMessage">File exceeds size limit.</span>
			</FileUploader>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<FileUploader valueState="Positive" placeholder="Choose files...">
				<span slot="valueStateMessage">File is valid.</span>
			</FileUploader>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<FileUploader valueState="Information" placeholder="Choose files...">
				<span slot="valueStateMessage">Accepted formats: PDF, DOCX.</span>
			</FileUploader>
		);
		cy.screenshot();
	});

	it("hide-input — custom button trigger", () => {
		cy.mount(
			<FileUploader hideInput>
				<Button icon="upload">Upload File</Button>
			</FileUploader>
		);
		cy.screenshot();
	});

	it("with label", () => {
		cy.mount(
			<div>
				<Label for="fu1" required>Attachment</Label>
				<FileUploader id="fu1" placeholder="Choose files..." />
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<FileUploader placeholder="Choose files..." />
			</div>
		);
		cy.screenshot();
	});
});
