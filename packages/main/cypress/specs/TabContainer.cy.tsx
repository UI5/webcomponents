import TabContainer from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";
import Button from "../../src/Button.js";
import List from "../../src/List.js";
import ListItem from "../../src/ListItemStandard.js";
import Separator from "../../src/TabSeparator.js"
import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import "@ui5/webcomponents-icons/dist/employee.js"
import "@ui5/webcomponents-icons/dist/menu.js"
import "@ui5/webcomponents-icons/dist/menu2.js"
import "@ui5/webcomponents-icons/dist/card.js"
import "../../test/pages/styles/TabContainer.css"
import ResponsivePopover from "../../src/ResponsivePopover.js";

const tabContainerEndOverflow = <TabContainer id="tabContainerEndOverflow" overflowMode="End">
	<Tab design="Positive" text="One">
		<Button id="#buttonAddTab">Add Tab</Button>
	</Tab>
	<Tab design="Negative" text="Two" disabled>
		<Tab slot="items" text="2.1"></Tab>
	</Tab>
	<Tab design="Critical" text="Three">
		<Tab slot="items" design="Positive" text="3.1">
			<Button>Button 3</Button>
		</Tab>
	</Tab>
	<Tab text="Four"></Tab>
	<Tab text="Five">
		<Tab slot="items" text="nested in Five">
			<Tab slot="items" text="nested deeper in Five">text</Tab>
			text
		</Tab>
	</Tab>
	<Tab text="Six"></Tab>
	<Tab text="Seven"></Tab>
	<Separator></Separator>
	<Tab design="Positive" text="Eight"></Tab>
	<Tab design="Negative" text="Nine"></Tab>
	<Tab design="Critical" text="Ten"></Tab>
	<Tab text="Eleven"></Tab>
	<Separator></Separator>
	<Tab text="Twelve"></Tab>
	<Tab text="Thirteen" selected></Tab>
	<Tab text="Fourteen"></Tab>
	<Tab text="Fifteen"></Tab>
	<Tab text="Sixteen"></Tab>
	<Tab text="Seventeen"></Tab>
	<Tab text="Eighteen"></Tab>
	<Separator></Separator>
	<Tab text="Nineteen"></Tab>
	<Tab text="Twenty"></Tab>
	<Tab text="Twenty One"></Tab>
	<Tab text="Twenty Two"></Tab>
	<Tab text="Twenty Three"></Tab>
	<Tab text="Twenty Four"></Tab>
	<Separator></Separator>
	<Tab text="Twenty Five"></Tab>
	<Tab text="Twenty Six"></Tab>
	<Tab text="Twenty Seven"></Tab>
	<Separator></Separator>
	<Tab text="Twenty Eight"></Tab>
	<Tab text="Twenty Nine"></Tab>
	<Tab text="Thirty"></Tab>
</TabContainer>

const nestedTabsContainer = <TabContainer id="tabContainerNestedTabs">
	<Tab text="One">
		<Button>Button 1</Button>
	</Tab>
	<Separator></Separator>
	<Tab text="Two">
		<Button id="button2">Button 2</Button>
		<Tab slot="items" text="2.1">
			<Button id="button21">Button 21</Button>
			<Tab slot="items" text="2.1.1" selected>
				<Button id="button211">Button 211</Button>
			</Tab>
			<Separator slot="items"></Separator>
			<Tab slot="items" text="2.1.2">
				<Tab slot="items" text="2.1.2.1">
					<Button id="button2121">Button 2121</Button>
				</Tab>
				<Button id="button212">Button 212</Button>
			</Tab>
		</Tab>
		<Tab text="2.2" slot="items">
			Text for 2.2
		</Tab>
	</Tab>
	<Tab text="Three">
		<Tab slot="items" icon="sap-icon://menu2" text="3.1">
			<Button>Button 3.1</Button>
			<Tab slot="items" icon="sap-icon://menu2" text="3.1.1">
				<Button>Button 3.1.1</Button>
			</Tab>
			<Separator slot="items"></Separator>
			<Tab slot="items" icon="sap-icon://menu2" text="3.1.2">
				<Button>Button 3.1.2</Button>
			</Tab>
		</Tab>
	</Tab>
	<Tab text="Four">
		<Button>Button 4</Button>
		<Separator slot="items"></Separator>
		<Tab slot="items" text="Four 1">
			<Button>Button 41</Button>
			<Separator slot="items"></Separator>
			<Tab design="Positive" slot="items" text="Four 1.1">
				<Button>Button 411</Button>
				<Separator slot="items"></Separator>
				<Tab slot="items" text="Four 1.1.1">
					<Button>Button 4111</Button>
					<Separator slot="items"></Separator>
					<Tab slot="items" text="Four 1.1.1.1">
						<Button>Button 41111</Button>
						<Separator slot="items"></Separator>
					</Tab>
				</Tab>
			</Tab>
		</Tab>
	</Tab>
	<Tab text="Five">Tab Content</Tab>
	<Tab text="Six">Tab Content</Tab>
	<Tab text="Seven"></Tab>
	<Separator>Tab Content</Separator>
	<Tab text="Eight">Tab Content</Tab>
	<Tab text="Nine">Tab Content</Tab>
	<Tab text="Ten">Tab Content
		<Tab slot="items" text="Ten 1">Tab 10.1 Content
			<Tab slot="items" text="Ten 1.1">Tab 10.1.1 Content
				<Separator slot="items"></Separator>
				<Tab slot="items" text="Ten 1.1.1">Tab Content
					<Tab slot="items" text="Ten 1.1.1.1"></Tab>
				</Tab>
			</Tab>
		</Tab>
	</Tab>
	<Tab text="Eleven"></Tab>
	<Separator></Separator>
	<Tab text="Twelve"></Tab>
	<Tab text="Thirteen"></Tab>
	<Tab text="Fourteen">
		<Tab slot="items" text="Fourteen 1">1
			<Tab slot="items" text="Fourteen 1.1">1.1</Tab>
		</Tab>
		<Tab slot="items" text="Fourteen 2">2
			<Tab slot="items" text="Fourteen 2.1">2.1
				<Tab slot="items" text="Fourteen 2.1.1">2.1.1</Tab>
			</Tab>
			<Tab slot="items" text="Fourteen 2.2">2.2</Tab>
		</Tab>
	</Tab>
	<Tab text="Fifteen"></Tab>
	<Tab text="Sixteen"></Tab>
	<Tab text="Seventeen"></Tab>
	<Separator></Separator>
	<Tab text="Eighteen"></Tab>
</TabContainer>;

const tabContainerIconOnly = <TabContainer id="tabContainerIconOnly">
	<Tab icon="sap-icon://card">
		<Button>Button 11</Button>
		<Button>Button 12</Button>
	</Tab>
	<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>
	<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>
	<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>
	<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>				<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>				<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>				<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>				<Tab icon="sap-icon://employee">
		<Button>Button 3</Button>
	</Tab>
</TabContainer>

describe("TabContainer general interaction", () => {
	it("Tests no auto selection", () => {
		cy.mount(
			<TabContainer noAutoSelection id="tcNoAuto">
				<Tab text="Products ID">
					tab1
				</Tab>
				<Tab text="Availability">
					tab2
				</Tab>
				<Tab text="Expiration Date">
					tab3
				</Tab>
			</TabContainer>
		);

		cy.get("#tcNoAuto")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				allItems.forEach(item => {
					cy.wrap(item).should("have.prop", "selected", false);
				});
			});
	});

	it("tests initially selected tab", () => {
		cy.mount(
			<TabContainer id="tcWithSelectedTab">
				<Tab text="Products ID" selected>
					tab1
				</Tab>
				<Tab text="Availability">
					tab2
				</Tab>
			</TabContainer>
		);
		cy.get("#tcWithSelectedTab")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";
				cy.wrap(allItems[0].getDomRefInStrip()).should("have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[1].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS)
			});
	});

	it("tests initially no explicitly selected tab", () => {
		cy.mount(tabContainerIconOnly);
		cy.get("#tabContainerIconOnly").shadow()
			.find('slot[name="default-1"]').should("exist");
	});

	it("tests empty tab container", () => {
		cy.mount(
			<TabContainer id="tabContainerEmpty">
			</TabContainer>
		)
		cy.get("#tabContainerEmpty").should("be.visible");
	});

	it("tests tabSelect event", () => {
		cy.mount(
			<TabContainer id="tabContainer1" collapsed>
				<Tab stable-dom-ref="products-ref" text="Products" additionalText="125"></Tab>
				<Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additionalText="25"></Tab>
				<Tab icon="sap-icon://menu" text="Monitors" selected design="Critical"></Tab>
				<Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additionalText="15"></Tab>
				<Tab icon="sap-icon://menu2" disabled text="Disabled" design="Negative" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Default" additionalText="40"></Tab>
			</TabContainer>
		)
		cy.get("#tabContainer1").shadow().find(".ui5-tab-strip-item:nth-child(2)").as("tab");

		cy.get("@tab").realClick();

		cy.get("#tabContainer1").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Laptops";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab.getDomRefInStrip()).should("have.class", "ui5-tab-strip-item--selected");
			cy.wrap(selectedTab.getDomRefInStrip()).find(".ui5-tab-strip-itemText").should("have.text", SELECTED_TAB_TEXT);
			cy.wrap(tabContainer.allItems.indexOf(selectedTab)).should('eq', 1)
		});
	});

	it("tests preventing tabSelect", () => {
		const handleTabSelect = (e: CustomEvent) => {
			e.preventDefault(); // Prevents the tab from being selected
		};
		cy.mount(
			<TabContainer id="tabContainer1" collapsed onTabSelect={handleTabSelect}>
				<Tab stable-dom-ref="products-ref" text="Products" additionalText="125"></Tab>
				<Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additionalText="25"></Tab>
				<Tab icon="sap-icon://menu" text="Monitors" selected design="Critical"></Tab>
				<Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additionalText="15"></Tab>
				<Tab icon="sap-icon://menu2" disabled text="Disabled" design="Negative" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Default" additionalText="40"></Tab>
			</TabContainer>
		)

		cy.get("#tabContainer1").shadow().find(".ui5-tab-strip-item--selected").as("selectedTab");
		cy.get("#tabContainer1").shadow().find(".ui5-tab-strip-item:nth-child(4)").as("newTab");

		cy.get('@selectedTab').then((selectedTab) => {
			const selectedTabId = selectedTab.attr("id");
			cy.get('@newTab').should((newTab) => {
				expect(newTab.attr("id")).not.to.eq(selectedTabId, "tabs to test are different");
			});
		});

		cy.get("@newTab").click();

		cy.get("@newTab").should("not.have.class", "ui5-tab-strip-item--selected");
		cy.get("#tabContainer1").shadow().find(".ui5-tab-strip-item:nth-child(3)").should("have.class", "ui5-tab-strip-item--selected");
	});

	it("tests custom media ranges", () => {
		cy.mount(tabContainerIconOnly)
		cy.get("#tabContainerIconOnly").should("be.visible");

		cy.viewport(520, 1080);
		cy.get("#tabContainerIconOnly").invoke('attr', 'media-range').should('eq', 'S');

		cy.viewport(650, 1080);
		cy.get("#tabContainerIconOnly").invoke('attr', 'media-range').should('eq', 'M');

		cy.viewport(1350, 1080);
		cy.get("#tabContainerIconOnly").invoke('attr', 'media-range').should('eq', 'L');

		cy.viewport(1650, 1080);
		cy.get("#tabContainerIconOnly").invoke('attr', 'media-range').should('eq', 'XL');
	});

	it("tests if content is scrollable when tab-container takes limited height by its parent", () => {
		cy.mount(
			<TabContainer style="height:300px" id="tc-scrollable-child">
				<Tab text="Tab 1" selected id="scrollable-tab">
					<Button>Toggle style</Button>
					<List separators="Inner">
						<ListItem >Option 1</ListItem>
						<ListItem >Option 2</ListItem>
						<ListItem >Option 4</ListItem>
						<ListItem >Option 5</ListItem>
						<ListItem >Option 6</ListItem>
						<ListItem >Option 7</ListItem>
						<ListItem >Option 8</ListItem>
						<ListItem >Option 9</ListItem>
						<ListItem >Option 10</ListItem>
						<ListItem >Option 11</ListItem>
						<ListItem >Option 12</ListItem>
						<ListItem >Option 13</ListItem>
						<ListItem >Option 14</ListItem>
						<ListItem >Option 15</ListItem>
						<ListItem >Option 16</ListItem>
						<ListItem >Option 17</ListItem>
						<ListItem >Option 18</ListItem>
						<ListItem >Option 19</ListItem>
						<ListItem >Option 20</ListItem>
						<ListItem >Option 21</ListItem>
						<ListItem >Option 22</ListItem>
						<ListItem >Option 23</ListItem>
						<ListItem >Option 24</ListItem>
						<ListItem >Option 25</ListItem>
						<ListItem >Option 26</ListItem>
						<ListItem >Option 27</ListItem>
						<ListItem >Option 28</ListItem>
						<ListItem >Option 29</ListItem>
						<ListItem >Option 30</ListItem>
						<ListItem >Option 31</ListItem>
						<ListItem >Option 32</ListItem>
						<ListItem >Option 33</ListItem>
						<ListItem >Option 34</ListItem>
						<ListItem >Option 35</ListItem>
						<ListItem >Option 36</ListItem>
						<ListItem >Option 37</ListItem>
						<ListItem >Option 38</ListItem>
						<ListItem >Option 39</ListItem>
						<ListItem >Option 40</ListItem>
						<ListItem >Option 41</ListItem>
						<ListItem >Option 42</ListItem>
						<ListItem >Option 43</ListItem>
						<ListItem >Option 44</ListItem>
						<ListItem >Option 45</ListItem>
					</List>
				</Tab>
			</TabContainer>
		)

		cy.get("#tc-scrollable-child").should(el => expect(el.height()).gte(el.prop("scrollHeight")));
		cy.get("#scrollable-tab").should(el => expect(el.height()).lt(el.prop("scrollHeight")));

	});

	it("tests ARIA attributes", () => {
		cy.mount(
			<TabContainer id="tabContainer1" collapsed>
				<Tab stable-dom-ref="products-ref" text="Products" additionalText="125"></Tab>
				<Separator></Separator>
				<Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additionalText="25"></Tab>
				<Tab icon="sap-icon://menu" text="Monitors" selected design="Critical"></Tab>
				<Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additionalText="15"></Tab>
				<Tab icon="sap-icon://menu2" disabled text="Disabled" design="Negative" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Default" additionalText="40"></Tab>
			</TabContainer>
		);

		cy.get("#tabContainer1").shadow().find(".ui5-tab-strip-item:nth-child(4)").as("tab4");
		cy.get("#tabContainer1").shadow().find(".ui5-tc__tabStrip").should("not.have.attr", "aria-describedby");
		cy.get("#tabContainer1").shadow().find(".ui5-hidden-text").should("not.exist");
		// assert: The TabContainer has 8 children, 7 tabs and 1 separator (at position 2)
		// and the separator should be skipped in terms of aria-posinset and aria-setsize,
		// so for child number 4 ("Monitors") we expect the following attributes aria-posinset="3" and aria-setsize="7".
		cy.get("@tab4").should("have.attr", "aria-posinset", "3");
		cy.get("@tab4").should("have.attr", "aria-setsize", "7");
		cy.get("@tab4").should("have.attr", "role", "tab");
		cy.get("@tab4").should("not.have.attr", "aria-roledescription");
	});

	it("tests ARIA attributes when sub tabs ", () => {
		cy.mount(
			nestedTabsContainer
		);

		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tab-strip-item:nth-child(1)").as("tab1");
		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tab-strip-item:nth-child(3)").as("tab2");
		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tab-strip-item:nth-child(4)").as("tab3");
		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tc__tabStrip").should("have.attr", "aria-describedby");
		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-hidden-text").should("exist");
		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-hidden-text").invoke("attr", "id").then((hiddenTextId) => {
			cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tc__tabStrip").should("have.attr", "aria-describedby", hiddenTextId);
		});
		cy.get("@tab1").should("not.have.attr", "aria-haspopup");
		cy.get("@tab2").should("not.have.attr", "aria-haspopup");
		cy.get("@tab3").should("have.attr", "aria-haspopup");
	});

	it("tests start and end overflow behavior", () => {
		cy.mount(
			<TabContainer id="tabContainerStartAndEndOverflow" overflowMode="StartAndEnd">
				<Tab text="One">Tab 1</Tab>
				<Tab text="Two">Tab 2</Tab>
				<Tab text="Three">Tab 3</Tab>
				<Tab text="Four">Tab 4</Tab>
				<Tab text="Five">Tab 5</Tab>
				<Tab text="Six">Tab 6</Tab>
				<Tab text="Seven">Tab 7</Tab>
				<Tab text="Eight">Tab 8</Tab>
				<Tab text="Nine">Tab 9</Tab>
				<Tab text="Ten">Tab 10</Tab>
				<Tab text="Eleven">Tab 11</Tab>
				<Tab text="Twelve">Tab 12</Tab>
				<Tab text="Thirteen">Tab 13</Tab>
				<Tab text="Fourteen">Tab 14</Tab>
				<Tab text="Fifteen">Tab 15</Tab>
				<Tab text="Sixteen">Tab 16</Tab>
				<Tab text="Seventeen">Tab 17</Tab>
				<Tab text="Eighteen">Tab 18</Tab>
				<Tab text="Nineteen">Tab 19</Tab>
				<Tab text="Twenty" selected>Twenty</Tab>
				<Tab text="Twenty One">Twenty One</Tab>
				<Tab text="Twenty Two">Twenty Two</Tab>
				<Tab text="Twenty Three">Twenty Three</Tab>
				<Tab text="Twenty Four">Twenty Four</Tab>
				<Tab text="Twenty Five">Twenty Five</Tab>
				<Tab text="Twenty Six">Twenty Six</Tab>
				<Tab text="Twenty Seven">Twenty Seven</Tab>
				<Tab text="Twenty Eight">Twenty Eight</Tab>
				<Tab text="Twenty Nine">Twenty Nine</Tab>
				<Tab text="Thirty">Thirty</Tab>
			</TabContainer>
		);

		cy.viewport(1000, 1080);

		cy.get("#tabContainerStartAndEndOverflow").shadow().find(".ui5-tc__overflow--start").as("startOverflow");
		cy.get("#tabContainerStartAndEndOverflow").should("have.attr", "overflow-mode", "StartAndEnd");
		cy.get("@startOverflow").should("have.text", "+12");


		cy.viewport(800, 1080);
		cy.get("@startOverflow").should("have.text", "+14");

		// Select
		cy.get("#tabContainerStartAndEndOverflow").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Twenty";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab.getDomRefInStrip()).find(".ui5-tab-strip-itemText").should("have.text", SELECTED_TAB_TEXT);
		});

		cy.get("@startOverflow").click();
		cy.get("#tabContainerStartAndEndOverflow").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).should("have.text", "One");
		cy.get("@list").find("ui5-li-custom").eq(0).click();
		cy.get("#tabContainerStartAndEndOverflow").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "One";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab.getDomRefInStrip()).find(".ui5-tab-strip-itemText").should("have.text", SELECTED_TAB_TEXT);
		});
	});

	it.skip("tests start and end overflow behavior - tabs don't move to the right if there is enough space", () => {
		cy.mount(
			<TabContainer id="tabContainerStartAndEndOverflow" overflowMode="StartAndEnd">
				<Tab text="One">Tab 1</Tab>
				<Tab text="Two">Tab 2</Tab>
				<Tab text="Three">Tab 3</Tab>
				<Tab text="Four">Tab 4</Tab>
				<Tab text="Five">Tab 5</Tab>
				<Tab text="Six">Tab 6</Tab>
				<Tab text="Seven">Tab 7</Tab>
				<Tab text="Eight">Tab 8</Tab>
				<Tab text="Nine">Tab 9</Tab>
				<Tab text="Ten" selected>Tab 10</Tab>
				<Tab text="Eleven">Tab 11</Tab>
				<Tab text="Twelve">Tab 12</Tab>
				<Tab text="Thirteen">Tab 13</Tab>
				<Tab text="Fourteen">Tab 14</Tab>
				<Tab text="Fifteen">Tab 15</Tab>
				<Tab text="Sixteen">Tab 16</Tab>
				<Tab text="Seventeen">Tab 17</Tab>
				<Tab text="Eighteen">Tab 18</Tab>
				<Tab text="Nineteen">Tab 19</Tab>
				<Tab text="Twenty">Twenty</Tab>
				<Tab text="Twenty One">Twenty One</Tab>
				<Tab text="Twenty Two">Twenty Two</Tab>
				<Tab text="Twenty Three">Twenty Three</Tab>
				<Tab text="Twenty Four">Twenty Four</Tab>
				<Tab text="Twenty Five">Twenty Five</Tab>
				<Tab text="Twenty Six">Twenty Six</Tab>
				<Tab text="Twenty Seven">Twenty Seven</Tab>
				<Tab text="Twenty Eight">Twenty Eight</Tab>
				<Tab text="Twenty Nine">Twenty Nine</Tab>
				<Tab text="Thirty">Thirty</Tab>
			</TabContainer>
		);

		cy.viewport(600, 1080);

		cy.get("#tabContainerStartAndEndOverflow").shadow().find(".ui5-tc__overflow--start").as("startOverflow");
		cy.get("#tabContainerStartAndEndOverflow").should("have.attr", "overflow-mode", "StartAndEnd");
		cy.get("@startOverflow").should("have.text", "+4");

		cy.get("#tabContainerStartAndEndOverflow").shadow().find(".ui5-tab-strip-item:nth-child(5)").as("tab5");
		cy.get("@tab5").click();

		cy.get("@startOverflow").should("have.text", "+4");
	});

	it("tests end overflow behavior", () => {
		cy.mount(tabContainerEndOverflow);
		cy.viewport(1000, 1080);

		cy.get("#tabContainerEndOverflow").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("#tabContainerEndOverflow").should("have.attr", "overflow-mode", "End");
		cy.get("@endOverflow").should("have.text", "More");

		// Select
		cy.get("#tabContainerEndOverflow").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Thirteen";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab.getDomRefInStrip()).find(".ui5-tab-strip-itemText").should("have.text", SELECTED_TAB_TEXT);
		});

		cy.get("@endOverflow").click();
		cy.get("#tabContainerEndOverflow").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).should("have.text", "Eleven");
		cy.get("@list").find("ui5-li-custom").eq(0).click();
		cy.get("#tabContainerEndOverflow").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Eleven";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab.getDomRefInStrip()).find(".ui5-tab-strip-itemText").should("have.text", SELECTED_TAB_TEXT);
		});
	});

	it("tests removing of responsive paddings for the content", () => {
		cy.mount(
			<TabContainer class="tabContainerNoContentPaddings" style="padding-left: 0px; padding-right: 0px;">
				<Tab icon="sap-icon://card" selected>
					<Table>
						<TableHeaderCell slot="default">Source</TableHeaderCell>
						<TableHeaderCell slot="default">Method</TableHeaderCell>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
					</Table>
				</Tab>
				<Tab icon="sap-icon://employee">
					<Table>
						<TableHeaderCell slot="default">Source</TableHeaderCell>
						<TableHeaderCell slot="default">Method</TableHeaderCell>
						<TableRow>
							<TableCell>Cell 3</TableCell>
							<TableCell>Cell 4</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 3</TableCell>
							<TableCell>Cell 4</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 3</TableCell>
							<TableCell>Cell 4</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 3</TableCell>
							<TableCell>Cell 4</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 3</TableCell>
							<TableCell>Cell 4</TableCell>
						</TableRow>
					</Table>
				</Tab>
			</TabContainer>
		);

		cy.get(".tabContainerNoContentPaddings")
			.should("be.visible")
			.shadow()
			.find(".ui5-tc__content")
			.should("have.css", "padding-left", "0px");
	});

	it("tests nested tabs", () => {
		cy.mount(nestedTabsContainer)

		cy.get("#tabContainerNestedTabs").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tab-expand-button [ui5-button]").first().as("expandButton");
		cy.get("@expandButton").should("have.attr", "tooltip", "More");

		cy.get("@expandButton").click();
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@tabContainer").find("#button21").should("not.be.visible", "Content for tab 2.1 is not displayed");

		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).click();

		cy.get("@tabContainer").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "2.1";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});

		cy.get("@tabContainer").find("#button21").should("be.visible", "Proper content for tab 2.1 is displayed");
		cy.get("@tabContainer").find("#button211").should("not.be.visible", "Content for tab 2.1.1 is not displayed");
		cy.get("@expandButton").click();
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(1).click();
		cy.get("@tabContainer").find("#button21").should("not.be.visible", "Content for tab 2.1 is not displayed");
		cy.get("@tabContainer").find("#button211").should("be.visible", "Proper content for tab 2.1.1 is displayed");
		cy.get("@tabContainer").find("#button2121").should("not.be.visible", "Content for tab 2.1.2.1 is not displayed");

		cy.get("@expandButton").click();
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(4).click();
		cy.get("@tabContainer").find("#button21").should("not.be.visible", "Content for tab 2.1 is not displayed");
		cy.get("@tabContainer").find("#button211").should("not.be.visible", "Content for tab 2.1.1 is not displayed");
		cy.get("@tabContainer").find("#button2121").should("be.visible", "Proper content for tab 2.1.2.1 is displayed");

		cy.get("@tabContainer").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "2.1.2.1";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});
	});

	it("tests custom overflow buttons via slots", () => {
		cy.mount(
			<TabContainer id="tabContainerCustomOverflowButtons" overflowMode="StartAndEnd" collapsed>
				<Button slot="startOverflowButton" id="startOverflowButton">Start</Button>
				<Button slot="overflowButton" id="endOverflowButton">End</Button>
				<Tab text="One"></Tab>
				<Tab text="Two"></Tab>
				<Tab text="Three"></Tab>
				<Tab text="Four"></Tab>
				<Tab text="Five"></Tab>
				<Tab text="Six"></Tab>
				<Tab text="Seven"></Tab>
				<Tab text="Eight"></Tab>
				<Tab text="Nine"></Tab>
				<Tab text="Ten"></Tab>
				<Tab text="Eleven"></Tab>
				<Tab text="Twelve"></Tab>
				<Tab text="Thirteen"></Tab>
				<Tab text="Fourteen"></Tab>
				<Tab text="Fifteen"></Tab>
				<Tab text="Sixteen"></Tab>
				<Tab text="Seventeen"></Tab>
				<Tab text="Eighteen"></Tab>
				<Tab text="Nineteen"></Tab>
				<Tab text="Twenty" selected></Tab>
				<Tab text="Twenty One"></Tab>
				<Tab text="Twenty Two"></Tab>
				<Tab text="Twenty Three"></Tab>
				<Tab text="Twenty Four"></Tab>
				<Tab text="Twenty Five"></Tab>
				<Tab text="Twenty Six"></Tab>
				<Tab text="Twenty Seven"></Tab>
				<Tab text="Twenty Eight"></Tab>
				<Tab text="Twenty Nine"></Tab>
				<Tab text="Thirty"></Tab>
			</TabContainer>
		)

		cy.viewport(1000, 1080);

		cy.get("#tabContainerCustomOverflowButtons").should("have.attr", "overflow-mode", "StartAndEnd");

		cy.get("#tabContainerCustomOverflowButtons").shadow().find('slot[name=startOverflowButton]').should("exist");
		cy.get("#tabContainerCustomOverflowButtons").shadow().find('slot[name=overflowButton]').should("exist");

		cy.get("#tabContainerCustomOverflowButtons").find("#startOverflowButton").should("be.visible").as("startOverflow");
		cy.get("#tabContainerCustomOverflowButtons").find("#endOverflowButton").should("be.visible").as("endOverflow");

		cy.get("#tabContainerCustomOverflowButtons").find("#startOverflowButton").should("have.text", "Start");
		cy.get("#tabContainerCustomOverflowButtons").find("#endOverflowButton").should("have.text", "End");

		cy.get("@startOverflow").click();
		cy.get("#tabContainerCustomOverflowButtons").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).click();

		cy.get("#tabContainerCustomOverflowButtons").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "One";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});

		cy.get("@endOverflow").click();
		cy.get("#tabContainerCustomOverflowButtons").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).click();
		cy.get("#tabContainerCustomOverflowButtons").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Twelve";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});
	});

	it("selecting a tab programmatically will update the tab strip", () => {
		cy.mount(
			<TabContainer id="tcSmall" style="width: 200px;">
				<Tab id="firstTab" text="First tab">
					<Button>Button 1</Button>
				</Tab>
				<Tab text="Second tab">
					<Button>Button 1</Button>
				</Tab>
				<Tab text="Third tab" selected>
					<Button>Button 1</Button>
				</Tab>
				<Tab text="Fourth tab">
					<Button>Button 1</Button>
				</Tab>
				<Tab text="Fifth tab">
					<Button>Button 1</Button>
				</Tab>
				<Tab text="Sixth tab">
					<Button>Button 1</Button>
				</Tab>
				<Tab id="nestedTabParent" text="Seventh tab">
					<Button>Button 1</Button>

					<Tab id="nestedTab" slot="items" text="Nested tab">
						<Button>Button 1</Button>
					</Tab>
				</Tab>
				<Tab id="lastTab" text="Eighth tab">
					<Button>Button 1</Button>
				</Tab>
			</TabContainer>
		)

		cy.get("#tcSmall").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__tabStrip").as("tabStrip");
		cy.get("@tabContainer").find("#firstTab").as("firstTabInStrip");
		cy.get("@tabContainer").find("#lastTab").should("not.be.visible")

		cy.get("@tabContainer").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("@endOverflow").click();
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(7).click();

		cy.get("@tabContainer").find("#lastTab").should("be.visible", "Last tab is now visible in the strip");

		cy.get("@tabContainer").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Eighth tab";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});

		cy.get("@tabContainer").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("@endOverflow").click();
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).click();

		cy.get("@tabContainer").find("#firstTab").should("be.visible", "First tab is now visible in the strip");
		cy.get("@tabContainer").find("#lastTab").should("not.be.visible", "Last tab is not visible in the strip");
		cy.get("#tcSmall").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "First tab";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});

		cy.get("@tabContainer").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("@endOverflow").click();
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(6).click();

		cy.get("@tabContainer").find("#firstTab").should("not.be.visible", "First tab is not visible in the strip");
		cy.get("@tabContainer").find("#lastTab").should("not.be.visible", "Last tab is not visible in the strip");

		cy.get("@tabContainer").then((tc) => {
			const tabContainer = tc.get(0) as TabContainer;
			const SELECTED_TAB_TEXT = "Nested tab";
			const selectedTab = tabContainer._selectedTab;
			cy.wrap(selectedTab).should("have.attr", "text", SELECTED_TAB_TEXT);
		});

		cy.get("@tabContainer").find("#nestedTabParent").should("be.visible", "Nested tab parent is visible in the strip");
	});


	it("tests effective selected tab", () => {
		const addTabsProgrammatically = () => {
			const tabContainer = document.getElementById("tabContainerAddTabsProgrammatically") as TabContainer;
			tabContainer.items.forEach(item => ((item as Tab).selected = false));
			let tabIndex = 1;
			function addTab(selected = false) {
				tabContainer.appendChild(
					Object.assign(document.createElement("ui5-tab"), {
						text: `Tab ${++tabIndex}`,
						selected
					})
				);
			}
			addTab(true);
			addTab();
			addTab();
		};

		cy.mount(
			<TabContainer id="tabContainerAddTabsProgrammatically">
				<Tab text="Tab 0" selected>
					<Button id="buttonAddTabs" onClick={addTabsProgrammatically}>add tabs</Button>
				</Tab>
				<Tab text="Tab 1"></Tab>
			</TabContainer>
		);

		cy.get("#tabContainerAddTabsProgrammatically")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";
				cy.wrap(allItems[0].getDomRefInStrip()).should("have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[1].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS)
			});

		cy.get("#buttonAddTabs").click();

		cy.get("#tabContainerAddTabsProgrammatically")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";
				cy.wrap(allItems[0].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[1].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[2].getDomRefInStrip()).should("have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[3].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS);
				cy.wrap(allItems[4].getDomRefInStrip()).should("not.have.class", SELECTION_CSS_CLASS);
			});
	});

	it("tests effective selected tab when there is no explicitly selected tab", () => {
		const addNewTab = () => {
			const tabContainer = document.getElementById("tabContainerNoExplicitlySelectedTab") as TabContainer;
			tabContainer.appendChild(
				Object.assign(document.createElement("ui5-tab"), {
					text: `New Tab`,
				})
			)
		};
		cy.mount(
			<TabContainer id="tabContainerNoExplicitlySelectedTab">
				<Tab text="Tab 0">
					<Button id="buttonAddTabAtNoExplicitlySelectedTab" onClick={addNewTab}>add new tab at the beginning</Button>
				</Tab>
				<Tab text="Tab 1"></Tab>
			</TabContainer>
		)

		cy.get("#tabContainerNoExplicitlySelectedTab")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				let effectiveSelectedArr = allItems.map(tab => (tab as Tab).effectiveSelected);
				let effectiveSelectedTabs = effectiveSelectedArr.filter(Boolean);

				cy.wrap(effectiveSelectedTabs.length).should("eq", 1, "Only 1 tab is effectively selected");
				cy.wrap(effectiveSelectedArr[0]).should("be.true", "First tab is effectively selected");

				const allTabs = tabContainer.allItems;

				effectiveSelectedArr = allTabs.map(tab => (tab as Tab).effectiveSelected);
				effectiveSelectedTabs = effectiveSelectedArr.filter(Boolean);
				cy.wrap(effectiveSelectedTabs.length).should("eq", 1, "Only 1 tab is effectively selected");
				cy.wrap(effectiveSelectedArr[0]).should("be.true", "First tab is effectively selected");
			});

		cy.get("#buttonAddTabAtNoExplicitlySelectedTab").click();


		cy.get("#tabContainerNoExplicitlySelectedTab")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allTabs = tabContainer.allItems;

				let effectiveSelectedArr = allTabs.map(tab => (tab as Tab).effectiveSelected);
				let effectiveSelectedTabs = effectiveSelectedArr.filter(Boolean);
				cy.wrap(effectiveSelectedTabs.length).should("eq", 1, "Only 1 tab is effectively selected");
				cy.wrap(effectiveSelectedArr[0]).should("be.true", "First tab is effectively selected");
			});

	});

	it("tests tabs dom ref", () => {
		cy.mount(
			<TabContainer id="tabContainer1Compact" collapsed>
				<Tab stable-dom-ref="products-ref" text="Products" additionalText="125"></Tab>
				<Separator></Separator>
				<Tab icon="sap-icon://menu2" text="Laptops" design="Positive" additionalText="25"></Tab>
				<Tab icon="sap-icon://menu" text="Monitors" selected design="Critical" additionalText="45"></Tab>
				<Tab icon="sap-icon://menu2" text="Keyboards" design="Negative" additionalText="15"></Tab>
				<Tab icon="sap-icon://menu2" disabled text="Disabled" design="Negative" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Neutral" design="Neutral" additionalText="40"></Tab>
				<Tab icon="sap-icon://menu2" text="Default" additionalText="40"></Tab>
			</TabContainer>
		);

		cy.get("#tabContainer1Compact").as("tabContainer");

		cy.get("@tabContainer").find("[stable-dom-ref='products-ref']").then((element) => {
			cy.get("@tabContainer").find("[stable-dom-ref='products-ref']").first().then((stableElement) => {
				expect(element.get(0)).to.equal(stableElement.get(0), "The tab's dom ref and stable dom ref should be the same");
			}
			)
		})

		cy.get("@tabContainer").then(tc => {
			const tabContainer = tc.get(0) as TabContainer;
			const allItems = tabContainer.allItems;

			cy.get("@tabContainer").find("[stable-dom-ref='products-ref']").then((element) => {
				expect(allItems[0]).to.equal(element.get(0), "The tab's dom ref in strip and the tab's dom ref should be the same");
			});
		});
	});

	it("tests inline visualization", () => {
		cy.mount(
			<TabContainer tabLayout="Inline" id="tabContainerInlineTab">
				<Tab icon="sap-icon://card" text="Tab 1" additionalText="123">
					<div class="tabcontainer2auto">
						<h4>Content with set height: 300px</h4>
						<Button>Button 11</Button>
						<Button>Button 12</Button>
					</div>
				</Tab>
				<Tab icon="sap-icon://menu2" text="Tab 2" additionalText="444" selected>
					<Button>Button 2</Button>
				</Tab>
				<Tab icon="sap-icon://employee" text="Tab 3" additionalText="123">
					<Button>Button 3</Button>
				</Tab>
			</TabContainer>
		)

		cy.get("#tabContainerInlineTab").as("tabContainer");
		cy.get("@tabContainer").should("have.attr", "tab-layout", "Inline");
		cy.get("@tabContainer").shadow().find(".ui5-tc__tabStrip").as("tabStrip");

		cy.get("@tabStrip").find(".ui5-tab-strip-itemText").should("exist");
		cy.get("@tabStrip").find(".ui5-tab-strip-itemAdditionalText").should("not.exist");
		cy.get("@tabStrip").find(".ui5-tab-strip-itemText").should("have.prop", "innerText", "Tab 1 (123)");
	});

	it("test focus() right after tab is inserted in the tab container", () => {
		const insertTabAndFocus = () => {
			const tabContainer = document.getElementById("testFocusedTabAfterInsertion") as TabContainer;
			tabContainer.appendChild(
				Object.assign(document.createElement("ui5-tab"), {
					text: `New Tab`,
					id: "newlyInsertedFocusedTab"
				})
			)
			document.getElementById("newlyInsertedFocusedTab").focus();
		}

		cy.mount(
			<TabContainer id="testFocusedTabAfterInsertion">
				<Tab text="One">
					<Button id="insertAndFocusNewTab" onClick={insertTabAndFocus}>Insert and Focus New Tab</Button>
					<Button>Button 1</Button>
				</Tab>
			</TabContainer>
		)

		cy.get("#insertAndFocusNewTab").click();
		cy.get("#testFocusedTabAfterInsertion").then(tc => {
			const tabContainer = tc.get(0) as TabContainer;
			const tabInStrip = tabContainer.allItems[1].getDomRefInStrip();
			cy.wrap(tabInStrip).should("be.focused", "Newly inserted tab should be focused");
		});
	});

	it("test focus() on tab in overflow", () => {
		cy.mount(
			<TabContainer id="narrowTabContainer" overflowMode="End" style="width: 200px;">
				<Tab text="Tab 1"></Tab>
				<Tab text="Tab 2"></Tab>
				<Tab text="Tab 3"></Tab>
				<Tab text="Tab 4"></Tab>
				<Tab text="Tab 5"></Tab>
			</TabContainer>
		)
		cy.get("#narrowTabContainer").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("@endOverflow").click();

		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").find("ui5-li-custom").eq(0).should("be.focused", "Tab 2 should be focused");
	});

	it("test sub items selection", () => {
		cy.mount(
			nestedTabsContainer
		)

		cy.get("#tabContainerNestedTabs").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__tabStrip").as("tabStrip");
		cy.get("@tabStrip").find(".ui5-tab-strip-item").eq(2).as("thirdItem");
		cy.get("@thirdItem").realClick();
		cy.wait(500);
		cy.get("@thirdItem").type("{downarrow}");

		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get<ResponsivePopover>("@popover").ui5PopoverOpened();
		cy.get("@list").find("ui5-li-custom").eq(3).as("thirdPopoverItem");
		cy.get("@thirdPopoverItem").should("exist");
		cy.get("@thirdPopoverItem").should("not.have.prop", "selected", "Third item in the popover is not selected");
		cy.get("@thirdPopoverItem").realClick();

		cy.get("@thirdItem").type("{downarrow}");
		cy.get("@thirdItem").type("{esc}");

		cy.get("@thirdPopoverItem").should("have.attr", "selected");
	});
});

describe("TabContainer keyboard handling", () => {
	it("Tests preventing of known and unknown events on tab", () => {
		cy.mount(
			<TabContainer id="tc">
				<Tab text="Tab 1" movable={true}>tab 1</Tab>
			</TabContainer>
		);

		cy.get("#tc")
			.find<Tab>("[text='Tab 1']")
			.then(tab => {
				return tab[0].getDomRefInStrip();
			})
			.as("tabInStrip")
			.should("be.visible");

		[
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: "R", ctrlKey: true,
				}),
				expectedDefaultPrevented: false,
			},
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: "ArrowLeft", ctrlKey: true,
				}),
				expectedDefaultPrevented: true,
			},
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: " ", ctrlKey: false,
				}),
				expectedDefaultPrevented: true,
			}
		].forEach(({ event, expectedDefaultPrevented }) => {
			// Act
			cy.get<HTMLElement>("@tabInStrip")
				.then(tabInStrip => {
					tabInStrip[0].dispatchEvent(event);
				});

			// Assert
			cy.wrap(event)
				.should("have.property", "defaultPrevented", expectedDefaultPrevented);
		});
	});

	it("tests [Arrow Down] on two-click area tab", () => {
		cy.mount(nestedTabsContainer);

		cy.get("#tabContainerNestedTabs").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__tabStrip").as("tabStrip");
		cy.get("@tabStrip").find(".ui5-tab-strip-item").eq(3).as("item");
		cy.get("@item").find(".ui5-tab-strip-itemText").should("have.text", "Four");
		cy.get("@item").click();
		cy.get("@item").type("{downarrow}");
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").should("be.visible", "Popover is opened");
	});

	it("tests handling of the focus navigation with End overflow mode", () => {
		cy.mount(
			<>
			<Button id="btn1"/>
			<TabContainer id="tabContainerStartAndEndOverflow" overflowMode="End">
				<Tab text="One">Tab 1</Tab>
				<Tab text="Two">Tab 2</Tab>
				<Tab id="activeTab" text="Three" selected>Tab 3</Tab>
				<Tab text="Four">Tab 4</Tab>
				<Tab text="Five">Tab 4</Tab>
			</TabContainer>
			<Button id="btn2"/>
			</>
		);

		cy.viewport(300, 1080);

		cy.get("#tabContainerStartAndEndOverflow").shadow().find(".ui5-tc__overflow--end").as("endOverflow");

		cy.get("#btn1").realClick();

		cy.realPress("Tab");

		cy.realPress("ArrowRight");

		cy.get("@endOverflow")
			.find("[ui5-button]")
			.shadow()
			.find(".ui5-button-root")
			.should("be.focus");

		cy.realPress("Tab");

		cy.get("#btn2").should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@endOverflow")
			.find("[ui5-button]")
			.shadow()
			.find(".ui5-button-root")
			.should("be.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#btn1").should("be.focused");
	});

	it("tests handling of the focus navigation with Start overflow mode", () => {
		cy.mount(
			<>
			<Button id="btn1"/>
			<TabContainer id="tabContainerStartAndEndOverflow" overflowMode="StartAndEnd">
				<Tab text="One">Tab 1</Tab>
				<Tab text="Two">Tab 2</Tab>
				<Tab id="activeTab" text="Three" selected>Tab 3</Tab>
				<Tab text="Four">Tab 4</Tab>
				<Tab text="Five">Tab 4</Tab>
			</TabContainer>
			<Button id="btn2"/>
			</>
		);

		cy.viewport(300, 1080);

		cy.get("#tabContainerStartAndEndOverflow").shadow().find(".ui5-tc__overflow--start").as("startOverflow");

		cy.get("#btn1").realClick();

		cy.realPress("Tab");

		cy.realPress("ArrowLeft");

		cy.get("@startOverflow")
			.find("[ui5-button]")
			.shadow()
			.find(".ui5-button-root")
			.should("be.focus");

		cy.realPress("Tab");

		cy.get("#btn2").should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@startOverflow")
			.find("[ui5-button]")
			.shadow()
			.find(".ui5-button-root")
			.should("be.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#btn1").should("be.focused");
	});
});

describe("TabContainer popover", () => {

	it("tests popover after new tab is inserted", () => {
		cy.viewport(860, 1000);
		cy.mount(tabContainerEndOverflow);

		cy.get("#tabContainerEndOverflow").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__overflow--end").as("endOverflow");
		cy.get("@endOverflow").click();
		cy.get("@tabContainer").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");
		cy.get("@list").children().should("have.length", 25, "There are items in the overflow");
		cy.get("@endOverflow").click();

		cy.get("@tabContainer").then((tabContainer) => {
			const newTab = Object.assign(document.createElement("ui5-tab"), {
				text: `New Tab`,
				id: "newTab"
			});
			tabContainer[0].appendChild(newTab);
		});

		cy.get("@endOverflow").click();
		cy.get("@list").children().should("have.length", 26, "There are 26 items in the overflow");
	});

	it("tests popover items indentation", () => {
		cy.mount(nestedTabsContainer);

		cy.get("#tabContainerNestedTabs").shadow().find(".ui5-tc__tabStrip").as("tabStrip");
		cy.get("@tabStrip").find(".ui5-tab-strip-item").eq(9).as("item");
		cy.get("@item").find(".ui5-tab-strip-itemText").should("have.text", "Ten");
		cy.get("@item").click();
		cy.get("@item").type("{downarrow}");

		cy.get("#tabContainerNestedTabs").shadow().find("ui5-responsive-popover").as("popover");
		cy.get("@popover").find("ui5-list").as("list");

		cy.get("@list").find(".ui5-tab-overflow-itemContent-wrapper").eq(0).should("have.css", "padding-left", "0px");
		cy.get("@list").find(".ui5-tab-overflow-itemContent-wrapper").eq(1).should("have.css", "padding-left", "8px");
		cy.get("@list").find(".ui5-tab-overflow-itemContent-wrapper").eq(2).should("have.css", "padding-left", "16px");
		cy.get("@list").find(".ui5-tab-overflow-itemContent-wrapper").eq(3).should("have.css", "padding-left", "24px");
	});
});
