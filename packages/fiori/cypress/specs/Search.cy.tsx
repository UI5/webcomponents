import Title from "@ui5/webcomponents/dist/Title.js";
import Search from "../../src/Search.js";
import SearchItem from "../../src/SearchItem.js";
import SearchItemGroup from "../../src/SearchItemGroup.js";
import SearchItemShowMore from "../../src/SearchItemShowMore.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import IllustratedMessage from "../../src/IllustratedMessage.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import SearchMessageArea from "../../src/SearchMessageArea.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import AvatarSize from "@ui5/webcomponents/dist/types/AvatarSize.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import { SEARCH_ITEM_SHOW_MORE_COUNT, SEARCH_ITEM_SHOW_MORE_NO_COUNT } from "../../src/generated/i18n/i18n-defaults.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import share from "@ui5/webcomponents-icons/dist/share.js";
import copy from "@ui5/webcomponents-icons/dist/copy.js";

describe("Properties", () => {
	it("items slot with groups", () => {
		cy.mount(
			<Search>
				<SearchItemGroup headerText="Group Header 1">
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={searchIcon}></SearchItem>
				</SearchItemGroup>
				<SearchItemGroup headerText="Group Header 2">
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={history}></SearchItem>
				</SearchItemGroup>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("G");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.not.value", "Group Header 1");

		cy.get("[ui5-search]")
			.realPress("Backspace");

		cy.get("[ui5-search]")
			.realPress("L");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.value", "List Item");
	});

	it("items slot navigation", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItem text="List Item"></SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("L");

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item").eq(0)
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("items slot arrow navigation with groups and headerText", () => {
		cy.mount(
			<Search>
				<SearchItemGroup headerText="Group Header 1">
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={searchIcon}></SearchItem>
				</SearchItemGroup>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("L");

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item-group")
			.shadow()
			.find("[ui5-li-group-header]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("items slot arrow navigation with groups and no headerText", () => {
		cy.mount(
			<Search>
				<SearchItemGroup>
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={searchIcon}></SearchItem>
				</SearchItemGroup>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("L");

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item").eq(0)
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	})

	it("items should be shown instead of illustration of both present ", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-list]")
			.should("exist");
		cy.get("[ui5-search]")
			.shadow()
			.find("slot[name='illustration']")
			.should("not.exist");
	});

	it("tests show more item text with counter", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItemShowMore itemsToShowCount={3}></SearchItemShowMore>
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick()
			.realType("s");

		cy.get("[ui5-search-item-show-more]")
			.should("be.visible");

		cy.get("[ui5-search-item-show-more]")
			.shadow()
			.find("span")
			.as("itemText");

		cy.get("[ui5-search-item-show-more]")
			.then($item => {
				const item = $item[0];
				const resourceBundle = (item.constructor as any).i18nBundle;

				cy.get("@itemText")
					.should("have.text", resourceBundle.getText(SEARCH_ITEM_SHOW_MORE_COUNT.defaultText, 3));
			});

		cy.get("@itemText")
			.should("have.class", "ui5-search-item-show-more-text");

	});

	it("tests show more item with no counter", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItemShowMore></SearchItemShowMore>
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick()
			.realType("s");

		cy.get("[ui5-search-item-show-more]")
			.should("be.visible");

		cy.get("[ui5-search-item-show-more]")
			.shadow()
			.find("span")
			.as("itemText");

		cy.get("[ui5-search-item-show-more]")
			.then($item => {
				const item = $item[0];
				const resourceBundle = (item.constructor as any).i18nBundle;

				cy.get("@itemText")
					.should("have.text", resourceBundle.getText(SEARCH_ITEM_SHOW_MORE_NO_COUNT.defaultText));
			});

		cy.get("@itemText")
			.should("have.class", "ui5-search-item-show-more-text");
	});

	it("test show more item accessibility attributes", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItemShowMore itemsToShowCount={2}></SearchItemShowMore>
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick()
			.realType("l");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.get("[ui5-search-item-show-more]")
			.shadow()
			.find("li")
			.should("have.attr", "aria-selected", "true")
			.should("have.attr", "role", "option");
	});

	it("tests loading property", () => {
		cy.mount(
			<Search loading={true}>
				<SearchItem text="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("be.visible");
	});

	it("noTypeahead", () => {
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "I");
	});

	it("typeahead and value confirmation - autocomplete by starts with", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "Item 1");
	});

	it("typeahead and Arrow Right - autocomplete by starts with", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.value", "Item 1");
	});

	it("typeahead and Escape - autocomplete by starts with", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("[ui5-search]")
			.should("have.value", "I");
	});

	it("Popup properties", () => {
		cy.mount(
			<Search>
				<SearchMessageArea text="Message" description="Secondary Message" slot="messageArea" />
				<Button design={ButtonDesign.Transparent} slot="action">Show All</Button>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search-message-area]")
			.should("be.visible");

		cy.get("[ui5-search] [ui5-button]")
			.should("be.visible");
	});

	it("Displays item's icon when both image and icon are set", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history}>
					<Avatar slot="image" size={AvatarSize.XS} initials="JM"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.find("ui5-search-item")
			.shadow()
			.find("ui5-icon")
			.should("be.visible");

		cy.get("[ui5-search]")
			.find("ui5-search-item")
			.find("ui5-avatar")
			.should("not.be.visible");
	});

	it("Displays item's image if set", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1">
					<Avatar slot="image" size={AvatarSize.XS} initials="JM"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.find("ui5-search-item")
			.find("ui5-avatar")
			.should("be.visible");
	});

	it("displays item's delete button on hover if deletable is true", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable/>
				<SearchItem text="Item 2"/>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");

		cy.get("[ui5-search-item]")
			.eq(0)
			.realHover();

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.visible");

        cy.get("[ui5-search-item]")
			.eq(1)
			.realHover();

		cy.get("[ui5-search-item]")
			.eq(1)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("not.exist");
	});

	it("action buttons are always visible", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable>
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.visible");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.visible");

	})

	it("tab navigation between action buttons works correctly", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable>
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");
	});

	it("shift+tab navigation between action buttons works correctly", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable>
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.realClick();

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");
	});

	it("action button clicks work correctly", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1">
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions" onClick={cy.spy().as("favoriteClick")}/>
					<Button design={ButtonDesign.Transparent} icon={share} slot="actions" onClick={cy.spy().as("shareClick")}/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.realClick();

		cy.get("@favoriteClick").should("have.been.calledOnce");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='share']")
			.realClick();

		cy.get("@shareClick").should("have.been.calledOnce");
	});

	it("tab navigation loops back to first action when at last action button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1">
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");
	});

	it("tab navigation loops with actions and delete button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable>
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");
	});

	it("shift+tab navigation loops with actions and delete button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable>
					<Button design={ButtonDesign.Transparent} icon={favorite} slot="actions"/>
					<Button design={ButtonDesign.Transparent} icon={edit} slot="actions"/>
				</SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='edit']")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.find("[ui5-button][icon='favorite']")
			.should("be.focused");
	});

	it("focus looping works with only delete button (no actions)", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("I");
		cy.realPress("ArrowDown");

		cy.realPress("F2");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("be.focused");
	});
});

describe("Events", () => {
	it("search event with noTypeahead", () => {
		const spy = cy.spy();
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === undefined;
		}));
	});

	it("search event with autocomplete by starts with", () => {
		const spy = cy.spy();
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.text === "Item 1";
		}));
	});

	it("search event on item selection", () => {
		const spy = cy.spy();
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				search.get(0).addEventListener("ui5-search", spy);
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("ui5-search-item").eq(0)
			.realClick();

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.text === "Item 1";
		}));
	});

	it("click event on show-more-item selection with mouse", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItemShowMore></SearchItemShowMore>
			</Search>
		);

		cy.get("[ui5-search-item-show-more]")
			.invoke("on", "ui5-click", cy.spy().as("clickSpy"));

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.realType("l");

		cy.get("[ui5-search-item-show-more]")
			.realClick();

		cy.get("@clickSpy")
			.should("have.been.calledOnce");
	});

	it("click event on show-more-item selection with Enter", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItemShowMore></SearchItemShowMore>
			</Search>
		);

		cy.get("[ui5-search-item-show-more]")
			.invoke("on", "ui5-click", cy.spy().as("clickSpy"));

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.realType("l");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@clickSpy")
			.should("have.been.calledOnce");
	});

	it("search event prevention", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", e => {
					e.preventDefault();
				});
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "");
	});

	it("open event", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledOnce");
	});

	it("open event on empty list", () => {
		cy.mount(
			<Search>
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@opened")
			.should("not.have.been.called");
	});

	it("should not open popover when typing with no items", () => {
		cy.mount(
			<Search>
			</Search>
		);

		cy.get("[ui5-search]")
			.invoke("on", "ui5-open", cy.spy().as("openSpy"));

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("t");

		cy.get("[ui5-search]")
			.realPress("e");

		cy.get("[ui5-search]")
			.realPress("s");

		cy.get("[ui5-search]")
			.realPress("t");

		cy.get("@openSpy")
			.should("not.have.been.called");

		cy.get("[ui5-search]")
			.should("not.have.attr", "open");
	});

	it("should open popover when loading is true even with no items", () => {
		cy.mount(
			<Search loading={true}>
			</Search>
		);

		cy.get("[ui5-search]")
			.invoke("on", "ui5-open", cy.spy().as("openSpy"));

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("t");

		cy.get("@openSpy")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.should("have.attr", "open");
	});

	it("open event - typing, pressing Escape, then typing again should reopen suggestions", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("@closed")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("t");

		cy.get("@opened")
			.should("have.been.calledTwice");
	});

	it("open event - typing, selecting an item, then typing again should reopen picker", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@closed")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.and("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledTwice")
	});

	it("close event", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-close", cy.spy().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it("close event on Escape", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-close", cy.spy().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it("should close popup on Escape and return focus to the field", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("delete event on search item", () => {
		function onDelete(event: Event) {
			(event.target as HTMLElement).remove();
		}
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} deletable onDelete={onDelete}/>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item").eq(0)
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("ui5-search-item")
			.should("not.exist")
	});

	it("delete event is fired on clicking the delete button of a search item", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" onDelete={cy.spy().as('deleteSpy')} deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search-item]").eq(0)
			.as("firstSearchItem");

		cy.get("@firstSearchItem")
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("@deleteSpy").should("have.been.calledOnce");
	});

	it("Fast navigation with F2 key press", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search-item]").eq(0)
			.as("firstSearchItem");

		cy.get("@firstSearchItem")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("@firstSearchItem")
			.shadow()
			.find("[ui5-button]")
			.should("be.focused");

		cy.realPress("F2");

		cy.get("@firstSearchItem")
			.should("be.focused");
	});

	it("delete event is fired on pressing SPACE on the focused delete button of a search item", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" onDelete={cy.spy().as('deleteSpy')} deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.realPress("F2");

		cy.realPress("Space");

		cy.get("@deleteSpy").should("have.been.calledOnce");
	});

	it("delete event is fired on pressing ENTER on the focused delete button of a search item", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" onDelete={cy.spy().as('deleteSpy')} deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.realPress("F2");

		cy.realPress("Enter");

		cy.get("@deleteSpy").should("have.been.calledOnce");
	});

	it("should deselect items when backspace or delete key is pressed", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem text="Item 2" icon={searchIcon} />
				<SearchItem text="Item 3" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("I");

		cy.get("ui5-search-item").eq(0)
			.should("have.attr", "selected");

		// Press backspace and verify item is deselected
		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("Backspace");

		cy.get("ui5-search-item").eq(0)
			.should("not.have.attr", "selected");
	});

	it("should handle backspace and delete keys with grouped items", () => {
		cy.mount(
			<Search>
				<SearchItemGroup headerText="Group 1">
					<SearchItem text="Group 1 Item 1" icon={history} />
					<SearchItem text="Group 1 Item 2" icon={searchIcon} />
				</SearchItemGroup>
				<SearchItemGroup headerText="Group 2">
					<SearchItem text="Group 2 Item 1" icon={history} />
					<SearchItem text="Group 2 Item 2" icon={searchIcon} />
				</SearchItemGroup>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("G");

		cy.get("ui5-search-item").eq(0)
			.should("have.attr", "selected");

		// Press backspace and verify item is deselected
		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("Backspace");

		cy.get("ui5-search-item").eq(0)
			.should("not.have.attr", "selected");
	});

	it("should reset suggestions highlight on pressing 'clear' button", () => {
		cy.mount(
			<Search showClearIcon>
				<SearchItem text="Item 1" />
			</Search>
		);

		cy.get("[ui5-search]").as("search");

		cy.get("@search")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@search")
			.should("be.focused");

		cy.get("@input")
			.realPress("I");

		cy.get("@search")
			.should("have.value", "Item 1");

		cy.get("[ui5-search-item]").eq(0)
			.should("have.attr", "highlight-text", "I");

		cy.get("@search")
			.shadow()
			.find("[ui5-icon][name='decline']")
			.realClick();

		cy.get("@search")
			.should("have.value", "");

		cy.get("@search")
			.should("not.have.attr", "open");

		cy.get("@search")
			.invoke("prop", "open", true);

		cy.get("ui5-search-item").eq(0)
			.should("have.attr", "highlight-text", "");
	});

	it("should close the popover on search if no suggestion is selected", () => {
		cy.mount(
			<Search showClearIcon>
				<SearchItem text="Item 1" />
			</Search>
		);

		cy.get("[ui5-search]").as("search");

		cy.get("@search")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@search")
			.should("be.focused");

		cy.get("@input")
			.realPress("P"); // no matching suggestion

		cy.get("@search")
			.should("have.value", "P");

		cy.get("@search")
			.shadow()
			.find("[ui5-icon][name='search']")
			.realClick();

		cy.get("@search")
			.should("not.have.attr", "open");
	});

	it("should close the popover on 'search' if suggestion is selected", () => {
		cy.mount(
			<Search showClearIcon>
				<SearchItem text="Item 1" />
			</Search>
		);

		cy.get("[ui5-search]").as("search");

		cy.get("@search")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@search")
			.should("be.focused");

		cy.get("@input")
			.realPress("I"); // no matching suggestion

		cy.get("@search")
			.should("have.value", "Item 1");

		cy.get("@search")
			.shadow()
			.find("[ui5-icon][name='search']")
			.realClick();

		cy.get("@search")
			.should("not.have.attr", "open");
	});

	it("should open picker by default when 'open' property is set to true", () => {
		cy.mount(
			<Search open>
				<SearchItem text="Item 1" />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
	});

	it("should not open picker if text is deleted and there are no items", () => {
		const handleInput = (e: any) => {
			if (e.target.value) {
				const item = document.createElement("ui5-search-item");
				item.setAttribute("text", e.target.value);
				e.target.appendChild(item);
			} else {
				e.target.innerHTML = "";
			}
		};

		cy.mount(<Search showClearIcon noTypeahead onInput={handleInput}></Search>);

		cy.get("[ui5-search]").as("search");

		cy.get("@search")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realPress("I");

		cy.get("@input")
			.realPress("Backspace");

		cy.get("@search")
			.should("have.value", "");

		cy.get("@search")
			.should("not.have.attr", "open");
	});

	it("should not send outdated suggestion item on enter", () => {
		cy.mount(
			<Search onSearch={cy.spy().as("searchSpy")}>
				<SearchItem text="Abc" />
				<SearchItem text="AbN" />
			</Search>
		);

		cy.get("[ui5-search]").as("search");

		cy.get("@search")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("Ab"); // should autocomplete to "Abc"

		cy.get("@input")
			.realPress("Backspace") // remove "c" so no suggestion is selected

		cy.get("@input")
			.realPress("Enter"); // submit search with no suggestion selected

		cy.get("@searchSpy").should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === undefined;
		}));
	});
});

describe("Accessibility", () => {
	it("should navigate through items to action button with Arrow keys", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<Button design={ButtonDesign.Transparent} slot="action">Show All</Button>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("I");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.get("[ui5-search] [ui5-button]")
			.should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("should have aria-autocomplete='both' on the input element", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-autocomplete", "both");
	});

	it("should have aria-controls pointing to responsive popover", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.invoke("attr", "aria-controls")
			.then((ariaControlsId) => {
				cy.get("[ui5-search]")
					.shadow()
					.find("[ui5-responsive-popover]")
					.should("have.attr", "id", ariaControlsId);
			});
	});
});

describe("SearchItem delete button accessibility", () => {
	it("should have aria-label on the delete button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("have.attr", "aria-label");
	});

	it("should have correct i18n text in aria-label for delete button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("have.attr", "aria-label", 'Remove');
	});

	it("should have tabIndex=-1 on the delete button", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" deletable />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search-item]")
			.eq(0)
			.shadow()
			.find(".ui5-search-item-selected-delete")
			.should("have.attr", "tabindex", "-1");
	});
});

describe("Lazy loaded items and autocomplete", () => {
	it("Should mount search component with no items, load items onInput and properly autocomplete to a newly added item", () => {
		const searchItems = [
			{ text: "Banana" },
			{ text: "Apple" },
			{ text: "Orange"}
		];

		let searchComponent: any;

		const handleInput = () => {
			searchItems.forEach(data => {
				const item = document.createElement("ui5-search-item");
				item.setAttribute("text", data.text);
				searchComponent.appendChild(item);
			});
		};

		cy.mount(
			<Search ref={(el: any) => { searchComponent = el; }} onInput={handleInput}>
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("ui5-search-item")
			.should("not.exist");

		// Click on the search input to focus it
		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		// Type "a" to trigger the onInput event
		cy.get("[ui5-search]")
			.realPress("a");

		// Verify that suggestions are now open and items are added
		cy.get("@opened")
			.should("have.been.calledOnce");

		// Verify all 3 items are present
		cy.get("ui5-search-item")
			.should("have.length", 3);

		// Verify the second item is "Apple"
		cy.get("ui5-search-item")
			.eq(1)
			.should("have.attr", "text", "Apple");

		// Verify that the input text is autocompleted to "Apple" (first match starting with "a")
		cy.get("[ui5-search]")
			.should("have.value", "Apple");
	});

	it("Should mount search component with no items, load items onInput with a delay and properly autocomplete to a newly added item", () => {
		const searchItems = [
			{ text: "Banana" },
			{ text: "Apple" },
			{ text: "Orange"}
		];

		let searchComponent: any;

		const handleInput = () => {
			setTimeout(() =>
				searchItems.forEach(data => {
					const item = document.createElement("ui5-search-item");
					item.setAttribute("text", data.text);
					searchComponent.appendChild(item);
				}),
			1000)
		};

		cy.mount(
			<Search ref={(el: any) => { searchComponent = el; }} onInput={handleInput}>
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		// Type "a" to trigger the onInput event
		cy.get("[ui5-search]")
			.realPress("a");

		// Verify that suggestions are now open and items are added
		cy.get("@opened")
			.should("have.been.calledOnce");

		// Verify all 3 items are present
		cy.get("ui5-search-item")
			.should("have.length", 3);

		// Verify the second item is "Apple"
		cy.get("ui5-search-item")
			.eq(1)
			.should("have.attr", "text", "Apple");

		// Verify that the input text is autocompleted to "Apple" (first match starting with "a")
		cy.get("[ui5-search]")
			.should("have.value", "Apple");
	});
});
