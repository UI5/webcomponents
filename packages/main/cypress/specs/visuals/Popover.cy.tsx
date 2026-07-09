import Button from "../../../src/Button.js";
import Popover from "../../../src/Popover.js";
import List from "../../../src/List.js";
import ListItemStandard from "../../../src/ListItemStandard.js";

describe("Popover visual", () => {
	it("basic open state", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" headerText="Popover Header" open={true}>
					<div style={{ padding: "1rem" }}>Popover content</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("open with footer slot", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" headerText="Popover Header" open={true}>
					<div style={{ padding: "1rem" }}>Popover content</div>
					<div slot="footer" style={{ display: "flex", justifyContent: "flex-end", padding: "0.5rem" }}>
						<Button design="Emphasized">OK</Button>
						<Button>Cancel</Button>
					</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("open with list content", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" open={true}>
					<List>
						<ListItemStandard>Item 1</ListItemStandard>
						<ListItemStandard>Item 2</ListItemStandard>
						<ListItemStandard>Item 3</ListItemStandard>
					</List>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("open without arrow (hide-arrow)", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" headerText="No Arrow" hideArrow open={true}>
					<div style={{ padding: "1rem" }}>Popover without arrow</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("placement — Top", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "250px", marginLeft: "200px" }}>Open</Button>
				<Popover opener="opener" headerText="Top Placement" placement="Top" open={true}>
					<div style={{ padding: "1rem" }}>Placed above opener</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("placement — End", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" headerText="End Placement" placement="End" open={true}>
					<div style={{ padding: "1rem" }}>Placed to the end of opener</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});

	it("resizable popover", () => {
		cy.mount(
			<>
				<Button id="opener" style={{ marginTop: "100px", marginLeft: "100px" }}>Open</Button>
				<Popover opener="opener" headerText="Resizable Popover" resizable open={true}>
					<div style={{ padding: "1rem", width: "200px" }}>Resizable content</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").ui5PopoverOpened();
		cy.screenshot();
	});
});
