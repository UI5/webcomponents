import Button from "../../../src/Button.js";
import Menu from "../../../src/Menu.js";
import MenuItem from "../../../src/MenuItem.js";
import MenuItemGroup from "../../../src/MenuItemGroup.js";
import MenuSeparator from "../../../src/MenuSeparator.js";

describe("Menu visual", () => {
	it("basic state — open with simple items", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" />
					<MenuItem text="New Folder" />
					<MenuItem text="Open" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("items with icons", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" icon="add-document" />
					<MenuItem text="Open Folder" icon="open-folder" />
					<MenuItem text="Save" icon="save" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("items with additional text", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Save" additionalText="Ctrl+S" />
					<MenuItem text="Copy" additionalText="Ctrl+C" />
					<MenuItem text="Paste" additionalText="Ctrl+V" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("disabled items", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" />
					<MenuItem text="Save" disabled />
					<MenuItem text="Delete" disabled />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("item with endContent", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Item with Action">
						<Button slot="endContent" icon="favorite" design="Transparent" />
					</MenuItem>
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("item with submenu indicator — submenu open via keyboard", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New">
						<MenuItem text="New File" />
						<MenuItem text="New Folder" />
					</MenuItem>
					<MenuItem text="Open" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.get("[ui5-menu] > [ui5-menu-item]").first().should("be.focused").realPress("ArrowRight");
		cy.get("[ui5-menu-item][text='New']").shadow().find("[ui5-responsive-popover]").should("have.attr", "open");
		cy.screenshot();
	});

	it("checked item (outside group)", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Unchecked Item" />
					<MenuItem text="Checked Item" checked />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("MenuSeparator — single separator", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" />
					<MenuItem text="New Folder" />
					<MenuSeparator />
					<MenuItem text="Exit" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("MenuSeparator — multiple separators", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" />
					<MenuSeparator />
					<MenuItem text="Open" />
					<MenuItem text="Save" />
					<MenuSeparator />
					<MenuItem text="Print" />
					<MenuSeparator />
					<MenuItem text="Exit" />
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("MenuItemGroup — checkMode Single", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="Single">
						<MenuItem text="Option A" />
						<MenuItem text="Option B" checked />
						<MenuItem text="Option C" />
					</MenuItemGroup>
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("MenuItemGroup — checkMode Multiple", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="Multiple">
						<MenuItem text="Feature A" checked />
						<MenuItem text="Feature B" />
						<MenuItem text="Feature C" checked />
					</MenuItemGroup>
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});

	it("mixed groups and separators", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="New File" />
					<MenuSeparator />
					<MenuItemGroup checkMode="Single">
						<MenuItem text="View Mode A" checked />
						<MenuItem text="View Mode B" />
					</MenuItemGroup>
					<MenuSeparator />
					<MenuItemGroup checkMode="Multiple">
						<MenuItem text="Show Toolbar" checked />
						<MenuItem text="Show Sidebar" />
					</MenuItemGroup>
				</Menu>
			</>
		);
		cy.get("[ui5-menu]").ui5MenuOpen();
		cy.get("[ui5-menu]").ui5MenuOpened();
		cy.screenshot();
	});
});
