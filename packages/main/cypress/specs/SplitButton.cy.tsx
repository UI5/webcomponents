import SplitButton from "../../src/SplitButton.js";
import Menu from "../../src/Menu.js";
import MenuItem from "../../src/MenuItem.js";

describe("Split Button general interaction", () => {
	it("tests inner buttons design", () => {
		cy.mount(<SplitButton design="Positive">Positive</SplitButton>);

		cy.get("[ui5-split-button]")
			.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-text-button")
			.should("have.attr", "design", "Positive");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.should("have.attr", "design", "Positive");
	});

	it("tests text button 'click' event", () => {
		cy.mount(<SplitButton onClick={cy.stub().as("clicked")} onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
			.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-text-button")
			.as("textButton");

		cy.get("@textButton")
			.realClick();

		cy.get("@textButton")
			.should("be.focused");

		cy.realPress("Space");

		cy.get("@clicked")
			.should("have.been.calledTwice");

		cy.realPress("Enter");

		cy.get("@clicked")
			.should("have.been.calledThrice");

		cy.get("@arrowClicked")
			.should("have.not.been.called");
	});

 	it("tests arrow button 'arrow-click' event (arrow down)", () => {
		cy.mount(<SplitButton onClick={cy.stub().as("clicked")} onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
		.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get<SplitButton>("@splitButton")
			.realPress("ArrowDown");

		cy.get("@arrowClicked")
			.should("have.been.calledTwice");

		cy.get<SplitButton>("@splitButton")
			.realPress("ArrowUp");

		cy.get("@arrowClicked")
			.should("have.been.calledThrice");

		cy.get("@clicked")
			.should("have.not.been.called");
	});

 	it("tests arrow button 'arrow-click' event (alt + arrow down / arrow up)", () => {
		cy.mount(<SplitButton onClick={cy.stub().as("clicked")} onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
			.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get<SplitButton>("@splitButton")
			.realPress(["Alt", "ArrowDown"]);

		cy.get<SplitButton>("@splitButton")
			.realPress(["Alt", "ArrowUp"]);

		cy.get("@arrowClicked")
			.should("have.been.calledThrice");

		cy.get("@clicked")
			.should("have.not.been.called");
 	});

	it("tests arrow button 'arrow-click' event (F4)",  () => {
		cy.mount(<SplitButton onClick={cy.stub().as("clicked")} onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
		.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get<SplitButton>("@splitButton")
			.realPress("F4");

		cy.get("@arrowClicked")
			.should("have.been.calledTwice");

		cy.get("@clicked")
			.should("have.not.been.called");
	});

	it("tests arrow button 'arrow-click' event (Space up)", () => {
		cy.mount(<SplitButton onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
			.shadow()
			.find(".ui5-split-arrow-button")
			.focus()
			.should("be.focused")
			.then(($btn) => {
				const el = $btn[0] as Element;
				const kd = new KeyboardEvent("keydown", {
					key: " ",
					code: "Space",
					keyCode: 32,
					which: 32,
					bubbles: true,
					cancelable: true,
				});
				el.dispatchEvent(kd);
			});

		cy.get("@arrowClicked")
			.should("not.have.been.called");

		cy.get("[ui5-split-button]")
			.shadow()
			.find(".ui5-split-arrow-button")
			.then(($btn) => {
				const el = $btn[0] as Element;
				const ku = new KeyboardEvent("keyup", {
					key: " ",
					code: "Space",
					keyCode: 32,
					which: 32,
					bubbles: true,
					cancelable: true,
				});
				el.dispatchEvent(ku);
			});

		cy.get("@arrowClicked")
			.should("have.been.calledOnce");
	});

 	it("tests arrow button aria attributes", () => {
		cy.mount(
			<>
				<SplitButton >openMenu</SplitButton>
				<Menu>
					<MenuItem text="New File" icon="add-document"></MenuItem>
				</Menu>
			</>
		)

		cy.get("[ui5-split-button]")
			.as("splitButton");

		cy.get<SplitButton>("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.as("arrowButton");

		cy.get("@arrowButton")
			.should("have.attr", "tooltip", "Open Menu");

		cy.get("@arrowButton")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "menu");
 	});
});



