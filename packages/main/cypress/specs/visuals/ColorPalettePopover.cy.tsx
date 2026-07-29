import ColorPalettePopover from "../../../src/ColorPalettePopover.js";
import ColorPaletteItem from "../../../src/ColorPaletteItem.js";
import Button from "../../../src/Button.js";

describe("ColorPalettePopover visual", () => {
	it("popover open — basic", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<ColorPalettePopover opener="opener">
					<ColorPaletteItem value="darkblue" />
					<ColorPaletteItem value="pink" />
					<ColorPaletteItem value="#444444" />
					<ColorPaletteItem value="rgb(0,200,0)" />
					<ColorPaletteItem value="darkred" />
					<ColorPaletteItem value="orange" />
					<ColorPaletteItem value="darkgreen" />
					<ColorPaletteItem value="magenta" />
					<ColorPaletteItem value="cornflowerblue" />
					<ColorPaletteItem value="white" />
				</ColorPalettePopover>
			</>
		);
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen();
		cy.screenshot();
	});

	it("popover open — with default color", () => {
		cy.mount(
			<>
				<Button id="opener2">Open</Button>
				<ColorPalettePopover opener="opener2" showDefaultColor defaultColor="darkblue">
					<ColorPaletteItem value="darkblue" />
					<ColorPaletteItem value="pink" />
					<ColorPaletteItem value="#444444" />
					<ColorPaletteItem value="darkred" />
					<ColorPaletteItem value="orange" />
				</ColorPalettePopover>
			</>
		);
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen();
		cy.screenshot();
	});

	it("popover open — with recent colors", () => {
		cy.mount(
			<>
				<Button id="opener3">Open</Button>
				<ColorPalettePopover opener="opener3" showRecentColors>
					<ColorPaletteItem value="darkblue" />
					<ColorPaletteItem value="pink" />
					<ColorPaletteItem value="#444444" />
					<ColorPaletteItem value="darkred" />
					<ColorPaletteItem value="orange" />
				</ColorPalettePopover>
			</>
		);
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen();
		cy.screenshot();
	});

	it("popover open — with show more colors", () => {
		cy.mount(
			<>
				<Button id="opener4">Open</Button>
				<ColorPalettePopover opener="opener4" showMoreColors>
					<ColorPaletteItem value="darkblue" />
					<ColorPaletteItem value="pink" />
					<ColorPaletteItem value="#444444" />
					<ColorPaletteItem value="darkred" />
					<ColorPaletteItem value="orange" />
				</ColorPalettePopover>
			</>
		);
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen();
		cy.screenshot();
	});
});
