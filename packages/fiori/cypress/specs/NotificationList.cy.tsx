import Menu from "@ui5/webcomponents/dist/Menu.js";
import NotificationList from "../../src/NotificationList.js";
import NotificationListGroupItem from "../../src/NotificationListGroupItem.js";
import NotificationListItem from "../../src/NotificationListItem.js";

function Sample() {
	return <NotificationList id="nl1">
		<NotificationListGroupItem
			titleText="Group 1"
			id="group1"
			growing="Button">
			<NotificationListItem id="item11" showClose>
				Group 1 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 1 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 1 Item 3
			</NotificationListItem>
			<NotificationListItem id="item1last" showClose>
				Group 1 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			id="group2"
			titleText="Group 2">
			<NotificationListItem id="item21" showClose>
				Group 2 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 2 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 2 Item 3
			</NotificationListItem>
			<NotificationListItem id="item2last" showClose>
				Group 2 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			growing="Button"
			titleText="Group 3">
			<NotificationListItem showClose>
				Group 3 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 3
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
	</NotificationList>;
}

describe("Notification List Item Tests", () => {
	it("tests 'item-toggle' fired", () => {
		const clickStub = cy.stub().as("clickStub");
		cy.mount(
			<NotificationList onItemToggle={clickStub}>
				<NotificationListGroupItem id="nlgi1" />
			</NotificationList>
		);

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-header")
			.realClick();

		cy.get("@clickStub").should("have.been.calledOnce");
	});

	it("tests e.preventDefault() called when item-toggle is prevented", () => {
		const preventingHandler = (e: CustomEvent) => {
			e.preventDefault();
		};

		cy.mount(
			<NotificationList onItemToggle={preventingHandler}>
				<NotificationListItem id="nli1" />
			</NotificationList>
		);

		cy.get("[ui5-notification-list]")
			.then(($list) => {
				const notificationList = $list[0] as NotificationList;
				const item = document.querySelector("#nli1") as NotificationListItem;

				const customEvent = new CustomEvent("item-click", {
					detail: { item }
				});

				cy.spy(customEvent, 'preventDefault').as('preventDefaultSpy');

				notificationList._onItemToggle(customEvent);

				cy.get("@preventDefaultSpy").should("have.been.calledOnce");
			});
	});

	it("tests Group List Header keyboard shortcuts ", () => {
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListGroupItem id="nlgi3" collapsed>
					<NotificationListItem id="nli5" />
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("not.be.visible");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-root")
			.should("have.attr", "tabindex");

		cy.get("#nlgi3").realClick();
		cy.get("#nlgi3").should("be.focused");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("be.visible");
		cy.get("#nlgi3").realPress("ArrowLeft");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'none');
		cy.get("#nlgi3").realPress("ArrowRight");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
		cy.get("#nlgi3").realPress("-");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'none');
		cy.get("#nlgi3").realPress("+");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
		cy.get("#nlgi3").realPress("-");
		cy.get("#nlgi3").realPress("Space");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
	});

	// Notification List Item specific tests follows

	it("tests 'item-click' fired", () => {
		const itemClick = cy.stub().as("itemClick");
		cy.mount(
			<NotificationList onItemClick={itemClick}>
				<NotificationListItem id="nli1" />
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-root")
			.should("have.attr", "tabindex");
		cy.get("#nli1").realClick();
		cy.get("@itemClick").should("have.been.calledOnce");

		cy.get("#nli1").realPress("Enter");
		cy.get("@itemClick").should("have.been.calledTwice");
	});

	it("tests e.preventDefault() called when item-click is prevented", () => {
		const preventingHandler = (e: CustomEvent) => {
			e.preventDefault();
		};

		cy.mount(
			<NotificationList onItemClick={preventingHandler}>
				<NotificationListItem id="nli1" />
			</NotificationList>
		);

		cy.get("[ui5-notification-list]")
			.then(($list) => {
				const notificationList = $list[0] as NotificationList;
				const item = document.querySelector("#nli1") as NotificationListItem;

				const customEvent = new CustomEvent("item-click", {
					detail: { item }
				});

				cy.spy(customEvent, 'preventDefault').as('preventDefaultSpy');

				notificationList._onItemClick(customEvent);

				cy.get("@preventDefaultSpy").should("have.been.calledOnce");
			});
	});

	it("tests 'item-close' fired", () => {
		const itemClose = cy.stub().as("itemClose");
		cy.mount(
			<NotificationList id="notificationList" onItemClose={itemClose}>
				<NotificationListItem id="nli1" showClose={true} />
				<NotificationListItem id="nli2" showClose={true} />
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-close-btn")
			.realClick();
		cy.get("@itemClose").should("have.been.calledOnce");

		cy.get("#nli1").realClick();
		cy.get("#nli1").should("be.focused");
		cy.realPress("ArrowDown");
		cy.realPress("Delete");

		cy.get("@itemClose").should("have.been.calledTwice");
	});

	it("tests e.preventDefault() called when item-close is prevented", () => {
		const preventingHandler = (e: CustomEvent) => {
			e.preventDefault();
		};

		cy.mount(
			<NotificationList onItemClose={preventingHandler}>
				<NotificationListItem id="nli1" />
			</NotificationList>
		);

		cy.get("[ui5-notification-list]")
			.then(($list) => {
				const notificationList = $list[0] as NotificationList;
				const item = document.querySelector("#nli1") as NotificationListItem;

				const customEvent = new CustomEvent("item-click", {
					detail: { item }
				});

				cy.spy(customEvent, 'preventDefault').as('preventDefaultSpy');

				notificationList._onItemClose(customEvent);

				cy.get("@preventDefaultSpy").should("have.been.calledOnce");
			});
	});

	it("tests click on ShowMore", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem
					id="nli3a"
					importance="Important"
					titleText="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
					style="width: 25rem;" />
			</NotificationList>
		);

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-content')
			.invoke('outerHeight')
			.as("heightBeforeContent");

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-title-text')
			.invoke('outerHeight')
			.as("heightBeforeTitle");

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-footer-showMore')
			.click();

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-content')
			.invoke('outerHeight')
			.as("heightAfterContent");

		cy.get("@heightAfterContent")
			.should(function (heightAfterContent) {
				expect(heightAfterContent).to.be.greaterThan(this.heightBeforeContent);
			});

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-title-text')
			.invoke('outerHeight')
			.as("heightAfterTitle");

		cy.get("@heightAfterTitle")
			.should(function (heightAfterTitle) {
				expect(heightAfterTitle).to.be.greaterThan(this.heightBeforeTitle);
			});

		cy.get('#nli3a')
			.realPress(['Shift', 'Enter']);

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-content')
			.invoke('outerHeight')
			.should(function (heightAfterKeysContent) {
				expect(this.heightAfterContent).to.be.greaterThan(heightAfterKeysContent);
			});

		cy.get('#nli3a')
			.shadow()
			.find('.ui5-nli-title-text')
			.invoke('outerHeight')
			.then(function (heightAfterKeysTitle) {
				expect(this.heightAfterTitle).to.be.greaterThan(heightAfterKeysTitle);
			});
	});

	it("tests no ShowMore, when truncate is not enabled", () => {
		cy.mount(
			<NotificationListItem
				id="nli3"
				titleText="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
			>
				And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
			</NotificationListItem>
		);

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("have.attr", "hidden");
	});

	it("tests busy indicator is displayed", () => {
		cy.mount(<NotificationListItem id="nli4" loading />);

		cy.get("#nli4")
			.shadow()
			.find(".ui5-nli-loading")
			.should("be.visible")
			.and("have.attr", "active");
	});

	it("tests state", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem id="nli2" state="Critical" />
				<NotificationListItem id="nli3" state="Negative" />
			</NotificationList>
		);

		cy.get("#nli2")
			.shadow()
			.find(".ui5-state-icon")
			.should("have.attr", "name", "alert");

		cy.get("#nli3")
			.shadow()
			.find(".ui5-state-icon")
			.should("have.attr", "name", "error");
	});

	it("tests importance", () => {
		cy.mount(
			<>
				<NotificationListItem id="nli3" importance="Important" />
				<NotificationListItem id="nli2" />
			</>
		);

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-content-with-importance")
			.should("exist");

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-content-with-importance")
			.should("not.exist");
	});

	it("tests menu", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem>
					<NotificationListItem id="nli1" showClose={true}>
						And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

						<Menu slot="menu" id="menuWithActions" />
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.realClick();

		cy.get("#nli1")
			.find("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-root")
			.should("have.attr", "tabindex")

		cy.get("#nli1").realClick();

		cy.get("#nli1")
			.find("[ui5-menu]")
			.should("not.have.attr", "open");

		cy.get("#nli1").realClick();
		cy.realPress(["F10", "Shift"]);
		cy.get("#nli1")
			.find("[ui5-menu]")
			.ui5MenuOpened();
	});

	// Accessibility tests follows

	it("tests List Item ACC ariaLabelledBy and ariaDescribedBy", () => {
		cy.mount(
			<NotificationListGroupItem>
				<NotificationListItem id="nli1" titleText="New order #2201">
					And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

					<span slot="footnotes">Office Notifications</span>

				</NotificationListItem>

				<NotificationListItem
					id="nli3"
					importance="Important"
					titleText="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
				>
					And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

					<span slot="footnotes">Office Notifications</span>

				</NotificationListItem>

				<NotificationListItem id="nli3a" importance="Important" />

				<NotificationListItem id="nli4" loading />
			</NotificationListGroupItem>
		);

		cy.get('#nli1')
			.invoke('prop', '_id')
			.then((_id) => {
				const EXPECTED_ARIA_LABELLED_BY = `${_id}-title-text ${_id}-read ${_id}-description ${_id}-footnotes`;

				cy.get('#nli1')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_ARIA_LABELLED_BY)
					.and('have.attr', 'aria-level', '2');
			});

		cy.get('#nli3')
			.invoke('prop', '_id')
			.then((_id) => {
				const EXPECTED_ARIA_LABELLED_BY = `${_id}-importance ${_id}-title-text ${_id}-read ${_id}-description ${_id}-footnotes`;

				cy.get('#nli3')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_ARIA_LABELLED_BY);
			});

		cy.get('#nli4')
			.invoke('prop', '_id')
			.then((_id) => {
				const EXPECTED_LOADING_ARIA_LABELLED_BY = `${_id}-loading`;

				cy.get('#nli4')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_LOADING_ARIA_LABELLED_BY);
			});
	});

	it("tests List Item ACC invisible texts", () => {
		cy.mount(
			<NotificationListGroupItem>
				<NotificationListItem id="nli1" state="Positive" />
				<NotificationListItem id="nli2" read state="Critical" />
			</NotificationListGroupItem>
		);

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.first()
			.should("have.text", "Status Positive");

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.eq(1)
			.should("have.text", "Unread");

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-state-icon')
			.should("have.attr", "accessible-name", "Status Positive");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.first()
			.should("have.text", "Status Critical");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.eq(1)
			.should("have.text", "Read");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-state-icon')
			.should("have.attr", "accessible-name", "Status Critical");
	});

	it("tests Menu (actions / '...') button ACC attributes", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem>
					<NotificationListItem id="nli1">
						<Menu />
					</NotificationListItem>
				</NotificationListGroupItem>

				<NotificationListGroupItem>
					<NotificationListItem id="nli3" />
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.shadow()
			.find("button")
			.should("have.attr", "title", 'Actions')
			.and("have.attr", "aria-haspopup", 'menu');

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.should("not.exist");
	});

	it("tests List Item 'Close' button ACC attributes", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem>
					<NotificationListItem id="nli1" showClose={true} />
				</NotificationListGroupItem>

				<NotificationListGroupItem>
					<NotificationListItem id="nli3" />
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-close-btn")
			.shadow()
			.find("button")
			.should("have.attr", "aria-label", 'Close')
			.and("have.attr", "title", 'Close')
			.and("have.attr", "role", 'button');

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-close-btn")
			.should("not.exist");
	});

	it("tests aria attributes click on ShowMore", () => {
		cy.mount(
			<NotificationListItem id="nli3a"
				titleText="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
				style={{ width: '25rem' }} />
		);

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", 'More button. Show the full texts')
			.and("have.attr", "role", "button")
			.and("have.attr", "aria-expanded", "false");

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.realClick();

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", 'Less button. Show the texts with truncation')
			.and("have.attr", "aria-expanded", "true");
	});

	it("tests Group Header Text ACC attributes", () => {
		cy.mount(<NotificationListGroupItem id="nlgi1" />);

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-title-text")
			.should("have.attr", "role", 'heading')
			.and("have.attr", "aria-level", '2');
	});

	it("tests Group List aria-labelledby", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem id="nlgi1" titleText="Orders" />

				<NotificationListGroupItem id="nlgi4" loading />
			</NotificationList>
		);

		cy.get('#nlgi1')
			.shadow()
			.find('[id$="-title-text"]')
			.invoke('attr', 'id')
			.then((fullId) => {
				cy.get('#nlgi1')
					.shadow()
					.find('.ui5-nli-group-items')
					.should('have.attr', 'accessible-name-ref', fullId);

				cy.get('#nlgi1')
					.shadow()
					.find('.ui5-nli-group-root')
					.should('have.attr', 'aria-labelledby', fullId);
			});

		cy.get('#nlgi4')
			.shadow()
			.find('[id$="-loading"]')
			.invoke('attr', 'id')
			.then((loadingId) => {
				cy.get('#nlgi4')
					.shadow()
					.find('.ui5-nli-group-root')
					.should('have.attr', 'aria-labelledby', loadingId);
			});
	});

	it("tests Group Item 'aria-description' and 'aria-level'", () => {
		cy.mount(
			<NotificationListItem id="notificationList">
				<NotificationListGroupItem id="nlgi1" />
				<NotificationListGroupItem id="nlgi3" collapsed />
			</NotificationListItem>
		);

		cy.get('#nlgi1')
			.shadow()
			.find('.ui5-nli-group-root')
			.should('have.attr', 'aria-description', 'Notification Group Expanded')
			.and('have.attr', 'aria-level', '1');

		cy.get('#nlgi3')
			.shadow()
			.find('.ui5-nli-group-root')
			.should('have.attr', 'aria-description', 'Notification Group Collapsed');
	});

	it("tests List Group Header ACC attributes when collapsed and expanded", () => {
		cy.mount(
			<NotificationListGroupItem id="nlgi2" />);

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-items")
			.invoke("attr", "id")
			.then((id) => {
				cy.get("#nlgi2")
					.shadow()
					.find(".ui5-nli-group-header")
					.should("have.attr", "aria-expanded", "true")
					.and("have.attr", "aria-controls", id)
					.and("have.attr", "role", "button")
					.and("have.attr", "title", "Expand/Collapse");
			});

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-toggle-icon")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-header")
			.realClick();

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-items")
			.invoke("attr", "id")
			.then((id) => {
				cy.get("#nlgi2")
					.shadow()
					.find(".ui5-nli-group-header")
					.should("have.attr", "aria-expanded", "false")
					.and("have.attr", "aria-controls", id)
					.and("have.attr", "role", "button")
					.and("have.attr", "title", "Expand/Collapse");
			});

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-toggle-icon")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");
	});

	it("getEnabledItems() method returns empty array when no items are present", () => {
		cy.mount(<NotificationList id="emptyList" />);
		
		cy.get("#emptyList").then(($list) => {
			const list = $list[0] as any;
			const enabledItems = list.getEnabledItems();
			expect(enabledItems).to.be.an('array');
			expect(enabledItems).to.have.length(0);
		});
	});

	it("getEnabledItems() method returns groups and their expanded children items", () => {
		cy.mount(
			<NotificationList id="expandedList">
				<NotificationListGroupItem id="group1" titleText="Group 1">
					<NotificationListItem id="item1">Item 1</NotificationListItem>
					<NotificationListItem id="item2">Item 2</NotificationListItem>
				</NotificationListGroupItem>
				<NotificationListGroupItem id="group2" titleText="Group 2" collapsed>
					<NotificationListItem id="item3">Item 3</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		
		cy.get("#expandedList").then(($list) => {
			const list = $list[0] as any;
			const enabledItems = list.getEnabledItems();
			expect(enabledItems).to.be.an('array');
			expect(enabledItems).to.have.length(4); // 2 groups + 2 items from expanded group only
			expect(enabledItems[0].id).to.equal('group1');
			expect(enabledItems[1].id).to.equal('item1');
			expect(enabledItems[2].id).to.equal('item2');
			expect(enabledItems[3].id).to.equal('group2');
		});
	});

	it("getEnabledItems() method returns empty array when innerList is not available", () => {
		cy.mount(<NotificationList id="noInnerList" />);
		
		cy.get("#noInnerList").then(($list) => {
			const list = $list[0] as any;
			// Temporarily mock innerList to return null
			const originalInnerList = list.innerList;
			Object.defineProperty(list, 'innerList', {
				get: () => null,
				configurable: true
			});
			
			const enabledItems = list.getEnabledItems();
			expect(enabledItems).to.be.an('array');
			expect(enabledItems).to.have.length(0);
			
			// Restore original innerList
			Object.defineProperty(list, 'innerList', {
				get: () => originalInnerList,
				configurable: true
			});
		});
	});
});

describe("Keyboard Navigation", () => {
	beforeEach(() => {
		cy.mount(<Sample />);
	});

	it("tests Arrows and Space keys", () => {
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.as("growingButton");

		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.get("#item1last").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#item21").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#item1last").should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("Space");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowLeft");
		cy.get("#item1last").should("be.focused");
	});

	it("tests Home and End", () => {
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.as("growingButton");

		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("End");
		cy.get("#item1last").should("be.focused");

		cy.realPress("End");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("End");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("Home");
		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("Home");
		cy.get("#item11").should("be.focused");

		cy.realPress("Home");
		cy.get("#item11").should("be.focused");
	});

	it("Items navigation", () => {
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListGroupItem id="nlgi1">
					<NotificationListItem id="nli1" />

					<NotificationListItem id="nli2" />
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi2">
					<NotificationListItem id="nli3" />

					<NotificationListItem id="nli3a" />

					<NotificationListItem id="nli4" />
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi3" collapsed>
					<NotificationListItem id="nli5" />
				</NotificationListGroupItem>

			</NotificationList>
		);

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-root")
			.should("have.attr", "tabindex");

		cy.get("#nlgi1").realClick();
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli3").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli3a").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli4").should("have.focus");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowRight");
		cy.realPress("ArrowDown");
		cy.get("#nli5").should("have.focus");

		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nlgi1").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowLeft");
		cy.get("#nlgi2")
			.should("have.focus")
			.and("have.attr", "collapsed");

		cy.realPress("ArrowLeft");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2")
			.should("have.focus")
			.and("not.have.attr", "collapsed");
	});

	it("Tab and F2 navigation", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem
					id="nlgi1"
					style={{ width: '25rem' }}
				>
					<NotificationListItem
						id="nli1"
						showClose={true}
					>
						And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

						<Menu />
					</NotificationListItem>

				</NotificationListGroupItem>

			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.realClick();

		cy.get("#nli1").should("have.focus");

		cy.realPress("Tab");
		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.should("be.focused");

		cy.realPress("Tab");
		cy.get('#nli1')
			.shadow()
			.find(".ui5-nli-close-btn")
			.should("be.focused");

		cy.realPress("F2");
		cy.get("#nli1").should("be.focused");

		cy.realPress("F2");
		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("be.focused");
	});

	it("Focusing same item on next row", () => {
		cy.mount(
			<NotificationList style={{ width: '25rem' }}>
				<NotificationListGroupItem id="nlgi1">
					<NotificationListItem id="nli1">
						And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
						<Menu />
					</NotificationListItem>

					<NotificationListItem id="nli2" showClose={true}>
						And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
						<Menu />
					</NotificationListItem>
				</NotificationListGroupItem>
				<NotificationListGroupItem id="nlgi2" />
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.realClick();

		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowDown");

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("be.focused");

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowUp");
		cy.realPress(["Tab", "Tab"]);

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#nlgi1").should("be.focused");
	});
});

describe("Notification List Item Without a Group", () => {
	it("ACC", () => {
		cy.mount(
			<NotificationList id="notificationListWithMenu">
				<NotificationListItem>
					<Menu />
				</NotificationListItem>
			</NotificationList>
		);

		cy.get("#notificationListWithMenu [ui5-li-notification]")
			.shadow()
			.find(".ui5-nli-root")
			.should("not.have.attr", "aria-level");
	});
	  
});
