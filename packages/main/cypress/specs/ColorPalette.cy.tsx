import UI5Element from "@ui5/webcomponents-base";
import ColorPalette from "../../src/ColorPalette.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";

function ColorPaletteSample() {
	return (
		<ColorPalette id="cp1">
			<ColorPaletteItem value="darkblue"></ColorPaletteItem>
			<ColorPaletteItem value="pink"></ColorPaletteItem>
			<ColorPaletteItem value="#444444"></ColorPaletteItem>
			<ColorPaletteItem value="rgb(0,200,0)"></ColorPaletteItem>
			<ColorPaletteItem value="green"></ColorPaletteItem>
			<ColorPaletteItem value="darkred"></ColorPaletteItem>
			<ColorPaletteItem value="yellow"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
			<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
		</ColorPalette>
	);
}

describe("Color Palette tests", () => {
	it("internal color picker should have selected color set on open", () => {
		cy.mount(
			<ColorPalette showMoreColors={true} showRecentColors={true}>
				<ColorPaletteItem id="named" value="red"></ColorPaletteItem>
				<ColorPaletteItem id="rgba" value="rgba(0, 255, 0, 0.5)"></ColorPaletteItem>
				<ColorPaletteItem id="rgb" value="rgb(0,0,255)"></ColorPaletteItem>
				<ColorPaletteItem id="hex" value="#C0FFEE"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#named", {
				r: "255",
				g: "0",
				b: "0",
				a: "1",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#rgba", {
				r: "0",
				g: "255",
				b: "0",
				a: "0.5",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#rgb", {
				r: "0",
				g: "0",
				b: "255",
				a: "1",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#hex", {
				r: "192",
				g: "255",
				b: "238",
				a: "1",
			});
	});

	it("Test if selecting element works", () => {
		cy.mount(<ColorPaletteSample/>);

		cy.get<ColorPalette>("#cp1")
			.find("[ui5-color-palette-item]")
			.first()
			.realClick();

		cy.get<ColorPalette>("#cp1")
			.find("ui5-color-palette-item[selected]")
			.should("have.value", "darkblue");
	});

	it("Test if keyboard navigation on elements works", () => {
		cy.mount(<ColorPaletteSample/>);

		cy.get<ColorPalette>("#cp1")
			.find("[ui5-color-palette-item]")
			.first()
			.realClick();

		cy.get<ColorPalette>("#cp1")
			.find("ui5-color-palette-item[selected]")
			.should("have.value", "darkblue")
			.realPress("ArrowRight")
			.realPress("Space");

		cy.get<ColorPalette>("#cp1")
			.find("ui5-color-palette-item[selected]")
			.should("have.value", "pink");
	});

	it("Test if keyboard navigation on elements works with Arrow keys", () => {
		cy.mount(<ColorPaletteSample/>);

		cy.ui5ColorPaletteNavigateAndCheckSelectedColor("#cp1", 0, "ArrowRight", "pink");
		cy.ui5ColorPaletteNavigateAndCheckSelectedColor("#cp1", 0, "ArrowLeft", "orange");
		cy.ui5ColorPaletteNavigateAndCheckSelectedColor("#cp1", 0, "ArrowUp", "orange");
		cy.ui5ColorPaletteNavigateAndCheckSelectedColor("#cp1", 9, "ArrowDown", "darkblue");
	});

	it("Tests show-recent-colors functionality", () => {
		cy.mount(
			<ColorPalette id="cp4" showMoreColors={true} showRecentColors={true}>
				<ColorPaletteItem value="pink"></ColorPaletteItem>
				<ColorPaletteItem value="darkblue"></ColorPaletteItem>
				<ColorPaletteItem value="#444444"></ColorPaletteItem>
				<ColorPaletteItem value="rgb(0,200,0)"></ColorPaletteItem>
				<ColorPaletteItem value="green"></ColorPaletteItem>
				<ColorPaletteItem value="darkred"></ColorPaletteItem>
				<ColorPaletteItem value="yellow"></ColorPaletteItem>
				<ColorPaletteItem value="blue"></ColorPaletteItem>
				<ColorPaletteItem value="cyan"></ColorPaletteItem>
				<ColorPaletteItem value="orange"></ColorPaletteItem>
				<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
				<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
			</ColorPalette>
		);

		// click on first 5 color palette items
		cy.get("#cp4")
			.find("[ui5-color-palette-item]")
			.then(items => {
				for (let i = 0; i < 5; i++) {
					cy.wrap(items[i]).realClick();
				}
			});

		// check recent colors
		cy.get("#cp4")
			.shadow()
			.find(".ui5-cp-recent-colors-wrapper [ui5-color-palette-item]")
			.should("have.length", 5)
			.then(items => {
				cy.wrap(items[0]).should("have.value", "green");
				cy.wrap(items[1]).should("have.value", "rgb(0,200,0)");
				cy.wrap(items[2]).should("have.value", "#444444");
				cy.wrap(items[3]).should("have.value", "darkblue");
				cy.wrap(items[4]).should("have.value", "pink");
			});
	});

	it("Tests if only one item is selected at a time in the color palette", () => {
		cy.mount(
			<ColorPalette id="cp1SelectedTest">
				<ColorPaletteItem value="darkblue" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="pink" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="#444444" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="rgb(0,200,0)" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="green"></ColorPaletteItem>
				<ColorPaletteItem value="darkred"></ColorPaletteItem>
				<ColorPaletteItem value="yellow"></ColorPaletteItem>
				<ColorPaletteItem value="blue"></ColorPaletteItem>
				<ColorPaletteItem value="cyan"></ColorPaletteItem>
				<ColorPaletteItem value="orange"></ColorPaletteItem>
				<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
				<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get("#cp1SelectedTest")
			.find("[ui5-color-palette-item]")
			.eq(0)
			.realClick();

		cy.get("#cp1SelectedTest")
			.find("[ui5-color-palette-item]")
			.eq(1)
			.realClick();

		cy.get("#cp1SelectedTest")
			.find("[ui5-color-palette-item]")
			.eq(0)
			.should("not.have.attr", "selected");

		cy.get("#cp1SelectedTest")
			.find("[ui5-color-palette-item]")
			.eq(1)
			.should("have.attr", "selected");
	});

	it("Tests if clicking on selected item, does not deselect it", () => {
		cy.mount(
			<ColorPalette id="cp1SelectedTest">
				<ColorPaletteItem value="darkblue" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="pink" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="#444444" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="rgb(0,200,0)" selected={true}></ColorPaletteItem>
				<ColorPaletteItem value="green"></ColorPaletteItem>
				<ColorPaletteItem value="darkred"></ColorPaletteItem>
				<ColorPaletteItem value="yellow"></ColorPaletteItem>
				<ColorPaletteItem value="blue"></ColorPaletteItem>
				<ColorPaletteItem value="cyan"></ColorPaletteItem>
				<ColorPaletteItem value="orange"></ColorPaletteItem>
				<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
				<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get("#cp1SelectedTest")
			.find("[ui5-color-palette-item]")
			.first()
			.realClick()
			.realClick()
			.should("have.attr", "selected");
	});
});

describe("Color Palette - getFocusDomRef", () => {
	it("should return undefined when the ColorPalette is empty", () => {
		cy.mount(<ColorPalette></ColorPalette>);

		cy.get<ColorPalette>("[ui5-color-palette]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<ColorPalette>
				<ColorPaletteItem id="darkBlue" value="darkblue"></ColorPaletteItem>
				<ColorPaletteItem value="pink"></ColorPaletteItem>
				<ColorPaletteItem value="#444444"></ColorPaletteItem>
				<ColorPaletteItem value="rgb(0,200,0)"></ColorPaletteItem>
				<ColorPaletteItem value="green"></ColorPaletteItem>
				<ColorPaletteItem value="darkred"></ColorPaletteItem>
				<ColorPaletteItem value="yellow"></ColorPaletteItem>
				<ColorPaletteItem value="blue"></ColorPaletteItem>
				<ColorPaletteItem value="cyan"></ColorPaletteItem>
				<ColorPaletteItem value="orange"></ColorPaletteItem>
				<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
				<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get<UI5Element>("[ui5-color-palette], #darkBlue")
			.then(($el) => {
				const colorPalette = $el[0],
					firstColor = $el[1];
    				expect(colorPalette.getFocusDomRef()).to.equal(firstColor.getFocusDomRef());
			});
	});

	it("should return last focused item in the ColorPalette", () => {
		cy.mount(
			<ColorPalette>
				<ColorPaletteItem value="darkblue"></ColorPaletteItem>
				<ColorPaletteItem value="pink"></ColorPaletteItem>
				<ColorPaletteItem value="#444444"></ColorPaletteItem>
				<ColorPaletteItem value="rgb(0,200,0)"></ColorPaletteItem>
				<ColorPaletteItem id="green" value="green"></ColorPaletteItem>
				<ColorPaletteItem value="darkred"></ColorPaletteItem>
				<ColorPaletteItem value="yellow"></ColorPaletteItem>
				<ColorPaletteItem value="blue"></ColorPaletteItem>
				<ColorPaletteItem value="cyan"></ColorPaletteItem>
				<ColorPaletteItem value="orange"></ColorPaletteItem>
				<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
				<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get("[ui5-color-palette]")
			.find("#green")
			.realClick()
			.realClick()
			.should("be.focused")

		cy.get<UI5Element>("[ui5-color-palette], #green")
			.then(($el) => {
				const colorPalette = $el[0],
					lastFocusItem = $el[1];
    				expect(colorPalette.getFocusDomRef()).to.equal(lastFocusItem.getFocusDomRef());
			});
	});
});
