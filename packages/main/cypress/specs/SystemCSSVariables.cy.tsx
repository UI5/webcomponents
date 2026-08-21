import Button from "../../src/Button.js";

const COZY_VALUES = {
	"--___ui5-test-cozy-only": "rgb(255, 0, 0)", // red
	"--___ui5-test-both": "rgb(255, 0, 0)", // red
	"--___ui5-test-compact-only": "rgb(0, 128, 0)", // green
}

const COMPACT_VALUES = {
	"--___ui5-test-cozy-only": "rgb(255, 0, 0)", // red
	"--___ui5-test-both": "rgb(0, 0, 255)", // blue
	"--___ui5-test-compact-only": "rgb(0, 0, 255)", // blue
}

describe("Shared Resources", () => {
	it("Tests the presense of the shared resources 'meta' element", () => {
		cy.mount(<>
			<div data-test-cozy>
				<Button style={{ backgroundColor: "var(--___ui5-test-cozy-only)" }}>Cozy</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-both)" }}>Cozy</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-compact-only, green)" }}>Cozy</Button>
			</div>
			<div data-test-compact data-ui5-compact-size>
				<Button style={{ backgroundColor: "var(--___ui5-test-cozy-only)" }}>Compact with data-ui5-compact-size attribute</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-both)" }}>Compact with data-ui5-compact-size attribute</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-compact-only, green)" }}>Compact with data-ui5-compact-size attribute</Button>
			</div>
			<div data-test-compact class="ui5-content-density-compact">
				<Button style={{ backgroundColor: "var(--___ui5-test-cozy-only)" }}>Compact with ui5-content-density-compact class</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-both)" }}>Compact with ui5-content-density-compact class</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-compact-only, green)" }}>Compact with ui5-content-density-compact class</Button>
			</div>
			<div data-test-compact class="sapUiSizeCompact">
				<Button style={{ backgroundColor: "var(--___ui5-test-cozy-only)" }}>Compact with sapUiSizeCompact class</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-both)" }}>Compact with sapUiSizeCompact class</Button>
				<Button style={{ backgroundColor: "var(--___ui5-test-compact-only, green)" }}>Compact with sapUiSizeCompact class</Button>
			</div>
		</>)

		cy.get("[data-test-cozy] [ui5-button]").each(($btn, index) => {
			const bgColor = $btn.css("background-color");
			const expectedBgColor = COZY_VALUES[Object.keys(COZY_VALUES)[index]];

			expect(bgColor.trim()).to.equal(expectedBgColor);
		});

		cy.get("[data-ui5-compact-size], .ui5-content-density-compact, .sapUiSizeCompact").each(($section) => {
			cy.wrap($section)
				.find("[ui5-button]")
				.each(($btn, index) => {
					const bgColor = $btn.css("background-color");
					const expectedBgColor = COMPACT_VALUES[Object.keys(COMPACT_VALUES)[index]];

					expect(bgColor.trim()).to.equal(expectedBgColor);
				});
		});
	});
});
