import Input from "../../src/Input.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import SuggestionItemCustom from "../../src/SuggestionItemCustom.js";
import SuggestionItemGroup from "../../src/SuggestionItemGroup.js";
import Dialog from "../../src/Dialog.js";
import Link from "../../src/Link.js";

import add from "@ui5/webcomponents-icons/dist/add.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("Input Tests", () => {
	it("test input event prevention", () => {
		const inputHandler = e => {
			e.preventDefault();
			(e.target as Input).value = "test";
		}

		cy.mount(<Input onInput={inputHandler} />);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get<Input>("@input")
			.should("be.focused");

		cy.realPress("a");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "test");
	});

	it("tests custom suggestion items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItemCustom text="Item 1">Item 1</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 2">Item 2</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 3">Item 3</SuggestionItemCustom>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("i");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-custom]")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.and("have.attr", "role", "option");
	});

	it("tests regular suggestion items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItem text="Item 1"></SuggestionItem>
				<SuggestionItem text="Item 2"></SuggestionItem>
				<SuggestionItem text="Item 3"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("i");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("ui5-suggestion-item")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.and("have.attr", "role", "option");
	});

	it("tests suggestion group items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItemGroup headerText="Group 1">
					<SuggestionItem text="Item 1"></SuggestionItem>
					<SuggestionItem text="Item 2"></SuggestionItem>
					<SuggestionItem text="Item 3"></SuggestionItem>
				</SuggestionItemGroup>
				<SuggestionItemGroup headerText="Group 2">
					<SuggestionItem text="Item 4"></SuggestionItem>
					<SuggestionItem text="Item 5"></SuggestionItem>
					<SuggestionItem text="Item 6"></SuggestionItem>
				</SuggestionItemGroup>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("i");
		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.shadow()
			.find("[ui5-li-group-header]")
			.shadow()
			.find("div")
			.should("not.have.attr", "tabindex", "0");
	});

	it("tests tabindex of the div holding icon slot ", () => {
		cy.mount(<Input />);

		cy.document().then(doc => {
			const input = doc.querySelector<Input>("[ui5-input]")!;
			const icon = document.createElement("ui5-icon");
			icon.setAttribute("slot", "icon");
			icon.setAttribute("name", add);
			icon.id = "icon";

			input.addEventListener("focus", () => {
				input.appendChild(icon);
			});
			input.addEventListener("focusout", () => {
				input.removeChild(icon);
			});
		});

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input").realClick();

		cy.get("[ui5-icon]")
			.as("icon");

		cy.get("@icon")
			.then($icon => {
				$icon[0].addEventListener("click", cy.spy().as("click"));
			});

		cy.get("@icon").realClick();

		cy.get("@click")
			.should("have.been.calledOnce");
	});

	it("tests submit and change event order", () => {
		cy.mount(
			<form>
				<Input onChange={cy.stub().as("change")}></Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// check if submit is triggered after change
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("test");

		cy.realPress("Enter");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if pressing enter twice fires submit 2 times and change once", () => {
		cy.mount(
			<form>
				<Input onChange={cy.spy().as("change")}></Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("test");

		cy.realPress("Enter");

		cy.realPress("Enter");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledTwice");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submit is fired in case of autocomplete", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true} onChange={cy.spy().as("change")}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("H");

		cy.realPress("Enter");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.realPress("Enter");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submit event is fired upon item selection", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true} onChange={cy.spy().as("change")}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("H");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.realPress("Enter");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});
});

describe("Input general interaction", () => {
	it("handles suggestions selection cancel with ESC", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Chromium"></SuggestionItem>
				<SuggestionItem text="Titanium"></SuggestionItem>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
				<SuggestionItem text="Silver"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("@input")
			.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.attr", "value", "Titanium");

		cy.get("@input")
			.realPress("Escape");

		cy.get("@input")
			.should("have.value", "C");
	});

	it("tests selection-change with custom items", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("@input")
			.realType("c");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.value", "Compact")
			.should("not.have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("ui5-suggestion-item")
			.eq(2)
			.should("have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("not.have.attr", "focused");
	});

	it("Should fire 'input' event when the value is cleared with ESC", () => {
		cy.mount(<Input onInput={cy.spy().as("inputEvent")} />);

		cy.get("[ui5-input]").realClick();

		cy.get("[ui5-input]")
			.should("be.focused");

		cy.get("[ui5-input]")
			.realPress("a");

		cy.get("[ui5-input]")
			.realPress("Escape");

		cy.get("@inputEvent").should("have.been.calledTwice");
	});

	it("Should updated typedInValue upon clear", () => {
		cy.mount(
			<Input showClearIcon></Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.realType("C");

		// click on the clear icon
		cy.get("@input")
			.shadow()
			.find("[ui5-icon]")
			.as("clearIcon")
			.realClick();

		// check typedInValue property
		cy.get("@input")
			.should("have.prop", "typedInValue", "");
	});

	it("Should fire 'change' event once when clicking a suggestion equal to the typed value", () => {
		const onChange = cy.spy().as("onChange");
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<Input
				id="input-equal-click"
				showSuggestions
				noTypeahead
				onChange={onChange}
				onSelectionChange={onSelectionChange}
			>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#input-equal-click")
			.shadow()
			.find("input")
			.click()
			.realType("Cozy");

		cy.get("#input-equal-click")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get('#input-equal-click')
			.find('ui5-suggestion-item[text="Cozy"]')
			.click();

		cy.get("#input-equal-click").should("have.value", "Cozy");
		cy.get("@onChange").should("have.been.calledOnce");
	});

	it("Should fire 'change' event once when selecting a suggestion equal to the typed value with keyboard", () => {
		const onChange = cy.spy().as("onChange");
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<Input
				id="input-equal-keyboard"
				showSuggestions
				noTypeahead
				onChange={onChange}
				onSelectionChange={onSelectionChange}
			>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#input-equal-keyboard")
			.shadow()
			.find("input")
			.click()
			.realType("Cozy");

		cy.get("#input-equal-keyboard")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");
		cy.realPress("Enter");

		cy.get("#input-equal-keyboard").should("have.value", "Cozy");
		cy.get("@onChange").should("have.been.calledOnce");
		cy.get("@onSelectionChange").should("have.been.calledOnce");
	});

	it("Should control suggestions dynamically based on threshold", () => {
		const THRESHOLD = 3;
		const countries = [
			"Argentina", "Albania", "Algeria", "Angola", "Austria", "Australia",
			"Bulgaria", "Belgium", "Brazil", "Canada", "Colombia", "Croatia"
		];

		cy.mount(<Input id="threshold-input" showSuggestions />);

		cy.document().then(doc => {
			const input = doc.querySelector<Input>("#threshold-input")!;

			input.addEventListener("input", () => {
				const value = input.value;

				while (input.lastChild) {
					input.removeChild(input.lastChild);
				}

				if (value.length >= THRESHOLD) {
					input.showSuggestions = true;

					const filtered = countries.filter(country =>
						country.toUpperCase().indexOf(value.toUpperCase()) === 0
					);

					filtered.forEach(country => {
						const item = document.createElement("ui5-suggestion-item");
						item.setAttribute("text", country);
						input.appendChild(item);
					});
				} else {
					input.showSuggestions = false;
				}
			});
		});

		cy.get("#threshold-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("B");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.exist", "true");

		cy.realType("ul");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.should("have.length", 1)
			.first()
			.should("have.attr", "text", "Bulgaria");

		cy.realPress("Backspace");
		cy.realPress("Backspace");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.exist", "true");
	});
});

describe("Input arrow navigation", () => {
	it("Value state header and group headers should not be included in the arrow navigation", () => {
		cy.mount(
			<Input showSuggestions valueState="Negative" placeholder="Search for a country ...">
				<div slot="valueStateMessage">
					Custom error value state message with a <a href="#">Link</a>.
				</div>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("c");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.should("not.have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowUp")
			.realPress("ArrowUp");

		cy.get("@input")
			.should("have.attr", "focused");
	});

	it("Should navigate up and down through the suggestions popover with arrow keys", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("c");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.get("[ui5-suggestion-item]")
			.eq(1)
			.should("have.attr", "text", "Compact");

		cy.get("@input")
			.should("not.have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.eq(1).should("have.attr", "focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-suggestion-item]").eq(2).should("have.attr", "focused");
		cy.get("[ui5-suggestion-item]").eq(1).should("not.have.attr", "focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-suggestion-item]")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.eq(2)
			.should("not.have.attr", "focused");

		cy.realPress("ArrowUp");

		cy.realPress("ArrowUp");

		cy.get("@input")
			.should("have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.first()
			.should("not.have.attr", "focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	beforeEach(() => {
		cy.mount(
			<Input showSuggestions placeholder="Search for a country ...">
				<SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Armenia" />
					<SuggestionItem text="Algeria" />
					<SuggestionItem text="Andorra" />
					<SuggestionItem text="Angola" />
					<SuggestionItem text="Austria" />
					<SuggestionItem text="Australia" />
					<SuggestionItem text="Azerbaijan" />
					<SuggestionItem text="Aruba" />
					<SuggestionItem text="Antigua and Barbuda" />
				</SuggestionItemGroup>
			</Input>
		);
	});
	it("Should focus the tenth item from the suggestions popover with PAGEDOWN", () => {
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("PageDown");

		cy.get("[ui5-suggestion-item]")
			.eq(11)
			.should("have.attr", "text", "Antigua and Barbuda");

		cy.get("[ui5-suggestion-item]")
			.eq(11)
			.should("have.attr", "focused");
	});

	it("Should focus the -10 item/group header from the suggestions popover with PAGEUP", () => {
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowUp");

		cy.get("[ui5-suggestion-item-group]")
			.eq(0)
			.should("have.attr", "focused");

		cy.realPress("PageDown");

		cy.realPress("PageUp");

		cy.get("[ui5-suggestion-item-group]")
			.eq(0)
			.should("have.attr", "focused");
	});
});

describe("Input Ctrl + Alt + F8 navigation", () => {
	beforeEach(() => {
		cy.mount(<Input id="inputWithLinkInValueState" class="input2auto" valueState="Negative" placeholder="Input with Link in error value state">
			<div slot="valueStateMessage">
				Custom error value state message with a <Link href="#">Link</Link>.
			</div>
		</Input>);
	});

	it("Should move the focus from the input to the first link in the value state message", () => {
		cy.get("ui5-input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-input")
			.as("input");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("ui5-link")
			.should("have.focus");
	});

	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.mount(<>
			<Input id="inputError" class="input2auto" valueState="Negative" placeholder="Input in error state">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">First Link</Link> <Link href="#">Second Link</Link>.
				</div>
			</Input>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);

		cy.get("ui5-input")
			.eq(0)
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-input")
			.eq(0)
			.as("input");

		cy.get("ui5-input")
			.eq(1)
			.as("secondInput");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");

		cy.get("@secondInput")
			.should("have.focus");
	});

	it("Pressing [Shift+Tab] moves the focus from the second value state message link to the first one. Pressing it again shifts the focus to the input", () => {
		cy.mount(<Input id="inputError" class="input2auto" valueState="Negative" placeholder="Input in error state">
			<div slot="valueStateMessage">
				Custom error value state message with a <Link href="#">First Link</Link> <Link href="#">Second Link</Link>.
			</div>
		</Input>);
		cy.get("ui5-input")
			.eq(0)
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-input")
			.eq(0)
			.as("input");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@innerInput")
			.should("have.focus");
	});

	it("When pressing [Down Arrow] while focused on the first value state message link and suggestions are open, the focus moves to the next suggestion item", () => {
		cy.mount(
			<Input id="myInputEsc" showSuggestions valueState="Critical" class="input3auto">
				<div slot="valueStateMessage">
					Custom warning value state message with a <Link href="#">First Link</Link>.
				</div>
				<SuggestionItem text="Chromium"></SuggestionItem>
				<SuggestionItem text="Titanium"></SuggestionItem>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
				<SuggestionItem text="Silver"></SuggestionItem>
			</Input>
		);

		cy.get("ui5-input")
			.as("input");

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@input")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@input")
			.realClick()
			.should("be.focused");

		cy.get("@input")
			.realType("C");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("ui5-suggestion-item")
			.eq(0)
			.should("have.attr", "focused");

		cy.get("@input")
			.should("have.attr", "value", "Chromium")
			.should("have.focus");
	});
});

describe("Selection-change event", () => {
	it("Selection-change event fires with null arguments when suggestion was selected but user alters input value to something else", () => {
		cy.mount(
			<Input showSuggestions onSelectionChange={cy.stub().as("inputSelectionChange")}>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Compact");

		cy.get("@input")
			.realClick({ clickCount: 3 }); // select single word

		cy.get("@input")
			.should("be.focused");

		cy.realType("N");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "N");

		cy.get("@inputSelectionChange")
			.should("be.calledTwice");
	});

	it("Fires selection-change when same item is reselected after input is changed", () => {
		cy.mount(
			<Input showSuggestions onSelectionChange={cy.stub().as("inputSelectionChange")}>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("[ui5-suggestion-item")
			.eq(0)
			.as("suggestion-item");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@suggestion-item")
			.realClick();

		cy.get("@inputSelectionChange")
			.should("have.been.calledOnce");

		cy.get("@input")
			.should("have.value", "Cozy");

		cy.get("@input")
			.realClick({ clickCount: 3 }); // select all

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@inputSelectionChange")
			.should("have.been.calledTwice");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@suggestion-item")
			.realClick();

		cy.get("@inputSelectionChange")
			.should("have.been.calledThrice");

		cy.get("@input")
			.should("have.value", "Cozy");
	});
});

describe("Change event behavior when selecting the same suggestion item", () => {
	beforeEach(() => {
		cy.mount(
			<Input placeholder="Search for a country ..." showSuggestions onChange={cy.stub().as("changeEvent")}>
				<SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Armenia" />
					<SuggestionItem text="Algeria" />
				</SuggestionItemGroup>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
	});

	it("Change event is not fired when the same suggestion item is selected (with typeahead)", () => {
		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.realPress("Backspace");

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input").should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("have.been.calledOnce");
	});

	it("Change event is not fired when the same suggestion item is selected (no-typeahead)", () => {
		cy.get("@input").invoke("attr", "value", "Afghanistan");
		cy.get("@input").invoke("attr", "no-typeahead", true);

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("not.have.been.calledOnce");
	});

	it("Change event is not fired when the same suggestion item is selected after focus out and selecting suggestion again", () => {
		cy.get("@input")
			.invoke("attr", "value", "Afghanistan");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@input")
			.should("not.be.focused");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("not.have.been.calledOnce");
	});

	it("Change event fires after typing a new value following a clear icon click", () => {
		cy.mount(<Input showClearIcon={true} onChange={cy.stub().as("inputChange")} />);

		cy.get("@input")
			.shadow()
			.find("#inner")
			.as("innerInput")

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("Albania");

		cy.realPress("Enter");

		cy.get("@inputChange")
			.should("have.been.calledOnce");
		// Check input value
		cy.get("@input")
			.should("have.value", "Albania");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Albania");

		cy.get("@input")
			.shadow()
			.find("[ui5-icon]")
			.as("icon")
			.realClick();
		// Check input value
		cy.get("@input")
			.should("have.value", "");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "");

		cy.realType("Argentina");
		// Check input value
		cy.get("@input")
			.should("have.value", "Argentina");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Argentina");

		cy.realPress("Enter");

		cy.get("@icon")
			.realClick();
		// Check input value
		cy.get("@input")
			.should("have.value", "");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "");

		cy.realType("Argentina");
		// Check input value
		cy.get("@input")
			.should("have.value", "Argentina");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Argentina");

		cy.realPress("Enter");

		cy.get("@inputChange")
			.should("have.been.calledTwice");
	});

	it("should not close the dialog when item is selected", () => {
		cy.mount(<Dialog open initialFocus="test">
			<Input showSuggestions={true} id="test">
				<SuggestionItem text="First item"></SuggestionItem>
				<SuggestionItem text="Second item"></SuggestionItem>
			</Input>
		</Dialog>);


		cy.get("[ui5-dialog]")
			.as("dialog");

		cy.get<Dialog>("@dialog")
			.ui5DialogOpened();

		cy.get("@input")
			.should("be.focused");

		cy.realType("f");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-suggestion-item")
			.eq(0)
			.realClick();

		cy.get<Dialog>("@dialog")
			.ui5DialogOpened();
	});
});

describe("Accessibility", () => {
	it("tests accessibleDescription property", () => {
		cy.mount(<Input accessibleDescription="This is an input" />);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("@input")
			.shadow()
			.find("span#accessibleDescription")
			.should("have.text", "This is an input");
	});

	it("tests accessibleDescriptionRef property", () => {
		cy.mount(
			<>
				<p id="inputDescription">This is an input</p>
				<Input accessibleDescriptionRef="inputDescription"></Input>
			</>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("@input")
			.shadow()
			.find("span#accessibleDescription")
			.should("have.text", "This is an input");
	});
});

describe("Attribute propagation", () => {
	it("Should change the placeholder of the inner input", () => {
		const placeholder = "New placeholder text";
		cy.mount(<Input placeholder={placeholder} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "placeholder", placeholder);
	});

	it("Disabled attribute is propagated properly", () => {
		cy.mount(<Input disabled={true} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "disabled");
	});

	it("Readonly attribute is propagated properly", () => {
		cy.mount(<Input readonly={true} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "readonly");
	});

	it("Required attribute is propagated properly", () => {
		cy.mount(<Input required={true} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-required", "true");
		cy.mount(<Input required={false} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-required", "false");
	});

	it("Type attribute is propagated properly", () => {
		cy.mount(<Input type="Number" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "type", "number");
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "step", "any");
	});

	it("Value attribute is propagated properly", () => {
		const value = "Test test";
		cy.mount(<Input value={value} />);
		cy.get("[ui5-input]").shadow().find("input").should("have.value", value);
	});

	it("sets empty value to an input", () => {
		cy.mount(<Input value="initial" />);
		cy.get("[ui5-input]").as("input");
		cy.get("@input").shadow().find("input").as("innerInput");

		cy.get("@input").invoke("attr", "value", "");
		cy.get("@input").should("have.value", "");
		cy.get("@innerInput").should("have.value", "");

		cy.get("@input").invoke("attr", "value", "new value");
		cy.get("@input").invoke("attr", "value", null);
		cy.get("@input").should("not.have.attr", "value");
		cy.get("@innerInput").should("not.have.attr", "value");
	});

	it("Maxlength property is set correctly", () => {
		cy.mount(<Input maxlength={10} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "maxlength", "10");
	});

	it("Aria-label is reflected in the shadow DOM", () => {
		const accessibleName = "New cool text";
		cy.mount(<Input accessibleName={accessibleName} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", accessibleName);
	});

	it("Aria-invalid is set correctly", () => {
		cy.mount(<Input valueState="Negative" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-invalid", "true");
		cy.mount(<Input valueState="None" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("not.have.attr", "aria-invalid");
	});

	it("Should render aria-haspopup attribute with value 'dialog'", () => {
		cy.mount(<Input showSuggestions={true} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-haspopup", "dialog");
	});
});

describe("Input general interaction", () => {
	it("Should not open suggestions popover when focused", () => {
		cy.mount(<Input showSuggestions placeholder="Type here" />);
		cy.get("[ui5-input]").shadow().find("input").click();
		cy.get("[ui5-input]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("not.be.visible");
	});

	it("fires change", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(<Input id="input1" onChange={onChange} />);
		cy.get("#input1").shadow().find("input").click().realType("abc");
		cy.get("body").click(); // simulate focus out
		cy.get("#input1").shadow().find("input").click().realType("def");
		cy.get("body").click(); // simulate focus out
		cy.get("@onChange").should("have.been.calledTwice");
	});

	it("fires change on tab", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<Input id="inputChangeSuggestions" showSuggestions onChange={onChange} />
		);
		cy.get("#inputChangeSuggestions")
			.shadow()
			.find("input")
			.click()
			.realType("c");
		cy.get("#inputChangeSuggestions")
			.shadow()
			.find("input")
			.realPress("ArrowDown");
		cy.get("#inputChangeSuggestions").shadow().find("input").realPress("Tab");
		cy.get("@onChange").should("have.been.calledOnce");
	});

	it("fires input", () => {
		const onInput = cy.spy().as("onInput");
		cy.mount(
			<>
				<Input
					id="input2"
					onInput={onInput}
				/>
			</>
		);
		cy.get("#input2").shadow().find("input").click().realType("abc");
		cy.get("@onInput").should("have.been.calledThrice");
	});

	it("fires select event", () => {
		const onSelect = cy.spy().as("onSelect");
		cy.mount(<Input id="selectInput" onSelect={onSelect} value="Value to be selected" />);
		cy.get("#selectInput").shadow().find("input").as("inputInner");
		cy.get("@inputInner").realClick({ clickCount: 2 });
		cy.get("@onSelect").should("have.been.calledOnce");
	});

	it("tests removing fractional part of numeric value", () => {
		cy.mount(
			<>
				<Input id="input-number31" type={"Number"} value="4.333" />
				<Input id="input-number32" type={"Number"} value="4.3" />
				<Input id="input-number33" type={"Number"} value=".33" />
				<Input id="input-number34" type={"Number"} value="-1.33" />
				<button id="input-number3-focusout" />
			</>
		);
		cy.get("#input-number31").as("input1");
		cy.get("#input-number32").as("input2");
		cy.get("#input-number33").as("input3");
		cy.get("#input-number34").as("input4");
		cy.get("#input-number3-focusout").as("btn");

		cy.get("@input1").click().realType("{backspace}{backspace}{backspace}");
		cy.get("@btn").click();
		cy.get("@input1").should(($el) => {
			expect(($el[0] as HTMLInputElement).value).to.eq("4");
		});

		cy.get("@input2").click().realType("{backspace}");
		cy.get("@btn").click();
		cy.get("@input2").should(($el) => {
			expect(($el[0] as HTMLInputElement).value).to.eq("4");
		});

		cy.get("@input3").click().realType("{backspace}{backspace}");
		cy.get("@btn").click();
		cy.get("@input3").should(($el) => {
			expect(($el[0] as HTMLInputElement).value).to.eq("");
		});

		cy.get("@input4").click().realType("{backspace}{backspace}");
		cy.get("@btn").click();
		cy.get("@input4").should(($el) => {
			expect(($el[0] as HTMLInputElement).value).to.eq("-1");
		});
	});

	it("handles suggestions", () => {
		cy.mount(
			<Input id="myInput" showSuggestions>
				<SuggestionItem text="Portugal" />
				<SuggestionItem text="Poland" />
			</Input>
		);
		cy.get("#myInput").shadow().find("input").click().realType("p");
		cy.get("#myInput")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "open");
		// Note: item click and value assertion skipped due to headless browser limitations
	});

	it("Input value should correspond to suggestion item when it is clicked", () => {
		cy.mount(
			<Input id="myInput" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);
		cy.get("#myInput").shadow().find("input").as("suggestionsInput");
		cy.get("#myInput").as("input");
		cy.get("@suggestionsInput").click().invoke("val", "China").trigger("input");
		cy.get("@input").find("ui5-suggestion-item").first().click();
		cy.get("@suggestionsInput").realType("{backspace}");
		cy.get("@input").find("ui5-suggestion-item").first().click();
		cy.get("@suggestionsInput").should("have.value", "China");
	});

	it("input value should be cleared with ESC", () => {
		cy.mount(<Input id="myInputEsc" showSuggestions />);
		cy.get("#myInputEsc").shadow().find("input").as("suggestionsInput");
		cy.get("@suggestionsInput").click().realType("Some value");
		cy.get("@suggestionsInput").realType("{esc}");
		cy.get("@suggestionsInput").realType("{esc}");
		cy.get("@suggestionsInput").should("have.value", "");
		cy.get("@suggestionsInput").realType("abc");
		cy.get("@suggestionsInput").realType("{enter}");
		cy.get("@suggestionsInput").realType("cba");
		cy.get("@suggestionsInput").realType("{esc}");
		cy.get("@suggestionsInput").realType("{esc}");
		cy.get("@suggestionsInput").should("have.value", "abc");
	});

	it("should select typeaheaded item on mouse click and remove value text selection", () => {
		// Mount Input with suggestions and a change event spy
		cy.mount(
			<Input
				id="myInput"
				showSuggestions={true}
				onChange={cy.spy().as("changeSpy")}
			>
				<SuggestionItem text="Canada"></SuggestionItem>
				<SuggestionItem text="Cuba"></SuggestionItem>
				<SuggestionItem text="Chile"></SuggestionItem>
			</Input>
		);

		cy.get("#myInput").shadow().find("input").as("inputEl");
		cy.get("@inputEl").realClick();
		cy.get("@inputEl").realType("C");

		cy.get("ui5-suggestion-item").first().click();

		// Assert change event fired once
		cy.get("@changeSpy").should("have.been.calledOnce");

		// Assert input value is not selected (no text selection)
		cy.get("@inputEl").then($input => {
			const input = $input[0] as HTMLInputElement;
			expect(input.selectionEnd - input.selectionStart).to.eq(0);
		});
	});

	it("should select typeaheaded item on mouse click and remove value text selection 2", () => {
		cy.mount(
			<Input
				id="myInput"
				showSuggestions={true}
				onChange={cy.spy().as("changeSpy")}
			>
				<SuggestionItem text="Canada" />
				<SuggestionItem text="Cuba" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput").shadow().find("input").as("inputEl");
		cy.get("@inputEl").realClick();
		cy.get("@inputEl").realType("C");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.get("ui5-suggestion-item").eq(1).click();

		cy.get("@inputEl").should("have.value", "Cuba");
		cy.get("@changeSpy").should("have.been.calledOnce");
		cy.get("@inputEl").then($input => {
			const input = $input[0] as HTMLInputElement;
			expect(input.selectionEnd - input.selectionStart).to.eq(0);
		});
	});

	it("should remove input's focus when group header item is clicked", () => {
		cy.mount(
			<Input showSuggestions={true} placeholder="Search for a country ...">
				<SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
				</SuggestionItemGroup>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");
		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.should("be.focused");
		cy.get("[ui5-suggestion-item-group]")
			.first()
			.should("not.have.attr", "focused");
	});

	it("checks if the suggestions popover width is minimum the size of the input", () => {
		cy.mount(
			<Input id="inputWithSuggestions" showSuggestions placeholder="Search for a country ...">
				<SuggestionItem text="Bulgaria" />
			</Input>
		);

		cy.get("#inputWithSuggestions")
			.as("input");

		cy.get("@input")
			.realClick();

		// type a
		cy.get("@input")
		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		// compare the width of the input and the popover
		cy.get("@input")
			.invoke("outerWidth")
			.then((inputWidth) => {
				cy.get("@input")
					.shadow()
					.find<ResponsivePopover>("[ui5-responsive-popover]")
					.should("have.css", "width")
					.and("be.equal", inputWidth + "px");
			});
	});

	it("checks if suggestions popover width is maximum 40rem if input isn't wider", () => {
		cy.mount(
			<div style={{ width: "400px" }}>
				<Input
					id="long-sugg"
					style={{ width: "100%" }}
					showSuggestions={true}
				>
					<SuggestionItem text="Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2. text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2.Extra long text used as a list item. Extra long text used as a list item -2."></SuggestionItem>
				</Input>
			</div>
		);

		cy.get("#long-sugg").shadow().find("input").realClick();
		cy.get("#long-sugg").shadow().find("input").realType("a");

		cy.get("#long-sugg")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("ui5-suggestion-item").first().then($el => {
			const width = $el[0].getBoundingClientRect().width;
			expect(Math.round(width)).to.eq(640);
		});
	});

	it("Input's maxlength property is set correctly", () => {
		cy.mount(<Input maxlength={10} />);

		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.realType("cccccccccccccccccccccccc");

		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "maxlength", "10");
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.value", "cccccccccc");
	});

	it("Checks if valueStateMessage is shown", () => {
		cy.mount(
			<Input id="inputWithValueStateMessage" valueState="Critical" placeholder="Input with value state message">
				<div slot="valueStateMessage">
					Custom critical value state message.
				</div>
			</Input>
		);

		cy.get("#inputWithValueStateMessage")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.get("@input")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open");

		// type a
		cy.get("@innerInput")
			.realType("a");

		cy.get("@popover")
			.should("have.attr", "open");
	});

	it("Checks if aria-describedby is rendered if not necessary", () => {
		cy.mount(<Input accessible-name="Enter your secret password" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("not.have.attr", "aria-describedby");
	});

	it("Checks if aria-label is reflected in the shadow DOM", () => {
		const accessibleName = "New cool text";
		cy.mount(<Input accessibleName={accessibleName} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", accessibleName);
	});

	it("Checks if aria-invalid is set correctly", () => {
		cy.mount(<Input valueState="Negative" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-invalid", "true");

		cy.mount(<Input valueState="Critical" />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("not.have.attr", "aria-invalid");
	});

	it("Should render aria-haspopup attribute with value 'dialog'", () => {
		cy.mount(<Input showSuggestions={true} />);
		cy.get("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("Value state type should be added to the screen readers default value states announcement", () => {
		cy.mount(<>
			<Input id="inputCritical" valueState="Critical" />
			<Input id="inputNegative" valueState="Negative" />
			<Input id="inputPositive" valueState="Positive" />
			<Input id="inputInformation" valueState="Information" />
		</>);

		cy.get("#inputCritical")
			.click();

		cy.get("#inputCritical")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", "Value State Warning Warning issued");

		cy.get("#inputCritical")
			.shadow()
			.find("[ui5-popover] div")
			.should("have.text", "Warning issued");

		cy.get("#inputNegative")
			.click();

		cy.get("#inputNegative")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", "Value State Error Invalid entry");

		cy.get("#inputNegative")
			.shadow()
			.find("[ui5-popover] div")
			.should("have.text", "Invalid entry");

		cy.get("#inputPositive")
			.click();

		cy.get("#inputPositive")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", "Value State Success");

		cy.get("#inputInformation")
			.click();

		cy.get("#inputInformation")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", "Value State Information Informative entry");

		cy.get("#inputInformation")
			.shadow()
			.find("[ui5-popover] div")
			.should("have.text", "Informative entry");
	});

	it("Value state type should be added to the screen readers custom value states announcement", () => {
		cy.mount(<>
			<Input id="field" valueState="Negative">
				<div slot="valueStateMessage">
					Custom critical value state message.
				</div>
			</Input>
		</>)

		cy.get("#field")
			.shadow()
			.find("#valueStateDesc")
			.should("include.text", "Value State Error");
	});

	it("Tests autocomplete(type-ahead)", () => {
		cy.mount(
			<Input id="myInputHighlighted" showSuggestions={true} noTypeahead={false}>
				<SuggestionItem text="Adam D" />
				<SuggestionItem text="Adam Smith" />
				<SuggestionItem text="Adam Johnson" />
			</Input>
		);

		cy.get("#myInputHighlighted")
			.shadow()
			.find("input")
			.as("inputEl");

		cy.get("@inputEl")
			.realClick()
			.should("be.focused");

		cy.get("@inputEl")
			.realType("a");

		cy.get("@inputEl")
			.should("have.value", "Adam D");
		cy.get("@inputEl")
			.then($input => {
				const input = $input[0] as HTMLInputElement;
				expect(input.selectionEnd - input.selectionStart).to.gt(0)
			});
	});

	it("Tests autocomplete(type-ahead) of custom suggestions", () => {
		cy.mount(
			<Input id="input-custom-flat" showSuggestions>
				<SuggestionItem text="Albania" />
				<SuggestionItem text="Argentina" />
				<SuggestionItem text="Australia" />
			</Input>
		);

		cy.get("#input-custom-flat").shadow().find("input").as("input");
		cy.get("@input").click().realType("a");

		cy.get("@input").should("have.value", "Albania");
		cy.get("@input").then($input => {
			const input = $input[0] as HTMLInputElement;
			expect(input.selectionEnd - input.selectionStart).to.gt(0);
		});
	});

	it("Tests disabled autocomplete(type-ahead)", () => {
		cy.mount(
			<Input id="input-disabled-autocomplete" showSuggestions noTypeahead>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#input-disabled-autocomplete").shadow().find("input").click().realType("c");
		cy.get("#input-disabled-autocomplete").shadow().find("input").should("have.value", "c");
	});

	it("Tests disabled autocomplete(type-ahead)", () => {
		cy.mount(
			<Input id="input-disabled-autocomplete" showSuggestions noTypeahead>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#input-disabled-autocomplete").shadow().find("input").click().realType("c");
		cy.get("#input-disabled-autocomplete").shadow().find("input").should("have.value", "c");
	});

	it("Doesn't remove value on number type input even if locale specific delimiter/multiple delimiters", () => {
		cy.mount(<Input id="input-number2" type="Number" />);

		cy.get("#input-number2").shadow().find("input").click().realType("1.22.33");
		cy.get("#input-number2").shadow().find("input").realPress("Tab");

		cy.get("#input-number2").shadow().find("input").should($el => {
			const input = $el[0] as HTMLInputElement;
			expect(parseFloat(input.value).toPrecision(3)).to.eq("1.22");
		});
	});

	it("fires selection-change", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");
		cy.mount(
			<>
				<Input id="inputPreview2" showSuggestions={true} onSelectionChange={onSelectionChange}>
					<SuggestionItem text="Laptop Lenovo" />
					<SuggestionItem text="Laptop Dell" />
				</Input>
			</>
		);

		cy.get("#inputPreview2").shadow().find("input").click().realType("c");
		cy.get("#inputPreview2")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("#inputPreview2").shadow().find("input").realPress("ArrowDown");

		cy.get("#inputPreview2").shadow().find<ResponsivePopover>("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.get("@onSelectionChange").should("have.been.calledOnce");
	});

	it("fires open event when suggestions picker is opened on typing", () => {
		const onOpen = cy.spy().as("onOpen");
		cy.mount(
			<Input id="myInput" showSuggestions onOpen={onOpen}>
				<SuggestionItem text="Albania" />
				<SuggestionItem text="Argentina" />
			</Input>
		);

		cy.get("#myInput").shadow().find("input").click().realType("a");
		cy.get("#myInput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("#myInput").shadow().find<ResponsivePopover>("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.get("@onOpen").should("have.been.calledOnce");
	});

	it("fires close event when suggestions picker is closed", () => {
		const onClose = cy.spy().as("onClose");
		cy.mount(
			<Input id="myInput" showSuggestions onClose={onClose}>
				<SuggestionItem text="Albania" />
				<SuggestionItem text="Argentina" />
			</Input>
		);

		cy.get("#myInput").shadow().find("input").click().realType("a");
		cy.get("#myInput").find("ui5-suggestion-item").first().click();
		cy.get("#myInput").shadow().find("ui5-responsive-popover").should("not.be.visible");
		cy.get("@onClose").should("have.been.calledOnce");
	});

	it("Should open suggestions popover when ui5-input is the first focusable element within a dialog", () => {
		cy.mount(
			<>
				<Dialog id="dialog" open={true}>
					<Input id="inputInDialog" showSuggestions>
						<SuggestionItem text="China" />
						<SuggestionItem text="Chile" />
					</Input>
				</Dialog>
			</>
		);

		cy.get("#inputInDialog").shadow().find("input").realType("c");
		cy.get("#inputInDialog")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.get("#inputInDialog").shadow().find<ResponsivePopover>("ui5-responsive-popover").ui5ResponsivePopoverOpened();

		cy.get("#inputInDialog").shadow().find("input").realPress("ArrowDown");
		cy.get("#inputInDialog").shadow().find("input").realPress("Escape");
		cy.get("#inputInDialog")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
		cy.get("#dialog").should("have.attr", "open");
	});

	it("Suggestions count should be read out when necessary", () => {
		cy.mount(
			<>
				<Input id="inputCompact" showSuggestions>
					<SuggestionItem text="China" />
					<SuggestionItem text="Chile" />
					<SuggestionItem text="Canada" />
				</Input>
				<Input id="myInput2" showSuggestions>
					<SuggestionItem text="Portugal" />
					<SuggestionItem text="Poland" />
					<SuggestionItem text="Peru" />
					<SuggestionItem text="Panama" />
					<SuggestionItem text="Paraguay" />
				</Input>
			</>
		);

		cy.get("#inputCompact").click();
		cy.get("#inputCompact").shadow().find("#suggestionsCount").should("have.text", "");

		cy.get("#inputCompact").shadow().find("input").realType("c");
		cy.get("#inputCompact").shadow().find("#suggestionsCount").should("have.text", "3 results are available");

		cy.get("#inputCompact").shadow().find("input").realType("{backspace}");
		cy.get("#inputCompact").shadow().find("input").realType("{esc}");

		cy.get("#myInput2").click();
		cy.get("#myInput2").shadow().find("input").realType("c");
		cy.get("#myInput2").shadow().find("#suggestionsCount").should("have.text", "5 results are available");
	});

	it("Should close the Popover when no suggestions are available", () => {
		cy.mount(
			<Input id="myInput" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput").shadow().find("input").realType("A Space");
		cy.get("#myInput").should("not.have.attr", "open");
	});

	it("Should not open value state message when input is in readonly state", () => {
		cy.mount(
			<Input id="readonly-value-state-input" readonly valueState="Negative" />
		);

		cy.get("#readonly-value-state-input").click();
		cy.get("#readonly-value-state-input").shadow().find("ui5-popover").should("not.have.attr", "open");
	});

	it("Displays clear icon when typing and pressing it clears the value", () => {
		const onChange = cy.spy().as("onChange");
		const onInput = cy.spy().as("onInput");
		cy.mount(
			<Input id="clear-input" showClearIcon={true} onChange={onChange} onInput={onInput} />
		);

		cy.get("#clear-input").should("not.have.attr", "_effectiveShowClearIcon");

		cy.get("#clear-input").shadow().find("input").click().realType("a");
		cy.get("#clear-input").should("have.attr", "_effective-show-clear-icon");
		cy.get("@onChange").should("not.have.been.called");
		cy.get("@onInput").should("have.been.calledOnce");

		cy.get("#clear-input").shadow().find(".ui5-input-clear-icon-wrapper").click();
		cy.get("#clear-input").should("have.value", "");
		cy.get("#clear-input").should("not.have.attr", "_effective-show-clear-icon");
		cy.get("@onChange").should("not.have.been.called");
		cy.get("@onInput").should("have.been.calledTwice");
	});

	it("Change event is called when value of input is cleared with clear icon and input is focused out", () => {
		const onChange = cy.spy().as("onChange");
		const onInput = cy.spy().as("onInput");

		cy.mount(
			<Input id="clear-input" showClearIcon={true} onChange={onChange} onInput={onInput} />
		);

		cy.get("#clear-input").shadow().find("input").click().realType("a");
		cy.get("#clear-input").shadow().find("input").realPress("Tab");
		cy.get("#clear-input").shadow().find(".ui5-input-clear-icon-wrapper").click();

		cy.get("@onChange").should("have.been.calledOnce");
		cy.get("@onInput").should("have.been.calledTwice");
	});

	it("Change event calling after clear icon is pressed", () => {
		const onChange = cy.spy().as("onChange");
		const onInput = cy.spy().as("onInput");
		cy.mount(
			<Input id="clear-input" showClearIcon={true} onChange={onChange} onInput={onInput} />
		);

		cy.get("#clear-input").shadow().find("input").click().realType("a");
		cy.get("#clear-input").shadow().find("input").realPress("Tab");
		cy.get("#clear-input").shadow().find(".ui5-input-clear-icon-wrapper").click();
		cy.get("#clear-input").shadow().find("input").realPress("Tab");

		cy.get("@onChange").should("have.been.calledTwice");
		cy.get("@onInput").should("have.been.calledTwice");

		cy.get("#clear-input").shadow().find("input").click().realType("a");
		cy.get("#clear-input").shadow().find("input").realPress("Tab");
		cy.get("#clear-input").shadow().find(".ui5-input-clear-icon-wrapper").click();
		cy.get("#clear-input").shadow().find("input").click().realType("a");
		cy.get("#clear-input").shadow().find("input").realPress("Tab");

		cy.get("@onChange").should("have.been.calledThrice");
		cy.get("@onInput").should("have.been.called", 5);
	});

	it("Setting readonly hides clear icon", () => {
		cy.mount(
			<>
				<Input id="clear-input-compact" showClearIcon={true} readonly={true} value="test" />
			</>
		);

		cy.get("#clear-input-compact").should("not.have.attr", "_effective-show-clear-icon");
	});

	it("Setting disabled hides clear icon", () => {
		cy.mount(
			<>
				<Input id="clear-input-compact" showClearIcon={true} disabled={true} value="test" />
			</>
		);

		cy.get("#clear-input-compact").should("not.have.attr", "_effective-show-clear-icon");
	});

	it("Should open suggestions popover if open is set on focusin", () => {
		cy.mount(
			<Input id="openPickerInput" showSuggestions={true} onFocus={(e) => (e.target as Input).open = true}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#openPickerInput").click();
		cy.get("#openPickerInput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("#openPickerInput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Private property for input value should be in sync, when value gets updated programatically", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<>
				<Input id="input-change-1" onChange={onChange} />
				<button id="clear-button">Clear</button>
			</>
		);

		cy.get("#input-change-1").shadow().find("input").click().realType("12{enter}");
		cy.get("@onChange").should("have.been.calledOnce");

		cy.get("#clear-button").click();
		cy.get("@onChange").should("have.been.calledOnce");

		cy.get("#input-change-1").shadow().find("input").click().realType("12{enter}");
		cy.get("@onChange").should("have.been.calledTwice");
	});

	it("Change event should be fired only once, when a user types a value identical to an item and presses ENTER", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<Input id="input-change-2" showSuggestions onChange={onChange}>
				<SuggestionItem text="sofia" />
				<SuggestionItem text="sofia" />
			</Input>
		);

		cy.get("#input-change-2").shadow().find("input").click().realType("sofia{enter}");
		cy.get("@onChange").should("have.been.calledOnce");
	});

	it("Value should be updated correctly, when using DEL", () => {
		const onChange = (e) => {
			cy.get("#input-change-3").should("have.value", "");
		};

		cy.mount(
			<>
				<Input />
				<Input id="input-change-3" value="12.4" type="Number" onChange={onChange} />
			</>
		);

		cy.get("#input-change-3").shadow().find("input").click();
		cy.get("#input-change-3").shadow().find("input").realPress(["Shift", "Tab"]);
		cy.get("#input-change-3").shadow().find("input").realPress("Tab");
		cy.get("#input-change-3").shadow().find("input").realPress("Delete");
		cy.get("#input-change-3").shadow().find("input").realPress("Tab");
	});

	it("Changes text if cleared in change event handler", () => {
		cy.mount(
			<Input id="change-event-value" showSuggestions={true} open={true} onChange={e => (e.target as Input).value = ""}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		// click on first item
		cy.get("#change-event-value").find("ui5-suggestion-item").first().click();


		cy.get("#change-event-value").should("have.value", "");
		cy.get("#change-event-value").shadow().find("input").should("have.value", "");
	});

	it("Tests prevented input event", () => {
		cy.mount(<Input id="prevent-input-event" onInput={e => (e.target as Input).value.length > 3 ? e.preventDefault() : null} />);

		cy.get("#prevent-input-event").shadow().find("input").click().realType("abcd");
		cy.get("#prevent-input-event").should("have.value", "abc");
	});

	it("Tests prevented input event with clear icon", () => {
		cy.mount(<Input id="prevent-input-event-clear-icon" showClearIcon={true} onInput={e => e.preventDefault()} value="Test" />);

		cy.get("#prevent-input-event-clear-icon").shadow().find(".ui5-input-clear-icon-wrapper").click();
		cy.get("#prevent-input-event-clear-icon").should("have.value", "Test");
	});
});

describe("Input HOME navigation", () => {
	it("Should move caret to beginning of input with HOME if focus is on Input", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#myInput2").shadow().find("input").click().realType("c");
		cy.get("#myInput2").shadow().find("input").realPress("Home");

		cy.get("#myInput2").should("have.prop", "focused", true);
		cy.get("#myInput2").then($input => {
			const input = $input[0] as Input;
			expect(input.getCaretPosition()).to.eq(0);
		});
	});

	it("Should focus the first item from the suggestions popover with HOME", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#myInput2").shadow().find("input").click().realType("c");
		cy.get("#myInput2").shadow().find("input").realPress("ArrowDown");
		cy.get("#myInput2").shadow().find("input").realPress("Home");

		cy.get("#myInput2").should("have.value", "Cozy");
		cy.get("#myInput2").should("have.prop", "focused", false);
		cy.get("#myInput2").find("ui5-suggestion-item").first().should("have.prop", "focused", true);
	});

	it("Should focus the group header from the suggestions popover with HOME", () => {
		cy.mount(
			<Input id="myInput" showSuggestions>
				<SuggestionItemGroup>
					<SuggestionItem text="Item 1" />
					<SuggestionItem text="Item 2" />
				</SuggestionItemGroup>
				<SuggestionItem text="Item 3" />
			</Input>
		);

		cy.get("#myInput").shadow().find("input").click().realType("a");
		cy.get("#myInput").shadow().find("input").realPress("ArrowDown");
		cy.get("#myInput").shadow().find("input").realPress("ArrowDown");
		cy.get("#myInput").shadow().find("input").realPress("Home");

		cy.get("#myInput").should("have.prop", "focused", false);
		cy.get("#myInput").find("ui5-suggestion-item-group").should("have.prop", "focused", true);
	});
});

describe("Input END navigation", () => {
	it("Should move caret to end of input with END if focus is on Input", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#myInput2").shadow().find("input").click().realType("c");
		cy.get("#myInput2").shadow().find("input").realPress("ArrowLeft");
		cy.get("#myInput2").shadow().find("input").realPress("End");

		cy.get("#myInput2").should("have.prop", "focused", true);
		cy.get("#myInput2").then($input => {
			const input = $input[0] as Input;
			expect(input.getCaretPosition()).to.eq(4);
		});
	});

	it("Should focus the last item from the suggestions popover with END", () => {
		cy.mount(
			<Input id="inputCompact" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
				<SuggestionItem text="Chili" />
			</Input>
		);

		cy.get("#inputCompact").shadow().find("input").click().realType("c");
		cy.get("#inputCompact").shadow().find("input").realPress("ArrowDown");
		cy.get("#inputCompact").shadow().find("input").realPress("End");

		cy.get("#inputCompact").should("have.value", "Chili");
		cy.get("#inputCompact").should("have.prop", "focused", false);
		cy.get("#inputCompact").find("ui5-suggestion-item").last().should("have.prop", "focused", true);
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	it("PAGEUP and PAGEDOWN should do nothing if focus is on Input", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#myInput2").shadow().find("input").click().realType("c");
		cy.get("#myInput2").then($input => {
			const input = $input[0] as Input;
			expect(input.getCaretPosition()).to.eq(4);
		});
		cy.get("#myInput2").should("have.prop", "focused", true);

		cy.get("#myInput2").shadow().find("input").realPress("PageUp");
		cy.get("#myInput2").then($input => {
			const input = $input[0] as Input;
			expect(input.getCaretPosition()).to.eq(4);
		});
		cy.get("#myInput2").should("have.prop", "focused", true);

		cy.get("#myInput2").shadow().find("input").realPress("PageDown");
		cy.get("#myInput2").then($input => {
			const input = $input[0] as Input;
			expect(input.getCaretPosition()).to.eq(4);
		});
		cy.get("#myInput2").should("have.prop", "focused", true);
	});
});

describe("XSS tests for suggestions", () => {
	it("add suggestion item with XSS", () => {
		cy.mount(
			<>
				<Input id="xss-input" showSuggestions>
					<SuggestionItem text="<script>alert('xss')</script>" />
					<SuggestionItem text="<b></b>" />
					<SuggestionItem text="3412test1234" />
					<SuggestionItem text="[[[b]]]" />
					<SuggestionItem text="&amp;" />
				</Input>
				<button id="xss-btn" onClick={() => {
					const item = document.createElement("ui5-suggestion-item");
					(item as SuggestionItem).text = `Canada<<img src="xss" onerror="document.getElementById('xss-result').innerText = 'XSS FOUND'">`;
					document.getElementById("xss-input").appendChild(item);
				}}>Test XSS</button>
				<span id="xss-result">NO XSS</span>
			</>
		);

		cy.get("#xss-btn").click();
		cy.get("#xss-result").should("have.text", "NO XSS");
	});

	it("tests dangerous items highlighting", () => {
		cy.mount(
			<Input id="xss-input" showSuggestions={true}>
				<SuggestionItem text="" />
				<SuggestionItem text="&lt;b&gt;&lt;/b&gt;" />
				<SuggestionItem text="3412test1234" />
				<SuggestionItem text="[[[b]]]" />
				<SuggestionItem text="&amp;amp;" />
			</Input>
		);

		cy.get("#xss-input").shadow().find("input").click().realType("a");
		cy.get("#xss-input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		const expected = ["", "<b></b>", "3412test1234", "[[[b]]]", "&amp;"];

		cy.get("#xss-input").find("ui5-suggestion-item").each(($item, index) => {
			cy.wrap($item[0].shadowRoot.querySelector(".ui5-li-title")).should("have.prop", "innerText", expected[index]);
		});
	});
});

describe("Lazy loading", () => {
	it("Lazy loading opens the picker once items are populated", () => {
		cy.mount(
			<Input id="field" showSuggestions>
				<SuggestionItem text="Async Item 1" />
				<SuggestionItem text="Async Item 2" />
			</Input>
		);

		cy.get("#field").shadow().find("input").click().realType("a");
		cy.get("#field")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
	});

	it("Does not reopen picker on focus in", () => {
		cy.mount(
			<Input id="field" showSuggestions>
				<SuggestionItem text="Async Item 1" />
				<SuggestionItem text="Async Item 2" />
			</Input>
		);

		cy.get("#field").shadow().find("input").click().realType("a");
		cy.get("#field").shadow().find("input").realPress("Tab");
		cy.get("#field").shadow().find("input").realPress("Tab");
		cy.wait(3000);
		cy.get("#field")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("Should not close picker when items are updated", () => {
		cy.mount(
			<Input id="field1" showSuggestions>
				<SuggestionItem text="Search Item 1" />
				<SuggestionItem text="Search Item 2" />
			</Input>
		);

		cy.get("#field1").shadow().find("input").click().realType("S");
		cy.get("#field1")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.get("#field1").shadow().find("input").realType("b");
		cy.get("#field1")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
	});
});

describe("Selection-change event", () => {
	it("Selection-change event fires when interacting with Arrow UP and Arrow DOWN keys", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");
		cy.mount(
			<Input id="input-selection-change" showSuggestions onSelectionChange={onSelectionChange}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
				<SuggestionItem text="Canada" />
			</Input>
		);

		cy.get("#input-selection-change").shadow().find("input").click().realType("C");
		cy.get("#input-selection-change").shadow().find("input").realPress("ArrowDown");
		cy.get("#input-selection-change").shadow().find("input").realPress("ArrowDown");
		cy.get("#input-selection-change").shadow().find("input").realPress("ArrowUp");

		cy.get("@onSelectionChange").should("have.been.called", 3);
	});

	it("Selection-change event fires when suggestion item is selected by clicking on it without previously selected", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");
		cy.mount(
			<Input id="input-selection-change" showSuggestions onSelectionChange={onSelectionChange}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
				<SuggestionItem text="Canada" />
			</Input>
		);

		cy.get("#input-selection-change").shadow().find("input").click().realType("C");
		cy.get("#input-selection-change").shadow().find("input").realPress("ArrowDown");
		cy.get("@onSelectionChange").should("have.been.calledOnce");

		cy.get("#input-selection-change").find("ui5-suggestion-item").eq(2).click();
		cy.get("@onSelectionChange").should("have.been.calledTwice");
	});

	it("Selection-change event does not fire when item is clicked but focus is already on it", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");
		cy.mount(
			<Input id="input-selection-change" showSuggestions onSelectionChange={onSelectionChange}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
				<SuggestionItem text="Canada" />
			</Input>
		);

		cy.get("#input-selection-change").shadow().find("input").click().realType("C");
		cy.get("#input-selection-change").shadow().find("input").realPress("ArrowDown");
		cy.get("@onSelectionChange").should("have.been.calledOnce");

		cy.get("#input-selection-change").find("ui5-suggestion-item").first().click();
		cy.get("@onSelectionChange").should("have.been.calledOnce");
	});
});

describe("Property open", () => {
	it("Suggestions picker is open when attribute open is set to true", () => {
		cy.mount(
			<Input id="input-suggestions-open" showSuggestions open>
				<SuggestionItem text="Item 1" />
				<SuggestionItem text="Item 2" />
				<SuggestionItem text="Item 3" />
			</Input>
		);

		cy.get("#input-suggestions-open")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.get("#input-suggestions-open").find("ui5-suggestion-item").should("have.length", 3);
	});

	it("Suggestions picker is closed when attribute open is set to false", () => {
		cy.mount(
			<Input id="input-suggestions-open" showSuggestions open={false}>
				<SuggestionItem text="Item 1" />
				<SuggestionItem text="Item 2" />
				<SuggestionItem text="Item 3" />
			</Input>
		);

		cy.get("#input-suggestions-open")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("should show only one valuestate popover when valueState changes during typing", () => {
		cy.mount(
			<Input
				id="input-valuestate-dynamic"
				valueState="None"
				showSuggestions={true}
				onInput={(e) => {
					(e.target as Input).valueState = "Negative";
				}}
			>
				<SuggestionItem text="Apple"></SuggestionItem>
			</Input>
		);

		cy.get("#input-valuestate-dynamic")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("@input")
			.realType("a");

		cy.get("@input")
			.should("have.attr", "value-state", "Negative");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("suggestionsPopover")
			.should("have.attr", "open");

		cy.get("@input")
			.realPress("Escape");

		cy.get("@input")
			.shadow()
			.find("[ui5-popover]")
			.as("valueStatePopover")
			.should("have.attr", "open");
	});
});

describe("Input Composition", () => {
	it("should handle Korean composition correctly", () => {
		cy.mount(
			<Input
				id="input-composition-korean"
				showSuggestions
				placeholder="Type in Korean ..."
			>
				<SuggestionItem text="안녕하세요" />
				<SuggestionItem text="고맙습니다" />
				<SuggestionItem text="사랑" />
				<SuggestionItem text="한국" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "사랑" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "사랑" });

		cy.get("@nativeInput")
			.invoke("val", "사랑")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@input").should("have.prop", "_isComposing", false);

		cy.get("@input").should("have.attr", "value", "사랑");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.realPress("Enter");

		cy.get("@input")
			.should("have.attr", "value", "사랑");
	});

	it("should handle Japanese composition correctly", () => {
		cy.mount(
			<Input
				id="input-composition-japanese"
				showSuggestions
				placeholder="Type in Japanese ..."
			>
				<SuggestionItem text="こんにちは" />
				<SuggestionItem text="ありがとう" />
				<SuggestionItem text="東京" />
				<SuggestionItem text="日本" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "ありがとう" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "ありがとう" });

		cy.get("@nativeInput")
			.invoke("val", "ありがとう")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@input").should("have.prop", "_isComposing", false);

		cy.get("@input").should("have.attr", "value", "ありがとう");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.realPress("Enter");

		cy.get("@input")
			.should("have.attr", "value", "ありがとう");
	});

	it("should handle Chinese composition correctly", () => {
		cy.mount(
			<Input
				id="input-composition-chinese"
				showSuggestions
				placeholder="Type in Chinese ..."
			>
				<SuggestionItem text="你好" />
				<SuggestionItem text="谢谢" />
				<SuggestionItem text="北京" />
				<SuggestionItem text="中国" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "谢谢" });

		cy.get("@input").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "谢谢" });

		cy.get("@nativeInput")
			.invoke("val", "谢谢")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@input").should("have.prop", "_isComposing", false);

		cy.get("@input").should("have.attr", "value", "谢谢");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.realPress("Enter");

		cy.get("@input")
			.should("have.attr", "value", "谢谢");
	});
});

describe("Validation inside a form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(
			<form>
				<Input id="inpForm" required></Input>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("[ui5-input]")
			.as("input")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#inpForm:invalid")
			.should("exist");

		cy.get("@input")
			.realType("Albania");

		cy.get("@input")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#inpForm:invalid")
			.should("not.exist");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.been.calledOnce");
	});

	it("has correct validity for typeMismatch- Email", () => {
		cy.mount(
			<form>
				<Input id="inpForm" required type="Email"></Input>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("[ui5-input]")
			.as("input")
			.realClick()
			.realType("email");

		cy.get("@input")
			.should("have.value", "email");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@input")
			.ui5AssertValidityState({
				formValidity: { typeMismatch: true },
				validity: { typeMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#inpForm:invalid")
			.should("exist");

		cy.get("@input")
			.shadow()
			.find("input")
			.clear();

		cy.get("@input")
			.realType("email@gmail.com");

		cy.get("@input")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#inpForm:invalid")
			.should("not.exist");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.been.calledOnce");
	});
		it("has correct validity for typeMismatch- URL", () => {
		cy.mount(
			<form>
				<Input id="inpForm" required type="URL"></Input>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("[ui5-input]")
			.as("input")
			.realClick()
			.realType("google");

		cy.get("@input")
			.should("have.value", "google");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@input")
			.ui5AssertValidityState({
				formValidity: { typeMismatch: true },
				validity: { typeMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#inpForm:invalid")
			.should("exist");

		cy.get("@input")
			.shadow()
			.find("input")
			.clear();

		cy.get("@input")
			.realType("https://www.google.com");

		cy.get("@input")
			.ui5AssertValidityState({
				formValidity: { typeMismatch: false },
				validity: { typeMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#inpForm:invalid")
			.should("not.exist");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.been.calledOnce");
	});
});

describe("Input built-in filtering", () => {
	it("StartsWith filtering", () => {
		cy.mount(
			<Input showSuggestions filter="StartsWith" noTypeahead>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
			</Input>
		);
		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.realClick()
			.realType("I");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(0)
			.should("be.visible");

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.should("have.attr", "hidden");

		cy.get("@input")
			.shadow()
			.find("input")
			.realClick()
			.realPress("Backspace");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@input")
			.shadow()
			.find("input")
			.realType("G");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(0)
			.should("have.attr", "hidden");

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.should("be.visible");
	});
	it("Contains filtering", () => {
		cy.mount(
			<Input showSuggestions filter="Contains" noTypeahead>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
			</Input>
		);
		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.realClick()
			.realType("o");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(0)
			.should("be.visible");

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.should("be.visible");

		cy.get("@input")
			.shadow()
			.find("input")
			.realClick()
			.realPress("Backspace");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@input")
			.shadow()
			.find("input")
			.realType("l");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(0)
			.should("have.attr", "hidden");

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.should("be.visible");
	});
	it("hides suggestion group when it has no matching items", () => {
		cy.mount(
			<Input showSuggestions filter="Contains" noTypeahead>
				<SuggestionItemGroup headerText="Metals">
					<SuggestionItem text="Iron"></SuggestionItem>
					<SuggestionItem text="Gold"></SuggestionItem>
				</SuggestionItemGroup>
				<SuggestionItemGroup headerText="Fruits">
					<SuggestionItem text="Apple"></SuggestionItem>
					<SuggestionItem text="Orange"></SuggestionItem>
				</SuggestionItemGroup>
			</Input>
		);
		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.realClick()
			.realType("o");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.eq(0)
			.should("be.visible");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.eq(1)
			.should("be.visible");

		cy.get("@input")
			.shadow()
			.find("input")
			.realType("l");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.eq(1)
			.should("have.attr", "hidden");
	});
});
