import Timeline from "../../src/Timeline.js";
import type { TimelineSearchEventDetail, TimelineSortEventDetail } from "../../src/Timeline.js";
import TimelineItem from "../../src/TimelineItem.js";
import TimelineGroupItem from "../../src/TimelineGroupItem.js";
import TimelineHeaderBar from "../../src/TimelineHeaderBar.js";
import TimelineFilterOption from "../../src/TimelineFilterOption.js";
import accept from "@ui5/webcomponents-icons/dist/accept.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import messageInformation from "@ui5/webcomponents-icons/dist/message-information.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";

function Sample() {
	return <Timeline layout="Vertical" accessibleName="vertical" id="timelineAccName">
		<TimelineItem titleText="called" subtitleText="20.02.2017 11:30" icon="phone" name="Stanislava Baltova" nameClickable={true}></TimelineItem>
		<TimelineItem titleText="called" subtitleText="20.02.2017 11:30" icon="phone" name="Stanislava Baltova"></TimelineItem>
		<TimelineItem titleText="Weekly Sync - CP Design" subtitleText="27.08.2017 (11:00 - 12:00)" icon={calendar}>
			<Label>MR SOF02 2.43</Label>
		</TimelineItem>
		<TimelineItem id="testTimelineItem" titleText="Video Conference Call - UI5" subtitleText="31.01.2018 (12:00 - 13:00)" icon={calendar} name="Stanislava Baltova">
			Online meeting
		</TimelineItem>
		<TimelineItem titleText="Video Conference Call - UI5" subtitleText="31.01.2018 (13:30 - 14:00)" icon={calendar}><Avatar initials="SK"></Avatar></TimelineItem>
	</Timeline>;
}

function SampleWithSingleItem() {
	return <Timeline layout="Vertical" id="testTimeline">
		<TimelineItem
			id="testTimelineItem"
			titleText="Video Conference Call - UI5"
			subtitleText="31.01.2018 (13:30 - 14:00)"
			icon={calendar}
		>
			<Avatar initials="SK"></Avatar>
		</TimelineItem>
	</Timeline>;
}

function GroupSample() {
	return <Timeline id="verticalWithGroups">
		<TimelineGroupItem groupName="Events">
			<TimelineItem id="testItem1" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP Talk">Morning event</TimelineItem>
			<TimelineItem id="testItem2" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP Talk">
				<Avatar initials="SK"></Avatar>
				<Label>Good morning</Label>
			</TimelineItem>
			<TimelineItem id="testItem3" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP D-com"><Avatar initials="SK"></Avatar></TimelineItem>
			<TimelineItem id="testItem4" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" name="SAP iXP Party">20.02.2017 11:30</TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem groupName="Meetings">
			<TimelineItem id="testItem5" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" icon={calendar} name="Team Balkan Meeting"></TimelineItem>
			<TimelineItem id="testItem6" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" name="Team Balkan Meeting">20.02.2017 11:30</TimelineItem>
			<TimelineItem id="testItem7" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" icon={calendar} name="Team Balkan Meeting"><Avatar initials="SK"></Avatar></TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem>
			<TimelineItem id="testItem8" class="group-item" titleText="called" subtitleText="20.02.2017 11:30 11:30" icon={calendar} name="Stanislava Baltova" nameClickable={true}></TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem groupName="Calls">
			<TimelineItem id="testItem9" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" icon={calendar} name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
			<TimelineItem id="testItem10" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
			<TimelineItem id="testItem11" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" icon={calendar} name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
		</TimelineGroupItem>
	</Timeline>;
}

describe("Timeline general interaction", () => {
	it("should fire name-click event on a normal item name", () => {
		cy.mount(<Sample />);

		cy.get("[ui5-timeline]")
			.as("timeline")
			.then($item => {
				$item.get(0).addEventListener("name-click", cy.stub().as("clicked"));
			});

		cy.get("[ui5-timeline-item]")
			.shadow()
			.find("[ui5-link]")
			.realClick();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("setting accessible-name applied on the host element is reflected on the ul tag", () => {
		cy.mount(<Sample />);
		cy.get("[ui5-timeline]")
			.shadow()
			.find(".ui5-timeline-list")
			.should("have.attr", "aria-label", "Timeline vertical");
	});

	it("Item within Timeline Item is rendered", () => {
		cy.mount(<SampleWithSingleItem />);

		cy.get("[ui5-timeline]")
			.find("#testTimelineItem")
			.shadow()
			.find(".ui5-tli-bubble")
			.find(".ui5-tli-desc")
			.should("exist");
	});
});

describe("Timeline with group items interactions", () => {
	it("Group items are rendered", () => {
		cy.mount(<GroupSample />);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("groupItem");

		cy.get("@groupItem")
			.eq(0)
			.find("[ui5-timeline-item]")
			.should("have.length", 4);
	});

	it("Group items are collapsed on button click", () => {
		cy.mount(<GroupSample />);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("currentGroup");

		cy.get("@currentGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.as("currentGroupButton");

		cy.get("@currentGroupButton")
			.realClick();

		cy.realPress("F2");

		cy.realPress("ArrowDown");

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Meetings']")
			.as("nextGroup");

		cy.get("@nextGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.should("be.focused");
	});

	it("Group items are navigable", () => {
		cy.mount(<GroupSample />);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.eq(0)
			.as("currentGroup");

		cy.realPress("Tab");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowUp");

		cy.get("@currentGroup")
			.find("[ui5-timeline-item]")
			.eq(1)
			.should("be.focused");
	});

	it("Group can be collapsed/expanded using keyboard", () => {
		cy.mount(<GroupSample />);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("currentGroup");

		cy.get("@currentGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.as("currentGroupButton");

		cy.get("@currentGroupButton")
			.realClick();

		cy.realPress("Enter");

		cy.get("@currentGroup")
			.eq(0)
			.should("not.have.attr", "collapsed");

		cy.realPress("Space");

		cy.get("@currentGroup")
			.eq(0)
			.should("have.attr", "collapsed");
	});
});

describe("Timeline with growing mode", () => {
	it("tests 'loadMore' event fired upon infinite scroll", () => { // 8
		cy.mount(
			<div id="scroll-container" style={{ height: "200px", overflow: "scroll" }}>
				<Timeline growing="Scroll">
					<TimelineItem titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				</Timeline>
			</div>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.then(timeline => {
				timeline.get(0).addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		cy.get("#scroll-container")
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(
			<Timeline growing="Button">
				<TimelineItem titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.last()
			.realClick();

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.last()
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@timeline")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.last()
			.should("be.focused");
	});

	it("Arrows navigation should work only on focused item", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="first item"></TimelineItem>
				<TimelineItem titleText="second item">
					<Input id="input" />
				</TimelineItem>
				<TimelineItem titleText="last item"></TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("#input")
			.realClick();

		cy.realPress("ArrowDown");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.last()
			.should("not.be.focused");

		cy.get("#input")
			.realClick();

		cy.realPress("ArrowUp");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.first()
			.should("not.be.focused");
	});
});

describe("Keyboard interactions", () => {
	it("F2 should move the focus to interactive items and then should revert the focus to parent timeline item", () => {
		cy.mount(
			<Timeline>
				<TimelineItem  titleText="first item" subtitleText="20.02.2017 11:30" >
					<Button id="button" title="Click me"></Button>
				</TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.first()
			.as("firstItem")
			.realClick();

		cy.get("@firstItem")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("#button")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("@firstItem")
			.should("be.focused");
	});

	it("should move the focus to the next interactive item inside timeline item when Tab is pressed", () => {
		cy.mount(
			<Timeline>
				<TimelineItem  titleText="first item" subtitleText="20.02.2017 11:30" >
					<Button id="button1" title="Click me"></Button>
					<Button id="button2" title="Click me"></Button>
				</TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.first()
			.as("firstItem")
			.realClick();

		cy.get("@firstItem")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("#button1")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("#button2")
			.should("be.focused");
	});

	it("should move the focus to interactive element inside next timeline item with interactive elements when pressing Tab", () => {
		cy.mount(
			<Timeline>
				<TimelineItem  titleText="first item" subtitleText="20.02.2017 11:30" >
					<Button id="button1" title="Click me"></Button>
				</TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30">
					<Button id="button2" title="Click me"></Button>
				</TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.find("[ui5-timeline-item]")
			.first()
			.as("firstItem")
			.realClick();

		cy.get("@firstItem")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("#button1")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("#button2")
			.should("be.focused");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.mount(
			<Timeline id="test-timeline">
				<TimelineGroupItem groupName="Build">
					<TimelineItem
						id="item1"
						title="Compile"
						// subtitle="Testing suite A"
						subtitleText="Testing suite A"
						icon={accept}
						name="Testing suite A"
						state="Positive"
					>
						Compilation succeeded.
					</TimelineItem>
					<TimelineItem
						id="item2"
						title="Lint"
						// subtitle="Testing suite B"
						subtitleText="Testing suite B"
						icon={messageInformation}
						name="Testing suite B"
					>
						Lint completed with minor issues.
					</TimelineItem>
				</TimelineGroupItem>
			</Timeline>
		);

		cy.get("#test-timeline").as("timeline");
	});

	it("item with state attribute has aria-description, item without state does not", () => {
		cy.get(`[ui5-timeline-item][state="Positive"]`).each($itemWithState => {
			cy.wrap($itemWithState)
				.shadow()
				.find(".ui5-tli-bubble")
				.should("have.attr", "aria-description");
		});

		cy.get(`[ui5-timeline-item]:not([state="Positive"])`).each($itemWithoutState => {
			cy.wrap($itemWithoutState)
				.shadow()
				.find(".ui5-tli-bubble")
				.should("not.have.attr", "aria-description");
		});
	});
});

describe("Timeline - getFocusDomRef", () => {
	it("should return undefined when the Timeline is empty", () => {
		cy.mount(<Timeline></Timeline>);

		cy.get<Timeline>("[ui5-timeline]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<Timeline growing="Button">
				<TimelineItem id="firstItem" titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

		cy.get<Timeline>("[ui5-timeline]")
			.then(($timeline) => {
				cy.get<TimelineItem>("#firstItem")
					.then(($firstItem) => {
						expect($timeline[0].getFocusDomRef()).to.equal($firstItem[0].getFocusDomRef());
					});
			});
	});

	it("should return last focused item in the Timeline", () => {
		cy.mount(
			<Timeline growing="Button">
				<TimelineItem titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem id="lastItem" titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

		cy.get("[ui5-timeline]")
			.find("#lastItem")
			.realClick();

		cy.get<Timeline>("[ui5-timeline]")
			.then(($timeline) => {
				cy.get<TimelineItem>("#lastItem")
					.then(($lastItem) => {
						expect($timeline[0].getFocusDomRef()).to.equal($lastItem[0].getFocusDomRef());
					});
			});
	});
});

describe("Timeline Header Bar", () => {
	describe("Search functionality", () => {
		it("should show header bar when slotted", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch />
					<TimelineItem titleText="Meeting" />
					<TimelineItem titleText="Call" />
				</Timeline>
			);

			cy.get("[ui5-timeline]")
				.shadow()
				.find(".ui5-timeline-header-bar-wrapper")
				.should("exist");
		});

		it("should fire search event when user types in search input", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline]").then($timeline => {
				$timeline.get(0).addEventListener("search", cy.stub().as("searchEvent"));
			});

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-input]")
				.realClick();

			cy.realType("Meeting");

			cy.get("@searchEvent").should("have.been.called");
		});

		it("should include search value in event detail", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			let searchValue = "";
			cy.get("[ui5-timeline]").then($timeline => {
				$timeline.get(0).addEventListener("search", (e: CustomEvent<TimelineSearchEventDetail>) => {
					searchValue = e.detail.value;
				});
			});

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-input]")
				.realClick();

			cy.realType("Test");

			cy.wrap(null).then(() => {
				expect(searchValue).to.equal("Test");
			});
		});
	});

	describe("Filter functionality", () => {
		it("should show filter button when showFilter is true", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showFilter filterBy="Status">
						<TimelineFilterOption text="Open" />
						<TimelineFilterOption text="Closed" />
					</TimelineHeaderBar>
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.should("exist");
		});

		it("should fire filter event when filter selection changes", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showFilter filterBy="Status">
						<TimelineFilterOption text="Open" />
						<TimelineFilterOption text="Closed" />
					</TimelineHeaderBar>
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline]").then($timeline => {
				$timeline.get(0).addEventListener("filter", cy.stub().as("filterEvent"));
			});

			// Click the filter button to open the dialog
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.realClick();

			// Select the first option in the dialog list
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-dialog]")
				.find("[ui5-li]")
				.first()
				.realClick();

			// Confirm the dialog
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-dialog]")
				.find("[ui5-button][design='Emphasized']")
				.realClick();

			cy.get("@filterEvent").should("have.been.called");
		});
	});

	describe("Sort functionality", () => {
		it("should show sort button when showSort is true", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSort />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.should("exist");
		});

		it("should fire sort event when user clicks sort button", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSort />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline]").then($timeline => {
				$timeline.get(0).addEventListener("sort", cy.stub().as("sortEvent"));
			});

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.realClick();

			cy.get("@sortEvent").should("have.been.called");
		});

		it("should toggle sort order on consecutive clicks", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSort />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			const sortOrders: string[] = [];
			cy.get("[ui5-timeline]").then($timeline => {
				$timeline.get(0).addEventListener("sort", (e: CustomEvent<TimelineSortEventDetail>) => {
					sortOrders.push(e.detail.sortOrder);
				});
			});

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.as("sortButton");

			cy.get("@sortButton").realClick();
			cy.get("@sortButton").realClick();
			cy.get("@sortButton").realClick();

			cy.wrap(null).then(() => {
				expect(sortOrders).to.deep.equal(["Descending", "Ascending", "Descending"]);
			});
		});
	});

	describe("Accessibility", () => {
		it("should have correct ARIA role on header bar", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch showFilter showSort />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar]")
				.shadow()
				.find("[role='toolbar']")
				.should("exist");
		});

		it("should have accessible name on search input", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch />
					<TimelineItem titleText="Meeting" />
				</Timeline>
			);

			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-input]")
				.should("have.attr", "accessible-name");
		});
	});

	describe("Combined features", () => {
		it("should support all features together", () => {
			cy.mount(
				<Timeline>
					<TimelineHeaderBar slot="headerBar" showSearch showFilter showSort filterBy="Category">
						<TimelineFilterOption text="Work" />
						<TimelineFilterOption text="Personal" />
					</TimelineHeaderBar>
					<TimelineItem titleText="Work Meeting" />
					<TimelineItem titleText="Personal Call" />
				</Timeline>
			);

			// Search input should exist
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-input]")
				.should("exist");

			// Toolbar buttons should exist (sort + filter = 2 buttons)
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-toolbar-button]")
				.should("have.length", 2);
		});
	});

	describe("Application-side filtering", () => {
		it("application can remove items from DOM based on search event", () => {
			cy.mount(
				<Timeline id="appFilterTimeline">
					<TimelineHeaderBar slot="headerBar" showSearch />
					<TimelineItem titleText="Meeting with John" />
					<TimelineItem titleText="Call with Jane" />
				</Timeline>
			);

			// Application handles filtering by removing non-matching items from DOM
			cy.get("[ui5-timeline]").then($timeline => {
				const timeline = $timeline.get(0) as Timeline;
				const allItems = Array.from(timeline.querySelectorAll("[ui5-timeline-item]")) as TimelineItem[];

				timeline.addEventListener("search", (e: CustomEvent<TimelineSearchEventDetail>) => {
					const searchValue = e.detail.value.toLowerCase();

					if (searchValue === "") {
						// Restore all items when search is cleared
						allItems.forEach(item => {
							if (!item.parentElement) {
								timeline.appendChild(item);
							}
						});
					} else {
						// Remove non-matching items from DOM
						allItems.forEach(item => {
							const titleText = item.titleText?.toLowerCase() || "";
							if (!titleText.includes(searchValue)) {
								item.remove();
							} else if (!item.parentElement) {
								timeline.appendChild(item);
							}
						});
					}
				});
			});

			// Type in search
			cy.get("[ui5-timeline-header-bar]")
				.shadow()
				.find("[ui5-input]")
				.realClick();

			cy.realType("Meeting");

			// Application filtered - only matching item remains in DOM
			cy.get("[ui5-timeline-item]").should("have.length", 1);
			cy.get("[ui5-timeline-item]").eq(0).should("have.attr", "title-text", "Meeting with John");
		});
	});
});