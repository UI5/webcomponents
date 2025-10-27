import TabContainer from "../../src/TabContainer.js";
import type { TabContainerMoveEventDetail } from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";
import type { TabInOverflow, TabInStrip } from "../../src/Tab.js";
import TabSeparator from "../../src/TabSeparator.js";
import Button from "../../src/Button.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

const verifyMoveOverEvent = (sourceElementId: string, destinationPlacement: `${MovePlacement}`,  destinationElementId: string) => {
	cy.get<Cypress.Agent<sinon.SinonSpy<any[], any>>>("@handleMoveOverSpy")
		.then((spy) => {
			const event = spy.getCall(0).args[0];
			const { source, destination } = event.detail;

			expect(source.element.id).to.equal(sourceElementId);
			expect(destination.element.id).to.equal(destinationElementId);
			expect(destination.placement).to.equal(destinationPlacement);
		});
};

const verifyMoveEvent = (sourceElementId: string, destinationPlacement: `${MovePlacement}`,  destinationElementId: string) => {
	cy.get<Cypress.Agent<sinon.SinonSpy<any[], any>>>("@handleMoveSpy")
		.then((spy) => {
			const event = spy.getCall(0).args[0];
			const { source, destination } = event.detail;

			expect(source.element.id).to.equal(sourceElementId);
			expect(destination.element.id).to.equal(destinationElementId);
			expect(destination.placement).to.equal(destinationPlacement);
		});
};

const tabShouldBeFocusedInStrip = (tabId: string, tabContainerId: string) => {
	cy.get(`@${tabContainerId}Shadow`)
		.should("be.focused");

	cy.get("#customElId")
		.shadow()
		.find<Tab>(`#${tabId}`)
		.should(($el) => {
			const tabContainer = document.activeElement.shadowRoot.activeElement;

			expect(($el[0]).getDomRefInStrip()?.id).to.equal(tabContainer.shadowRoot.activeElement.id);
		});
};

const tabShouldBeFocusedInPopover = (id: string) => {
	cy.focused()
		.closest(".ui5-tab-overflow-item")
		.should(($el) => {
			expect($el).to.have.class("ui5-tab-overflow-item");
			expect(($el[0] as TabInOverflow).realTabReference.id).to.equal(id);
		});
};

describe("TabContainer Drag and Drop Generic Tests", () => {
	beforeEach(() => {
		const handlers = {
			moveOver: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				e.preventDefault();
			},
			move: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				const { destination, source } = e.detail;

				switch (destination.placement) {
					case "Before":
						destination.element.before(source.element);
						break;
					case "After":
						destination.element.after(source.element);
						break;
					case "On":
						destination.element.prepend(source.element);
						break;
				}

				const newParent = source.element.parentElement;

				if (newParent.hasAttribute("ui5-tab")) {
					source.element.slot = "items";
				} else {
					source.element.slot = "";
				}
			}
		};

		cy.spy(handlers, "moveOver").as("handleMoveOverSpy");
		cy.spy(handlers, "move").as("handleMoveSpy");

		cy.mount(
			<>
				<div id="customElId">
				</div>
				<TabContainer id="tabContainer" collapsed={true} overflowMode="End" style={{ width: "1000px" }} onMoveOver={handlers.moveOver} onMove={handlers.move}>
					<Tab id="tabOne" movable={true} text="One"></Tab>
					<Tab id="tabTwo" movable={true} text="Two" disabled>
						<Tab slot="items" movable={true} text="2.1"></Tab>
					</Tab>
					<Tab id="tabThree" movable={true} text="Three">
						<Tab id="tabThree1" slot="items" movable={true} text="3.1">
							<Button>Button 3.1</Button>
						</Tab>
						<Tab id="tabThree2" slot="items" movable={true} text="3.2">
							<Tab id="tabThree21" slot="items" movable={true} text="3.2.1">
								<Button>Button 3.2.1</Button>
							</Tab>
							<Tab id="tabThree22" slot="items" movable={true} text="3.2.2">
								<Button>Button 3.2.2</Button>
							</Tab>
							<Button>Button 3.2</Button>
						</Tab>
						<Tab id="tabThree3" slot="items" movable={true} text="3.3">
							<Button>Button 3.3</Button>
						</Tab>
						content
					</Tab>
					<Tab id="tabFour" movable={true} text="Four"></Tab>
					<Tab id="tabFive" movable={true} text="Five">
						<Tab slot="items" movable={true} text="nested in Five">
							<Tab slot="items" movable={true} text="nested deeper in Five">text</Tab>
							text
						</Tab>
					</Tab>
					<Tab id="tabSix" movable={true} text="Six"></Tab>
					<Tab id="tabSeven" movable={true} text="Seven"></Tab>
					<TabSeparator />
					<Tab id="tabEight" movable={true} text="Eight"></Tab>
					<Tab id="tabNine" movable={true} text="Nine"></Tab>
					<Tab id="tabTen" movable={true} text="Ten"></Tab>
					<Tab id="tabEleven" movable={true} text="Eleven"></Tab>
					<Tab id="tabTwelve" movable={true} text="Twelve"></Tab>
					<Tab id="tabThirteen" movable={true} text="Thirteen"></Tab>
					<Tab id="tabFourteen" movable={true} text="Fourteen"></Tab>
					<Tab id="tabFifteen" movable={true} text="Fifteen"></Tab>
					<Tab id="tabSixteen" movable={true} text="Sixteen"></Tab>
					<Tab id="tabSeventeen" movable={true} text="Seventeen"></Tab>
					<Tab id="tabEighteen" movable={true} text="Eighteen"></Tab>
					<TabSeparator />
					<Tab id="tabNinteen" movable={true} text="Nineteen"></Tab>
					<Tab id="tabTwenty" movable={true} text="Twenty"></Tab>
					<Tab id="tabTwentyOne" movable={true} text="Twenty One"></Tab>
					<Tab id="tabTwentyTwo" movable={true} text="Twenty Two"></Tab>
					<Tab id="tabTwentyThree" movable={true} text="Twenty Three"></Tab>
					<Tab id="tabTwentyFour" movable={true} text="Twenty Four"></Tab>
					<TabSeparator />
					<Tab id="tabTwentyFive" movable={true} text="Twenty Five"></Tab>
					<Tab id="tabTwentySix" movable={true} text="Twenty Six"></Tab>
					<Tab id="tabTwentySeven" movable={true} text="Twenty Seven"></Tab>
					<TabSeparator />
					<Tab id="tabTwentyEight" movable={true} text="Twenty Eight"></Tab>
					<Tab id="tabTwentyNine" movable={true} text="Twenty Nine"></Tab>
					<Tab id="tabThirty" movable={true} text="Thirty"></Tab>
				</TabContainer>
			</>
		);

		cy.get("#customElId").then($customEl => {
			const iconTabBar = document.querySelector("#tabContainer");
			$customEl.get(0).attachShadow({ mode: 'open' }).prepend(iconTabBar);
		});

		cy.get("#customElId")
			.shadow()
			.find("#tabContainer")
			.as("tabContainerShadow");

		cy.get("@tabContainerShadow")
			.should("have.attr", "media-range", "M");

		cy.get("@tabContainerShadow")
			.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.should(($elements) => {
				$elements.each((index, element) => {
					expect(element).to.have.attr("tabindex");
				});
			});
	});

	describe("Using Mouse", () => {
		it("Moving first strip item 'After' second", () => {
			cy.get("#customElId")
				.shadow()
				.find<Tab>("#tabOne, #tabTwo")
				.then(($el) => {
					const firstItem = $el[0];
					const secondItem = $el[1];

					cy.ui5TabContainerDragAndDrop(firstItem.getDomRefInStrip()!, "After", secondItem.getDomRefInStrip()!)

					verifyMoveOverEvent(firstItem.id, "After", secondItem.id);
					verifyMoveEvent(firstItem.id, "After", secondItem.id);
					tabShouldBeFocusedInStrip(firstItem.id, "tabContainer");
				});
		});

		it("Moving first strip item 'After' last", () => {
			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const firstItem = $el[0];
					const lastItem = $el[$el.length - 1];

					cy.ui5TabContainerDragAndDrop(firstItem, "After", lastItem);

					verifyMoveOverEvent(firstItem.realTabReference.id, "After", lastItem.realTabReference.id);
					verifyMoveEvent(firstItem.realTabReference.id, "After", lastItem.realTabReference.id);
					tabShouldBeFocusedInStrip(firstItem.realTabReference.id, "tabContainer");
				});
		});

		it("Moving last strip item 'Before' last but one", () => {
			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const lastItem = $el[$el.length - 1];
					const lastButOneItem = $el[$el.length - 2];

					cy.ui5TabContainerDragAndDrop(lastItem, "Before", lastButOneItem);

					verifyMoveOverEvent(lastItem.realTabReference.id, "Before", lastButOneItem.realTabReference.id);
					verifyMoveEvent(lastItem.realTabReference.id, "Before", lastButOneItem.realTabReference.id);
					tabShouldBeFocusedInStrip(lastItem.realTabReference.id, "tabContainer");
				});
		});

		it("Moving last strip item 'Before' first", () => {
			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const firstItem = $el[0];
					const lastItem = $el[$el.length - 1];

					cy.ui5TabContainerDragAndDrop(lastItem, "Before", firstItem);

					verifyMoveOverEvent(lastItem.realTabReference.id, "Before", firstItem.realTabReference.id);
					verifyMoveEvent(lastItem.realTabReference.id, "Before", firstItem.realTabReference.id);
					tabShouldBeFocusedInStrip(lastItem.realTabReference.id, "tabContainer");
				});
		});

		it("Moving strip item 'On' another", () => {
			cy.get("#customElId")
				.shadow()
				.find<Tab>("#tabFour, #tabSix")
				.then(($el) => {
					const fifthItem = $el[0];
					const sixthItem = $el[1];

					cy.ui5TabContainerDragAndDrop(fifthItem.getDomRefInStrip()!, "On", sixthItem.getDomRefInStrip()!)

					verifyMoveOverEvent(fifthItem.id, "On", sixthItem.id);
					verifyMoveEvent(fifthItem.id, "On", sixthItem.id);
					// tabShouldBeFocusedInStrip(sixthItem.id, "tabContainer"); // TODO: uncomment after focus issue is resolved
				});
		});

		it("Moving item 'After' another in end overflow popover", () => {
			cy.get("@tabContainerShadow")
				.ui5TabContainerOpenEndOverflow();

			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const firstPopoverItem = $el[0];
					const thirdPopoverItem = $el[2];

					cy.ui5TabContainerDragAndDrop(firstPopoverItem, "After", thirdPopoverItem, "Vertical");

					verifyMoveOverEvent(firstPopoverItem.realTabReference.id, "After", thirdPopoverItem.realTabReference.id);
					verifyMoveEvent(firstPopoverItem.realTabReference.id, "After", thirdPopoverItem.realTabReference.id);
					tabShouldBeFocusedInPopover(firstPopoverItem.realTabReference.id);
				});
		});

		it("Moving item 'Before' another in end overflow popover", () => {
			cy.get("@tabContainerShadow")
				.ui5TabContainerOpenEndOverflow();

			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const thirdPopoverItem = $el[2];
					const firstPopoverItem = $el[0];

					cy.ui5TabContainerDragAndDrop(thirdPopoverItem, "Before", firstPopoverItem, "Vertical");

					verifyMoveEvent(thirdPopoverItem.realTabReference.id, "Before", firstPopoverItem.realTabReference.id);
					verifyMoveOverEvent(thirdPopoverItem.realTabReference.id, "Before", firstPopoverItem.realTabReference.id);
					tabShouldBeFocusedInPopover(thirdPopoverItem.realTabReference.id);
				});
		});

		it("Moving item 'On' another in end overflow popover", () => {
			cy.get("@tabContainerShadow")
				.ui5TabContainerOpenEndOverflow();

			cy.get("@tabContainerShadow")
				.shadow()
				.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const firstPopoverItem = $el[0];
					const fifthPopoverItem = $el[5];

					cy.ui5TabContainerDragAndDrop(firstPopoverItem, "On", fifthPopoverItem, "Vertical");

					verifyMoveEvent(firstPopoverItem.realTabReference.id, "On", fifthPopoverItem.realTabReference.id);
					verifyMoveOverEvent(firstPopoverItem.realTabReference.id, "On", fifthPopoverItem.realTabReference.id);
					tabShouldBeFocusedInPopover(firstPopoverItem.realTabReference.id);
				});
		});
	});

	describe("Using Keyboard", () => {
		describe("Moving strip items", () => {
			it("Moving strip items using arrow keys", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item")
					.first()
					.realClick();

				tabShouldBeFocusedInStrip("tabOne", "tabContainer");
				cy.realPress(["ControlLeft", "ArrowRight"]);

				verifyMoveOverEvent("tabOne", "After", "tabTwo");
				verifyMoveEvent("tabOne", "After", "tabTwo");

				cy.get("@tabContainerShadow")
					.children().eq(0)
					.should("have.id", "tabTwo")

				cy.get("@tabContainerShadow")
					.children().eq(1)
					.should("have.id", "tabOne");

				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				tabShouldBeFocusedInStrip("tabOne", "tabContainer");
				cy.realPress(["ControlLeft", "ArrowDown"]);

				verifyMoveOverEvent("tabOne", "After", "tabThree");
				verifyMoveEvent("tabOne", "After", "tabThree");

				cy.get("@tabContainerShadow")
					.children().eq(1)
					.should("have.id", "tabThree")

				cy.get("@tabContainerShadow")
					.children().eq(2)
					.should("have.id", "tabOne");

				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				tabShouldBeFocusedInStrip("tabOne", "tabContainer");
				cy.realPress(["ControlLeft", "ArrowLeft"]);

				verifyMoveOverEvent("tabOne", "Before", "tabThree");
				verifyMoveEvent("tabOne", "Before", "tabThree");

				cy.get("@tabContainerShadow")
					.children().eq(1)
					.should("have.id", "tabOne");

				cy.get("@tabContainerShadow")
					.children().eq(2)
					.should("have.id", "tabThree");

				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				tabShouldBeFocusedInStrip("tabOne", "tabContainer");
				cy.realPress(["ControlLeft", "ArrowUp"]);

				verifyMoveOverEvent("tabOne", "Before", "tabTwo");
				verifyMoveEvent("tabOne", "Before", "tabTwo");

				cy.get("@tabContainerShadow")
					.children().eq(0)
					.should("have.id", "tabOne")
					.prev()
					.should("not.exist");

				cy.get("@tabContainerShadow")
					.children().eq(1)
					.should("have.id", "tabTwo");
			});

			it.skip("Moving strip item beyond the end using 'Arrow Right'", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item")
					.first()
					.realClick()

				for (let i = 0; i < 20; i++) {
					tabShouldBeFocusedInStrip("tabOne", "tabContainer");
					cy.realPress(["ControlLeft", "ArrowRight"]);
				}

				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
					.last<TabInStrip>()
					.should($lastItem => {
						expect($lastItem[0].realTabReference.id).to.equal("tabOne");
					});
			});

			it.skip("Moving strip item beyond the beginning with 'Arrow Left'", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow]")
					.last()
					.as("lastTabInStrip");

				cy.get("@lastTabInStrip")
					.realClick();

				cy.get<TabInStrip>("@lastTabInStrip")
					.then(($lastTab) => {
						const lastTabId = $lastTab[0].realTabReference.id;

						for (let i = 0; i < 20; i++) {
							tabShouldBeFocusedInStrip(lastTabId, "tabContainer");
							cy.realPress(["ControlLeft", "ArrowLeft"]);
						}

						cy.get("@tabContainerShadow")
							.shadow()
							.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
							.first()
							.should($firstItem => {
								expect($firstItem[0].realTabReference.id).to.equal(lastTabId);
							});
					});
			});

			it.skip("Moving strip item with 'End'", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
					.first()
					.realClick();

				tabShouldBeFocusedInStrip("tabOne", "tabContainer");

				cy.realPress(["ControlLeft", "End"]);

				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
					.last<TabInStrip>()
					.should($lastItem => {
						expect($lastItem[0].realTabReference.id).to.equal("tabOne");
					});
			});

			it("Moving strip item with 'Home'", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
					.eq(-2) // get the item before the last to 'more' button appearance doesn't disturb the test
					.as("lastTabInStrip");

				cy.get("@lastTabInStrip")
					.realClick();

				cy.get<TabInStrip>("@lastTabInStrip")
					.then(($lastTab) => {
						const lastTabId = $lastTab[0].realTabReference.id;

						tabShouldBeFocusedInStrip(lastTabId, "tabContainer");

						cy.realPress(["ControlLeft", "Home"]);

						cy.get("@tabContainerShadow")
							.shadow()
							.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
							.first()
							.should($firstItem => {
								expect($firstItem[0].realTabReference.id).to.equal(lastTabId);
							});
					});
			});
		});

		describe("Moving popover items", () => {
			it("Moving sub items with arrow keys", () => {
				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-strip-item:nth-child(3) [ui5-button]")
					.realClick();

				cy.get("@tabContainerShadow")
					.shadow()
					.find<ResponsivePopover>("[ui5-responsive-popover]")
					.ui5PopoverOpened();

				cy.get("#customElId")
					.shadow()
					.find("#tabThree1")
					.prev()
					.should("not.exist");

				tabShouldBeFocusedInPopover("tabThree1");
				cy.realPress(["ControlLeft", "ArrowDown"]);

				cy.get("#customElId")
					.shadow()
					.find("#tabThree1")
					.prev()
					.should("have.id", "tabThree2");

				tabShouldBeFocusedInPopover("tabThree1");
				cy.realPress(["ControlLeft", "ArrowUp"]);

				cy.get("#customElId")
					.shadow()
					.find("#tabThree1")
					.prev()
					.should("not.exist");

				cy.realPress(["ArrowDown"]);
				cy.realPress(["ArrowDown"]);
				tabShouldBeFocusedInPopover("tabThree21");

				cy.get("#customElId")
					.shadow()
					.find("#tabThree21")
					.prev()
					.should("not.exist");

				cy.realPress(["ControlLeft", "ArrowDown"]);

				cy.get("#customElId")
					.shadow()
					.find("#tabThree21")
					.prev()
					.should("have.id", "tabThree22");

				tabShouldBeFocusedInPopover("tabThree21");
				cy.realPress(["ControlLeft", "ArrowDown"]);
				cy.get("#customElId")
					.shadow()
					.find("#tabThree21")
					.prev()
					.should("have.id", "tabThree22");

				tabShouldBeFocusedInPopover("tabThree21");
				cy.realPress(["ControlLeft", "ArrowUp"]);
				cy.get("#customElId")
					.shadow()
					.find("#tabThree21")
					.prev()
					.should("not.exist");
			});

			it("Moving overflow item with arrow keys", () => {
				cy.get("@tabContainerShadow")
					.ui5TabContainerOpenEndOverflow();

				cy.get("@tabContainerShadow")
					.shadow()
					.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
					.then(($el) => {
						const firstItemId = $el[0].realTabReference.id;
						const secondItemId = $el[1].realTabReference.id;

						tabShouldBeFocusedInPopover(firstItemId);
						cy.realPress(["ControlLeft", "ArrowDown"]);

						cy.get("#customElId")
							.shadow()
							.find(`#${firstItemId}`)
							.prev()
							.should("have.id", secondItemId);

						tabShouldBeFocusedInPopover(firstItemId);
						cy.realPress(["ControlLeft", "ArrowUp"]);

						cy.get("#customElId")
							.shadow()
							.find(`#${firstItemId}`)
							.next()
							.should("have.id", secondItemId);
					});
			});

			it("Moving overflow item with 'End'", () => {
				cy.get("@tabContainerShadow")
					.ui5TabContainerOpenEndOverflow();

				cy.get("@tabContainerShadow")
					.shadow()
					.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
					.first()
					.then(($firstItem) => {
						const firstItemId = $firstItem[0].realTabReference.id;

						tabShouldBeFocusedInPopover(firstItemId);

						cy.realPress(["ControlLeft", "End"]);

						cy.get("@tabContainerShadow")
							.children()
							.last()
							.should("have.id", firstItemId);
					});
			});

			it("Moving overflow item with 'Home'", () => {
				cy.get("@tabContainerShadow")
					.ui5TabContainerOpenEndOverflow();

				cy.get("@tabContainerShadow")
					.shadow()
					.find(".ui5-tab-container-responsive-popover [ui5-li-custom]")
					.last<TabInOverflow>()
					.then(($lastItem) => {
						const lastItemId = $lastItem[0].realTabReference.id;

						cy.realPress("End");
						tabShouldBeFocusedInPopover(lastItemId);

						cy.realPress(["ControlLeft", "Home"]);

						cy.get("@tabContainerShadow")
							.shadow()
							.find<TabInOverflow>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
							.first()
							.should(($firstItem) => {
								expect($firstItem[0].realTabReference.id).to.equal(lastItemId);
							});
					});
			});
		});
	});
});

describe("TabContainer Drag and Drop when There are Fixed Tabs", () => {
	beforeEach(() => {
		const handlers = {
			moveOver: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				if (!e.detail.destination.element.dataset.fixed) {
					e.preventDefault();
				}
			},
			move: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				const { destination, source } = e.detail;

				switch (destination.placement) {
					case "Before":
						destination.element.before(source.element);
						break;
					case "After":
						destination.element.after(source.element);
						break;
					case "On":
						destination.element.prepend(source.element);
						break;
				}

				const newParent = source.element.parentElement;

				if (newParent.hasAttribute("ui5-tab")) {
					source.element.slot = "items";
				} else {
					source.element.slot = "";
				}
			}
		};

		cy.spy(handlers, "moveOver").as("handleMoveOverSpy");
		cy.spy(handlers, "move").as("handleMoveSpy");

		cy.mount(
			<TabContainer id="tabContainer" collapsed={true} overflowMode="End" style={{ width: "1000px" }} onMoveOver={handlers.moveOver} onMove={handlers.move}>
				<Tab id="tabOne" text="One" data-fixed={true}></Tab>
				<Tab id="tabTwo" text="Two" data-fixed={true}></Tab>
				<Tab id="tabThree" text="Three" data-fixed={true}></Tab>
				<TabSeparator id="fixedItemsSeparator" />
				<Tab id="tabFour" movable={true} text="Four"></Tab>
				<Tab id="tabFive" movable={true} text="Five"></Tab>
				<Tab id="tabSix" movable={true} text="Six"></Tab>
				<Tab id="tabSeven" movable={true} text="Seven"></Tab>
				<TabSeparator />
				<Tab id="tabEight" movable={true} text="Eight"></Tab>
				<Tab id="tabNine" movable={true} text="Nine"></Tab>
				<Tab id="tabTen" movable={true} text="Ten"></Tab>
				<Tab id="tabEleven" movable={true} text="Eleven"></Tab>
				<Tab id="tabTwelve" movable={true} text="Twelve"></Tab>
			</TabContainer>
		);

		cy.get("@tabContainerShadow")
			.should("have.attr", "media-range", "M");

		cy.get("@tabContainerShadow")
			.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.should(($elements) => {
				$elements.each((index, element) => {
					expect(element).to.have.attr("tabindex");
				});
			});
	});

	it.skip("Moving strip item beyond fixed items with arrow keys", () => {
		cy.get<Tab>("#tabNine")
			.then(($el) => {
				return $el[0].getDomRefInStrip();
			})
			.realClick();

		for (let i = 0; i < 20; i++) {
			tabShouldBeFocusedInStrip("tabNine", "tabContainer");
			cy.realPress(["ControlLeft", "ArrowLeft"]);
		}

		cy.get("#customElId")
			.shadow()
			.find("#tabNine")
			.prev()
			.should("have.id", "fixedItemsSeparator");
	});

	it.skip("Moving strip item beyond fixed items with 'Home;", () => {
		cy.get<Tab>("#tabTen")
			.then(($el) => {
				return $el[0].getDomRefInStrip();
			})
			.realClick();

		tabShouldBeFocusedInStrip("tabTen", "tabContainer");
		cy.realPress(["ControlLeft", "Home"]);

		verifyMoveEvent("tabTen", "Before", "tabFour");

		cy.get("#customElId")
			.shadow()
			.find("#tabTen")
			.prev()
			.should("have.id", "fixedItemsSeparator");
	});
});