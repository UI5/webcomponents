import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ListItemGroup from "../../src/ListItemGroup.js";

describe("ListItemGroup Tests", () => {
	it("ListGroup is rendered", () => {
		cy.mount(<ListItemGroup headerText="New Items" />);

		cy.get("[ui5-li-group]").should("exist");

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("exist");
	});

	it("ListGroup renders header-text property correctly", () => {
		cy.mount(<ListItemGroup headerText="New Items" />);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("contain.text", "New Items");
	});

	it("ListGroup propagates focused property to header item", () => {
		cy.mount(<ListItemGroup headerText="New Items" />);

		cy.get("[ui5-li-group]")
			.invoke("prop", "focused", true);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("have.prop", "focused", true);

		cy.get("[ui5-li-group]")
			.invoke("prop", "focused", false);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("have.prop", "focused", false);
	});
});

describe("List drag and drop tests", () => {
	const setupDragAndDrop = (listSelector, acceptExternal = false) => {
		cy.get(listSelector).then(($list) => {
			const list = $list[0];

			list.addEventListener("ui5-move-over", cy.stub().as("moveOverStub").callsFake((e) => {
				const { destination, source } = e.detail;

				if (!acceptExternal && !list.contains(source.element)) {
					return;
				}

				if (destination.placement === "Before" || destination.placement === "After") {
					e.preventDefault();
				}

				if (destination.placement === "On" && "allowsNesting" in destination.element.dataset) {
					e.preventDefault();
				}
			}));

			list.addEventListener("ui5-move", cy.stub().as("moveStub").callsFake((e) => {
				const { destination, source } = e.detail;

				if (source.element === destination.element) return;

				const parent = destination.element.closest("[ui5-li-group]");

				if (destination.placement === "Before") {
					parent.insertBefore(source.element, destination.element);
				} else if (destination.placement === "After") {
					const nextElement = Array.from(parent.children).at(
						Array.from(parent.children).indexOf(destination.element) + 1
					);
					parent.insertBefore(source.element, nextElement);
				} else if (destination.placement === "On") {
					destination.element.prepend(source.element);
				}
			}));
		});
	};

	const dispatchMoveEvent = (sourceAlias: string, targetAlias: string, placement: string) => {
		cy.get(sourceAlias).then($source => {
			cy.get(targetAlias).then($target => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $source[0] },
						destination: { element: $target[0], placement }
					}
				});

				const listElement = $target[0].closest("[ui5-li-group]");
				if (listElement) {
					listElement.dispatchEvent(moveEvent);
				}
			});
		});
	};

	it("Moving item After another", () => {
		cy.mount(
			<div>
				<ListItemGroup headerText="List 1" />
			</div>
		);

		cy.get("[ui5-li-group]").eq(0).as("list1").should("exist");
		setupDragAndDrop("@list1", false);

		cy.get("@list1").then($list => {
			$list[0].innerHTML = `
				<ui5-li movable>1. Bulgaria</ui5-li>
				<ui5-li movable>1. Germany</ui5-li>
				<ui5-li movable>1. Spain</ui5-li>
			`;
		});

		cy.get("@list1").find("ui5-li").should("have.length", 3);
		cy.get("@list1").find("ui5-li").eq(0).as("first").should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(1).as("second").should("contain.text", "1. Germany");

		dispatchMoveEvent("@first", "@second", "After");

		cy.get("@list1").find("ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("@list1").find("ui5-li").eq(1).should("contain.text", "1. Bulgaria");

		cy.get("@list1").find("ui5-li").eq(1).as("currentFirst").should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(2).as("currentThird").should("contain.text", "1. Spain");

		dispatchMoveEvent("@currentFirst", "@currentThird", "After");

		cy.get("@list1").find("ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("@list1").find("ui5-li").eq(1).should("contain.text", "1. Spain");
		cy.get("@list1").find("ui5-li").eq(2).should("contain.text", "1. Bulgaria");
	});

	it("Moving item Before another", () => {
		cy.mount(
			<div>
				<ListItemGroup headerText="List 1" />
			</div>
		);

		cy.get("[ui5-li-group]").eq(0).as("list1").should("exist");
		setupDragAndDrop("@list1", false);

		cy.get("@list1").then($list => {
			$list[0].innerHTML = `
				<ui5-li movable>1. Bulgaria</ui5-li>
				<ui5-li movable>1. Germany</ui5-li>
				<ui5-li movable>1. Spain</ui5-li>
			`;
		});

		cy.get("@list1").find("ui5-li").should("have.length", 3);
		cy.get("@list1").find("ui5-li").eq(0).as("first").should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(2).as("third").should("contain.text", "1. Spain");

		dispatchMoveEvent("@first", "@third", "Before");

		cy.get("@list1").find("ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("@list1").find("ui5-li").eq(1).should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(2).should("contain.text", "1. Spain");

		cy.get("@list1").find("ui5-li").eq(1).as("currentFirst").should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(0).as("currentSecond").should("contain.text", "1. Germany");

		dispatchMoveEvent("@currentFirst", "@currentSecond", "Before");

		cy.get("@list1").find("ui5-li").eq(0).should("contain.text", "1. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(1).should("contain.text", "1. Germany");
		cy.get("@list1").find("ui5-li").eq(2).should("contain.text", "1. Spain");
	});

	it("Moving item ON another", () => {
		cy.mount(
			<div>
				<ListItemGroup headerText="List 2" />
			</div>
		);

		cy.get("[ui5-li-group]").eq(0).as("list2").should("exist");
		setupDragAndDrop("@list2", true);

		cy.get("@list2").then($list => {
			$list[0].innerHTML = `
				<ui5-li movable>2. Bulgaria</ui5-li>
				<ui5-li movable data-allows-nesting>2. Germany (Allows nesting)</ui5-li>
				<ui5-li movable>2. Spain</ui5-li>
			`;
		});

		cy.get("@list2").find("ui5-li").should("have.length", 3);
		cy.get("@list2").find("ui5-li").eq(0).as("first").should("contain.text", "2. Bulgaria");
		cy.get("@list2").find("ui5-li").eq(1).as("second").should("contain.text", "2. Germany (Allows nesting)");

		dispatchMoveEvent("@first", "@second", "On");

		cy.get("@list2").children("ui5-li").should("have.length", 2);
		cy.get("@list2").children("ui5-li").eq(0).find("ui5-li").should("contain.text", "2. Bulgaria");
	});

	it("Moving item from one list to another", () => {
		cy.mount(
			<div>
				<ListItemGroup headerText="List 1" />
				<ListItemGroup headerText="List 2" />
			</div>
		);

		cy.get("[ui5-li-group]").eq(0).as("list1").should("exist");
		cy.get("[ui5-li-group]").eq(1).as("list2").should("exist");

		setupDragAndDrop("@list1", false);
		setupDragAndDrop("@list2", true);

		cy.get("@list1").then($list => {
			$list[0].innerHTML = `
				<ui5-li movable>1. Bulgaria</ui5-li>
				<ui5-li movable>1. Germany</ui5-li>
				<ui5-li movable>1. Spain</ui5-li>
			`;
		});

		cy.get("@list2").then($list => {
			$list[0].innerHTML = `
				<ui5-li movable>2. Bulgaria</ui5-li>
				<ui5-li movable data-allows-nesting>2. Germany (Allows nesting)</ui5-li>
				<ui5-li movable>2. Spain</ui5-li>
			`;
		});

		cy.get("@list1").find("ui5-li").should("have.length", 3);
		cy.get("@list2").find("ui5-li").should("have.length", 3);

		cy.get("@list2").find("ui5-li").eq(0).as("listTwoItem").should("contain.text", "2. Bulgaria");
		cy.get("@list1").find("ui5-li").eq(0).as("listOneFirst").should("contain.text", "1. Bulgaria");

		dispatchMoveEvent("@listTwoItem", "@listOneFirst", "After");

		cy.get("@list1").find("ui5-li").should("have.length", 4);
		cy.get("@list2").find("ui5-li").should("have.length", 2);
	});
});

describe("Focus", () => {
	it("getFocusDomRef should return header element if available", () => {
		cy.mount(
			<List>
				<ListItemGroup headerText="Group Header">
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get<ListItemGroup>("[ui5-li-group]")
			.then(($el) => {
				const group = $el[0];
				expect(group.getFocusDomRef()).to.have.attr("ui5-li-group-header");
			});

	});

	it("getFocusDomRef should return list item when header is not available", () => {
		cy.mount(
			<List>
				<ListItemGroup>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get<ListItemGroup>("[ui5-li-group]")
			.then(($el) => {
				const group = $el[0];
				expect(group.getFocusDomRef()).to.have.attr("ui5-li");
			});
	});
});