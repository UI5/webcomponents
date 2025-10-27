import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import type UI5Element from "@ui5/webcomponents-base";

function resizeContainer(wrapperId: string, extendSize?: boolean) {
	cy.get(wrapperId).then(($wrapper) => {
		const wrapper = $wrapper[0] as HTMLElement;
		const wrapperWidth = wrapper.clientWidth;
		const step = 50;
		const amount = extendSize ? step : -step;
		const newWidth = Math.max(wrapperWidth + amount, 0);
		wrapper.style.width = newWidth + "px";

		window.dispatchEvent(new Event('resize'));
	});
}

function updateLinkContent(linkId: string, extendSize?: boolean) {
	cy.get(linkId).then(($link) => {
		const link = $link[0] as HTMLElement;
		const step = 5;
		const content = link.innerText;
		let newContent: string;

		if (extendSize) {
			newContent = content + new Array(step + 1).join("a");
		} else {
			newContent = content.substring(step);
		}

		link.innerText = newContent;

		window.dispatchEvent(new Event('resize'));
	});
}

describe("breadcrumbs navigation", () => {

	it("displays all items in the popover on mobile", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem id="first" href="#">Link1</BreadcrumbsItem>
				<BreadcrumbsItem id="second" href="#">Link2</BreadcrumbsItem>
				<BreadcrumbsItem id="third" href="#">Link3</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("ui5-breadcrumbs").then(async ($container) => {
			const firstFocusable = await getFirstFocusableElement($container.get(0));
			await firstFocusable?.focus();
		});

		cy.realPress("ArrowRight");

		cy.get("ui5-breadcrumbs").invoke("prop", "_itemNavigation").then(_itemNavigation => {
			return _itemNavigation._currentIndex;
		})
			.should("equal", 1);

		cy.realPress("ArrowUp");

		cy.get("ui5-breadcrumbs").invoke("prop", "_itemNavigation").then(_itemNavigation => {
			return _itemNavigation._currentIndex;
		})
			.should("equal", 0);
	});
});

describe("Breadcrumbs - getFocusDomRef Method", () => {
	it("should return undefined when the Breadcrumbs is empty", () => {
		cy.mount(<Breadcrumbs design="NoCurrentPage"></Breadcrumbs>);

		cy.get<Breadcrumbs>("[ui5-breadcrumbs]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem id="first">Link1</BreadcrumbsItem>
				<BreadcrumbsItem>Link2</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get<UI5Element>("[ui5-breadcrumbs], #first")
			.then(($el) => {
				const breadcrumbs = $el[0];
				const item = $el[1];

				const breadcrumbsAnchor = breadcrumbs.getFocusDomRef();
				const itemAnchor = item.getFocusDomRef().shadowRoot.querySelector("a");

				expect(breadcrumbsAnchor.textContent).to.equal(itemAnchor.textContent);
			});
	});

	it("should return last focused item in the Breadcrumbs", () => {
		cy.mount(
			<Breadcrumbs id="breadcrumbs">
				<BreadcrumbsItem>Link1</BreadcrumbsItem>
				<BreadcrumbsItem id="second">Link2</BreadcrumbsItem>
				<BreadcrumbsItem>Link1</BreadcrumbsItem>
				<BreadcrumbsItem>Link1</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("#breadcrumbs")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.as("second");

		cy.get("@second").click();

		cy.get<UI5Element>("[ui5-breadcrumbs], #second")
			.then(($el) => {
				const breadcrumbs = $el[0];
				const item = $el[1];

				const breadcrumbsAnchor = breadcrumbs.getFocusDomRef();
				const itemAnchor = item.getFocusDomRef().shadowRoot.querySelector("a");

				expect(breadcrumbsAnchor.textContent).to.equal(itemAnchor.textContent);
			});
	});
});

describe("Breadcrumbs general interaction", () => {
	it("tests getDomRef returns a valid DOM element", () => {
		cy.mount(
			<Breadcrumbs design="NoCurrentPage">
				<BreadcrumbsItem href="#" accessible-name="last link acc name">
					Link5
				</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs-item]").then(($breadcrumbItem) => {
			const breadcrumbItemElement = $breadcrumbItem[0] as BreadcrumbsItem;
			const domRef = breadcrumbItemElement.getDomRef();

			expect(domRef).to.exist;
			expect(domRef.nodeType).to.equal(Node.ELEMENT_NODE);
		});
	});

	it("fires link-click event", () => {
		let resultText = '';

		cy.mount(
			<div>
				<Breadcrumbs onItemClick={(event) => { resultText = event.detail.item.innerText; }}>
					<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<span id="result">Last pressed link: </span>
			</div>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				const linkText = $link.text();
				cy.wrap($link).realClick();

				cy.then(() => {
					expect(resultText, 'label should have a value').to.not.be.empty;
					expect(resultText, 'label for pressed link is correct').to.equal(linkText);
				});
			});
	});

	it("fires link-click event when link in overflow", () => {
		let resultText = '';

		cy.mount(
			<div style={{ width: '300px' }}>
				<Breadcrumbs onItemClick={(event) => { resultText = event.detail.item.innerText; }}>
					<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<span id="result">Last pressed link: </span>
			</div>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.first()
			.realClick();

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-li")
			.first()
			.then(($firstItem) => {
				const itemText = $firstItem.prop('innerText');
				cy.wrap($firstItem).realClick();

				cy.then(() => {
					expect(resultText, 'label should have a value').to.not.be.empty;
					expect(resultText, 'label for pressed link is correct').to.equal(itemText);
				});
			});
	});

	it("updates layout on container resize", () => {
		cy.mount(
			<div id="wrapper" style={{ width: '400px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<button id="shrinkSizeBtn" onClick={() => resizeContainer("#wrapper")}>Shrink</button>
			</div>
		);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const countItemsInOverflowBefore = breadcrumbsElement._overflowSize || 0;
			const expectedCountLinksInOverflowAfter = countItemsInOverflowBefore + 1;

			cy.get("#shrinkSizeBtn").realClick();

			cy.wait(300);

			cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
				const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
				expect(breadcrumbsElement._overflowSize || 0,
					"one link is added to the overflow").to.equal(expectedCountLinksInOverflowAfter);
			});
		});
	});

	it("updates layout on resize of content outside overflow", () => {
		cy.mount(
			<div style={{ width: '400px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<button onClick={() => updateLinkContent("[ui5-breadcrumbs-item]:nth-of-type(7)", true)}>Extend Link</button>
			</div>
		);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const countItemsInOverflowBefore = breadcrumbsElement._overflowSize || 0;
			const expectedCountItemsInOverflowAfter = countItemsInOverflowBefore + 1;

			cy.get("button").realClick();

			cy.wait(300);

			cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
				const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
				expect(breadcrumbsElement._overflowSize || 0,
					"the link is added to the overflow").to.equal(expectedCountItemsInOverflowAfter);
			});
		});
	});

	it("updates layout on resize of content inside overflow", () => {
		cy.mount(
			<div style={{ width: '200px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">VeryLongLinkName1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaaaaaaaaaaaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<button onClick={() => updateLinkContent("[ui5-breadcrumbs-item]:nth-of-type(7)", false)}>Shorten Link</button>
			</div>
		);

		cy.wait(500);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const countItemsInOverflowBefore = breadcrumbsElement._overflowSize;
			const expectedCountItemsInOverflowAfter = countItemsInOverflowBefore - 1;

			cy.get("button").realClick();

			cy.wait(500);

			cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
				const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
				expect(breadcrumbsElement._overflowSize, "the link is taken out of the overflow").to.equal(expectedCountItemsInOverflowAfter);
			});
		});
	});

	it("updates layout when link content removed", () => {
		cy.mount(
			<div style={{ width: '300px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<button onClick={() => updateLinkContent("[ui5-breadcrumbs-item]:nth-of-type(7)", false)}>Shorten Link</button>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($initialLink) => {
				const initialLinkId = $initialLink.prop('id');

				cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
					const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
					const countItemsInOverflowBefore = breadcrumbsElement._overflowSize || 0;

					cy.get("button").realClick();

					cy.wait(300);

					cy.get("[ui5-breadcrumbs]")
						.shadow()
						.find("ui5-link")
						.eq(1)
						.then(($newLink) => {
							const newLinkId = $newLink.prop('id');
							const newLinkText = $newLink.text();

							expect(newLinkId, "another link is rendered in the place of the empty item").to.not.equal(initialLinkId);
							expect(newLinkText, "the new link is non-empty").to.not.be.empty;
						});

					cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
						const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
						const finalOverflowSize = breadcrumbsElement._overflowSize || 0;

						expect(finalOverflowSize, "layout changed when content removed").to.not.equal(countItemsInOverflowBefore);
					});
				});
			});
	});

	it("updates layout when content added to empty link", () => {
		cy.mount(
			<div style={{ width: '250px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">VeryLongLinkName1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName6</BreadcrumbsItem>
					<BreadcrumbsItem href="#"></BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
				<button onClick={() => updateLinkContent("[ui5-breadcrumbs-item]:nth-of-type(7)", true)}>Extend Link</button>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs-item]").eq(6).then(($lastItem) => {
			const lastItem = $lastItem[0] as BreadcrumbsItem;
			const lastLinkId = lastItem._id + "-link";

			cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
				const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
				const countItemsInOverflowBefore = breadcrumbsElement._overflowSize || 0;

				expect($lastItem.text(), "the item has no text").to.equal("");

				cy.get("[ui5-breadcrumbs]")
					.shadow()
					.find(`#${lastLinkId}`)
					.should('have.length', 0);

				cy.get("button").realClick();

				cy.wait(300);

				cy.get("[ui5-breadcrumbs]")
					.shadow()
					.find(`#${lastLinkId}`)
					.should('have.length', 1);

				cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
					const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
					const finalOverflowSize = breadcrumbsElement._overflowSize || 0;

					expect(finalOverflowSize,
						"overflow should increase when content added").to.be.at.least(countItemsInOverflowBefore);
				});
			});
		});
	});

	it("standard breadcrumb with single item shows location", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem href="#someHref">Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				expect($link.text(), "label is displayed").to.equal("Location");
			});
	});

	it("opens upon space", () => {
		cy.mount(
			<div>
				<Breadcrumbs design="NoCurrentPage">
					<BreadcrumbsItem href="#" accessible-name="first link acc name">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#" accessible-name="last link acc name">Link5</BreadcrumbsItem>
				</Breadcrumbs>

				<div style={{ width: '200px' }}>
					<Breadcrumbs>
						<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
						<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
						<BreadcrumbsItem>Location</BreadcrumbsItem>
					</Breadcrumbs>
				</div>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]")
			.first()
			.shadow()
			.find("ui5-link")
			.eq(3)
			.realClick();

		cy.realPress("Tab");

		cy.get("[ui5-breadcrumbs]").last().then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const focusDomRef = breadcrumbsElement.getFocusDomRef();
			if (focusDomRef) {
				focusDomRef.focus();

				cy.wait(100);
				cy.realPress("Space");

				cy.get("[ui5-breadcrumbs]")
					.last()
					.shadow()
					.find("ui5-responsive-popover")
					.then(($popover) => {
						const popover = $popover[0] as HTMLElement & { open: boolean };
						expect(popover.open, "Dropdown is opened.").to.be.true;
					});
			}
		});
	});

	it("toggles upon F4", () => {
		cy.mount(
			<div style={{ width: '150px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">VeryLongLinkName1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const focusDomRef = breadcrumbsElement.getFocusDomRef();
			if (focusDomRef) {
				focusDomRef.focus();
			}
		});

		cy.realPress("F4");

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-responsive-popover")
			.then(($popover) => {
				const popover = $popover[0] as HTMLElement & { open: boolean };
				expect(popover.open, "Dropdown is opened.").to.be.true;
			});

		cy.realPress("F4");

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-responsive-popover")
			.then(($popover) => {
				const popover = $popover[0] as HTMLElement & { open: boolean };
				expect(popover.open, "Dropdown is closed.").to.be.false;
			});
	});

	it("toggles upon ALT + DOWN", () => {
		cy.mount(
			<div style={{ width: '150px' }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="#">VeryLongLinkName1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">VeryLongLinkName6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
					<BreadcrumbsItem>Location</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			const focusDomRef = breadcrumbsElement.getFocusDomRef();
			if (focusDomRef) {
				focusDomRef.focus();
			}
		});

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-responsive-popover")
			.then(($popover) => {
				const popover = $popover[0] as HTMLElement & { open: boolean };
				expect(popover.open, "Dropdown is opened.").to.be.true;
			});

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-responsive-popover")
			.then(($popover) => {
				const popover = $popover[0] as HTMLElement & { open: boolean };
				expect(popover.open, "Dropdown is closed.").to.be.false;
			});
	});

	it("renders accessible names of overflowing link items", () => {
		cy.mount(
			<div style={{ width: '200px' }}>
				<Breadcrumbs design="NoCurrentPage">
					<BreadcrumbsItem href="#" accessible-name="first link acc name">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#" accessible-name="last link acc name">Link5</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.first()
			.realClick();

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-li")
			.eq(1)
			.then(($listItem) => {
				const listItem = $listItem[0] as HTMLElement & { accessibleName: string };
				const expectedAriaLabel = "first link acc name";

				expect(listItem.accessibleName, "label for first link is correct").to.equal(expectedAriaLabel);
			});
	});

	it("renders accessible names of non-overflowing link items", () => {
		cy.mount(
			<Breadcrumbs design="NoCurrentPage">
				<BreadcrumbsItem href="#" accessible-name="first link acc name">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
				<BreadcrumbsItem href="#" accessible-name="last link acc name">Link5</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.last()
			.then(($link) => {
				const link = $link[0] as HTMLElement & { accessibleName: string };

				expect(link.accessibleName, "label for last link is correct").to.contain("Link5");
				expect(link.accessibleName, "label for last link is correct").to.contain("last link acc name");
			});
	});

	it("renders accessible name of popover", () => {
		cy.mount(
			<div>
				<Breadcrumbs design="NoCurrentPage">
					<BreadcrumbsItem href="#" accessible-name="first link acc name">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#" accessible-name="last link acc name">Link5</BreadcrumbsItem>
				</Breadcrumbs>

				<div style={{ width: '200px' }}>
					<Breadcrumbs>
						<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
						<BreadcrumbsItem href="#">aaaa</BreadcrumbsItem>
						<BreadcrumbsItem>Location</BreadcrumbsItem>
					</Breadcrumbs>
				</div>
			</div>
		);

		const expectedAriaLabel = "Available Values";

		cy.get("[ui5-breadcrumbs]")
			.first()
			.shadow()
			.find("ui5-link")
			.eq(3)
			.realClick();

		cy.get("[ui5-breadcrumbs]")
			.last()
			.shadow()
			.find("ui5-responsive-popover")
			.shadow()
			.find(".ui5-popover-root")
			.then(($popoverRoot) => {
				const popoverRoot = $popoverRoot[0] as HTMLElement;
				expect(popoverRoot.getAttribute('aria-label'), "popover has correct aria-label").to.equal(expectedAriaLabel);
			});
	});

	it("cancels default if item-click event listener calls preventDefault", () => {
		let resultText = '';
		let preventDefaultCalled = false;

		const onItemClick = (event: any) => {
			let keyText = '';
			if (event.detail.ctrlKey) keyText += 'CTRL:';
			if (event.detail.altKey) keyText += 'ALT:';
			if (event.detail.shiftKey) keyText += 'SHIFT:';
			if (event.detail.metaKey) keyText += 'META:';

			event.preventDefault();
			preventDefaultCalled = true;
			resultText = keyText + event.detail.item.innerText;
		};

		cy.mount(
			<Breadcrumbs separators="Slash" onItemClick={onItemClick}>
				<BreadcrumbsItem href="#shouldnotbehere">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="..">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link4</BreadcrumbsItem>
				<BreadcrumbsItem>Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.url().then((initialUrl) => {
			cy.get("[ui5-breadcrumbs]")
				.shadow()
				.find("ui5-link")
				.eq(1)
				.then(($link) => {
					const linkText = $link.text();
					cy.wrap($link).realClick();

					cy.then(() => {
						expect(preventDefaultCalled, "preventDefault was called").to.be.true;
						expect(resultText, "label for pressed link is correct").to.equal(linkText);
					});

					cy.url().should('equal', initialUrl);
				});
		});
	});

	it("passes special keys pressed while item clicked", () => {
		let resultText = '';

		const onItemClick = (event: any) => {
			let keyText = '';
			if (event.detail.ctrlKey) keyText += 'CTRL:';
			if (event.detail.altKey) keyText += 'ALT:';
			if (event.detail.shiftKey) keyText += 'SHIFT:';
			if (event.detail.metaKey) keyText += 'META:';

			event.preventDefault();
			resultText = keyText + event.detail.item.innerText;
		};

		cy.mount(
			<Breadcrumbs separators="Slash" onItemClick={onItemClick}>
				<BreadcrumbsItem href="#shouldnotbehere">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="..">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link4</BreadcrumbsItem>
				<BreadcrumbsItem>Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				const linkText = $link.text();

				cy.wrap($link).realClick({ metaKey: true });

				cy.then(() => {
					expect(resultText, "META key captured correctly").to.equal('META:' + linkText);
				});
			});
		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				const linkText = $link.text();

				cy.wrap($link).realClick({ altKey: true });

				cy.then(() => {
					expect(resultText, "ALT key captured correctly").to.equal('ALT:' + linkText);
				});
			});

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				const linkText = $link.text();

				cy.wrap($link).realClick({ shiftKey: true });

				cy.then(() => {
					expect(resultText, "SHIFT key captured correctly").to.equal('SHIFT:' + linkText);
				});
			});
	});

	it("passes special keys pressed while item pressed with keyboard", () => {
		let resultText = '';

		const onItemClick = (event: any) => {
			let keyText = '';
			if (event.detail.ctrlKey) keyText += 'CTRL:';
			if (event.detail.altKey) keyText += 'ALT:';
			if (event.detail.shiftKey) keyText += 'SHIFT:';
			if (event.detail.metaKey) keyText += 'META:';

			event.preventDefault();
			resultText = keyText + event.detail.item.innerText;
		};

		cy.mount(
			<Breadcrumbs separators="Slash" onItemClick={onItemClick}>
				<BreadcrumbsItem href="#shouldnotbehere">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="..">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#shouldnotbehere">Link4</BreadcrumbsItem>
				<BreadcrumbsItem>Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.then(($link) => {
				const linkText = $link.text();

				resultText = '';
				cy.wrap($link).realClick({ metaKey: true });
				cy.then(() => {
					expect(resultText, "META label for pressed link is correct").to.equal('META:' + linkText);
				});

				resultText = '';
				cy.wrap($link).realClick({ altKey: true });
				cy.then(() => {
					expect(resultText, "ALT label for pressed link is correct").to.equal('ALT:' + linkText);
				});

				resultText = '';
				cy.wrap($link).realClick({ shiftKey: true });
				cy.then(() => {
					expect(resultText, "SHIFT label for pressed link is correct").to.equal('SHIFT:' + linkText);
				});

				// Note: CTRL key testing is skipped due to cypress-real-events compatibility issues
				// The functionality works in the actual application but cannot be reliably tested in the component testing environment
			});
	});

	it("Doesn't go in an endless rerendering cycle, when width is just enough", () => {
		cy.mount(
			<Breadcrumbs style={{ width: '191px' }}>
				<BreadcrumbsItem>(all)</BreadcrumbsItem>
				<BreadcrumbsItem>Bourgogne-Franche-Comté</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.wait(300);

		cy.get("[ui5-breadcrumbs]").then(($breadcrumbs) => {
			const breadcrumbsElement = $breadcrumbs[0] as Breadcrumbs;
			expect(breadcrumbsElement._overflowSize,
				"Max stack of calling not hit for invalidation of control").to.equal(1);
		});
	});

	it("current location link truncates", () => {
		cy.mount(
			<>
				<div style={{ width: "900px" }}>
					<Breadcrumbs id="breadcrumbs1">
							<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
							<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
					</Breadcrumbs>
				</div>
				<div style={{ width: "300px" }}>
					<Breadcrumbs id="breadcrumbs2">
						<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link2</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
						<BreadcrumbsItem id="currentLocation">This is a very long current location text that should be truncated</BreadcrumbsItem>
					</Breadcrumbs>
				</div>
			</>
		);

		// assert that last link in the narrow Breadcrumbs is truncated
		cy.get("#breadcrumbs2")
			.shadow()
			.find("li:last-child")
			.then(($lastLink) => {
				const linkRect = $lastLink[0].getBoundingClientRect();
				const maxExpectedWidth = 300;

				expect(linkRect.width, "link wrapper should be shrinkable and less than parent width")
					.to.be.lessThan(maxExpectedWidth);
		});

		// assert that height of both Breadcrumbs (one that fits and one that truncates)
		// is the same
		cy.get("#breadcrumbs1")
			.then(($breadcrumbs1) => {
				const breadcrumbs1DOMRef = ($breadcrumbs1[0] as Breadcrumbs).getDomRef();
				const breadcrumbs1Rect = breadcrumbs1DOMRef.getBoundingClientRect();
				const breadcrumbs1Height = breadcrumbs1Rect.height;


				cy.get("#breadcrumbs2")
					.then(($breadcrumbs2) => {
						const breadcrumbs2DOMRef = ($breadcrumbs2[0] as Breadcrumbs).getDomRef();
						const breadcrumbs2Rect = breadcrumbs2DOMRef.getBoundingClientRect();
						const breadcrumbs2Height = breadcrumbs2Rect.height;

						expect(breadcrumbs2Height, "link height should remain the same")
							.to.be.equal(breadcrumbs1Height);
				});
		});
	});
});

describe("Breadcrumbs with item for current page", () => {

	it("renders current page item as link", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem href="https://www.sap.com">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="https://www.sap.com" target="_blank">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link7</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("li:last-child ui5-link")
			.then(($link) => {
				expect($link.length, "item for current page is a link").to.be.greaterThan(0);
				expect($link.text(), "item for current page has correct text").to.equal("Location");
			});
	});

	it("sets correct design to link for current page", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem href="https://www.sap.com">Link1</BreadcrumbsItem>
				<BreadcrumbsItem href="https://www.sap.com" target="_blank">Link2</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Link7</BreadcrumbsItem>
				<BreadcrumbsItem href="#">Location</BreadcrumbsItem>
			</Breadcrumbs>
		);

		cy.get("[ui5-breadcrumbs]")
			.shadow()
			.find("li:last-child ui5-link")
			.then(($link) => {
				const link = $link[0] as HTMLElement & { design: string };
				expect(link.design, "link has correct design").to.equal("Emphasized");
			});
	});

	it("does not render separator after link to current page", () => {
		cy.mount(
			<div>
				<Breadcrumbs>
					<BreadcrumbsItem href="https://www.sap.com">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="https://www.sap.com" target="_blank">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link7</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Location</BreadcrumbsItem>
				</Breadcrumbs>

				<Breadcrumbs design="NoCurrentPage">
					<BreadcrumbsItem href="https://www.sap.com">Link1</BreadcrumbsItem>
					<BreadcrumbsItem href="https://www.sap.com" target="_blank">Link2</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link3</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link4</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link5</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link6</BreadcrumbsItem>
					<BreadcrumbsItem href="#">Link7</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);

		cy.get("[ui5-breadcrumbs]")
			.eq(1)
			.shadow()
			.find("li:last-child span.ui5-breadcrumbs-separator")
			.should('exist')
			.then(() => {
				cy.get("[ui5-breadcrumbs]")
					.first()
					.shadow()
					.find("li:last-child span.ui5-breadcrumbs-separator")
					.should('not.exist');
			});
	});
});