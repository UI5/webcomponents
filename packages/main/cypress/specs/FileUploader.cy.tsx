import FileUploader from "../../src/FileUploader.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";
import { FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER, FILEUPLOADER_DEFAULT_PLACEHOLDER } from "../../src/generated/i18n/i18n-defaults.js";

describe("API", () => {
	it("files property", () => {
		cy.mount(
			<FileUploader></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.should("exist")
			.then($el => {
				const uploader = $el[0] as FileUploader;
				expect(uploader.files).to.exist;
				expect(uploader.files.length).to.equal(0);
			});
	});

	it("hide-input property", () => {
		cy.mount(
			<FileUploader hide-input>
				<Button icon="upload"></Button>
			</FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader");

		cy.get("@uploader")
			.shadow()
			.find("input[type='file']")
			.should("exist");

		cy.get("@uploader")
			.shadow()
			.find(".ui5-file-uploader-display-elements")
			.should("not.exist");
	});

	it("default slot", () => {
		cy.mount(
			<FileUploader hide-input>
				<Button icon="upload"></Button>
			</FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.find("ui5-button")
			.should("exist");
	});

	it("disabled property", () => {
		cy.mount(
			<FileUploader disabled></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("be.disabled");
	});

	it("required property", () => {
		cy.mount(
			<FileUploader required></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-required", "true");
	});

	it("accept property", () => {
		cy.mount(
			<FileUploader accept=".txt,.docx"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "accept", ".txt,.docx");
	});

	it("placeholder property", () => {
		cy.mount(
			<FileUploader placeholder="Custom placeholder"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input.ui5-file-uploader-display-input")
			.should("have.attr", "placeholder", "Custom placeholder");
	});

	it("default single placeholder", () => {
		cy.mount(
			<FileUploader></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input.ui5-file-uploader-display-input")
			.should("have.attr", "placeholder", FileUploader.i18nBundle.getText(FILEUPLOADER_DEFAULT_PLACEHOLDER));
	});

	it("default multiple placeholder", () => {
		cy.mount(
			<FileUploader multiple></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input.ui5-file-uploader-display-input")
			.should("have.attr", "placeholder", FileUploader.i18nBundle.getText(FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER));
	});
});

describe("Interaction", () => {
	it("focus into default file uploader", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader">
					<Button icon="upload"></Button>
				</FileUploader>
			</>
		);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.realPress("Tab");

		cy.get("@uploader")
			.find("[ui5-button]")
			.should("be.focused");
	});

	it("focus into the button-only file uploader", () => {
		cy.mount(
			<>
				<Label for="button-only-uploader">Application context</Label>
				<FileUploader id="button-only-uploader" hide-input>
					<Button icon="upload"></Button>
				</FileUploader>
			</>
		);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.should("be.focused");

		cy.get("@uploader")
			.find("[ui5-button]")
			.should("have.attr", "tabindex", "-1");
	});

	it("focus into positive value state file uploader", () => {
		cy.mount(
			<>
				<Label for="positive-uploader">Application context</Label>
				<FileUploader id="positive-uploader" value-state="Positive"></FileUploader>
			</>
		);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.shadow()
			.find("[ui5-popover]")
			.as("popover")
			.should("exist")
			.and("have.attr", "open");

		cy.get("@popover")
			.find(".ui5-valuestatemessage-root")
			.should("have.class", "ui5-valuestatemessage--success");
	});

	it("LTR focus in and out of the tokenizer", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader"></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "test.txt",
					mimeType: "text/plain"
				},
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.should("exist");

		cy.get("[ui5-label]")
			.realClick();

		cy.get("@uploader")
			.realPress("ArrowRight");


		cy.get("@tokenizer")
			.find("[ui5-token]")
			.first()
			.should("exist")
			.and("be.focused");

		cy.get("@uploader")
			.realPress("ArrowLeft");

		cy.get("@uploader")
			.should("be.focused");
	});

	it("RTL focus in and out of the tokenizer", () => {
		cy.mount(
			<div dir="rtl">
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader"></FileUploader>
			</div>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "test.txt",
					mimeType: "text/plain"
				},
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.should("exist");

		cy.get("[ui5-label]")
			.realClick();

		cy.get("@uploader")
			.realPress("ArrowLeft");


		cy.get("@tokenizer")
			.find("[ui5-token]")
			.first()
			.should("exist")
			.and("be.focused");

		cy.get("@uploader")
			.realPress("ArrowRight");

		cy.get("@uploader")
			.should("be.focused");
	});

	it("clear all tokens via mouse", () => {
		cy.mount(
			<FileUploader id="uploader" multiple></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "one.txt",
					mimeType: "text/plain"
				},
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "two.txt",
					mimeType: "text/plain"
				},
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("@uploader")
			.shadow()
			.find(".ui5-file-uploader-clear-icon")
			.realClick();

		cy.get("@tokenizer")
			.should("not.exist");
	});

	it("clear all tokens via keyboard", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader" multiple></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "one.txt",
					mimeType: "text/plain"
				},
				{
					contents: Cypress.Buffer.from("file content"),
					fileName: "two.txt",
					mimeType: "text/plain"
				},
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("@uploader")
			.realPress("Delete");

		cy.get("@tokenizer")
			.should("not.exist");
	});

	it("file size exceeds limit", () => {
		cy.mount(
			<FileUploader id="uploader" max-file-size="1"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: new Uint8Array(2 * 1024 * 1024), // 2 MB buffer
					fileName: "one.txt",
					mimeType: "text/plain"
				}
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.should("not.exist");
	});

	it("supports drag and drop", () => {
		cy.mount(<FileUploader id="uploader" multiple></FileUploader>);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.then($input => {
				const dataTransfer = new DataTransfer();
				const file = new File(["file content"], "dragged.txt", { type: "text/plain" });
				dataTransfer.items.add(file);

				const dropEvent = new Event("drop", { bubbles: true });
				Object.defineProperty(dropEvent, "dataTransfer", {
					value: dataTransfer,
				});

				$input[0].dispatchEvent(dropEvent);
			});

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.should("exist")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("tokenizer collapses when n-More popover loses focus", () => {
		cy.mount(
			<FileUploader id="uploader" style="width: 200px;"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: Cypress.Buffer.from("file1 content"),
					fileName: "file1.txt",
					mimeType: "text/plain"
				},
				{
					contents: Cypress.Buffer.from("file2 content"),
					fileName: "file11.txt",
					mimeType: "text/plain"
				},
				{
					contents: Cypress.Buffer.from("file3 content"),
					fileName: "file111.txt",
					mimeType: "text/plain"
				}
			], { force: true });

		cy.get("@uploader")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.should("exist");

		cy.get("@uploader").realClick();
		cy.get("@uploader").realPress("ArrowRight");

		cy.focused()
			.should("have.attr", "aria-description", "Token");

		cy.realPress(["Control", "i"]);

		cy.get("@tokenizer")
			.shadow()
			.find("ui5-responsive-popover")
			.should("exist");

		cy.get("@tokenizer")
			.should("have.attr", "expanded");

		cy.get("body")
			.realClick();

		cy.get("@tokenizer")
			.should("not.have.attr", "expanded");
	});
});

describe("Accessibility", () => {
	it("A11y attributes", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader" value-state="Negative"></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-roledescription", "File Uploader")
			.should("have.attr", "aria-haspopup", "dialog")
			.should("have.attr", "aria-label", "Application context")
			.should("have.attr", "aria-invalid", "true")
			.and("have.attr", "data-sap-focus-ref");
	});

	it("accessibleName", () => {
		cy.mount(
			<FileUploader accessible-name="Application context"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-label", "Application context");
	});

	it("accessibleNameRef", () => {
		cy.mount(
			<>
				<Label id="uploaderLabel">Application context</Label>
				<FileUploader id="uploader" accessible-name-ref="uploaderLabel"></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-label", "Application context");
	});

	it("accessibleDescription", () => {
		const DESCRIPTION = "File uploader description";
		cy.mount(<FileUploader accessibleDescription={DESCRIPTION}></FileUploader>);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-description", DESCRIPTION)
	});

	it("accessibleDescriptionRef", () => {
		const DESCRIPTION = "External file uploader description";
		cy.mount(
			<>
				<p id="accessibleDescription">{DESCRIPTION}</p>
				<FileUploader accessibleDescriptionRef="accessibleDescription"></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-description", DESCRIPTION)
	});
});

describe("Validation inside form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(
			<form>
				<FileUploader id="uploader" required></FileUploader>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#uploader")
			.as("uploader")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#uploader:invalid")
			.should("exist");

		cy.get("@uploader")
			.shadow()
			.find("input[type='file']")
			.selectFile([
				{
					contents: new Uint8Array(1 * 1024 * 1024), // 2 MB buffer
					fileName: "text.txt",
					mimeType: "text/plain"
				}
			], { force: true });

		cy.get("@uploader")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#uploader:invalid")
			.should("not.exist");
	});
});