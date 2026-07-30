import TextArea from "../../../src/TextArea.js";

describe("TextArea visual", () => {
	it("basic state", () => {
		cy.mount(<TextArea />);
		cy.screenshot();
	});

	it("with placeholder", () => {
		cy.mount(<TextArea placeholder="Enter text here..." />);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(<TextArea value="This is some text content in the text area." />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<TextArea value="Compact mode text area" />
			</div>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<TextArea disabled value="Disabled text area" />);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(<TextArea readonly value="Readonly text area" />);
		cy.screenshot();
	});

	it("focused", () => {
		cy.mount(<TextArea placeholder="Focus me" />);
		cy.get("[ui5-textarea]").shadow().find("textarea").realClick();
		cy.screenshot();
	});

	it("growing with multiline content", () => {
		cy.mount(<TextArea growing value={"Line 1\nLine 2\nLine 3\nLine 4\nLine 5"} />);
		cy.screenshot();
	});

	it("showExceededText — within limit", () => {
		cy.mount(<TextArea maxlength={50} showExceededText value="Short text" />);
		cy.screenshot();
	});

	it("showExceededText — over limit", () => {
		cy.mount(<TextArea maxlength={10} showExceededText value="This text exceeds the maximum length allowed" />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<TextArea valueState="Negative">
				<div slot="valueStateMessage">Error message</div>
			</TextArea>
		);
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(
			<TextArea valueState="Negative">
				<div slot="valueStateMessage">Error message</div>
			</TextArea>
		);
		cy.get("[ui5-textarea]").shadow().find("textarea").realClick();
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<TextArea valueState="Critical">
				<div slot="valueStateMessage">Warning message</div>
			</TextArea>
		);
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(
			<TextArea valueState="Critical">
				<div slot="valueStateMessage">Warning message</div>
			</TextArea>
		);
		cy.get("[ui5-textarea]").shadow().find("textarea").realClick();
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<TextArea valueState="Positive">
				<div slot="valueStateMessage">Success message</div>
			</TextArea>
		);
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(
			<TextArea valueState="Positive">
				<div slot="valueStateMessage">Success message</div>
			</TextArea>
		);
		cy.get("[ui5-textarea]").shadow().find("textarea").realClick();
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<TextArea valueState="Information">
				<div slot="valueStateMessage">Info message</div>
			</TextArea>
		);
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(
			<TextArea valueState="Information">
				<div slot="valueStateMessage">Info message</div>
			</TextArea>
		);
		cy.get("[ui5-textarea]").shadow().find("textarea").realClick();
		cy.screenshot();
	});
});
