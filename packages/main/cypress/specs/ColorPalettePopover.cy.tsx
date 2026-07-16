import Button from "../../src/Button.js";
import ColorPalettePopover from "../../src/ColorPalettePopover.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";
import ColorPalette from "../../src/ColorPalette.js";
import PopoverPlacement from "../../src/types/PopoverPlacement.js";

type ColorPalettePopoverTemplateOptions = Partial<{
	showDefaultColor: boolean;
	showMoreColors: boolean;
	showRecentColors: boolean;
	defaultColor: string;
	onItemClick: () => void;
	onClose: () => void;
	buttonId: string;
	placement: PopoverPlacement;
}>

function ColorPalettePopoverSample(options: ColorPalettePopoverTemplateOptions) {
	return (
		<>
		<Button id="btnOpen">Open</Button>
		<ColorPalettePopover
			{...options}
			opener="btnOpen"
		>
			<ColorPaletteItem value="violet"></ColorPaletteItem>
			<ColorPaletteItem value="hotpink"></ColorPaletteItem>
			<ColorPaletteItem value="pink"></ColorPaletteItem>
			<ColorPaletteItem value="lightsalmon"></ColorPaletteItem>
			<ColorPaletteItem value="lightcoral"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="lightgreen"></ColorPaletteItem>
			<ColorPaletteItem value="springgreen"></ColorPaletteItem>
			<ColorPaletteItem value="floralwhite"></ColorPaletteItem>
			<ColorPaletteItem value="beige"></ColorPaletteItem>
			<ColorPaletteItem value="gainsboro"></ColorPaletteItem>
			<ColorPaletteItem value="aliceblue"></ColorPaletteItem>
			<ColorPaletteItem value="cornflowerblue"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

function SimplePalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

function MultiRowPalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
			<ColorPaletteItem value="green"></ColorPaletteItem>
			<ColorPaletteItem value="yellow"></ColorPaletteItem>
			<ColorPaletteItem value="purple"></ColorPaletteItem>
			<ColorPaletteItem value="pink"></ColorPaletteItem>
			<ColorPaletteItem value="black"></ColorPaletteItem>
			<ColorPaletteItem value="white"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

function IncompleteRowPalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
			<ColorPaletteItem value="green"></ColorPaletteItem>
			<ColorPaletteItem value="yellow"></ColorPaletteItem>
			<ColorPaletteItem value="purple"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

describe("Color Popover Palette general interaction tests", () => {
    it("should focus first element on initial open (default color)", () => {
        cy.mount(
            <ColorPalettePopoverSample showDefaultColor={true} defaultColor="floralwhite"/>
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton");

        cy.focused()
            .should("have.attr", "aria-label", "Default Color");
    });

    it("should focus first swatch on initial open (when there is only a color palette)", () => {
        cy.mount(
            <ColorPalettePopoverSample/>
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalettePopover")
            .ui5GetColorPaletteItem()
            .as("firstItem");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "violet");
    });

    it("should focus on last selected color swatch when popover is re-opened", () => {
        cy.mount(
            <ColorPalettePopoverSample/>
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalettePopover")
            .ui5GetColorPaletteItem(5)
            .as("sixthItem");

        cy.get("@sixthItem")
            .should("have.attr", "value", "orange")
            .realClick();

        cy.get("@colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "orange");
    });

    it("should focus on Default Color button when popover is re-opened if Default Color ha been selected", () => {
        cy.mount(
            <ColorPalettePopoverSample
                showDefaultColor={true}
                defaultColor="lightsalmon"
            />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton");

        cy.get("@defaultColorButton")
            .realClick();

        cy.get("@colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.focused()
            .should("have.attr", "aria-label", "Default Color");
    });
});

describe("Color Popover Palette events tests", () => {
    it("should fire itemClick with correct color when selecting 'Default Color'", () => {
        cy.mount(
            <ColorPalettePopoverSample
                showDefaultColor={true}
                defaultColor="lightsalmon"
                onItemClick={cy.stub().as("itemClick")}
            />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton");

        cy.get("@defaultColorButton")
            .realClick();

        cy.get("@itemClick")
            .should("be.calledOnce")
            .and("be.calledWithMatch", { detail: { color: "lightsalmon" } });
    });

    it("should fire itemClick when selecting a color from the ColorPalette", () => {
        cy.mount(
            <ColorPalettePopoverSample
                onItemClick={cy.stub().as("itemClick")}
            />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalettePopover")
            .ui5GetColorPaletteItem(7)
            .as("fourthItem");

        cy.get("@fourthItem")
            .realClick();

        cy.get("@itemClick")
            .should("be.calledOnce")
            .and("be.calledWithMatch", { detail: { color: "springgreen" } });

    });

    it("should fire close event when popover is closed after color selection", () => {
        cy.mount(
            <ColorPalettePopoverSample
                onClose={cy.stub().as("popoverClose")}
            />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalettePopover")
            .ui5GetColorPaletteItem()
            .as("firstItem");

        cy.get("@firstItem")
            .realClick();

        cy.get("@colorPalettePopover")
            .should("not.have.attr", "open");

        cy.get("@popoverClose")
            .should("be.calledOnce");
    });

    it("should fire close event when popover is closed by pressing Escape", () => {
        cy.mount(
            <ColorPalettePopoverSample
                onClose={cy.stub().as("popoverClose")}
            />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5ColorPalettePopoverClose();

        cy.get("@popoverClose")
            .should("be.calledOnce");
    });
});

describe("Color Popover Palette arrow keys navigation", () => {
    it("should navigate with Arrow right", () => {
        cy.mount(
            <SimplePalettePopover showMoreColors={true} />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .realPress("End");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");

        cy.focused()
            .realPress("ArrowRight");

        cy.focused()
            .should("have.attr", "aria-label", "More Colors...");

        cy.focused()
            .realPress("ArrowLeft");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");
    });

    it("should navigate to color with Arrow Right and select a color", () => {
        cy.mount(
            <ColorPalettePopoverSample/>
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "violet");

        cy.focused()
            .realPress("ArrowRight");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "hotpink");

        cy.focused()
            .realPress("Enter");

        cy.get("@colorPalette")
            .should("have.attr", "_selected-color", "hotpink");
    });

    it("should navigate with Arrow left", () => {
        cy.mount(
            <SimplePalettePopover showDefaultColor={true} />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.get("[ui5-color-palette-popover]")
            .should("have.attr", "open");

        cy.get("[ui5-color-palette-popover]")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton")
            .should("be.visible");

        cy.get("@defaultColorButton")
            .should("have.focus");

        // Navigate right to first color item
        cy.get("@defaultColorButton")
            .realPress("ArrowRight");

        cy.get("[ui5-color-palette-popover]")
            .ui5GetColorPaletteItem(0)
            .as("firstColorItem")
            .should("be.visible")
            .and("have.attr", "value", "cyan");

        cy.get("@firstColorItem")
            .should("have.attr", "value", "cyan");

        cy.get("@firstColorItem")
            .should("have.focus")
            .shadow()
            .find(".ui5-cp-item")
            .should("have.attr", "tabindex", "0")
            .and("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("ArrowLeft");

        cy.focused()
            .should("have.attr", "aria-label", "Default Color");

        cy.get("@defaultColorButton")
            .should("have.focus");
    });

    it("should cycle through colors horizontally with left/right arrows", () => {
        cy.mount(
            <SimplePalettePopover />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("ArrowRight");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "orange");

        cy.focused()
            .realPress("ArrowRight");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "blue");

        cy.focused()
            .realPress("ArrowRight");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");

        cy.focused()
            .realPress("ArrowRight");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("ArrowLeft");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");
    });

    it("should cycle through colors vertically with up/down arrows", () => {
        cy.mount(
            <MultiRowPalettePopover />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("ArrowDown");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "yellow");

        cy.focused()
            .realPress("ArrowDown");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "orange");

        cy.focused()
            .realPress("ArrowUp");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "yellow");
    });

    it("should navigate to More Colors from colors grid", () => {
        cy.mount(
            <IncompleteRowPalettePopover showMoreColors={true} />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .realPress("End");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "green");

        cy.focused()
            .realPress("ArrowDown");
        cy.focused()
            .should("have.attr", "aria-label", "More Colors...");

        cy.focused()
            .realPress("ArrowLeft");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "purple");
    });

    it("should handle incomplete row navigation correctly", () => {
        cy.mount(
            <IncompleteRowPalettePopover />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .realPress("End");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "green");

        cy.focused()
            .realPress("ArrowUp");
        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");
    });
});

describe("Color Popover Palette Home and End keyboard navigation", () => {
    it("should navigate with Home/End when showDefaultColor is set", () => {
        cy.mount(
            <SimplePalettePopover showDefaultColor={true} />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.get("[ui5-color-palette-popover]")
            .should("have.attr", "open");

        cy.get("[ui5-color-palette-popover]")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton")
            .should("be.visible")
            .and("have.focus");

        cy.get("@defaultColorButton")
            .should("have.focus")
            .shadow()
            .find("button[data-sap-focus-ref]")
            .should("have.focus");

        cy.get("@defaultColorButton")
            .realPress("End");

        cy.get("[ui5-color-palette-popover]")
            .ui5GetColorPaletteItem(3)
            .as("lastColorPaletteItem")
            .should("be.visible")
            .and("have.attr", "value", "red");

        cy.get("@lastColorPaletteItem")
            .should("have.focus")
            .shadow()
            .find(".ui5-cp-item")
            .should("have.attr", "tabindex", "0")
            .and("have.attr", "aria-label")
            .and("include", "red");

        cy.focused()
            .realPress("Home");

        cy.get("[ui5-color-palette-popover]")
            .ui5GetColorPaletteItem(0)
            .as("firstColorPaletteItem")
            .should("be.visible")
            .and("have.attr", "value", "cyan");

        cy.get("@firstColorPaletteItem")
            .should("have.focus")
            .shadow()
            .find(".ui5-cp-item")
            .should("have.attr", "tabindex", "0")
            .and("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("Home");

        cy.focused()
            .should("have.attr", "aria-label", "Default Color");

        cy.get("@defaultColorButton")
            .should("have.focus");
    });

    it("should navigate with Home/End keys when showMoreColors is set", () => {
        cy.mount(
            <SimplePalettePopover showMoreColors={true} />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "cyan");

        cy.focused()
            .realPress("End");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "red");

        cy.focused()
            .realPress("End");

        cy.focused()
            .should("have.attr", "aria-label", "More Colors...");
    });

    it("should navigate with Home/End when showDefaultColor & showMoreColors are set", () => {
        cy.mount(
            <SimplePalettePopover showDefaultColor={true} showMoreColors={true} />
        );

        cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
            .as("colorPalettePopover")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.get<ColorPalette>("@colorPalettePopover")
            .ui5GetColorPaletteInPopover()
            .as("colorPalette");

        cy.get("@colorPalette")
            .ui5GetColorPaletteDefaultButton()
            .as("defaultColorButton");

        cy.get("@defaultColorButton")
            .should("have.focus")
            .realPress("End");

        cy.get("@colorPalette")
            .ui5GetColorPaletteMoreColorsButton()
            .as("moreColorsButton")
            .should("be.visible");

        cy.get("@moreColorsButton")
            .should("exist")
            .and("be.visible")
            .and("have.focus");

        cy.get("@moreColorsButton")
            .realPress("Home");

        cy.get("@defaultColorButton")
            .should("have.focus");
    });

    it("should navigate with End key", () => {
        cy.mount(
            <IncompleteRowPalettePopover />
        );

        cy.get("[ui5-color-palette-popover]")
            .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

        cy.focused()
            .should("have.attr", "aria-label", "Color - 1: cyan");

        cy.focused()
            .realPress("ArrowDown");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "yellow");

        cy.focused()
            .realPress("End");

        cy.focused()
            .should("have.attr", "aria-label")
            .and("include", "purple");
    });
});

describe("ColorPalette Popover placement property tests", () => {
	it("should pass different placement values to internal ResponsivePopover", () => {
		const placements = [PopoverPlacement.Top, PopoverPlacement.Bottom, PopoverPlacement.Start, PopoverPlacement.End];

		placements.forEach((placement, index) => {
			cy.mount(
				<SimplePalettePopover
					placement={placement}
					buttonId={`btn-${index}`}
				/>
			);

			cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
				.should("have.attr", "placement", placement)
				.ui5ColorPalettePopoverOpen({ opener: `btn-${index}` });

			// Verify internal ResponsivePopover has the same placement
			cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "placement", placement);
		});
	});
});