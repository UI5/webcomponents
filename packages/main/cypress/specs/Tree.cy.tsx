import Tree from "../../src/Tree.js";
import "../../src/TreeItem.js";
import TreeItem from "../../src/TreeItem.js";
import Icon from "../../src/Icon.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import TreeItemCustom from "../../src/TreeItemCustom.js";
import Button from "../../src/Button.js";
import Option from "../../src/Option.js";
import Select from "../../src/Select.js";


describe("Tree Tests", () => {
	it("tests accessibility properties forwarded to the list", () => {
		cy.mount(
			<>
				<Tree
					accessibleName="Tree"
					accessibleNameRef="lblDesc1"
					accessibleDescription="Description"
					accessibleDescriptionRef="lblDesc2"
				></Tree>
				<div id="lblDesc1">Tree</div>
				<div id="lblDesc2">Description</div>
			</>
		);

		cy.get("[ui5-tree]")
			.as("tree");

		cy.get("@tree")
			.shadow()
			.find(".ui5-tree-root")
			.should("have.attr", "accessible-name", "Tree")
			.and("have.attr", "accessible-name-ref", "lblDesc1")
			.and("have.attr", "accessible-description", "Description")
			.and("have.attr", "accessible-description-ref", "lblDesc2");
	});

	it("Tests image slot", () => {
		cy.mount(
			<Tree>
				<TreeItem id="image-slot-tree-item">
					<Icon name={bell} slot="image" id="slotted-icon"></Icon>
				</TreeItem>
			</Tree>
		);

		cy.get("#image-slot-tree-item")
			.shadow()
			.find("slot[name='image']")
			.should("exist")
			.then($slot => {
				const slotElement = $slot[0] as HTMLSlotElement;
				const assignedNodes = slotElement.assignedNodes();
				expect(assignedNodes.length).to.be.greaterThan(0);
				cy.wrap(assignedNodes[0]).should("have.attr", "id", "slotted-icon");
			});
	});
});

describe("Tree Props", () => {
	it("noDataText is properly rendered", () => {
		cy.mount(
			<>
				<Tree noDataText="No data"></Tree>
			</>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.find(".ui5-list-nodata")
			.should("exist")
	});
});

before(() => {
	cy.wrap({ setAnimationMode })
		.then(api => {
			return api.setAnimationMode("none");
		});
})

const getVisibleTreeItems = (treeSelector = "[ui5-tree]") => {
	return cy.get(`${treeSelector} [ui5-tree-item]`).filter(":visible");
};

const getVisibleTreeItemsCount = (treeSelector = "[ui5-tree]") => {
	return getVisibleTreeItems(treeSelector).then($items => $items.length);
};

describe("Tree general interaction", () => {
	it("Tree is rendered", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" icon="paste" additional-text="Available" indeterminate selected additional-text-state="Information">
					<TreeItem text="Tree 1.1" additional-text="Re-stock" additional-text-state="Negative" indeterminate selected>
						<TreeItem text="Tree 1.1.1" additional-text="Required" additional-text-state="Critical" selected></TreeItem>
						<TreeItem text="Tree 1.1.2" additional-text="Available" additional-text-state="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2" icon="copy">
					<TreeItem text="Tree 2.1">
						<TreeItem text="Tree 2.1.1"></TreeItem>
						<TreeItem text="Tree 2.1.2">
							<TreeItem text="Tree 2.1.2.1"></TreeItem>
							<TreeItem text="Tree 2.1.2.2"></TreeItem>
							<TreeItem text="Tree 2.1.2.3"></TreeItem>
							<TreeItem text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem text="Tree 2.2"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("exist");
	});

	it("Tree items can be collapsed", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		getVisibleTreeItemsCount().then(initialCount => {
			cy.get("[ui5-tree-item][expanded]")
				.shadow()
				.find(".ui5-li-tree-toggle-icon")
				.click();

			getVisibleTreeItemsCount().should("be.lessThan", initialCount);
		});
	});

	it("Tree items can be expanded", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1">
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		getVisibleTreeItemsCount().then(initialCount => {
			cy.get("[ui5-tree-item]:first")
				.shadow()
				.find(".ui5-li-tree-toggle-icon")
				.click();

			getVisibleTreeItemsCount().should("be.greaterThan", initialCount);
		});
	});

	it("keyboard handling on F2", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItemCustom
					expanded
					showToggleButton
					hideSelectionElement
					type="Active"
					level={1}
				>
					<Button slot="content">Level 1</Button>

					<TreeItemCustom
						type="Active"
						showToggleButton
						level={2}
						expanded
					>
						<Select slot="content">
							<Option>Level 2</Option>
							<Option>Option 2.1</Option>
							<Option>Option 2.3</Option>
						</Select>

						<TreeItemCustom
							hideSelectionElement
							type="Active"
							level={3}
							class="item"
						>
							<Button slot="content" class="itemBtn">Level 3</Button>
						</TreeItemCustom>
					</TreeItemCustom>
				</TreeItemCustom>
			</Tree>
		);

		cy.get("[ui5-tree-item-custom].item").should("exist");
		cy.get(".itemBtn").should("exist");

		cy.get("[ui5-tree-item-custom].item").click();

		cy.get("[ui5-tree-item-custom].item").should("be.focused");

		cy.get("[ui5-tree-item-custom].item").realPress("F2");

		cy.get(".itemBtn").should("be.focused");

		cy.get(".itemBtn").realPress("F2");

		cy.get("[ui5-tree-item-custom].item").should("be.focused");
	});
});

describe("Tree proxies properties to list", () => {
	it("Mouseover/mouseout events", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);
	
		cy.get("[ui5-tree]").then($tree => {
			$tree[0].addEventListener("ui5-item-mouseover", cy.stub().as("mouseoverStub"));
			$tree[0].addEventListener("ui5-item-mouseout", cy.stub().as("mouseoutStub"));
		});
	
		cy.get("[ui5-tree-item]:first")
			.shadow()
			.find(".ui5-li-root-tree")
			.realHover();
	
		cy.get("@mouseoverStub")
			.should("have.been.calledOnce");
	
		cy.get("[ui5-tree-item]:eq(1)")
			.shadow()
			.find(".ui5-li-root-tree")
			.realHover();
	
		cy.get("@mouseoverStub")
			.should("have.been.calledTwice");
	
		cy.get("@mouseoutStub")
			.should("have.been.calledOnce");
	});

	it("SelectionMode works", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2">
					<TreeItem text="Tree 2.1"></TreeItem>
					<TreeItem text="Tree 2.2"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "selection-mode", "Multiple");

		cy.get("[ui5-tree-item]:first")
			.should("have.attr", "_selection-mode", "Multiple");

		const modes = ["None", "Single", "SingleStart", "SingleEnd", "Multiple", "Delete"];
		modes.forEach(selectionMode => {
			cy.get("[ui5-tree]")
				.invoke("attr", "selection-mode", selectionMode);

			cy.get("[ui5-tree]")
				.shadow()
				.find("[ui5-tree-list]")
				.should("have.attr", "selection-mode", selectionMode);
		});
	});

	it("SelectionMode works recursively", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Should have checkbox">
					<TreeItem text="Should have checkbox">
						<TreeItem
							class="lastItem"
							text="Should have checkbox"
						></TreeItem>
						<TreeItem text="Should have checkbox"></TreeItem>
					</TreeItem>
					<TreeItem text="Should have checkbox"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get(".lastItem")
			.should("have.attr", "_selection-mode", "Multiple");
	});

	it("headerText, footerText, noDataText work", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.invoke("attr", "header-text", "header text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "header-text", "header text");

		cy.get("[ui5-tree]")
			.invoke("attr", "footer-text", "footer text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "footer-text", "footer text");

		cy.get("[ui5-tree]")
			.invoke("attr", "no-data-text", "no data text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "no-data-text", "no data text");
	});

	it("Tests the prevention of the ui5-itemClick event", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1"></TreeItem>
				</TreeItem>
			</Tree>
		);
	
		cy.get("[ui5-tree]").then($tree => {
			$tree[0].addEventListener("ui5-item-click", cy.stub().as("itemClickStub").callsFake((event) => {
				event.preventDefault();
			}));
		});
	
		cy.get("[ui5-tree-item]:first")
			.click()
			.should("not.have.attr", "selected");
	
		cy.get("@itemClickStub")
			.should("have.been.calledOnce");
	});

	it("selectionChange event provides targetItem parameter", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Item 1" indeterminate selected></TreeItem>
				<TreeItem text="Item 2" indeterminate selected></TreeItem>
				<TreeItem text="Item 3"></TreeItem>
				<TreeItem text="Item 4" indeterminate selected></TreeItem>
			</Tree>
		);
	
		let selectionChangeStub;
	
		cy.get("[ui5-tree]").then($tree => {
			selectionChangeStub = cy.stub().as("selectionChangeStub");
			$tree[0].addEventListener("ui5-selection-change", selectionChangeStub);
		});
	
		cy.get("[ui5-tree-item]:first")
			.invoke("attr", "id", "item1")
			.click()
			.then(() => {
				expect(selectionChangeStub).to.have.been.calledOnce;
				expect(selectionChangeStub.getCall(0).args[0].detail.targetItem.id).to.equal("item1");
			});
	});
});

describe("Tree has screen reader support", () => {
	it("List role is correct", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.shadow()
			.find("ul")
			.should("have.attr", "role", "tree");
	});

	it("List item acc attributes correct", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree] [ui5-tree-item]").each(($item) => {
			cy.wrap($item)
				.shadow()
				.find("li")
				.should("have.attr", "role", "treeitem");

			cy.wrap($item)
				.invoke("attr", "level")
				.then((level) => {
					cy.wrap($item)
						.shadow()
						.find("li")
						.should("have.attr", "aria-level", level);
				});

			cy.wrap($item)
				.invoke("prop", "showToggleButton")
				.then((showToggleButton) => {
					cy.wrap($item)
						.invoke("prop", "expanded")
						.then((expanded) => {
							const ariaExpandedValues = {
								"true": {
									"true": "true",
									"false": "false",
								},
								"false": {
									"true": null,
									"false": null,
								}
							};

							const expectedValue = ariaExpandedValues[showToggleButton.toString()][expanded.toString()];

							if (expectedValue === null) {
								cy.wrap($item)
									.shadow()
									.find("li")
									.should("not.have.attr", "aria-expanded");
							} else {
								cy.wrap($item)
									.shadow()
									.find("li")
									.should("have.attr", "aria-expanded", expectedValue);
							}
						});
				});
		});
	});
});

describe("Tree slots", () => {
	it("items slot", () => {
		cy.mount(
			<>
				<Tree>
					<TreeItem text="1-0-0" expanded>
						<TreeItem text="1-1-0" expanded>
							<TreeItem text="1-1-1"></TreeItem>
						</TreeItem>
						<TreeItem text="1-2-0"></TreeItem>
						<TreeItem text="1-3-0"></TreeItem>
					</TreeItem>
				</Tree>
				<button id="btn">Add</button>
			</>
		);

		cy.get("[ui5-tree-item]:first")
			.find("[ui5-tree-item]:first")
			.as("treeItem");

		cy.get("@treeItem")
			.invoke("prop", "items")
			.should("have.length", 1);

		cy.get("#btn").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				cy.get("@treeItem").then(($treeItem) => {
					const newTreeItem = document.createElement("ui5-tree-item") as any;
					const currentCount = $treeItem[0].querySelectorAll("[ui5-tree-item]").length;
					newTreeItem.text = `1-1-${currentCount + 1}`;
					$treeItem[0].appendChild(newTreeItem);
				});
			});
		});

		cy.get("#btn").click();

		cy.get("@treeItem")
			.invoke("prop", "items")
			.should("have.length", 2);

		cy.get("@treeItem")
			.find("[ui5-tree-item]:last-child")
			.should("have.prop", "text", "1-1-2")
			.and("have.prop", "level", 3);
	});
});

describe("Tree drag and drop tests", () => {
	const setupDragAndDrop = (tree: HTMLElement, options: {
		allowBefore?: boolean;
		allowAfter?: boolean;
		allowOn?: boolean;
		preventParentChildMove?: boolean;
	} = {}) => {
		const { allowBefore = true, allowAfter = true, allowOn = true, preventParentChildMove = false } = options;

		tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
			const { destination, source } = e.detail;
			
			if (!tree.contains(source.element)) {
				return;
			}

			// Prevent parent-child moves if specified
			if (preventParentChildMove && source.element.contains(destination.element)) {
				return;
			}

			// Check allowed placements
			if (!allowBefore && destination.placement === "Before") {
				return;
			}
			if (!allowAfter && destination.placement === "After") {
				return;
			}
			if (!allowOn && destination.placement === "On") {
				return;
			}

			// Special nesting rules
			if (destination.placement === "On" && !("allowsNesting" in destination.element.dataset)) {
				return;
			}

			e.preventDefault();
		});

		tree.addEventListener("ui5-move", (e: CustomEvent) => {
			const { destination, source } = e.detail;

			// Prevent self-moves
			if (source.element === destination.element) {
				return;
			}

			// Prevent parent-child moves if specified
			if (preventParentChildMove && source.element.contains(destination.element)) {
				return;
			}

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
				cy.get("[ui5-tree]").then($tree => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});
	};

	beforeEach(() => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy" data-allows-nesting>
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);
	});

	it("Moving item After another", () => {
		cy.get("[ui5-tree]").then($tree => setupDragAndDrop($tree[0], { allowBefore: false }));

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("secondItem");

		dispatchMoveEvent("@firstItem", "@secondItem", "After");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 1");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("movedFirst");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).as("third");

		dispatchMoveEvent("@movedFirst", "@third", "After");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 3 (no icon)");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 1");
	});

	it("Moving item Before another", () => {
		cy.get("[ui5-tree]").then($tree => setupDragAndDrop($tree[0], { allowAfter: false }));

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).as("thirdItem");

		dispatchMoveEvent("@firstItem", "@thirdItem", "Before");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("movedFirst");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("second");

		dispatchMoveEvent("@movedFirst", "@second", "Before");

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");
	});

	it("Moving item ON another", () => {
		cy.get("[ui5-tree]").then($tree => setupDragAndDrop($tree[0]));

		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("secondItem");

		dispatchMoveEvent("@firstItem", "@firstItem", "On");

		cy.get("[ui5-tree] > [ui5-tree-item]").should("have.length", 3);
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 1");

		dispatchMoveEvent("@firstItem", "@secondItem", "On");

		cy.get("[ui5-tree] > [ui5-tree-item]").should("have.length", 2);
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).find("[ui5-tree-item]").first().should("have.attr", "text", "Tree 1");
	});

	it("Rearranging leafs", () => {
		cy.get("[ui5-tree]").then($tree => setupDragAndDrop($tree[0]));

		cy.get("[ui5-tree-item]").shadow().find(".ui5-li-tree-toggle-icon").first().click();

		cy.get("[ui5-tree] [ui5-tree-item]").then($allItems => {
			const items = Array.from($allItems);
			
			const moveEvent1 = new CustomEvent("ui5-move", {
				detail: {
					source: { element: items[12] },
					destination: { element: items[13], placement: "After" }
				}
			});

			cy.get("[ui5-tree]").then($tree => {
				$tree[0].dispatchEvent(moveEvent1);
			});

			cy.get("[ui5-tree] [ui5-tree-item]").then($newItems => {
				const newItems = Array.from($newItems);
				expect(newItems[12]).to.equal(items[13]);
				expect(newItems[13]).to.equal(items[12]);
			});

			cy.get("[ui5-tree] [ui5-tree-item]").then($currentItems => {
				const currentItems = Array.from($currentItems);
				const moveEvent2 = new CustomEvent("ui5-move", {
					detail: {
						source: { element: currentItems[13] },
						destination: { element: currentItems[12], placement: "Before" }
					}
				});

				cy.get("[ui5-tree]").then($tree => {
					$tree[0].dispatchEvent(moveEvent2);
				});

				cy.get("[ui5-tree] [ui5-tree-item]").then($finalItems => {
					const finalItems = Array.from($finalItems);
					expect(finalItems[12]).to.equal(items[12]);
					expect(finalItems[13]).to.equal(items[13]);
				});
			});
		});
	});

	it("Nesting parent among its children should be impossible", () => {
		cy.get("[ui5-tree]").then($tree => setupDragAndDrop($tree[0], { preventParentChildMove: true }));

		cy.get("[ui5-tree] [ui5-tree-item]").then($allItems => {
			const items = Array.from($allItems);
			const originalOrder = items.map(item => item.getAttribute('text'));

			const moveEvent = new CustomEvent("ui5-move", {
				detail: {
					source: { element: items[0] },
					destination: { element: items[1], placement: "After" }
				}
			});

			cy.get("[ui5-tree]").then($tree => {
				$tree[0].dispatchEvent(moveEvent);
			});

			// Verify no change
			cy.get("[ui5-tree] [ui5-tree-item]").then($newItems => {
				const newItems = Array.from($newItems);
				const newOrder = newItems.map(item => item.getAttribute('text'));
				expect(newOrder).to.deep.equal(originalOrder);
			});
		});
	});
});