import Button from "../../src/Button.js";
import Popover from "../../src/Popover.js";
import Tab from "../../src/Tab.js";
import TabContainer from "../../src/TabContainer.js";
import TabSeparator from "../../src/TabSeparator.js";

describe("Mobile: TabContainer general interaction", () => {
	before(() => {
		cy.viewport('iphone-x');
	});

	it("should close the overflow popover when pressing the cancel button", () => {
		cy.mount(
		<TabContainer id="tabContainerNestedTabs">
			<Tab text="One">
				<Button>Button 1</Button>
			</Tab>

			<TabSeparator></TabSeparator>

			<Tab text="Two">
				<Button id="button2">Button 2</Button>
			</Tab>

			<Tab text="Fifteen"></Tab>
			<Tab text="Sixteen"></Tab>
			<Tab text="Seventeen"></Tab>
			<Tab text="Seven"></Tab>

		</TabContainer>);

		cy.get("#tabContainerNestedTabs")
			.shadow()
			.find(`[data-ui5-stable="overflow-end"]`)
			.realClick();

		cy.get<Popover>("#tabContainerNestedTabs")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get<Popover>("@popover").ui5PopoverOpened();

		cy.get("@popover").realClick();

		cy.get("@popover").should("have.prop", "open", false);	
	});
});