import ColorPalette from "../../../src/ColorPalette.js";
import ColorPaletteItem from "../../../src/ColorPaletteItem.js";

describe("ColorPalette visual", () => {
	it("basic state", () => {
		cy.mount(
			<ColorPalette>
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
				<ColorPaletteItem value="black" />
			</ColorPalette>
		);
		cy.screenshot();
	});

	it("with selected color", () => {
		cy.mount(
			<ColorPalette>
				<ColorPaletteItem value="darkblue" />
				<ColorPaletteItem value="pink" selected />
				<ColorPaletteItem value="#444444" />
				<ColorPaletteItem value="rgb(0,200,0)" />
				<ColorPaletteItem value="darkred" />
				<ColorPaletteItem value="orange" />
				<ColorPaletteItem value="darkgreen" />
			</ColorPalette>
		);
		cy.screenshot();
	});

	it("with default color", () => {
		cy.mount(
			<ColorPalette showDefaultColor defaultColor="darkblue">
				<ColorPaletteItem value="darkblue" />
				<ColorPaletteItem value="pink" />
				<ColorPaletteItem value="#444444" />
				<ColorPaletteItem value="rgb(0,200,0)" />
				<ColorPaletteItem value="darkred" />
			</ColorPalette>
		);
		cy.screenshot();
	});

	it("with recent colors", () => {
		cy.mount(
			<ColorPalette showRecentColors>
				<ColorPaletteItem value="darkblue" />
				<ColorPaletteItem value="pink" />
				<ColorPaletteItem value="#444444" />
				<ColorPaletteItem value="rgb(0,200,0)" />
				<ColorPaletteItem value="darkred" />
			</ColorPalette>
		);
		// select a color to populate recent colors
		cy.get("[ui5-color-palette-item]").first().realClick();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ColorPalette>
					<ColorPaletteItem value="darkblue" />
					<ColorPaletteItem value="pink" />
					<ColorPaletteItem value="#444444" />
					<ColorPaletteItem value="rgb(0,200,0)" />
					<ColorPaletteItem value="darkred" />
					<ColorPaletteItem value="orange" />
					<ColorPaletteItem value="darkgreen" />
				</ColorPalette>
			</div>
		);
		cy.screenshot();
	});
});
