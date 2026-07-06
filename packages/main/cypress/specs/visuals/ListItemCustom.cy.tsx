import List from "../../../src/List.js";
import ListItemCustom from "../../../src/ListItemCustom.js";

describe("ListItemCustom visual", () => {
	it("basic state", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Custom item content</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Another custom item</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Third custom item</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("selected state", () => {
		cy.mount(
			<List selectionMode="Single">
				<ListItemCustom selected>
					<div style={{ padding: "8px" }}>Selected custom item</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Unselected custom item</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("multiple selection mode", () => {
		cy.mount(
			<List selectionMode="Multiple">
				<ListItemCustom selected>
					<div style={{ padding: "8px" }}>First selected item</div>
				</ListItemCustom>
				<ListItemCustom selected>
					<div style={{ padding: "8px" }}>Second selected item</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Unselected item</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("delete mode", () => {
		cy.mount(
			<List selectionMode="Delete">
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Deletable custom item</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Another deletable item</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("navigated state", () => {
		cy.mount(
			<List>
				<ListItemCustom navigated>
					<div style={{ padding: "8px" }}>Navigated custom item</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ padding: "8px" }}>Regular custom item</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("with rich content", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px" }}>
						<div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0070f2", flexShrink: "0" }} />
						<div>
							<div style={{ fontWeight: "bold" }}>John Doe</div>
							<div style={{ color: "#666", fontSize: "12px" }}>john.doe@example.com</div>
						</div>
					</div>
				</ListItemCustom>
				<ListItemCustom>
					<div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px" }}>
						<div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e9730c", flexShrink: "0" }} />
						<div>
							<div style={{ fontWeight: "bold" }}>Jane Smith</div>
							<div style={{ color: "#666", fontSize: "12px" }}>jane.smith@example.com</div>
						</div>
					</div>
				</ListItemCustom>
			</List>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<List selectionMode="Multiple">
					<ListItemCustom selected>
						<div style={{ padding: "4px 8px" }}>Compact selected item</div>
					</ListItemCustom>
					<ListItemCustom>
						<div style={{ padding: "4px 8px" }}>Compact regular item</div>
					</ListItemCustom>
				</List>
			</div>
		);
		cy.screenshot();
	});
});
