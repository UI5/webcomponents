import UploadCollection from "../../../src/UploadCollection.js";
import UploadCollectionItem from "../../../src/UploadCollectionItem.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import documentText from "@ui5/webcomponents-icons/dist/document-text.js";
import imageIcon from "@ui5/webcomponents-icons/dist/picture.js";

describe("UploadCollection visual", () => {
	it("empty — no data state", () => {
		cy.mount(<UploadCollection />);
		cy.screenshot();
	});

	it("empty — custom no data text and description", () => {
		cy.mount(
			<UploadCollection
				noDataText="No files uploaded yet"
				noDataDescription="Drag and drop files here to upload them."
			/>,
		);
		cy.screenshot();
	});

	it("uploadState — Complete", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="report.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					Upload finished successfully.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("uploadState — Ready (default)", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="document.docx" uploadState="Ready">
					<Icon name={documentText} slot="thumbnail" />
					Waiting to start.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("uploadState — Uploading with progress", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="photo.jpg" uploadState="Uploading" progress={37}>
					<Icon name={imageIcon} slot="thumbnail" />
					Uploading…
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("uploadState — Error with progress", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="archive.zip" uploadState="Error" progress={59}>
					<Icon name={documentText} slot="thumbnail" />
					Upload failed.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("all upload states together", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="complete.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="uploading.jpg" uploadState="Uploading" progress={55}>
					<Icon name={imageIcon} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="error.zip" uploadState="Error" progress={20}>
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="ready.docx" uploadState="Ready">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("fileNameClickable — filename rendered as link", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="clickable.pdf" fileNameClickable uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					File name is a clickable link.
				</UploadCollectionItem>
				<UploadCollectionItem fileName="plain.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					File name is plain text.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("item — type Detail shows edit button", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="editable.pdf" type="Detail" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("item — disabled", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="active.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="disabled.pdf" uploadState="Complete" disabled>
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("item — hideDeleteButton", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="no-delete.pdf" hideDeleteButton uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					Delete button hidden.
				</UploadCollectionItem>
				<UploadCollectionItem fileName="with-delete.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					Delete button visible.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("item — disableDeleteButton", () => {
		cy.mount(
			<UploadCollection>
				<UploadCollectionItem fileName="cannot-delete.pdf" disableDeleteButton uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
					Delete button disabled.
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("selectionMode — Multiple", () => {
		cy.mount(
			<UploadCollection selectionMode="Multiple">
				<UploadCollectionItem fileName="file-a.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="file-b.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="file-c.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("selectionMode — SingleStart", () => {
		cy.mount(
			<UploadCollection selectionMode="SingleStart">
				<UploadCollectionItem fileName="file-a.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="file-b.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("header slot", () => {
		cy.mount(
			<UploadCollection accessibleName="Uploaded (2)">
				<div slot="header">
					<Title level="H3">Uploaded Files (2)</Title>
				</div>
				<UploadCollectionItem fileName="report.pdf" uploadState="Complete">
					<Icon name={documentText} slot="thumbnail" />
				</UploadCollectionItem>
				<UploadCollectionItem fileName="photo.jpg" uploadState="Complete">
					<Icon name={imageIcon} slot="thumbnail" />
				</UploadCollectionItem>
			</UploadCollection>,
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<UploadCollection>
					<UploadCollectionItem fileName="report.pdf" uploadState="Complete">
						<Icon name={documentText} slot="thumbnail" />
					</UploadCollectionItem>
					<UploadCollectionItem fileName="photo.jpg" uploadState="Uploading" progress={60}>
						<Icon name={imageIcon} slot="thumbnail" />
					</UploadCollectionItem>
					<UploadCollectionItem fileName="error.zip" uploadState="Error" progress={30}>
						<Icon name={documentText} slot="thumbnail" />
					</UploadCollectionItem>
				</UploadCollection>
			</div>,
		);
		cy.screenshot();
	});
});
