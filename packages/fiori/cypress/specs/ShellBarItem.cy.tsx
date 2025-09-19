import ShellBar from "../../src/ShellBar.js";
import ShellBarItem from "../../src/ShellBarItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Input from "@ui5/webcomponents/dist/Input.js";

describe("ShellBarItem getFocusDomRef", () => {
	it("should return the correct DOM element when item is in the bar", () => {
		cy.mount(
			<ShellBar id="shellbar-test">
				<ShellBarItem id="item1" icon="accept" text="Item 1" stable-dom-ref="item-1" />
			</ShellBar>
		);

		cy.get<ShellBarItem>("#item1")
			.then(($item) => {
				const focusRef = $item[0].getFocusDomRef();
				expect(focusRef).to.be.instanceOf(HTMLElement);
				expect(focusRef).has.attr('ui5-button');
				expect(focusRef?.getAttribute('data-ui5-stable')).to.equal('item-1');
			});
	});

	it("should return the correct DOM element when item is in overflow popover", () => {
		cy.mount(
			<ShellBar id="shellbar-overflow-test" showNotifications showProductSwitch>
				<Button icon="nav-back" slot="startButton" />
				<ShellBarItem id="overflow-item1" icon="accept" text="Item 1" stable-dom-ref="overflow-1" />
				<ShellBarItem id="overflow-item2" icon="alert" text="Item 2" stable-dom-ref="overflow-2" />
				<ShellBarItem id="overflow-item3" icon="attachment" text="Item 3" stable-dom-ref="overflow-3" />
				<Avatar slot="profile">
					<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
				</Avatar>
				<Input placeholder="Search" slot="searchField" />
			</ShellBar>
		);

		// Force overflow by resizing viewport
		cy.viewport(320, 800);
		
		// Open overflow popover
		cy.get("#shellbar-overflow-test")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.should("be.visible")
			.click();

		cy.get("#shellbar-overflow-test")
			.shadow()
			.find(".ui5-shellbar-overflow-popover")
			.should("be.visible");

		// Test when items are in overflow popover
		cy.get<ShellBarItem>("#overflow-item1")
			.then(($item) => {
				const focusRef = $item[0].getFocusDomRef();
				// When overflowed, should return the list item in the popover
				expect(focusRef?.hasAttribute('ui5-li'));
				expect(focusRef?.getAttribute('data-ui5-stable')).to.equal('overflow-1');
			});
	});
});
