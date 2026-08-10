import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import FlexibleColumnLayout from "../../../src/FlexibleColumnLayout.js";

// Disable animations so column widths are stable at screenshot time.
beforeEach(() => {
	cy.wrap({ setAnimationMode }).invoke("setAnimationMode", AnimationMode.None);
});

const startContent = <div slot="startColumn" style={{ padding: "1rem", background: "#e8f4fd" }}>Start</div>;
const midContent = <div slot="midColumn" style={{ padding: "1rem", background: "#fef9e7" }}>Mid</div>;
const endContent = <div slot="endColumn" style={{ padding: "1rem", background: "#eafaf1" }}>End</div>;

describe("FlexibleColumnLayout visual", () => {
	it("layout — OneColumn", () => {
		cy.mount(
			<FlexibleColumnLayout layout="OneColumn" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — TwoColumnsStartExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsStartExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — TwoColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsMidExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsEndExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsStartExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsStartExpandedEndHidden" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpandedEndHidden" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsStartHiddenMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsStartHiddenMidExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — ThreeColumnsStartHiddenEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsStartHiddenEndExpanded" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — MidColumnFullScreen", () => {
		cy.mount(
			<FlexibleColumnLayout layout="MidColumnFullScreen" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("layout — EndColumnFullScreen", () => {
		cy.mount(
			<FlexibleColumnLayout layout="EndColumnFullScreen" style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("disableResizing — separators hidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded" disableResizing style={{ height: "200px" }}>
				{startContent}
				{midContent}
				{endContent}
			</FlexibleColumnLayout>,
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<FlexibleColumnLayout layout="TwoColumnsMidExpanded" style={{ height: "200px" }}>
					{startContent}
					{midContent}
					{endContent}
				</FlexibleColumnLayout>
			</div>,
		);
		cy.screenshot();
	});
});
