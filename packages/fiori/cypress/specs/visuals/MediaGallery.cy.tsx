import MediaGallery from "../../../src/MediaGallery.js";
import MediaGalleryItem from "../../../src/MediaGalleryItem.js";

// Colored placeholder divs stand in for images — deterministic and no network dependency.
const placeholder = (color: string, label: string) => (
	<div style={{ width: "100%", height: "100%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>{label}</div>
);

const threeItems = (
	<>
		<MediaGalleryItem selected>
			{placeholder("#4a90d9", "Item 1")}
			{placeholder("#4a90d9", "1") /* thumbnail slot omitted — item renders icon fallback */}
		</MediaGalleryItem>
		<MediaGalleryItem>
			{placeholder("#e67e22", "Item 2")}
		</MediaGalleryItem>
		<MediaGalleryItem>
			{placeholder("#27ae60", "Item 3")}
		</MediaGalleryItem>
	</>
);

describe("MediaGallery visual", () => {
	it("basic state — three items, first selected", () => {
		cy.mount(
			<MediaGallery style={{ height: "400px" }}>
				{threeItems}
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("layout — Vertical", () => {
		cy.mount(
			<MediaGallery layout="Vertical" style={{ height: "400px" }}>
				{threeItems}
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("layout — Horizontal", () => {
		cy.mount(
			<MediaGallery layout="Horizontal" style={{ height: "400px" }}>
				{threeItems}
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("menuVerticalAlign — Top (Vertical layout)", () => {
		cy.mount(
			<MediaGallery layout="Vertical" menuVerticalAlign="Top" style={{ height: "400px" }}>
				{threeItems}
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("menuHorizontalAlign — Right (Horizontal layout)", () => {
		cy.mount(
			<MediaGallery layout="Horizontal" menuHorizontalAlign="Right" style={{ height: "400px" }}>
				{threeItems}
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("showAllThumbnails — true", () => {
		cy.mount(
			<MediaGallery showAllThumbnails style={{ height: "400px" }}>
				<MediaGalleryItem selected>{placeholder("#4a90d9", "1")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#e67e22", "2")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#27ae60", "3")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#8e44ad", "4")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#c0392b", "5")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#16a085", "6")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#d4ac0d", "7")}</MediaGalleryItem>
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("overflow button — showAllThumbnails false with many items", () => {
		cy.mount(
			<MediaGallery style={{ height: "400px" }}>
				<MediaGalleryItem selected>{placeholder("#4a90d9", "1")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#e67e22", "2")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#27ae60", "3")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#8e44ad", "4")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#c0392b", "5")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#16a085", "6")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#d4ac0d", "7")}</MediaGalleryItem>
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("item — disabled state", () => {
		cy.mount(
			<MediaGallery style={{ height: "400px" }}>
				<MediaGalleryItem selected>{placeholder("#4a90d9", "Active")}</MediaGalleryItem>
				<MediaGalleryItem disabled>{placeholder("#aaa", "Disabled")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#27ae60", "Active")}</MediaGalleryItem>
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("item layout — Wide", () => {
		cy.mount(
			<MediaGallery showAllThumbnails style={{ height: "400px" }}>
				<MediaGalleryItem selected layout="Wide">{placeholder("#4a90d9", "Wide 1")}</MediaGalleryItem>
				<MediaGalleryItem layout="Wide">{placeholder("#e67e22", "Wide 2")}</MediaGalleryItem>
				<MediaGalleryItem layout="Wide">{placeholder("#27ae60", "Wide 3")}</MediaGalleryItem>
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("second item selected", () => {
		cy.mount(
			<MediaGallery style={{ height: "400px" }}>
				<MediaGalleryItem>{placeholder("#4a90d9", "Item 1")}</MediaGalleryItem>
				<MediaGalleryItem selected>{placeholder("#e67e22", "Item 2")}</MediaGalleryItem>
				<MediaGalleryItem>{placeholder("#27ae60", "Item 3")}</MediaGalleryItem>
			</MediaGallery>,
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<MediaGallery style={{ height: "400px" }}>
					{threeItems}
				</MediaGallery>
			</div>,
		);
		cy.screenshot();
	});
});
